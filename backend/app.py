from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://user:password@localhost:5432/tasks'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)


class Task(db.Model):
    __tablename__ = 'tasks'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    email = db.Column(db.String())
    description = db.Column(db.String())
    done = db.Column(db.Boolean, default=False)

    def __init__(self, name, email, description):
        self.name = name
        self.email = email
        self.description = description
        self.done = False

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    page = int(request.args.get('page', 1))
    order_by = request.args.get('order_by', 'name')
    tasks = Task.query.order_by(order_by).paginate(page=page, per_page=10)
    return jsonify({
        'tasks': [task.as_dict() for task in tasks.items],
        'total_pages': tasks.pages,
        'current_page': tasks.page,
        'per_page': tasks.per_page,
        'order_by': order_by,
    })


@app.route('/api/tasks/<int:id>', methods=['GET'])
def get_task(id):
    task = Task.query.get(id)
    if not task:
        return jsonify({'error': f'Task with id {id} not found'}), 404
    return jsonify(task.as_dict())


@app.route('/api/tasks', methods=['POST'])
def create_task():
    data = request.json
    required_fields = ['name', 'email', 'description']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    task = Task(data['name'], data['email'], data['description'])
    db.session.add(task)
    db.session.commit()
    return jsonify(task.as_dict())


@app.route('/api/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    task = Task.query.get(id)
    if not task:
        return jsonify({'error': f'Task with id {id} not found'}), 404
    data = request.json
    if 'name' in data:
        task.name = data['name']
    if 'email' in data:
        task.email = data['email']
    if 'description' in data:
        task.description = data['description']
    if 'done' in data:
        task.done = data['done']
    db.session.commit()
    return jsonify(task.as_dict())

@app.route('/api/tasks/int:id', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get(id)
    if not task:
        return jsonify({'error': f'Task with id {id} not found'}), 404
    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': f'Task with id {id} deleted successfully'})

if __name__ == 'main':
    app.run(debug=True)
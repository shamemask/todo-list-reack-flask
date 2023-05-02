from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
import eventlet
eventlet.monkey_patch()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:123@localhost:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy()
db.init_app(app)
migrate = Migrate(app, db)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}}, expose_headers='x-total-count')

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    email = db.Column(db.String(120))
    text = db.Column(db.String(120))
    done = db.Column(db.Boolean) 

    def __init__(self, name, email, text, done=False):
        self.name = name
        self.email = email
        self.text = text
        self.done = done

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'text': self.text,
            'done': self.done,
        }

# Получить все задачи
@app.route('/api/todos')
def get_todos():
    page = int(request.args.get('_page', 1))
    limit = int(request.args.get('_limit', 3))
    sortField = request.args.get('_sort', 'id')
    sortOrder = request.args.get('_order', 'asc')
    todos_query = Todo.query.order_by(db.text(f'{sortField} {sortOrder}')).paginate(page=page, per_page=limit, error_out=False)
    totalCount = todos_query.total
    todos = [todo.serialize() for todo in todos_query.items]
    response = jsonify(todos)
    response.headers.add('x-total-count', totalCount)
    return response

# Получить задачу по ID
@app.route('/api/todos/<int:id>')
def get_todo_by_id(id):
    todo = Todo.query.get(id)
    return jsonify(todo.serialize())

# Добавить задачу
@app.route('/api/todos', methods=['POST'])
def create_todo():
    name = request.json['name']
    email = request.json['email']
    text = request.json['text']

    todo = Todo(name=name, email=email, text=text, done=False)
    db.session.add(todo)
    db.session.commit()

    return jsonify(todo.serialize())

# Обновить задачу
@app.route('/api/todos/<int:id>', methods=['PUT'])
def update_todo_by_id(id):
    todo = Todo.query.get(id)

    if 'text' in request.json:
        todo.text = request.json['text']
    if 'done' in request.json:
        todo.done = request.json['done']

    db.session.commit()

    return jsonify(todo.serialize())

# Удалить задачу
@app.route('/api/todos/<int:id>', methods=['DELETE'])
def delete_todo_by_id(id):
    todo = Todo.query.get(id)
    db.session.delete(todo)
    db.session.commit()

    return jsonify(todo.serialize())

if __name__ == '__main__':
    app.run(debug=True)
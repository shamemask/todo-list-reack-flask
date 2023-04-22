from flask import Flask, jsonify, request, render_template, session, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:123@localhost/postgres'
app.config['SECRET_KEY'] = 'secret'

db = SQLAlchemy(app)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    done = db.Column(db.Boolean, default=False, nullable=False)

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    page = request.args.get('page', 1, type=int)
    per_page = 3
    order_by = request.args.get('order_by', 'name')

    if order_by == 'name':
        tasks = Task.query.order_by(Task.name.asc())
    elif order_by == 'email':
        tasks = Task.query.order_by(Task.email.asc())
    elif order_by == 'done':
        tasks = Task.query.order_by(Task.done.asc())
    else:
        tasks = Task.query.order_by(Task.id.asc())

    pagination = tasks.paginate(page=page, per_page=per_page)

    return jsonify({
        'tasks': [task.to_dict() for task in pagination.items],
        'total_pages': pagination.total,
        'current_page': pagination.page,
        'per_page': per_page,
        'order_by': order_by
    })


@app.route('/api/tasks', methods=['POST'])
def create_task():
    data = request.get_json()

    task = Task(name=data.get('name'), email=data.get('email'), description=data.get('description'))
    db.session.add(task)
    db.session.commit()

    return jsonify(task.to_dict())


@app.route('/api/tasks/<int:task_id>', methods=['GET'])
def get_task(task_id):
    task = Task.query.get(task_id)

    if not task:
        return jsonify({'error': 'Task not found'}), 404

    return jsonify(task.to_dict())

@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = Task.query.get(task_id)

    if not task:
        return jsonify({'error': 'Task not found'}), 404

    data = request.get_json()

    task.description = data.get('description', task.description)
    task.done = data.get('done', task.done)

    db.session.add(task)
    db.session.commit()

    return jsonify(task.to_dict())


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if username == 'admin' and password == '123':
        session['logged_in'] = True
        return jsonify({'success': 'Logged in successfully'})

    return jsonify({'error': 'Invalid credentials'}), 401


@app.route('/api/logout')
def logout():
    session.pop('logged_in', None)
    return jsonify({'success': 'Logged out successfully'})

if __name__ == '__main__':
    app.run(debug=True)
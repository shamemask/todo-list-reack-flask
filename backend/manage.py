import eventlet
eventlet.monkey_patch()

from app import app, db
from datetime import datetime
import bcrypt

from app.models.todo import Todo


# Получить все задачи
@app.route('/api/todos')
def get_todos():
    todos = Todo.query.all()
    todos = [todo.serialize() for todo in todos]
    return jsonify(todos)

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

if __name__ == 'main':
    app.run(debug=True)
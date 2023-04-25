from app import db


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
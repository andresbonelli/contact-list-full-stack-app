from config import db
from datetime import datetime
from flask_login import LoginManager, UserMixin
from flask_bcrypt import Bcrypt

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), unique=False, nullable=False)
    last_name = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    pub_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


    def to_json(self):
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email": self.email,
            "dateCreated": self.pub_date
        }

class User(db.Model, UserMixin):
    __tablename__ = "users"

    uid = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    role = db.Column(db.String)
    description = db.Column(db.String)

    def __repr__(self):
        return f'<User: {self.username}, Role: {self.role}>'

    def get_id(self):
        return self.uid
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
class Person(db.Model):
    __tablename__ = 'person'
    person_id = db.Column(db.Integer, primary_key=True)
    phone_number = db.Column(db.String(15))
    email_address = db.Column(db.String(45))


class Student(Person):
    __tablename__ = 'student'
    student_id = db.Column(db.Integer, primary_key=True)
    student_number = db.Column(db.String(20), unique=True, nullable=False)
    student_department = db.Column(db.String(45), nullable=False)
    student_year = db.Column(db.String(10), nullable=False)
    person_id = db.Column(db.Integer, db.ForeignKey('person.person_id'), nullable=False)


class Admin(Person):
    __tablename__ = 'admin'
    admin_id = db.Column(db.Integer, primary_key=True)
    admin_username = db.Column(db.String(50), nullable=False, unique=True)
    admin_password = db.Column(db.String(50), nullable=False)
    person_id = db.Column(db.Integer, db.ForeignKey('person.person_id'), nullable=False)
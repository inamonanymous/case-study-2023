from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Equipment(db.Model): 
    __tablename__ = 'equipment'
    equip_id = db.Column(db.Integer, primary_key=True)
    equip_type = db.Column(db.String(50), nullable=False)
    equip_unique_key = db.Column(db.String(50), nullable=False, unique=True)
    is_available = db.Column(db.Boolean, default=True)
    is_pending = db.Column(db.Boolean, default=False)


class Pending(db.Model):
    __tablename__ = 'pending'
    pending_id = db.Column(db.Integer, primary_key=True)
    equip_type = db.Column(db.String(50))
    equip_unique_key = db.Column(db.String(50), nullable=False)
    student_number = db.Column(db.String(20), unique=True, nullable=False)
    student_name = db.Column(db.String(50), nullable=False)
    is_verified = db.Column(db.Boolean, default=False)


class Borrowed(Pending):
    __tablename__ = 'borrowed'
    borrow_id = db.Column(db.Integer, primary_key=True)
    time_quota = db.Column(db.Time)
    is_verified = db.Column(db.Boolean, default=True)
    pending_id = db.Column(db.Integer, db.ForeignKey('pending.pending_id'), nullable=False)


class Person(db.Model):
    __tablename__ = 'person'
    person_id = db.Column(db.Integer, primary_key=True)
    person_firstname = db.Column(db.String(50), nullable=False)
    person_surname = db.Column(db.String(50), nullable=False)
    phone_number = db.Column(db.String(15))
    email_address = db.Column(db.String(45), nullable=False, unique=True)


class Student(Person):
    __tablename__ = 'student'
    student_id = db.Column(db.Integer, primary_key=True)
    student_number = db.Column(db.String(20), unique=True, nullable=False)
    student_department = db.Column(db.String(45), nullable=False)
    student_year = db.Column(db.String(10), nullable=False)
    email_address = db.Column(db.String(45), db.ForeignKey('person.email_address'), nullable=False)


class Admin(Person):
    __tablename__ = 'admin'
    admin_id = db.Column(db.Integer, primary_key=True)
    admin_username = db.Column(db.String(50), nullable=False, unique=True)
    admin_password = db.Column(db.String(50), nullable=False)
    email_address = db.Column(db.String(45), db.ForeignKey('person.email_address'), nullable=False)
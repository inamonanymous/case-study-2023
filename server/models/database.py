from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash, generate_password_hash
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


class Borrowed(db.Model):
    __tablename__ = 'borrowed'
    borrow_id = db.Column(db.Integer, primary_key=True)
    time_quota = db.Column(db.Time)
    is_claimed = db.Column(db.Boolean, default=False)
    is_returned = db.Column(db.Boolean, default=False)
    pending_id = db.Column(db.Integer, db.ForeignKey('pending.pending_id'), nullable=False)


class Student(db.Model):
    __tablename__ = 'student'
    student_id = db.Column(db.Integer, primary_key=True)
    student_number = db.Column(db.String(20), unique=True, nullable=False)
    student_section = db.Column(db.String(10))
    student_department = db.Column(db.String(45), nullable=False)
    student_year = db.Column(db.String(10), nullable=False)
    student_email_address = db.Column(db.String(45), nullable=False)
    student_firstname = db.Column(db.String(50), nullable=False)
    student_surname = db.Column(db.String(50), nullable=False)
    requested_item=db.Column(db.String(50), nullable=False)
    status=db.Column(db.String(15))
    

class Admin(db.Model):
    __tablename__ = 'admin'
    admin_id = db.Column(db.Integer, primary_key=True)
    admin_username = db.Column(db.String(50), nullable=False, unique=True)
    admin_password = db.Column(db.String(255), nullable=False)
    admin_email_address = db.Column(db.String(45), nullable=False)
    admin_firstname = db.Column(db.String(45), nullable=False)
    admin_surname = db.Column(db.String(45), nullable=False)

    def save(self):
        self.admin_password=generate_password_hash(self.admin_password)
        db.session.add(self)
        db.session.commit()

    @classmethod
    def check_login(cls, username, password):
        admin_obj = cls.query.filter_by(admin_username=username).first()
        return admin_obj and check_password_hash((admin_obj.admin_password), str(password))
    

class Completed(db.Model):
    __tablename__ = 'completed'
    completed_id = db.Column(db.Integer, primary_key=True)
    student_number = db.Column(db.String(20), nullable=False)
    student_department = db.Column(db.String(45), nullable=False)
    student_name = db.Column(db.String(100), nullable=False)
    equip_type = db.Column(db.String(50), nullable=False)
    equip_unique_key = db.Column(db.String(50), nullable=False)

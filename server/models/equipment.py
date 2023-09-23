from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Equipment(db.Model): 
    __tablename__ = 'equipment'
    equip_id = db.Column(db.Integer, primary_key=True)
    equip_type = db.Column(db.String(50), nullable=False)
    equip_unique_key = db.Column(db.String(50), nullable=False)
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
    

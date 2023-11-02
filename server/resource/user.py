from flask_restful import Resource, abort, fields, marshal_with, reqparse
from flask import request, jsonify
from models.database import db, Equipment, Student, Pending, Borrowed, Completed



class ShowEquipments(Resource):
    def get(self):
        equipment = Equipment.query.all()
        equip_id = [e.equip_id for e in equipment]
        equip_type = [e.equip_type for e in equipment]
        equip_unique_key = [e.equip_unique_key for e in equipment]
        is_available = [e.is_available for e in equipment]
        is_pending = [e.is_pending for e in equipment]

        equipments = {
            "equip_id": equip_id,
            "equip_type": equip_type,
            "equip_unique_key": equip_unique_key,
            "is_available": is_available,
            "is_pending": is_pending,
        }    
        
        return equipments


post_args_equip = reqparse.RequestParser()
post_args_equip.add_argument("args_equip_type", type=str, required=True, help="type is required")
post_args_equip.add_argument("args_equip_unique_key", type=str, required=True, help="unique_key is required")
post_args_equip.add_argument("args_is_available", type=bool, required=True, help="is_available is required")
post_args_equip.add_argument("args_is_pending", type=bool, required=True, help="is_pending is required")

equipment_resource_fields = {
    'equip_id' : fields.Integer,
    'equip_type': fields.String,
    'equip_unique_key': fields.String,
    'is_available': fields.Boolean,
    'is_pending': fields.Boolean
}

class Equipments(Resource):
    @marshal_with(equipment_resource_fields)
    def get(self, unique_key):
        equipment = Equipment.query.filter_by(equip_unique_key=unique_key).first()
        if not equipment:
            abort(409, message="Not Found")
        
        return equipment
    
"""    @marshal_with(equipment_resource_fields)
    def post(self):
        args = post_args_equip.parse_args()
        equipment = Equipment.query.filter_by(equip_unique_key=args['args_unique_key']).first()
        if equipment:
            abort(409, message="Equipment Exists")
        equip_obj = Equipment(equip_type=args['args_equip_type'],
                              equip_unique_key=args['args_unique_key'],
                              is_available=args['args_is_available'],
                              is_pending=args['args_is_pending']
                              )
        
        
        # Add the new equipment object to the session
        db.session.add(equip_obj)

        # Commit the changes to the database
        db.session.commit()
        
        return equip_obj, 201"""
    


post_args_student = reqparse.RequestParser()
post_args_student.add_argument("args_student_number", type=str, required=True, help="student number is required")
post_args_student.add_argument("args_student_department", type=str, required=True, help="student department is required")
post_args_student.add_argument("args_student_year", type=str, required=True, help="student year is required")
post_args_student.add_argument("args_student_section", type=str, required=True, help="student section is required")
post_args_student.add_argument("args_student_email_address", type=str, required=True, help="student email address is required")
post_args_student.add_argument("args_student_firstname", type=str, required=True, help="student firstname is required")
post_args_student.add_argument("args_student_surname", type=str, required=True, help="student surname is required")
post_args_student.add_argument("args_requested_item", type=str, required=True, help="equipment unique key is required")

student_resource_fields = {
    'student_number':  fields.String,
    'student_department': fields.String,
    'student_year': fields.String,
    'student_section':  fields.String,
    'student_email_address': fields.String,
    'student_firstname': fields.String,
    'student_surname': fields.String,
    'requested_item': fields.String
}

class Students(Resource):
    @marshal_with(student_resource_fields)
    def post(self):
        args = post_args_student.parse_args()
        student_obj = Student(
                student_number=args['args_student_number'].strip(),
                student_department=args['args_student_department'].strip(),
                student_year=args['args_student_year'].strip(),
                student_section=args['args_student_section'].strip(),
                student_email_address=args['args_student_email_address'].strip(),
                student_firstname=args['args_student_firstname'].strip(),
                student_surname=args['args_student_surname'].strip(),
                requested_item=args['args_requested_item'].strip()
            )
        equip_obj = Equipment.query.filter_by(equip_unique_key=args['args_requested_item']).first()
        if equip_obj.is_available and not equip_obj.is_pending:
            pending_obj = Pending(
                equip_type=equip_obj.equip_type,
                equip_unique_key=equip_obj.equip_unique_key,
                student_number=student_obj.student_number,
                student_name=f"{student_obj.student_surname}, {student_obj.student_firstname}",
                is_verified=0
            )
            equip_obj.is_pending=1
            equip_obj.is_available=0
            student_obj.status='requested'
            db.session.add(pending_obj)
            db.session.add(student_obj)
            db.session.commit()
            print('Student added Successfully')
            return student_obj, 201
        else:       
            return {"message": "item not available"}, 418
        

class PendingItems(Resource):
    def get(self):
        pending = Pending.query.all()
        pending_id = [p.pending_id for p in pending]
        equip_type = [p.equip_type for p in pending]
        equip_unique_key = [p.equip_unique_key for p in pending]
        student_number = [p.student_number for p in pending]
        student_name = [p.student_name for p in pending]
        is_verified = [p.is_verified for p in pending]

        pending_items = {
            "pending_id": pending_id,
            "equip_type": equip_type,
            "equip_unique_key": equip_unique_key,
            "student_number": student_number,
            "student_name": student_name,
            "is_verified": is_verified
        }

        return pending_items
    
class BorrowedItems(Resource):
    def get(self):
        borrowed = Borrowed.query.all()
        borrow_id = [b.borrow_id for b in borrowed]
        time_quota = [b.time_quota.strftime('%H:%M:%S') if b.time_quota is not None else None for b in borrowed]
        is_claimed = [b.is_claimed for b in borrowed]
        is_returned = [b.is_returned for b in borrowed]
        pending_id = [b.pending_id for b in borrowed]

        borrowed_items = {
            "borrow_id": borrow_id,
            "time_quota": time_quota,
            "is_claimed": is_claimed,
            "is_returned": is_returned,
            "pending_id": pending_id
        }

        return borrowed_items
    

class CompletedItems(Resource):
    def get(self):
        completed = Completed.query.all()
        completed_id = [c.completed_id for c in completed]
        student_number = [c.student_number for c in completed]
        student_department = [c.student_department for c in completed]
        student_name = [c.student_name for c in completed]
        equip_type = [c.equip_type for c in completed]
        equip_unique_key = [c.equip_unique_key for c in completed]

        completed_items = {
            "completed_id": completed_id,
            "student_number": student_number,
            "student_department": student_department,
            "student_name": student_name,
            "equip_type": equip_type,
            "equip_unique_key": equip_unique_key
        }

        return completed_items
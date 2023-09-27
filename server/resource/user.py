from flask_restful import Resource, abort, fields, marshal_with, reqparse
from flask import request, jsonify
from models.database import db, Equipment, Student

equipment_resource_fields = {
    'equip_id' : fields.Integer,
    'equip_type': fields.String,
    'equip_unique_key': fields.String,
    'is_available': fields.Boolean,
    'is_pending': fields.Boolean
}

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

class Equipments(Resource):
    @marshal_with(equipment_resource_fields)
    def get(self, unique_key):
        equipment = Equipment.query.filter_by(equip_unique_key=unique_key).first()
        if not equipment:
            abort(409, message="Not Found")
        
        return equipment
    
    @marshal_with(equipment_resource_fields)
    def post(self, id):
        args = post_args_equip.parse_args()
        equipment = Equipment.query.filter_by(equip_id=id).first()
        if equipment:
            abort(409, message="Equipment Exists")
        equip_obj = Equipment(equip_id=id,
                              equip_type=args['args_equip_type'],
                              equip_unique_key=args['args_equip_unique_key'],
                              is_available=args['args_is_available'],
                              is_pending=args['args_is_pending']
                              )
        
        
        # Add the new equipment object to the session
        db.session.add(equip_obj)

        # Commit the changes to the database
        db.session.commit()
        
        return equip_obj, 201
    



class CheckPersons(Resource):
    def post(self):
        try:
            data = request.get_json()
            email = data.get('email')
            # Check if email exists in the database (simplified example)
            existing_person = Person.query.filter_by(email_address=email).first()
            response_data = {
                'emailExists': existing_person is not None
            }
            print(response_data)
            return jsonify( )

        except Exception as e:
            return jsonify({'error': str(e)}), 500

"""post_args_person = reqparse.RequestParser()
post_args_person.add_argument("args_person_firstname", type=str, required=True, help="firstname is required")
post_args_person.add_argument("args_person_surname", type=str, required=True, help="surname is required")
post_args_person.add_argument("args_phone_number", type=str)
post_args_person.add_argument("args_email_address", type=str, required=True, help="email is required")


person_resource_fields = {
    'person_firstname' : fields.String,
    'person_surname': fields.String,
    'phone_number': fields.String,
    'email_address': fields.String
}

class Persons(Resource):
    @marshal_with(person_resource_fields)
    def post(self):
        try:
            args = post_args_person.parse_args()
            email = args['args_email_address']

            # Log the received data for debugging
            print('Received data:', args)
            
            # Check if a person with the same email_address already exists
            existing_person = Person.query.filter_by(email_address=email).first()
            if existing_person:
                print('Person with the same email_address already exists:', email)
                abort(409, message="Person with the same email_address already exists")

            person_obj = Person(
                person_firstname=args['args_person_firstname'],
                person_surname=args['args_person_surname'],
                phone_number=args['args_phone_number'],
                email_address=args['args_email_address']
            )

            db.session.add(person_obj)
            db.session.commit()
            
            print('Person added successfully:', person_obj)

            return person_obj, 201

        except Exception as e:
            print('Error:', str(e))
            return jsonify({'error': str(e)}), 500"""
        


post_args_student = reqparse.RequestParser()
post_args_student.add_argument("args_student_number", type=str, required=True, help="student number is required")
post_args_student.add_argument("args_student_department", type=str, required=True, help="student department is required")
post_args_student.add_argument("args_student_year", type=str, required=True, help="student year is required")
post_args_student.add_argument("args_student_section", type=str, required=True, help="student section is required")
post_args_student.add_argument("args_student_email_address", type=str, required=True, help="student email address is required")
post_args_student.add_argument("args_student_firstname", type=str, required=True, help="student firstname is required")
post_args_student.add_argument("args_student_surname", type=str, required=True, help="student surname is required")

student_resource_fields = {
    'student_number':  fields.String,
    'student_department': fields.String,
    'student_year': fields.String,
    'student_section':  fields.String,
    'student_email_address': fields.String,
    'student_firstname': fields.String,
    'student_surname': fields.String
}

class Students(Resource):
    @marshal_with(student_resource_fields)
    def post(self):
        args = post_args_student.parse_args()
        student_obj = Student(
            student_number=args['args_student_number'],
                student_department=args['args_student_department'],
                student_year=args['args_student_year'],
                student_section=args['args_student_section'],
                student_email_address=args['args_student_email_address'],
                student_firstname=args['args_student_firstname'],
                student_surname=args['args_student_surname']
            )
        db.session.add(student_obj)
        db.session.commit()
        print('Student added Successfully')
        return student_obj, 201       
        
        

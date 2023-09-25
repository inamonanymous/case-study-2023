from flask_restful import Resource, abort, fields, marshal_with, reqparse
from models.equipment import Equipment, db

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
    def get(self, id):
        equipment = Equipment.query.filter_by(equip_id=id).first()
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
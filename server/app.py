from flask import Flask, render_template, request, session
import os
from flask_migrate import Migrate
from dotenv import load_dotenv
from flask_restful import Api
from resource.user import ShowEquipments, Equipments,  Students, PendingItems, BorrowedItems, CompletedItems, EachStudent
from models.database import db
from flask_cors import CORS
from route.admin import admin_bp 

load_dotenv() 
app = Flask(__name__)
migrate = Migrate(app, db)

CORS(app, resources={r"/user/*": {"origins": ["*"]}})

app.secret_key = os.getenv("SECRET_KEY") 
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')

db.init_app(app)
api = Api(app)

api.add_resource(EachStudent, '/user/student/<string:student_number>')
api.add_resource(Students, '/user/student')
api.add_resource(CompletedItems, '/user/completed-items')
api.add_resource(BorrowedItems, '/user/borrowed-items')
api.add_resource(PendingItems, '/user/pending-items')
api.add_resource(ShowEquipments, '/user/equipments/all')
api.add_resource(Equipments, '/user/equipments/<string:unique_key>')

app.register_blueprint(admin_bp)

@app.route('/', methods=['POST', 'GET'])
def index():
    session.clear()
    return render_template('index.html')

@app.route('/user/person/trial', methods=['POST'])
def trial():
    data = request.get_json()
    print(data)
    
    return data

if __name__ == "__main__":
    app.run(host="0.0.0.0",port="5000",debug=True)

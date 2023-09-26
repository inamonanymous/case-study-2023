from flask import Flask, render_template, request
import os
from dotenv import load_dotenv
from flask_restful import Api
from resource.user import ShowEquipments, Equipments, Persons, CheckPersons
from models.database import db
from flask_cors import CORS


load_dotenv() 
app = Flask(__name__)

CORS(app, resources={r"/user/*": {"origins": "http://localhost:3000"}})
app.secret_key = os.getenv("SECRET_KEY") 
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')

db.init_app(app)
api = Api(app)

api.add_resource(CheckPersons, '/user/check-person')
api.add_resource(ShowEquipments, '/user/equipments/all')
api.add_resource(Equipments, '/user/equipments/<int:id>')
api.add_resource(Persons, '/user/person')

@app.route('/', methods=['POST', 'GET'])
def index():
    return render_template('index.html')

@app.route('/user/person/trial', methods=['POST'])
def trial():
    data = request.get_json()
    print(data)
    return data

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        
    app.run(host="0.0.0.0",port="5000",debug=True)

from flask import Flask, render_template
import os
from models.equipment import db
from dotenv import load_dotenv
from flask_restful import Api
from resource.user import ShowEquipments, Equipments

load_dotenv() 
app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY") 
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URI")

db.init_app(app) 
api = Api(app)

api.add_resource(ShowEquipments, '/user/equipments/all')
api.add_resource(Equipments, '/user/equipments/<int:id>')

@app.route('/', methods=['POST', 'GET'])
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0",port="5000",debug=True)

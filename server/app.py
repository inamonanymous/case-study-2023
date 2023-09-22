from flask import Flask, render_template
import os
from routes.user import user_bp
from models.person import db
from dotenv import load_dotenv


app = Flask(__name__)
load_dotenv()
app.secret_key = os.getenv("SECRET_KEY")
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URI")
db.init_app(app)

with app.app_context():
    db.create_all()

app.register_blueprint(user_bp)

@app.route('/', methods=['POST', 'GET'])
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0",port="5000",debug=True)

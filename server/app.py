from flask import Flask, render_template
from routes.user import user_bp

app = Flask(__name__)
app.register_blueprint(user_bp)

app.route('/', methods=['POST', 'GET'])
def index():
    return render_template('index.html')


if __name__ == "__main__":
    app.run(debug=True)
from flask import Blueprint, render_template, request, url_for, session, flash, redirect
from models.database import Admin
from werkzeug.security import check_password_hash, generate_password_hash

admin_bp = Blueprint('admin', __name__)
###################################################################
@admin_bp.route('/logged-in', methods=['POST', 'GET'])
def logged_in():
    username, password = request.form.get('input_username'), request.form.get('input_password')
    if Admin.check_login(username, password):
        return "dashboard"
    print(username)
    a = generate_password_hash(password)
    print(check_password_hash(a, password))
    admin_obj = Admin.query.filter_by(admin_username=username).first()
    print(admin_obj.admin_password)
    print(check_password_hash(admin_obj.admin_password, a))
    return "wrong username or password"
###################################################################
@admin_bp.route('/signed-up', methods=["POST", "GET"])
def sign_up():
    admin_email_address, admin_firstname, admin_surname, admin_username, admin_password, admin_password2 = request.form.get('admin_email_address'), request.form.get('admin_firstname'), request.form.get('admin_surname'), request.form.get('admin_username'), request.form.get('admin_password'), request.form.get('admin_password2'),
    if admin_password == admin_password2 and request.method=='POST':
        admin_obj = Admin(
            admin_username=admin_username,
            admin_password=admin_password,
            admin_email_address=admin_email_address,
            admin_firstname=admin_firstname,
            admin_surname=admin_surname
        )
        
        return redirect(url_for('index'))
    return "none"

@admin_bp.route('/sign-up-page')
def sign_up_page():
    return render_template('sign-up.html')
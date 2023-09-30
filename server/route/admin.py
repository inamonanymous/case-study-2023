from flask import Blueprint, render_template, request, url_for, session, flash, redirect
from models.database import Admin, Pending, Student, Borrowed, Equipment, db 
from werkzeug.security import check_password_hash, generate_password_hash
from resource.user import PendingItems
import datetime

admin_bp = Blueprint('admin', __name__)

advance_datetime = datetime.datetime.now() + datetime.timedelta(hours=5)

@admin_bp.route('/verify/<string:unique>')
def verify_item(unique):
    pending_obj = Pending.query.filter_by(equip_unique_key=unique).first()
    student_obj = Student.query.filter_by(requested_item=unique).first()
    if not pending_obj.is_verified:
        pending_obj.is_verified=1
        student_obj.status = 'to-receive'
        borrowed_obj = Borrowed(
            time_quota=advance_datetime,
            is_returned=0,
            pending_id=pending_obj.pending_id
        )
        db.session.add(borrowed_obj)
        db.session.commit()
        return f"{borrowed_obj.time_quota}"
    
    return f"{pending_obj}"

@admin_bp.route('/dashboard', methods=['POST', 'GET'])
def dashboard():
    if 'admin_login' in session:
        p_items = PendingItems()
        pending = p_items.get()
        return render_template('dashboard.html', pending=pending)
    return redirect(url_for('index'))

@admin_bp.route('/logged-in', methods=['POST', 'GET'])
def logged_in():
    username, password = request.form.get('input_username').strip(), request.form.get('input_password').strip()
    if Admin.check_login(username, password):
        session['admin_login'] = username
        
        return redirect(url_for('admin.dashboard'))
    
    return "wrong username or password"

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
        admin_obj.save()
        return redirect(url_for('index'))
    return "none"

@admin_bp.route('/sign-up-page')
def sign_up_page():
    return render_template('sign-up.html')
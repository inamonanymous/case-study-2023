from flask import Blueprint, render_template, request, url_for, session, flash, redirect
from models.database import Admin, Pending, Student, Borrowed, Equipment, db , Completed
from werkzeug.security import check_password_hash, generate_password_hash
from resource.user import PendingItems, BorrowedItems, CompletedItems
import datetime

admin_bp = Blueprint('admin', __name__)

advance_datetime = datetime.datetime.now() + datetime.timedelta(hours=5)

@admin_bp.route('/option/<option>')
def load_option(option):
    if 'admin_login' in session:
        
    
        b_items = BorrowedItems()
        p_items = PendingItems()
        c_items = CompletedItems()
        
        pending = p_items.get()
        borrowed = b_items.get()
        completed = c_items.get()



        content = render_template(f'{option}.html',
                                   
                                   borrowed=borrowed, 
                                   pending=pending, 
                                   completed=completed)
        return content
    return redirect('index')

@admin_bp.route('/completed-items', methods=['GET'])
def completed_items():
    if 'admin_login' in session:
        c_items = CompletedItems()
        completed_items = c_items.get()
        return render_template('completed-items.html', completed=completed_items)
    return redirect(url_for('index'))

@admin_bp.route('/return/<int:id>')
def return_item(id):
    if 'admin_login' in session:
        borrowed_obj = Borrowed.query.filter_by(pending_id=id).first()
        pending_obj = Pending.query.filter_by(pending_id=id).first()
        student_obj = Student.query.filter_by(requested_item=pending_obj.equip_unique_key).first()
        equip_obj = Equipment.query.filter_by(equip_unique_key=pending_obj.equip_unique_key).first()
        if borrowed_obj.is_claimed and not borrowed_obj.is_returned:
            borrowed_obj.is_claimed = False
            borrowed_obj.is_returned = True
            student_obj.status = 'returned'
            completed_obj = Completed(
                student_number = student_obj.student_number,
                student_department = student_obj.student_department,
                student_name = f"{student_obj.student_surname}, {student_obj.student_firstname}",
                equip_type = pending_obj.equip_type,
                equip_unique_key = pending_obj.equip_unique_key
            )
            equip_obj.is_available = True
            equip_obj.is_pending = False
            db.session.add(completed_obj)
            db.session.delete(student_obj)
            db.session.delete(pending_obj)
            db.session.delete(borrowed_obj)
            db.session.commit()
            return redirect(url_for('admin.borrowed_items'))
        return f"It is either the Item isn't Claimed or Returned"
    return redirect(url_for('index'))

@admin_bp.route('/claim/<int:id>')
def claim_item(id):
    if 'admin_login' in session:
        borrowed_obj = Borrowed.query.filter_by(pending_id=id).first()
        pending_obj = Pending.query.filter_by(pending_id=id).first()
        student_obj = Student.query.filter_by(requested_item=pending_obj.equip_unique_key).first()
        if not borrowed_obj.is_claimed and not borrowed_obj.is_returned:
            borrowed_obj.is_claimed = True
            borrowed_obj.time_quota = advance_datetime
            student_obj.status = 'claimed'
            db.session.commit()
            return redirect(url_for('admin.borrowed_items'))
        return f"It is either the Item isn't Claimed or Returned"
    return redirect(url_for('index'))

@admin_bp.route('/borrowed-items', methods=['POST', 'GET'])
def borrowed_items():
    if 'admin_login' in session:
        b_items = BorrowedItems()
        borrowed = b_items.get()
        return render_template('borrowed-items.html', borrowed=borrowed)
    return redirect(url_for('index'))

#verify requested item and pass it to borrowed items
@admin_bp.route('/verify/<string:unique>')
def verify_item(unique):
    if 'admin_login' in session:
        pending_obj = Pending.query.filter_by(equip_unique_key=unique).first()
        student_obj = Student.query.filter_by(requested_item=unique).first()
        if not pending_obj.is_verified:
            pending_obj.is_verified=1
            student_obj.status = 'to-receive'
            borrowed_obj = Borrowed(
                time_quota=None,
                is_returned=0,
                pending_id=pending_obj.pending_id
            )
            db.session.add(borrowed_obj)
            db.session.commit()
            return redirect(request.url)
        
        return f"Student already Verified"
    return redirect(url_for('index'))

#render the pending items student requested
@admin_bp.route('/pending-items', methods=['POST', 'GET'])
def pending_items():
    if 'admin_login' in session:
        p_items = PendingItems()
        pending = p_items.get()
        return render_template('pending-items.html', pending=pending)
    return redirect(url_for('index'))

#dashboard route
@admin_bp.route('/dashboard', methods=['POST', 'GET'])
def dashboard():
    if 'admin_login' in session:
        unverified = Pending.query.filter_by(is_verified=False).count()
        current_user = Admin.query.filter_by(admin_username=session.get('admin_login', "")).first()
        return render_template('dashboard.html', unverified=unverified, current_user=current_user)
    return redirect(url_for('index'))

#check if log in is true
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
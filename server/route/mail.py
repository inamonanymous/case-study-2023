import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

root_email = 'aguilarstephen00752@gmail.com'
email_password = 'yjrhkzsscvzymfbz'
def establish_smtp_connection():
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(root_email, email_password)
    return server


def sendMessage(student, equip_type):
    server = establish_smtp_connection()

    message = MIMEMultipart()
    message["From"] = root_email
    message["To"] = student.student_email_address
    message["Subject"] = 'Equipment Request Update - Action Required ' + student.student_number
    body_message = f"""
                        Dear {student.student_surname}, {student.student_firstname}, {student.student_year}-Year from {student.student_department}-Department

I hope this message finds you well. I am writing to update you on the status of your recent equipment request.

We are pleased to inform you that your request for "{str(equip_type).capitalize()}: {student.requested_item}", has been thoroughly reviewed and verified by our administration team. You can now proceed to the next step in the process.

To claim your requested item, please visit the school gym office at your earliest convenience. Our staff will be ready to assist you and ensure that you receive the equipment you need.

Please bring a valid form of identification and your request confirmation details for a smooth and quick service.

We appreciate your patience and understanding throughout this process. If you have any questions or need further assistance, feel free to contact us at "ralphanor@gmail.com".

Thank you for choosing our facilities for your equipment needs. We look forward to seeing you at the gym office soon.

Warm regards,

Mr. Ralph Anor
School Gym Organizer
Saint Vincent College of Cabuyao
ralphanor@gmail.com
                    """
    message.attach(MIMEText(body_message, "plain"))

    server.send_message(message)
    server.quit()

import smtplib
from email.message import EmailMessage

password = open('password.txt','r').readline().strip()
file = open('gifts.csv','r')
lines = file.readlines()

server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
print('Athenticating...')
server.login('stuartmoore033@gmail.com','znak dven jtzi ceem')

for _ in range(100):
    for line in lines: 
        line = line.strip()
        name, gift, email = line.split(',')

        subject = 'Thank You for the Gift'
        message = 'Dear ' + name + ', Thank you for the ' + gift + ', it was very thoughtful of you. Happy New Year! From, Colin'

        print(message)

        msg = EmailMessage()
        msg.set_content(message)
        msg['Subect'] = subject
        msg['From'] = 'stuartmoore033@gmail.com'
        msg['To'] = email
            
        print('Sending...')
        server.send_message(msg)
        print('Mesage sent!')

    server.quit()
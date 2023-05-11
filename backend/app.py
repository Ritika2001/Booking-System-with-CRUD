import mysql.connector
from flask import Flask, render_template, request
import requests
import json
from flask_cors import CORS
from cryptography.fernet import Fernet
 
key = open("secret.key", "rb").read() 
fernet = Fernet(key)


app = Flask(__name__)
CORS(app)

connectionString = "user = 'root', password = '123', host='127.0.0.1', port = 3306, database = 'VOA',  connect_timeout=1000"
print("Connected to db")

# Define the root route

@app.route('/deleteShow', methods=['GET'])
def deleteShow():   
    connection = mysql.connector.connect(user = 'root', password = '123', host='127.0.0.1', port = 3306, database = 'VOA',  connect_timeout=1000)
    cursor = connection.cursor(dictionary=True)
    id = request.args.get('id')   
    query = f"DELETE FROM smk_shows WHERE show_id={id};"
    print(query)
    cursor.execute(query)
    connection.commit()
    cursor.close() 
    connection.close()  
    return json.dumps('OK')

@app.route('/getShowsAdmin', methods=['GET'])
def getShowsAdmin():   
    connection = mysql.connector.connect(user = 'root', password = '123', host='127.0.0.1', port = 3306, database = 'VOA',  connect_timeout=1000)
    cursor = connection.cursor(dictionary=True)
    query = "select * from smk_shows, smk_show_types WHERE smk_shows.show_type_id = smk_show_types.show_type_id order by show_id;"
    cursor.execute(query)
    data = cursor.fetchall()
    cursor.close() 
    connection.close()  
    return json.dumps(data, default = str)

@app.route('/getStores', methods=['GET'])
def getStores():   
    connection = mysql.connector.connect(user = 'root', password = '123', host='127.0.0.1', port = 3306, database = 'VOA',  connect_timeout=1000)
    cursor = connection.cursor(dictionary=True)
    query = "SELECT store_id, store_name FROM smk_store;"
    cursor.execute(query)
    data = cursor.fetchall()
    cursor.close() 
    connection.close()  
    return json.dumps(data)

@app.route('/getShowTypes', methods=['GET'])
def getShowTypes():   
    connection = mysql.connector.connect(user = 'root', password = '123', host='127.0.0.1', port = 3306, database = 'VOA',  connect_timeout=1000)
    cursor = connection.cursor(dictionary=True)
    query = "SELECT show_type_id, show_type_name FROM smk_show_types;"
    cursor.execute(query)
    data = cursor.fetchall()
    cursor.close() 
    connection.close()  
    return json.dumps(data)
    
@app.route('/getStoresItems', methods=['GET'])
def getStoresItems():   
    connection = mysql.connector.connect(user = 'root', password = '123', host='127.0.0.1', port = 3306, database = 'VOA',  connect_timeout=1000)
    cursor = connection.cursor(dictionary=True)
    store = request.args.get('store')   
    query = f"SELECT menu_item_id, menu_item_name, menu_item_unitprice FROM smk_menu_items WHERE store_id = {store};"
    cursor.execute(query)
    data = cursor.fetchall()
    cursor.close() 
    connection.close()  
    return json.dumps(data)
    
@app.route('/getShows', methods=['GET'])
def getShows():   
    connection = mysql.connector.connect(user = 'root', password = '123', host='127.0.0.1', port = 3306, database = 'VOA',  connect_timeout=1000)
    cursor = connection.cursor(dictionary=True)
    query = "SELECT show_name, start_time, end_time, wc_accessible, show_price FROM smk_shows;"
    cursor.execute(query)
    data = cursor.fetchall()
    cursor.close() 
    connection.close()  
    return json.dumps(data, default = str)


@app.route('/insert_visitors', methods=['POST'])
def insert_visitors():
    try:
        connection = mysql.connector.connect(user = 'root', password = '123', host='127.0.0.1', port = 3306, database = 'VOA',  connect_timeout=1000)
        cursor = connection.cursor()

        fname = request.json['firstName']
        lname = request.json['lastName']
        pswd = request.json['password']
        encPassword = fernet.encrypt(pswd.encode()).decode('utf-8')
        street = request.json['street']
        city = request.json['city']
        state = request.json['state']
        country = request.json['country']
        zipcode = request.json['zipcode']
        email = request.json['email']
        ph_no = request.json['phone']
        dob = request.json['dob']
        member_status = request.json['member']
        if member_status:
            member_status = 'Y'
        else:
            member_status = 'N'

        query = f"insert into smk_user(firstName, lastName, password, street, city, state, country, zipcode, email, phone, dob, member) values('{fname}', '{lname}', '{encPassword}', '{street}', '{city}', '{state}', '{country}', {zipcode}, '{email}', {ph_no}, '{dob}', '{member_status}');"
        print(query)
        cursor.execute(query)
        connection.commit()

        return json.dumps('OK')
    except Exception as e:
        print(e)
    finally:
        cursor.close() 
        connection.close()  
    return json.dumps('None')


@app.route('/login', methods =['GET', 'POST'])
def login():
    try:
        if request.method == 'POST' and 'email' in request.json and 'password' in request.json:
            email = request.json['email']
            password = request.json['password']
            connection = mysql.connector.connect(user = 'root', password = '123', host='127.0.0.1', port = 3306, database = 'VOA',  connect_timeout=1000)
            cursor = connection.cursor(dictionary=True)
            query = f"SELECT * FROM smk_user WHERE email = '{email}';"
            print(query)
            cursor.execute(query)
            account = cursor.fetchone()
            decMessage = fernet.decrypt(account['password']).decode()            
            if account:
                if decMessage == password:
                    response = json.dumps(account, default = str)
            else:
                response = 'Incorrect username / password !'
            return response
    except Exception as e:
        print("in except")
        print(e)
    finally:
        cursor.close() 
        connection.close()  
    return json.dumps('None')

@app.route('/adminlogin', methods =['GET', 'POST'])
def adminlogin():
    try:
        if request.method == 'POST' and 'email' in request.json and 'password' in request.json:
            email = request.json['email']
            password = request.json['password']
            connection = mysql.connector.connect(user = 'root', password = '123', host='127.0.0.1', port = 3306, database = 'VOA',  connect_timeout=1000)
            cursor = connection.cursor(dictionary=True)
            query = f"SELECT * FROM smk_employee WHERE email = '{email}';"
            print(query)
            cursor.execute(query)
            account = cursor.fetchone()
            decMessage = fernet.decrypt(account['password']).decode() 
            if account:
                if decMessage == password:
                    response = json.dumps(account, default = str)
            else:
                response = 'Incorrect username / password !'
            return response
    except Exception as e:
        print("in except")
        print(e)
    finally:
        cursor.close() 
        connection.close()  
    return json.dumps('None')


@app.route('/insert_show', methods =['POST'])
def insert_show():
    try:
        connection = mysql.connector.connect(user = 'root', password = '123', host='127.0.0.1', port = 3306, database = 'VOA',  connect_timeout=1000)
        cursor = connection.cursor()
        cursor.execute('SELECT max(show_id) FROM smk_shows;')
        id = cursor.fetchall()[0][0] + 1
        show_name = request.json['show_name']
        show_desc = request.json['show_desc']
        start_time = request.json['start_time']
        end_time = request.json['end_time']
        wc_accesible = request.json['wc_accesible']
        show_price = request.json['show_price']
        show_type_id = request.json['show_type_id']
       
        query = f"insert into smk_shows (show_id, show_name, show_desc, start_time, end_time, wc_accessible, show_price, show_type_id) values('{id}', '{show_name}', '{show_desc}', '{start_time}', '{end_time}', '{wc_accesible}', {show_price}, {show_type_id});"
        print(query)
        cursor.execute(query)
        connection.commit()

        return json.dumps('OK')
    except Exception as e:
        print(e)
    finally:
        cursor.close() 
        connection.close()  
    return json.dumps('None')


@app.route('/insert_multiple_visitors', methods=['POST'])
def insert_multiple_visitors():
        
        try:
            connection = mysql.connector.connect(user = 'root', password = '123', host='127.0.0.1', port = 3306, database = 'VOA',  connect_timeout=1000)
            cursor = connection.cursor()
            user_id = int(request.json['visitor'][0]['user_id'])
            for row in request.json['visitor']:
                print(row)
                firstName = row['fName']
                lastName = row['lName']
                dob = row['dob']
                member = row['member']
                query = f"insert into smk_visitor (firstName, lastName, dob, member, user_id) values ('{firstName}', '{lastName}', '{dob}', '{member}', {user_id});"
                print(query)
            
                cursor.execute(query)
                connection.commit()

            return json.dumps('OK')
        except Exception as e:
            print(e)
        finally:
            cursor.close() 
            connection.close()  
        return json.dumps('None')
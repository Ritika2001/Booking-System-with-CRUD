import mysql.connector
from flask import Flask, render_template, request
import requests
import json
from flask_cors import CORS
from cryptography.fernet import Fernet
from datetime import datetime
import string
from random import choice

from datetime import time

def float_to_time_string(f):
    hours, minutes = divmod(int(f * 60), 60)
    t = time(hour=hours, minute=minutes)
    time_string = t.strftime("%H:%M:%S")
    return time_string

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

@app.route('/deleteRide', methods=['GET'])
def deleteRide():   
    connection = mysql.connector.connect(user = 'root', password = '123', host='127.0.0.1', port = 3306, database = 'VOA',  connect_timeout=1000)
    cursor = connection.cursor(dictionary=True)
    id = request.args.get('id')   
    query = f"DELETE FROM smk_attractions WHERE attraction_id={id};"
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

@app.route('/getRidesAdmin', methods=['GET'])
def getRidesAdmin():   
    connection = mysql.connector.connect(user = 'root', password = '123', host='127.0.0.1', port = 3306, database = 'VOA',  connect_timeout=1000)
    cursor = connection.cursor(dictionary=True)
    query = "SELECT * FROM smk_attractions, smk_att_loc, smk_attr_status, smk_attraction_type where smk_attractions.attr_loc_id = smk_att_loc.attr_loc_id and smk_attractions.attr_status_id = smk_attr_status.attr_status_id and smk_attractions.attr_type_id = smk_attraction_type.attr_type_id order by attraction_id;"
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

@app.route('/getAttractionLocations', methods=['GET'])
def getAttractionLocations():   
    connection = mysql.connector.connect(user = 'root', password = '123', host='127.0.0.1', port = 3306, database = 'VOA',  connect_timeout=1000)
    cursor = connection.cursor(dictionary=True)
    query = "SELECT * FROM smk_att_loc;"
    cursor.execute(query)
    data = cursor.fetchall()
    cursor.close() 
    connection.close()  
    return json.dumps(data)

@app.route('/getAttractionType', methods=['GET'])
def getAttractionType():   
    connection = mysql.connector.connect(user = 'root', password = '123', host='127.0.0.1', port = 3306, database = 'VOA',  connect_timeout=1000)
    cursor = connection.cursor(dictionary=True)
    query = "SELECT * FROM smk_attraction_type;"
    cursor.execute(query)
    data = cursor.fetchall()
    cursor.close() 
    connection.close()  
    return json.dumps(data)

@app.route('/getAttractionStatus', methods=['GET'])
def getAttractionStatus():   
    connection = mysql.connector.connect(user = 'root', password = '123', host='127.0.0.1', port = 3306, database = 'VOA',  connect_timeout=1000)
    cursor = connection.cursor(dictionary=True)
    query = "SELECT * FROM smk_attr_status;"
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
    query = "SELECT show_id, show_name, start_time, end_time, wc_accessible, show_price FROM smk_shows;"
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
    return

@app.route('/adminlogin', methods =['GET', 'POST'])
def adminlogin():
    try:
        if request.method == 'POST' and 'email' in request.json and 'password' in request.json:
            email = request.json['email']
            password = request.json['password']
            connection = mysql.connector.connect(user = 'root', password = '123', host='127.0.0.1', port = 3306, database = 'VOA',  connect_timeout=1000)
            cursor = connection.cursor(dictionary=True)
            query = f"SELECT * FROM smk_employee WHERE email = '{email}' and password = '{password}';"
            print(query)
            cursor.execute(query)
            account = cursor.fetchone()
            # decMessage = fernet.decrypt(account['password']).decode() 
            # decMessage = account['password']

            if account:
                # if decMessage == password:
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
    return 


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

@app.route('/insert_attractions', methods =['POST'])
def insert_attractions():
    try:
        connection = mysql.connector.connect(user = 'root', password = '123', host='127.0.0.1', port = 3306, database = 'VOA',  connect_timeout=1000)
        cursor = connection.cursor()
        attr_name = request.json['attr_name']
        attr_desc = request.json['attr_desc']
        capacity = request.json['capacity']
        min_height = request.json['min_height']
        duration = request.json['duration']
        attr_loc_id = request.json['attr_loc_id']
        attr_type_id = request.json['attr_type_id']
        attr_status_id = request.json['attr_status_id']
       
        query = f"insert into smk_attractions (attr_name, attr_desc, capacity, min_height, duration, attr_loc_id, attr_type_id, attr_status_id) values('{attr_name}', '{attr_desc}', {capacity}, {min_height}, {duration}, {attr_loc_id}, {attr_type_id}, {attr_status_id});"
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


@app.route('/insert_card_details', methods=['POST'])
def insert_card_details():
    try:
        connection = mysql.connector.connect(user = 'root', password = '123', host='127.0.0.1', port = 3306, database = 'VOA',  connect_timeout=1000)
        cursor = connection.cursor()    
        card_type = request.json['cardType']
        card_name = request.json['nameOnCard'] #   VARCHAR(30) NOT NULL COMMENT 'Name on the card',
        card_number = request.json['cardNumber'] # DECIMAL(20) NOT NULL COMMENT 'Card Number',
        card_expiry_month = request.json['cardExpiryMonth']   # INT NOT NULL COMMENT 'Card expiry month',
        card_expiry_year = request.json['cardExpiryYear'] # INT NOT NULL COMMENT 'Card expiry year',
        card_cvv = request.json['cardCVV']    #INT NOT NULL COMMENT 'CVV on the card',
        user_id = request.json['user_id']
        payment_amount = request.json['payment_amount']
        payment_date = datetime.today().strftime('%Y-%m-%d')
        payment_method = request.json['cardType']

        query_card = f"INSERT INTO smk_card_details (card_type, card_name, card_number, card_expiry_month, card_expiry_year, card_cvv, user_id) VALUES ('{card_type}', '{card_name}', {card_number}, {card_expiry_month}, {card_expiry_year}, {card_cvv}, {user_id});"
        print(query_card)
        cursor.execute(query_card)
        connection.commit()

        query_card_id = f"SELECT card_id FROM smk_card_details WHERE user_id={user_id};"
        cursor.execute(query_card_id)
        id = cursor.fetchone()[0]

        query_payment = f"INSERT INTO smk_payments (payment_method, payment_date, payment_amount, card_id, user_id) VALUES ('{payment_method}', '{payment_date}', {payment_amount}, {id}, {user_id})"
        print(query_payment)
        cursor.execute(query_payment)
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
            cursor = connection.cursor(dictionary=True)            
            user_id = int(request.json['visitor'][0]['user_id'])
            chars = string.digits
            random =  ''.join(choice(chars) for _ in range(4))

            visit_date = request.json['visit_date']
            for row in request.json['visitor']:
                print(row)
                firstName = row['fName']
                lastName = row['lName']
                dob = row['dob']
                member = row['member']
                query = f"insert into smk_visitor (firstName, lastName, dob, member, user_id, group_id) values ('{firstName}', '{lastName}', '{dob}', '{member}', {user_id}, {random});"
                print(query)            
                cursor.execute(query)
                connection.commit()

            query_group = f"select visitor_id, dob, member from smk_visitor where group_id = {random};"
            print(query_group)     
            cursor.execute(query_group)
            data = cursor.fetchall()

            query_group = f"select payment_id from smk_payments where user_id = {user_id} and payment_date = '{datetime.today().strftime('%Y-%m-%d')}';"
            print(query_group)     
            cursor.execute(query_group)
            payment_id = cursor.fetchone()['payment_id']

            print(data, payment_id)
            for row in data: 
                discount = 0.05
                tkt_type = 'Adult'
                tkt_purchase_date = datetime.today().strftime('%Y-%m-%d')
                tkt_price = 200     #   DOUBLE NOT NULL COMMENT 'Price of ticket',
                visitor_id = row['visitor_id']    #  INT,                
                member = row['member']
                dob = row['dob']
                age = datetime.today().year - dob.year - ((datetime.today().month, datetime.today().day) < (dob.month, dob.day))
                if age < 7:
                    discount += 1.15
                    tkt_type = 'Child'
                elif age > 60:
                    discount += 1.15
                    tkt_type = 'Senior'
                if member == 'Y':
                    discount += 0.1
                tkt_discount = tkt_price * 200
                tkt_final_price = tkt_price - tkt_discount
                query_ticket = f"insert into smk_ticket (tkt_method, tkt_purchase_date, tkt_visit_date, tkt_price, tkt_discount, tkt_final_price, tkt_type, visitor_id, user_id, group_id, payment_id) VALUES ('Online', '{tkt_purchase_date}', '{visit_date}', {tkt_price}, {tkt_discount}, {tkt_final_price}, '{tkt_type}', {visitor_id}, {user_id}, {random}, {payment_id});"
                print(query_ticket)            
                cursor.execute(query_ticket)
                connection.commit()        
            return json.dumps(random)
        except Exception as e:
            print(e)
        finally:
            cursor.close() 
            connection.close()  
        return json.dumps('None')


@app.route('/insert_parking', methods=['POST'])
def insert_parking():        
        try:
            connection = mysql.connector.connect(user = 'root', password = '123', host='127.0.0.1', port = 3306, database = 'VOA',  connect_timeout=1000)
            cursor = connection.cursor(dictionary=True)            
            user_id = int(request.json['user_id'])
            visit_date = request.json['visit_date']
            group_id = request.json['group_id']

            query_payment = f"SELECT DISTINCT(payment_id) FROM smk_ticket WHERE group_id = {group_id};"
            cursor.execute(query_payment)
            data = cursor.fetchone()
            payment_id = data['payment_id']

            for row in request.json['parking']:
                print(row)
                parkingPrice = abs(float(row['outTime']) - float(row['inTime']) * 8)
                inTime = float_to_time_string(float(row['inTime']))
                outTime = float_to_time_string(float(row['outTime']))
                
                query = f"insert into smk_parking (parking_date, park_in_time, park_out_time, parking_fee, user_id, group_id, payment_id) values ('{visit_date}', '{inTime}', '{outTime}', {parkingPrice}, {user_id}, {group_id}, {payment_id});"
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

@app.route('/insert_shows', methods=['POST'])
def insert_shows():        
        try:
            connection = mysql.connector.connect(user = 'root', password = '123', host='127.0.0.1', port = 3306, database = 'VOA',  connect_timeout=1000)
            cursor = connection.cursor(dictionary=True)            
            user_id = int(request.json['user_id'])
            visit_date = request.json['visit_date']
            group_id = int(request.json['group_id'])

            query_payment = f"SELECT DISTINCT(payment_id) FROM smk_ticket WHERE group_id = {group_id};"
            cursor.execute(query_payment)
            data = cursor.fetchone()
            payment_id = data['payment_id']

            for row in request.json['show']:
                print(row)
                show_name = row['shows']
                show_query = f"SELECT show_id from smk_shows where show_name = '{show_name}'"
                cursor.execute(show_query)
                show_id = cursor.fetchone()['show_id']
                showPrice = row['showPrice']
                showQuantity = row['showQuantity']
                
                query = f"insert into smk_show_order (quantity, total_price, show_id, user_id, group_id, payment_id, show_date) values ('{showQuantity}', '{showPrice}', '{show_id}', {user_id}, {group_id}, {payment_id}, '{visit_date}');"
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

@app.route('/insert_stores', methods=['POST'])
def insert_stores():        
        try:
            connection = mysql.connector.connect(user = 'root', password = '123', host='127.0.0.1', port = 3306, database = 'VOA',  connect_timeout=1000)
            cursor = connection.cursor(dictionary=True)            
            user_id = int(request.json['user_id'])
            visit_date = request.json['visit_date']
            group_id = int(request.json['group_id'])

            query_payment = f"SELECT DISTINCT(payment_id) FROM smk_ticket WHERE group_id = {group_id};"
            cursor.execute(query_payment)
            data = cursor.fetchone()
            payment_id = data['payment_id']

            for row in request.json['stores']:
                print(row)
                store_id = row['store']
                menu_item_id = row['item']
                quantity = row['storeQuantity']
                total_price = row['storePrice']
                
                query = f"insert into smk_store_order (store_id, menu_item_id, quantity, total_price, user_id, group_id, payment_id, order_date) values ({store_id}, {menu_item_id}, {quantity}, {total_price}, {user_id}, {group_id}, {payment_id}, '{visit_date}');"
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


    
@app.route('/fetchOrderDetails', methods=['GET'])
def fetchOrderDetails():   
    connection = mysql.connector.connect(user = 'root', password = '123', host='127.0.0.1', port = 3306, database = 'VOA',  connect_timeout=1000)
    cursor = connection.cursor(dictionary=True)
    user_id = request.args.get('user_id')  
    query = f"SELECT DISTINCT(group_id) FROM smk_ticket WHERE user_id = {user_id};"
    cursor.execute(query)
    data = cursor.fetchone()
    group_id = data['group_id']
    total = 0.0
    subtotal = 0.0
    try:
        query = f"SELECT firstName, lastName, tkt_id, tkt_visit_date, tkt_final_price FROM smk_ticket, smk_visitor WHERE smk_ticket.visitor_id = smk_visitor.visitor_id AND smk_ticket.group_id = {group_id};"
        print(query)
        cursor.execute(query)
        ticket = cursor.fetchall()
        data['ticket'] = ticket
        total += sum(item['tkt_final_price'] for item in ticket)
        subtotal += 200 * len(ticket)
    except:
        data['ticket'] = []

    try:
        query = f"SELECT parking_date, park_in_time, park_out_time, abs(parking_fee) as parking_fee from smk_parking where group_id = {group_id};"
        print(query)
        cursor.execute(query)
        parking = cursor.fetchall()
        print('fetched')
        data['parking'] = parking
        total += float(sum(item['parking_fee'] for item in parking))
        print(total)
        subtotal += total
        print(subtotal)
    except:
        data['parking'] = []

    try:
        query = f"SELECT show_name, start_time, end_time, wc_accessible, show_date, quantity, total_price from smk_show_order, smk_shows WHERE smk_show_order.show_id = smk_shows.show_id AND smk_show_order.group_id = {group_id};"
        print(query)
        cursor.execute(query)
        show = cursor.fetchall()
        data['show'] = show
        total += sum(item['total_price'] for item in show)
        subtotal += total
    except:
        data['show'] = show

    try:
        query = f"SELECT store_name, menu_item_name, total_price, order_date, quantity FROM smk_store_order, smk_store, smk_menu_items WHERE group_id = {group_id} AND smk_store_order.store_id = smk_store.store_id AND smk_store_order.menu_item_id = smk_menu_items.menu_item_id;"
        print(query)
        cursor.execute(query)
        store = cursor.fetchall()
        data['store'] = store
        total += sum(item['total_price'] for item in store)
        subtotal += total
    except:
        data['store'] = store
    discount = subtotal - total
    data['total'] = total
    data['subtotal'] = subtotal
    data['discount'] = discount
    cursor.close() 
    connection.close()  
    return json.dumps(data, default=str)



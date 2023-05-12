CREATE TABLE smk_store_category (
    store_cat_id   INT NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'Primary ID for store category',
    store_category VARCHAR(30) NOT NULL COMMENT 'Name of the store category, can be Apparels, food stall. icecream parlor, restaurant, or gift shop'
);


CREATE TABLE smk_store (
    store_id     INT NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'Primary ID for store',
    store_name   VARCHAR(50) NOT NULL COMMENT 'Name of the store',
    store_cat_id BIGINT NOT NULL,
    FOREIGN KEY (store_cat_id) REFERENCES smk_store_category(store_cat_id)
);

CREATE TABLE smk_menu_items (
    menu_item_id        INT NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'Primary ID for Menu items',
    menu_item_name      VARCHAR(50) NOT NULL COMMENT 'Name of the item in menu',
    menu_item_unitprice DOUBLE NOT NULL COMMENT 'Unit price of item in menu',
    menu_item_desc      VARCHAR(100) NOT NULL COMMENT 'Description of item in menu',
    store_id            BIGINT NOT NULL,
    FOREIGN KEY (store_id) REFERENCES smk_store(store_id)
);


CREATE TABLE smk_show_types (
    show_type_id   INT NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'Primary ID for show type',
    show_type_name VARCHAR(30) NOT NULL COMMENT 'Name of the show type, can be adventure, drama, musical, comedy, horror'
);


CREATE TABLE smk_shows (
    show_id       BIGINT NOT NULL COMMENT 'Primary ID for shows',
    show_name     VARCHAR(50) NOT NULL COMMENT 'Name of the show',
    show_desc     VARCHAR(250) NOT NULL COMMENT 'Description of the show',
    start_time    TIME NOT NULL COMMENT 'Show start time',
    end_time      TIME NOT NULL COMMENT 'Show end time',
    wc_accessible VARCHAR(1) NOT NULL COMMENT 'Wheelchair accessibility',
    show_price    DOUBLE NOT NULL COMMENT 'Price of the show',
    show_type_id  BIGINT NOT NULL,
    FOREIGN KEY (show_type_id) REFERENCES smk_show_types(show_type_id),
    CHECK (wc_accessible IN ('N', 'Y'))
);

CREATE TABLE smk_user (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'Primary ID of visitor',
    firstName VARCHAR(100) NOT NULL COMMENT 'First name',
    lastName VARCHAR(100) NOT NULL COMMENT 'Last name',
    password VARCHAR(200) NOT NULL COMMENT 'Password',
    street VARCHAR(100) NOT NULL COMMENT 'Street address',
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    zipcode BIGINT NOT NULL,
    email VARCHAR(100) NOT NULL COMMENT 'Email ID of the visitor',
    phone BIGINT NOT NULL COMMENT 'Phone Number',
    dob DATE NOT NULL COMMENT 'Date of birth of the visitor',
    member VARCHAR(1) NOT NULL COMMENT 'Status of the membership',
    CHECK ( member IN ( 'N', 'Y' ) )
);


CREATE TABLE smk_visitor (
    visitor_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'Primary ID of visitor',
    firstName VARCHAR(100) NOT NULL COMMENT 'First name',
    lastName VARCHAR(100) NOT NULL COMMENT 'Last name',
    dob DATE NOT NULL COMMENT 'Date of birth of the visitor',
    member VARCHAR(1) NOT NULL COMMENT 'Status of the membership',
    user_id INT NOT NULL COMMENT 'Visitor who booked ticket',
    group_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES smk_user(user_id),
    CHECK ( member IN ( 'N', 'Y' ) )
);


CREATE TABLE smk_employee (
    employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'Primary ID of employee',
    firstName VARCHAR(100) NOT NULL COMMENT 'First name',
    lastName VARCHAR(100) NOT NULL COMMENT 'Last name',
    email VARCHAR(100) NOT NULL COMMENT 'Email ID of the employee',
    password VARCHAR(200) NOT NULL COMMENT 'Password'
);

CREATE TABLE smk_att_loc (
    attr_loc_id BIGINT NOT NULL COMMENT 'Attraction Location ID' PRIMARY KEY AUTO_INCREMENT,
    attr_loc    VARCHAR(50) NOT NULL COMMENT 'Attraction Location section Lot name'
);

CREATE TABLE smk_attr_status (
    attr_status_id TINYINT NOT NULL COMMENT 'Primary ID for attraction status' PRIMARY KEY AUTO_INCREMENT,
    attr_status    VARCHAR(20) NOT NULL COMMENT 'Status of the attraction'
);

CREATE TABLE smk_attraction_type (
    attr_type_id BIGINT NOT NULL COMMENT 'Attraction Type ID' PRIMARY KEY AUTO_INCREMENT,
    attr_type    VARCHAR(30) NOT NULL COMMENT 'Attraction Type Name'
);


CREATE TABLE smk_attractions (
    attraction_id  SMALLINT NOT NULL COMMENT 'Primary ID for attractions' PRIMARY KEY AUTO_INCREMENT,
    attr_name      VARCHAR(100) NOT NULL COMMENT 'Attraction Name',
    attr_desc      VARCHAR(500) NOT NULL COMMENT 'Attraction Description',
    capacity       SMALLINT NOT NULL COMMENT 'Capacity of the attraction',
    min_height     SMALLINT NOT NULL COMMENT 'Minimum Height',
    duration       SMALLINT NOT NULL COMMENT 'Duration in minutes',
    attr_loc_id    BIGINT NOT NULL,
    attr_type_id   BIGINT NOT NULL,
    attr_status_id TINYINT NOT NULL,
    FOREIGN KEY (attr_loc_id) REFERENCES smk_att_loc (attr_loc_id),
    FOREIGN KEY (attr_type_id) REFERENCES smk_attraction_type (attr_type_id),
    FOREIGN KEY (attr_status_id) REFERENCES smk_attr_status (attr_status_id)
);


CREATE TABLE smk_card_details (
    card_id     BIGINT NOT NULL COMMENT 'Primary ID for Card details' PRIMARY KEY AUTO_INCREMENT,
    card_type   VARCHAR(10) NOT NULL COMMENT 'Type of the card, can be credit or debit',
    card_name   VARCHAR(30) NOT NULL COMMENT 'Name on the card',
    card_number DECIMAL(20) NOT NULL COMMENT 'Card Number',
    card_expiry_month INT NOT NULL COMMENT 'Card expiry month',
    card_expiry_year INT NOT NULL COMMENT 'Card expiry year',
    card_cvv    INT NOT NULL COMMENT 'CVV on the card',
    user_id  INT NOT NULL,
    FOREIGN KEY (user_id) references smk_user(user_id)
);

CREATE TABLE smk_payments (
    payment_id     BIGINT NOT NULL COMMENT 'Primary ID for payments' PRIMARY KEY AUTO_INCREMENT,
    payment_method VARCHAR(20) NOT NULL COMMENT 'Payment Method, can be cash, credit card, or debit card.',
    payment_date   DATETIME(6) NOT NULL COMMENT 'Date of payment',
    payment_amount DOUBLE NOT NULL COMMENT 'Payment amount',
    card_id        BIGINT,
    user_id 	   INT,
    FOREIGN KEY (card_id) REFERENCES smk_card_details(card_id),
    FOREIGN KEY (user_id) REFERENCES smk_user(user_id)
);

CREATE TABLE smk_ticket (
    tkt_id            INT NOT NULL COMMENT 'Primary ID for tickets' PRIMARY KEY AUTO_INCREMENT,
    tkt_method        VARCHAR(6) COMMENT 'Ticket method, can be online or onsite',
    tkt_purchase_date DATE COMMENT 'Purchase date of ticket',
    tkt_visit_date    DATE COMMENT 'date of visit',
    tkt_price         DOUBLE NOT NULL COMMENT 'Price of ticket',
    tkt_discount      DOUBLE COMMENT 'Discount on ticket price',
    tkt_final_price   DOUBLE COMMENT 'Final price of ticket',
    tkt_type		VARCHAR(50),
    visitor_id        INT,
    user_id          INT COMMENT 'Used as PAYEE_ID to track visitors in group.',
    group_id		INT,
    payment_id 		BIGINT,
    FOREIGN KEY (visitor_id) references smk_visitor(visitor_id),
    FOREIGN KEY (user_id) references smk_user(user_id),
    FOREIGN KEY (payment_id) references smk_payments(payment_id)
);

CREATE TABLE smk_parking (
    parking_id    BIGINT NOT NULL COMMENT 'Primary ID for parking' PRIMARY KEY AUTO_INCREMENT,
    parking_date  DATE NOT NULL COMMENT 'Date of paking',
    park_in_time  TIME NOT NULL COMMENT 'In time for parking',
    park_out_time TIME NOT NULL COMMENT 'Out time for parking',
    parking_fee   DECIMAL(4, 2) NOT NULL COMMENT 'Parking fee',
     user_id          INT COMMENT 'Used as PAYEE_ID to track visitors in group.',
    group_id		INT,
    payment_id 		BIGINT,
    FOREIGN KEY (user_id) references smk_user(user_id),
    FOREIGN KEY (payment_id) references smk_payments(payment_id)
);

CREATE TABLE smk_show_order (
    show_order_id BIGINT NOT NULL COMMENT 'Primary ID for Records' PRIMARY KEY AUTO_INCREMENT,
    quantity  SMALLINT NOT NULL COMMENT 'Quantity of shows purchased',
    total_price  DECIMAL NOT NULL,
    show_id   BIGINT NOT NULL,
	user_id   INT COMMENT 'Used as PAYEE_ID to track visitors in group.',
    group_id		INT,
    payment_id 		BIGINT,
    FOREIGN KEY (user_id) references smk_user(user_id),
    FOREIGN KEY (payment_id) references smk_payments(payment_id)
);

CREATE TABLE smk_store_order (
    store_order_id BIGINT NOT NULL COMMENT 'Primary ID for Stores' PRIMARY KEY AUTO_INCREMENT,
    store_id   BIGINT NOT NULL,
	menu_item_id   INT COMMENT 'Used as PAYEE_ID to track visitors in group.',
    quantity  SMALLINT NOT NULL COMMENT 'Quantity of store items purchased',
    total_price  DECIMAL(4,2) NOT NULL,
    user_id   INT COMMENT 'Used as PAYEE_ID to track visitors in group.',
    group_id		INT,
    payment_id 		BIGINT,
    FOREIGN KEY (user_id) references smk_user(user_id),
    FOREIGN KEY (payment_id) references smk_payments(payment_id)
);

smk_user




DELIMITER //
CREATE TRIGGER calculate_discount 
BEFORE INSERT ON smk_ticket 
FOR EACH ROW
BEGIN
	DECLARE v_discount DECIMAL(10,2) DEFAULT 0.00;
	DECLARE v_visitor_status CHAR(1);
	DECLARE v_visitor_dob DATE;
	DECLARE v_ticket_price DECIMAL(10,2);
	DECLARE v_final_ticket_price DECIMAL(10,2);

	SELECT member, dob INTO v_visitor_status, v_visitor_dob 
	FROM smk_visitor WHERE visitor_id = NEW.visitor_id 
	AND group_id = NEW.group_id;

	SET v_ticket_price = NEW.tkt_price;

	IF v_visitor_status = 'Y' THEN
		SET v_discount = 0.10;
	END IF;

	SET NEW.tkt_type = 'Adult';

	IF YEAR(CURDATE()) - YEAR(v_visitor_dob) < 7 THEN
		SET NEW.tkt_type = 'Child';
		SET v_discount = v_discount + 0.15;
	END IF;

	IF YEAR(CURDATE()) - YEAR(v_visitor_dob) > 60 THEN
		SET NEW.tkt_type = 'Senior';
		SET v_discount = v_discount + 0.15;
	END IF;

	IF NEW.tkt_method = 'Online' THEN
		SET v_discount = v_discount + 0.05;
	END IF;

	SET v_final_ticket_price = (1 - v_discount) * v_ticket_price;
	SET NEW.tkt_discount = v_ticket_price * v_discount;
	SET NEW.tkt_final_price = v_ticket_price - NEW.tkt_discount;
END; //
DELIMITER ;



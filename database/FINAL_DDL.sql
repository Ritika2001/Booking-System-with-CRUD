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


--done
CREATE TABLE Location (
    locationId SERIAL PRIMARY KEY,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL
);
--done
CREATE TABLE Universities (
    UniversityID INT PRIMARY KEY,
    Name VARCHAR,
    locationId INT NOT NULL,
    FOREIGN KEY (locationId) REFERENCES Location(locationId)
);
--done
CREATE TABLE USER(
    StudentID SERIAL PRIMARY KEY,
    FirstName VARCHAR(100),
    LastName VARCHAR(100),
    Email VARCHAR(255),
    UniversityID INT NOT NULL,
    UniversityStudentID VARCHAR(100),
    ContactNumber VARCHAR(20),
    ProfilePicture BYTEA,
    PrimaryMajor VARCHAR(100),
    SecondaryMajor VARCHAR(100),
    password VARCHAR(255),
    CONSTRAINT fk_university FOREIGN KEY (UniversityID) REFERENCES universities(UniversityID),
    CONSTRAINT unique_email UNIQUE (Email),
    CONSTRAINT unique_university_student UNIQUE (UniversityID, UniversityStudentID)
);
--done
CREATE TABLE Categories (
    CategoryID SERIAL PRIMARY KEY,
    CategoryName VARCHAR UNIQUE
);
--done
CREATE TABLE Items (
    ItemID SERIAL PRIMARY KEY,
    ItemName VARCHAR(100) NOT NULL,
    Description TEXT,
    Price DECIMAL(10, 2) NOT NULL,
    CategoryID INT NOT NULL,
    Condition VARCHAR(50) NOT NULL,
    SellerID INT NOT NULL,
    ItemPicture BYTEA,
    PostDate DATE NOT NULL DEFAULT CURRENT_DATE,
    Stock INT NOT NULL DEFAULT 10,
    IsSold BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (SellerID) REFERENCES Users(StudentID),
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);
--done
CREATE TABLE Transactions (
    transactionId SERIAL PRIMARY KEY,
    itemId INT NOT NULL,
    buyerId INT NOT NULL,
    sellerId INT NOT NULL,
    transactionDate TIMESTAMP NOT NULL DEFAULT NOW(),
    transactionAmount NUMERIC(10, 2) NOT NULL,
    FOREIGN KEY (itemId) REFERENCES Items(itemId),
    FOREIGN KEY (buyerId) REFERENCES users(studentId),
    FOREIGN KEY (sellerId) REFERENCES users(studentId)
);
--done
CREATE TABLE Reviews (
    ReviewID SERIAL PRIMARY KEY,
    ItemID INT NOT NULL,
    ReviewerID INT,
    Rating INT NOT NULL CHECK (
        Rating BETWEEN 1 AND 5
    ),
    Comment TEXT,
    reviewDate DATE NOT NULL DEFAULT CURRENT_DATE,
    FOREIGN KEY (ItemID) REFERENCES Items(ItemID),
    FOREIGN KEY (ReviewerID) REFERENCES Users(StudentID)
);
-- 1) Location Function
CREATE OR REPLACE FUNCTION sp_insert_location(
        p_city VARCHAR,
        p_state VARCHAR,
        p_country VARCHAR
    ) RETURNS INTEGER AS $$
DECLARE new_id INTEGER;
BEGIN
INSERT INTO Location(city, state, country)
VALUES (p_city, p_state, p_country)
RETURNING locationId INTO new_id;
RETURN new_id;
END;
$$ LANGUAGE plpgsql;
-- 2) Universities Function
CREATE OR REPLACE FUNCTION sp_insert_university(
        p_universityid INTEGER,
        p_name VARCHAR,
        p_locationid INTEGER
    ) RETURNS INTEGER AS $$ BEGIN
INSERT INTO Universities(UniversityID, Name, locationId)
VALUES (p_universityid, p_name, p_locationid);
RETURN p_universityid;
END;
$$ LANGUAGE plpgsql;
-- 3) Users Function
CREATE OR REPLACE FUNCTION sp_insert_user(
        p_firstname VARCHAR,
        p_lastname VARCHAR,
        p_email VARCHAR,
        p_universityid INTEGER,
        p_universitystudentid VARCHAR,
        p_contactnumber VARCHAR,
        p_profilepicture BYTEA,
        p_primarymajor VARCHAR,
        p_secondarymajor VARCHAR,
        p_bio TEXT
    ) RETURNS INTEGER AS $$
DECLARE new_id INTEGER;
BEGIN
INSERT INTO Users(
        FirstName,
        LastName,
        Email,
        UniversityID,
        UniversityStudentID,
        ContactNumber,
        ProfilePicture,
        PrimaryMajor,
        SecondaryMajor,
        Bio
    )
VALUES (
        p_firstname,
        p_lastname,
        p_email,
        p_universityid,
        p_universitystudentid,
        p_contactnumber,
        p_profilepicture,
        p_primarymajor,
        p_secondarymajor,
        p_bio
    )
RETURNING StudentID INTO new_id;
RETURN new_id;
END;
$$ LANGUAGE plpgsql;
-- 4) Categories Function
CREATE OR REPLACE FUNCTION sp_insert_category(p_categoryname VARCHAR) RETURNS INTEGER AS $$
DECLARE new_id INTEGER;
BEGIN
INSERT INTO Categories(CategoryName)
VALUES (p_categoryname)
RETURNING CategoryID INTO new_id;
RETURN new_id;
END;
$$ LANGUAGE plpgsql;
-- 5) Items Function
CREATE OR REPLACE FUNCTION sp_insert_item(
        p_itemname VARCHAR,
        p_description TEXT,
        p_price NUMERIC,
        p_categoryid INTEGER,
        p_condition VARCHAR,
        p_sellerid INTEGER,
        p_itempicture BYTEA,
        p_postdate DATE DEFAULT CURRENT_DATE,
        p_stock INT DEFAULT 10,
        p_issold BOOLEAN DEFAULT FALSE
    ) RETURNS INTEGER AS $$
DECLARE new_id INTEGER;
BEGIN
INSERT INTO Items(
        ItemName,
        Description,
        Price,
        CategoryID,
        Condition,
        SellerID,
        ItemPicture,
        PostDate,
        Stock,
        IsSold
    )
VALUES (
        p_itemname,
        p_description,
        p_price,
        p_categoryid,
        p_condition,
        p_sellerid,
        p_itempicture,
        p_postdate,
        p_stock,
        p_issold
    )
RETURNING ItemID INTO new_id;
RETURN new_id;
END;
$$ LANGUAGE plpgsql;
-- 6) Transactions Function
CREATE OR REPLACE FUNCTION sp_insert_transaction(
        p_itemid INTEGER,
        p_buyerid INTEGER,
        p_sellerid INTEGER,
        p_transactionamount NUMERIC
    ) RETURNS INTEGER AS $$
DECLARE new_id INTEGER;
BEGIN
INSERT INTO Transactions(
        itemId,
        buyerId,
        sellerId,
        transactionAmount
    )
VALUES (
        p_itemid,
        p_buyerid,
        p_sellerid,
        p_transactionamount
    )
RETURNING transactionId INTO new_id;
RETURN new_id;
END;
$$ LANGUAGE plpgsql;
-- 7) Reviews Function
CREATE OR REPLACE FUNCTION sp_insert_review(
        p_itemid INTEGER,
        p_reviewerid INTEGER,
        p_rating INTEGER,
        p_comment TEXT,
        p_reviewdate DATE DEFAULT CURRENT_DATE
    ) RETURNS INTEGER AS $$
DECLARE new_id INTEGER;
BEGIN
INSERT INTO Reviews(
        ItemID,
        ReviewerID,
        Rating,
        Comment,
        reviewDate
    )
VALUES (
        p_itemid,
        p_reviewerid,
        p_rating,
        p_comment,
        p_reviewdate
    )
RETURNING ReviewID INTO new_id;
RETURN new_id;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE Universities (
    UniversityID INT PRIMARY KEY,
    Name VARCHAR,
    Location VARCHAR
);



CREATE TABLE USERS(
	StudentID SERIAL PRIMARY KEY,
	FirstName VARCHAR(100),
	LastName VARCHAR(100),
	Email VARCHAR(255),
    UniversityID INT,
    UniversityStudentID VARCHAR(100),
    ContactNumber VARCHAR(20),
    ProfilePicture BYTEA,
    PrimaryMajor VARCHAR(100),
    SecondaryMajor VARCHAR(100),
    Bio Text,
	CONSTRAINT fk_university FOREIGN KEY (UniversityID) REFERENCES universities(UniversityID),
	CONSTRAINT unique_email UNIQUE (Email),
	CONSTRAINT unique_university_student UNIQUE (UniversityID, UniversityStudentID)
	
);

 
CREATE TABLE Categories (
    CategoryID INT PRIMARY KEY,
    CategoryName VARCHAR UNIQUE
);


CREATE TABLE Items (
    ItemID INT PRIMARY KEY,
    ItemName VARCHAR,
    Description TEXT,
    Price DECIMAL,
    CategoryID INT,
    Condition VARCHAR,
    SellerID INT,
    ItemImage BYTEA,
    PostDate DATE,
    IsSold BOOLEAN,
    FOREIGN KEY (SellerID) REFERENCES Users(StudentID),
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);


CREATE TABLE Transactions (
    TransactionID INT PRIMARY KEY,
    ItemID INT,
    BuyerID INT,
    SellerID INT,
    TransactionDate DATE,
    TransactionAmount DECIMAL,
    FOREIGN KEY (ItemID) REFERENCES Items(ItemID),
    FOREIGN KEY (BuyerID) REFERENCES Users(StudentID),
    FOREIGN KEY (SellerID) REFERENCES Users(StudentID)
);

CREATE TABLE Reviews (
    ReviewID INT PRIMARY KEY,
    ItemID INT,
    ReviewerID INT,
    Rating INT CHECK (Rating BETWEEN 1 AND 5),
    Comment TEXT,
    ReviewDate DATE,
    FOREIGN KEY (ItemID) REFERENCES Items(ItemID),
    FOREIGN KEY (ReviewerID) REFERENCES Users(StudentID)
);


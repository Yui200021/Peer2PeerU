-- UNIVERSITIES
CREATE TABLE Universities (
    UniversityID INT PRIMARY KEY,
    Name VARCHAR,
    Location VARCHAR
);

-- USERS (Student)
CREATE TABLE Users (
    StudentID INT PRIMARY KEY,
    FirstName VARCHAR,
    LastName VARCHAR,
    Email VARCHAR UNIQUE,
    UniversityID INT,
    ContactNumber VARCHAR,
    ProfilePicture VARCHAR,
    FOREIGN KEY (UniversityID) REFERENCES Universities(UniversityID)
);

-- CATEGORIES 
CREATE TABLE Categories (
    CategoryID INT PRIMARY KEY,
    CategoryName VARCHAR UNIQUE
);

-- ITEMS
CREATE TABLE Items (
    ItemID INT PRIMARY KEY,
    ItemName VARCHAR,
    Description TEXT,
    Price DECIMAL,
    CategoryID INT,
    Condition VARCHAR,
    SellerID INT,
    ImageURL VARCHAR,
    PostDate DATE,
    IsSold BOOLEAN,
    FOREIGN KEY (SellerID) REFERENCES Users(StudentID),
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);

-- TRANSACTIONS
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

-- REVIEWS
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

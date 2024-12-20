CREATE TABLE `Order` (
    OrderID INT PRIMARY KEY AUTO_INCREMENT,
    CustomerName VARCHAR(255) NOT NULL,
    Item VARCHAR(255) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    OrderedDate DATE NOT NULL,
     PaymentStatus VARCHAR(20) NOT NULL DEFAULT 'Pending'
);

CREATE TABLE Payment (
    PaymentID INT AUTO_INCREMENT PRIMARY KEY, -- Unique ID for each payment
    OrderID INT NOT NULL,                     -- Foreign key to the Order table
    Amount DECIMAL(10, 2) NOT NULL,           -- Payment amount
    PaymentDate DATE NOT NULL,                -- Date of the payment
    PaymentProof LONGBLOB,                    -- Binary storage for image files
    FOREIGN KEY (OrderID) REFERENCES `Order`(OrderID) ON DELETE CASCADE
);
CREATE TABLE User (
    UserID INT AUTO_INCREMENT PRIMARY KEY,   -- Unique ID for each user
    Username VARCHAR(255) NOT NULL UNIQUE,   -- Username, must be unique
    Password VARCHAR(255) NOT NULL           -- Password, securely hashed
);

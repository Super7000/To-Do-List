CREATE DATABASE to_dos;
USE to_dos;

CREATE TABLE User_Details (
	ID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
	Username VARCHAR(150) NOT NULL,
	Email VARCHAR(150) NOT NULL,
	Password CHAR(60) NOT NULL,
	Created_At TIMESTAMP default CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    task_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    category_id INT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    due_date DATETIME NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (task_id),
    FOREIGN KEY (user_id) REFERENCES User_Details(ID),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE categories (
    category_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    name VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (category_id),
    FOREIGN KEY (user_id) REFERENCES User_Details(ID)
);

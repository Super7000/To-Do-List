	use to_dos;
    CREATE TABLE User_Details (
		ID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
        Username VARCHAR(150) NOT NULL,
        Email VARCHAR(150) NOT NULL,
        Password CHAR(60) NOT NULL,
        Created_At TIMESTAMP default CURRENT_TIMESTAMP
    );
    
    SELECT * FROM User_Details;
    SELECT * FROM tasks;
    SELECT * FROM categories;
    
    INSERT INTO User_Details (Username, Email, Password) VALUES ('s c', 'subratachowdhury7000@gmail.com', '$2a$10$zshNwvuVk9HyzB7AsVnvOegLcCv8tM0Emi4Ak2ksJayX28notgU3O');
	SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE User_Details;
SET FOREIGN_KEY_CHECKS = 1;

UPDATE TABLE SET Password 

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

CREATE TABLE task_images (
    image_id INT NOT NULL AUTO_INCREMENT,
    task_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (image_id),
    FOREIGN KEY (task_id) REFERENCES tasks(task_id)
);

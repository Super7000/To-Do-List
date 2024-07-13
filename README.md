# To Do List

It is a Full Stack To Do List Web Application created using ReactJS, Bootstrap 5, CSS, HTML as Frontend and NodeJS with Express library as Backend and MySQL as Database. 


# Features 

**1.** Data is sync accross different devices.

**2.** It has category feature through which you can group the tasks.

**3.** Secure authenticated account. (No one can access your data except you)

**4.** Has searching feature. (You can search a category from a very wide list of category)

**5.** UI is fully responsive on different types of devices.


# To use this app follow the below steps:

**Step 1:** First of all fork this repositoy and run `npm install` command in both Frontend and Backend directory which will install all dependencies and librarys.

**Step 2:** Then go to Frontend Directory then build the react app using `npm run build`.

**Step 3:** Then go to Backend Directory and run the SQL Initialize commands.sql file **(You need to have MySQL on you device)**.

**Step 4:** Now you need to set up the server and create a User for nodejs to access the database.

I have used below configurations. If you want to use you own configuration do not forget to **change `config/config.js` file.**

![image](https://github.com/Super7000/To-Do-List/assets/86580414/5e63b8a0-82af-4b39-9c00-d6ab5888d3b0)

**Step 5:** After that run `node app.js` command in Backend which will run the main server.

**Step 6:** Now finally open this **URL**: `http://localhost:5000/` in your browser to use the app.


# How to use the UI 

**Step 1:** First of all you have to create a account from create new account link in login page.

![image](https://github.com/user-attachments/assets/7ebb8617-bfcc-4867-ac3f-8767d63ea7da)

**Step 2:** After that you have to login with the account, after successful login you will be redirected to main to do list page.

![Screenshot 2024-07-13 205820](https://github.com/user-attachments/assets/4c9b3d4e-e8b7-4f89-97ba-5fb303d35fd5)

**Step 3:** To add a task first you have to create a category or list.

**Step 4:** You can add add a category by clicking `+` button from category section in menubar.

**Step 5:** Then click the category in which you want to add tasks and press the `+` button at right bottom position of the page.

**Step 6:** After clicking the `+` button a popup will appear where you can adjust Due Date, Due Time for the task then click `save` button.

![image](https://github.com/user-attachments/assets/b8380f2e-bee9-46af-8a94-bd4fc9112de1)

**Step 7:** After that a task will be added with Title: "Task", Description: "Description" you can directly change them by clicking them. 

![Screenshot 2024-07-13 202933](https://github.com/user-attachments/assets/c443da47-d261-409e-8254-a44b69d155b7)


<h2>To Edit the Tasks follow the below Guide:</h2>

**1.** To update the title and description, You don't have to click any save button to update them it will be updated automatcally in database.

**2.** To update the due date and time just click on them on the task card at right side before the delete button then a Pop Up will apper from which you can update the details.

**3.** You can mark a task as complete by clicking the checkbox at the left side of the task card.

**4.** You can delete a task by clicking the delete button at the right side of the task card.

![image](https://github.com/user-attachments/assets/689a13a6-5351-41b0-bb97-140e53e76776)


<h2>To Edit the Categories follow the below Guide:</h2>

**1:** To change the category name just click on the edit/pen icon/button at right side of the category card OR by double clicking on the category name.

**1:** A category can be deleted by clicking the delete button at top right corner after selecting the category that you want to delete.


<h2>To Edit the User Details follow the below Guide:</h2>

**Step 1:** Click on the profile card at the left bottom corner of the page before the log out button.

**Step 2:** Then a popup will appear where you can change the user details.

**Step 3:** After changing the details and provind the previous password that is given by you on Sign Up form then click on `save` button.

![image](https://github.com/user-attachments/assets/81a2333e-0619-40a7-b847-8320614b0c56)

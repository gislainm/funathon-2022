# PrePair
## How to install and run the application
1. clone this repository in your local machine.(ignore this step if a zipped file of the project was provide to you)
2. install mongodb if you don't have it installed and make sure that it is running before you start the application.
3. if you wish to use provided user data as an example to start from:
    - create a database in your mongodb and call it **PrePairDB**.
    - create 3 different collections in your PrePairDB database and name them **users,messages, and messagerooms**.
    - load json files provided to their corresponding collections as data to be used.
4. if you want to start with an empty database and fill it with your own data, ignore step 3.
5. if your don't have nodemon installed in your machine, in your terminal run **npm istall --global nodemon**.
6. in your terminal run **app.js** or run **npm start** to start the application. Make sure that you run one of these commands in your terminal when you are in the server(folder) directory.
7. you should see **welcome to Pre-Pair** message printed in you terminal. if you see it, it means that the application has startedd successfully otherwise carefully repeat step (1-6).
8. In your browser go to **http://localhost:8080/prepair**. This is where you will start interacting with the application.
9. if you have used given json files to save user data to start from you can login as:
    - a mentor:
        - email: **sjerome@miu.edu**
        - password: **123456**
    - a student: 
        - email: **aelsie@miu.edu**
        - password: **123456**
10. if you skipped step 3, you can skip the login page and signup as either a mentor or a student.
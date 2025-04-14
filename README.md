# User Management System with Node.js, Express, and MySQL

A web application for managing users with CRUD (Create, Read, Update, Delete) operations, built with Node.js, Express, MySQL, and Faker.js for generating test data.

## Features

- **User Management**:
  - View all users
  - Add new users
  - Edit existing users
  - Delete users
- **Authentication**:
  - Password verification for sensitive operations
- **Data Generation**:
  - Faker.js integration for generating realistic test data
- **Responsive UI**:
  - EJS templating for server-side rendering

## Technologies Used

- **Backend**:
  - Node.js
  - Express.js
  - MySQL
- **Frontend**:
  - EJS (Embedded JavaScript templates)
  - HTML/CSS
- **Development Tools**:
  - Faker.js (for test data generation)
  - Method-Override (for RESTful routes)
  - UUID (for unique ID generation)

## Installation

1. **Prerequisites**:
   - Node.js (v14 or later)
   - MySQL server
   - Git (optional)

2. **Setup**:
   ```bash
   git clone https://github.com/mdjunaid12/SQL.git
   cd SQL
   npm install

3. **Database Configuration**:
     -Create a MySQL database named delta_app
     -Update the connection configuration in app.js:
             const connection = mysql.createConnection({
             host: "localhost",
             user: "your_username",
             database: "delta_app",
             password: "your_password",
            });
   
## Run the Application
      node app.js
      The server will start on port 8080 (http://localhost:8080)

## API Endpoints
    Route	Method	Description
    /GET	Homepage with user count
    /user	GET	List all users
    /user/add	GET	Show add user form
    /users	POST	Create new user
    /user/:id/edit	GET	Show edit form
    /user/:id	PATCH	Update user
    /user/:id/delete	GET	Show delete confirmation
    /user/:id	DELETE	Delete user      

### Additional Recommendations:

1. **Environment Variables**: Consider using `dotenv` to manage sensitive database credentials
2. **Security**: Implement proper password hashing (bcrypt) for user passwords
3. **Validation**: Add input validation for user data
4. **Error Handling**: Improve error handling with proper status codes
5. **Pagination**: Consider adding pagination for the user list

Would you like me to modify any specific section or add more details about a particular feature?
    

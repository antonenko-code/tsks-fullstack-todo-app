# TSKS - Backend
**TSKS** is a comprehensive **fullstack** todo application designed to empower users in efficiently managing their tasks and categories. Whether you're a seasoned user or just exploring, you have the flexibility to register for a personalized experience or simply try out our demo mode.

## About Project

### Technologies Used
- Node.js, Express.js
- MongoDB
- Mongoose
- Middlewares
- Handling exceptions using Decorators
- JSON Web Token, Express Validator

## Getting Started
Follow these detailed steps to get started with the TSKS Backend:

### Clone the Repository
First, clone the TSKS repository to your local machine using the following command:
```
git clone https://github.com/your-username/todo-app.git
cd todo-app
```
### Install Dependencies
Navigate to the `backend` directory and install the necessary dependencies:

#### Backend
```
cd ../backend
npm install
```
### Set up Your Database
To manage authentication and data, you'll need a MongoDB database. Follow these steps:

1. Visit the [MongoDB website](https://www.mongodb.com/) and sign up to create a MongoDB Atlas account or set up a local MongoDB instance.
2. Obtain your database connection details.

### Set up Environment Variables
Create a `.env` file in the backend root directory and add the following environment variables:
```
PORT=your_port
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_PORT=your_db_port
DB_HOST=your_db_host
DB_NAME=your_db_name
JWT_ACCESS_SECRET=your_access_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_RESET_SECRET=your_reset_secret_key
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASSWORD=your_smtp_password
SERVER_URL=http://localhost:your_backend_port
CLIENT_URL=http://localhost:your_frontend_port
```
**Replace placeholders** with your actual configuration values.

### Start the Backend Server
To run the backend server, execute the following command from the backend directory:
```
npm run dev
```

## Contributing
Contributions to the Weather Forecast App are welcome! If you find any issues or have suggestions for improvements, feel free to open a new issue or submit a pull request.

## License
This project is licensed under the MIT License. Feel free to use, modify, and distribute the code for personal and commercial purposes.

## Contributors:
- :ukraine: [Oleksandr Antonenko](https://github.com/Oleksandr-Antonenko) – Frontend/Backend Developer | Designer

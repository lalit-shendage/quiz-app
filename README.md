# Quiz- app server

This is a simple RESTful API built with Express.js and MongoDB that allows performing CRUD operations on a collection of items.


## Tech Stack

**Server:** Node, Express, mongoose

**API-Test:** POSTMAN

**External libraries:** bcrypt, dotenv, node-cron


## Getting Started

### Installation

1. Clone this repository to your local machine.

```bash
  https://github.com/lalit-shendage/quiz-app
```
2. Install the dependencies.

```bash
 npm install
```
### Configuration

1.  Create .env file

2. Open the .env file and provide the following information:

```bash
MONGOURI=<user>:<password>
JWT_key="your key"
```
### Running the API

1. Start the application.

```bash
npm start
```

2. The API will be available at http://localhost:3000.


    
## API Reference


#### Register User

```http
  POST /auth/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. User's name |
| `email` | `string` | **Required**. User's email |
| `password` | `string` | **Required**. User's name |
| `role` | `admin/student` | **Required**. User's role either admin or student |

####  User login

```http
  POST /auth/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. User's email |
| `password` | `string` | **Required**. User's name |



#### POST quiz/ admin only 

```http
  POST /quizzes
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `auth-token`      | `string` | **Required**. auth-token |
| `Content-Type`      | `application/json` | **Required**. |

#### Get all quizes/admin only

```http
  GET /quizzes/all
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Content-Type`      | `application/json` | **Required**. |
| `auth-token`      | `string` | **Required**. auth-token |


#### Get active quizes/ both student and admin

```http
  GET /quizzes/active
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Content-Type`      | `application/json` | **Required**. |
| `auth-token`      | `string` | **Required**. auth-token |




#### participate in quiz 
```http
  POST /quizzes/participate
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `auth-token`      | `string` | **Required**. auth-token |
| `Content-Type`      | `application/json` | **Required**. |
| `quizId`      | `string` | **Required**. quiz id |
| `selectedOptions`      | `array` | **Required**. array of selected options by user |


#### get result
```http
  GET /quizzes/(quiz id)/result
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `auth-token`      | `string` | **Required**. auth-token |
| `Content-Type`      | `application/json` | **Required**. |



## Additional Features


```
### Validation

1. Data is properly validated using express-validator before performing database operations.

2. The API returns appropriate error messages for validation failures.


### Authentication 

1. Authentication/Authorization: Authentication and authorization mechanisms have been implemented to protect the endpoints. Users need to authenticate and provide a valid token in the request headers to access the protected endpoints.

### Test

#### Manual test using postman

1. Start the application
2. Open Postman and import the provided collection file
3. The collection includes pre-configured requests for each API endpoint. You can send requests to the corresponding endpoints and examine the responses.
4. you can check the hosted server in postman by replacing http://localhost:3000 by https://quiz-app-backend-uj0z.onrender.com

**Note**: Make sure to update the request URLs and data as needed based on your local environment and specific API configurations.
## Authors

- [Lalit Shendage](https://github.com/lalit-shendage)


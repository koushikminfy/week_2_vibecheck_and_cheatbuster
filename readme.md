# Basic cheat Buster App 

```markdown


## Folder Structure

cheat-buster-app/
├── controllers/
│   └── user.controller.js
├── models/
│   └── user.model.js
├── routes/
│   └── user.routes.js
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── .env
├── index.js
├── seed.js
├── .gitignore

```

---


### 1. Initialize Bun project
```bash
bun init
````

### 2️ Install dependencies

```bash
bun add express mongoose zod axios dotenv
```

---

##  Environment Configuration

Create a `.env` file in the root:

```env
MONGO_URI=your_mongodb_connection_string{i need to replace with mongo db server with my oassword}
PORT=3000
```


---
##  Backend Overview

###  Model — `models/user.model.js`

Defines the Mongoose schema for the user collection.

###  Controller — `controllers/user.controller.js`

Handles validation and logic for searching users.

###  Routes — `routes/user.routes.js`

API endpoint:

###  Main Server — `index.js`

Initializes Express server and connects to MongoDB.

---
##  Seed the Database

Add mock user data for testing:

```bash
bun seed.js
```

---



## 🔁 Frontend–Backend Integration

| What Happens                         | File                       |
| ------------------------------------ | -------------------------- |
| User enters email                    | `index.html` + `script.js` |
| JS sends GET `/api/search?email=...` | `script.js`                |
| Express handles the request          | `user.routes.js`           |
| Controller validates & queries DB    | `user.controller.js`       |
| MongoDB returns user if found        | `user.model.js`            |
| Result shown on webpage              | DOM updated via JS         |

---

## 📸 Screenshots
![Terminal](https://github.com/user-attachments/assets/e738d960-d13b-4126-afc5-689095365a29)
![Home](https://github.com/user-attachments/assets/657f0f74-7e49-4746-bce6-6ee626b933c6)

---








#  Medium Cheat Buster App 
## Overview
  three features:
1. **Search by Name** - Users can search by first or last name
2. **Better Loading State** - Buttons show "Searching..." and are disabled during requests
3. **API Service Refactor** - Clean separation of API calls in a dedicated service

## Project Structure
```
project-root/
├── controllers/
│   └── user.controller.js     # Enhanced with name search
├── models/
│   └── user.model.js          # User schema
├── routes/
│   └── user.routes.js         # API routes
├── public/
│   ├── index.html             # Enhanced UI with dual search
│   ├── script.js              # Main frontend logic
│   └── api.js                 # API service layer
├── index.js                   # Main server file
├── seed.js                    # Database seeding
├── package.json
├── jsconfig.json
└── .env                       # Environment variables
```

## Setup Instructions

### 1. Install Dependencies
```bash
bun install
```
![image](https://github.com/user-attachments/assets/b57a0a4c-1a72-4357-b902-c82a8935b70d)

### 2. Set up Environment Variables
Create a `.env` file in the root directory:
```env
MONGO_URI=mongodb://localhost:27017/cheat-buster-app{here i will give my mongo server url}
PORT=3000
NODE_ENV=development
```

### 3. Seed the Database
```bash
bun run seed.js
```
![image](https://github.com/user-attachments/assets/c62b75c0-8836-45f5-9785-3819c91cc31b)

### 4. Start the Server
```bash
bun run index.js
```
![image](https://github.com/user-attachments/assets/141996ca-46e7-4f9b-b7b1-0e12e125a545)

![image](https://github.com/user-attachments/assets/bba968c6-e419-4604-9006-5f7e9c7e87a2)
![image](https://github.com/user-attachments/assets/9a8ae68d-756b-4387-8462-5b0fac505328)
![image](https://github.com/user-attachments/assets/9990bb6a-b80b-4564-ae28-78914849cf61)




### Search User
```
GET /api/users/search?email=user@example.com
GET /api/users/search?name=John
```


---

#  VibeCheck_Easy
```markdown


##  Features

- Bun instead of npm as npm is not working in my laptop 
- Express.js to serve HTTP endpoints

##  Sample Vibes Data (in `data/sampleVibes.js`)

```js
[
  {
    id: 1,
    mood: ' ',
    song: ' ',
    user: ' '
  },
]

like this i have taken , three 3 songs from 3 different mmovies
```


###  Start the server

```bash
bun server.js
```

> Server will start on port `5000` and display:
>
> ```
>  Server blasting off on port 5000
> ```

---

##  API Endpoints

### `GET /`

Returns a simple welcome message:
* `GET http://localhost:5000/`
```
 Welcome to VibeCheck API – Check your vibe, share your tribe!
```
![1](https://github.com/user-attachments/assets/860cf6f8-cbf4-46e4-99b5-60a52b368d32)

---

### `GET /api/v1/vibes`
* `GET http://localhost:5000/api/v1/vibes`
Returns a list of all sample vibes in JSON format:

```json
[
  {
    "id": 1,
    "mood": " ",
    "song": " ",
    "user": " "
  },
  ........... SO ON.. end of the list
]
```
![2](https://github.com/user-attachments/assets/c9657056-0b3d-4a91-9349-2e48c08f66c6)

---

### `GET /api/v1/vibes/:id`
* `GET http://localhost:5000/api/v1/vibes/1`
Returns a single vibe matching the provided ID.

**Example:**

`GET /api/v1/vibes/2`

```json
{
  "id":  ,
  "mood": "_",
  "song": "_",
  "user": "_"
}
```
![3](https://github.com/user-attachments/assets/487d53b3-c14b-4ea8-8313-90bc7bb6c8cd)

If the ID is not found:
* `GET http://localhost:5000/api/v1/vibes/99` (not found)
```json
{
  "success": false,
  "message": "That vibe is off the grid, not found."
}
```
![4](https://github.com/user-attachments/assets/952abfd3-d0cb-465a-b1b0-8aac24711ab9)

---


#  VibeCheck_Advanced 

```markdown



##  Features

-  User Signup and Login (JWT-based Auth)
-  Password hashing with bcrypt
-  Protected routes for vibe posting
-  Public feed showing all vibes with user info
-  MongoDB Atlas for cloud storage

##  Project Structure


vibecheck-api/
├── config/             # MongoDB connection
├── controllers/        # Logic for auth & vibe handling
├── middleware/         # Authentication middleware
├── models/             # User and Vibe Mongoose schemas
├── routes/             # API route definitions
├── .env                # Environment variables (local only)
├── server.js           # Entry point
├── package.json        # Project config

````

---

##  Steps to finish

### 1. Setup `.env`

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=30d
```

>  Never commit this file to Git!

### 2. Start the Server

```bash
node server.js
```

You should see:

```
 Server blasting off on port 5000
MongoDB Connected: <your_host>
```

---

##  API Endpoints & Postman Test Flow

### 1️ Signup Endpoint

**POST** `http://localhost:5000/api/v1/auth/signup`

**Body (JSON):**

```json
{
  "username": "kowshik",
  "email": "kowshik@example.com",
  "password": "123456"
}
```
![1](https://github.com/user-attachments/assets/b31a4133-12ef-4563-8e16-fb1371d3c63b)

---

### 2️ Login Endpoint *(save the JWT token)*

**POST** `http://localhost:5000/api/v1/auth/login`

**Body (JSON):**

```json
{
  "email": "kowshik@example.com",
  "password": "123456"
}
```
![2](https://github.com/user-attachments/assets/b8f62945-d1ee-4982-af9f-fe086b6b4bb2)

---

### 3️ Post Vibe (Unauthorized - should fail)

**POST** `http://localhost:5000/api/v1/vibes`

**Body (JSON):**

```json
{
  "mood": "energetic",
  "song": "jai balayya"
}
```
![3](https://github.com/user-attachments/assets/a4d4635e-9e85-437c-b9e7-d23614e981bc)
---

### 4️ Post Vibe (Authorized - should succeed)

**POST** `http://localhost:5000/api/v1/vibes`

**Headers:**

```
Authorization: Bearer <MY_JWT_TOKEN>
```

**Body (JSON):**

```json
{
  "mood": ".....",
  "song": "......"
}
```
![4](https://github.com/user-attachments/assets/3625e6c9-bcf8-4308-b834-b321ceb14a3d)


---

### 5️ Get All Vibes

**GET** `http://localhost:5000/api/v1/vibes`
![5](https://github.com/user-attachments/assets/0e04d155-d16f-4189-9375-90b70065b91a)


---

### 6.Check the data in mongodb
![6](https://github.com/user-attachments/assets/3bcf716e-000a-43a4-8d62-57c39523602d)

---


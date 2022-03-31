# HOT TAKES BACKEND

## Installation

Here are the dependancies you need to install:

- NodeJS v16.14.2
- bcrypt": "^5.0.1",
- "dotenv": "^16.0.0",
- "express": "^4.17.3",
- "express-rate-limit": "^6.3.0",
- "helmet": "^5.0.2",
- "jsonwebtoken": "^8.5.1",
- "mongoose": "^6.2.6",
- "mongoose-unique-validator": "^3.0.0",
- "multer": "^1.4.4",
- "npm": "^8.5.5",
- "password-validator": "^5.2.1"

## Usage

- Run `npm start`.
- Images are downloaded in the "image" directory at the root.
- Use `Ctrl+C` in the terminal to stop the local server.
- the password rules can be changed in the password schema (\models directory)
- input policies restrictions can be adjusted thanks to the sanit and saninupadate middlewares thanks to regex
- rate limit restrictions can be adjusted : for the moment : 100 requests in 15 minutes (middlewares -> rate-limit.js) / rate limit restrictions are just applied to the login route. For a rate limite restriction to the other pages : add the middleware to the route.

## FRONT
https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6

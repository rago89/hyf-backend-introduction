# Backend Introduction

This project will serve as the first introduction to setting up a simple REST backend for the HackYourFuture Web Apps module. The code in the start-of-class branch has all the endpoints for the channels resource implemented and serves as example code and starting point for the lecture.

During the lecture the endpoints of the messages repo should be implemented in order to make the chat client work. A reference implementation of the end goal can be found on the reference-implementation branch.

## Getting Started

- `npm install`
- **run the server**
  - `npm run dev` - uses `nodemon` to restart the server each time you save a change
  - `npm run start` - does not restart each time you save a change
- **code checks**
  - `npm run format`
  - `npm run lint`
- **building documentation**
  - `npm run document`

## Using the app

- **from postman**
  - `http://localhost:xxxx/api` - the main entry point to the API
- **from the browser**
  - `http://localhost:xxxx/` - serves `/client/index.html`, the chat client that will connect to your API routes.
  - you can also use the API routes, but it will be less helpful than in Postman

# The API Documentation

## Channels

## Fetch Channels

Returns json data about all channels in the system.

- **URL**

  /channels

- **Method:**

  `GET`

- **Result:**

  ```js
  [
    {
      "name": "Awesome Channel",
      "id": "ZAE12E124321ZE"
    },
    ...
  ]
  ```

---

## Fetch Channel

Returns json data about a single channel.

- **URL**

  /api/channels/:channelId

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `channelId=[string]`

- **Result:**

  ```js
  {
    "name": "Awesome Channel",
    "id": "ZAE12E124321ZE"
  }
  ```

---

## Delete Channel

Removes a channel from the system.

> To use this channel, you must register and them login, once logged in in Postman you need to put in the header section as key **Authorization** and value **baerer token** where **token** is the code that you are going to receive as response once you are logged in.

- **URL**

  /api/channels/:channelId

- **Method:**

  `DELETE`

- **URL Params**

  **Required:**

  `channelId=[string]`

- **Result:**

  ```js
  {
    "message": "Channel ZAE12E124321ZE was successfully deleted!"
  }
  ```

---

## Update Channel

Replaces a channel with its updated version.

> To use this channel, you must register and them login, once logged in in Postman you need to put in the header section as key **Authorization** and value **baerer token** where **token** is the code that you are going to receive as response once you are logged in.

- **URL**

  /api/channels/:channelId

- **Method:**

  `PUT`

- **URL Params**

  **Required:**

  `channelId=[string]`

- **Body**

  ```js
  {
    "name": "new name of the channel",
    "id": "the channel id"
  }
  ```

- **Result:**

  ```js
  {
    "name": "Awesome Channel",
    "id": "ZAE12E124321ZE"
  }
  ```

---

## Create Channel

> To use this channel, you must register and them login, once logged in in Postman you need to put in the header section as key **Authorization** and value **baerer token** where **token** is the code that you are going to receive as response once you are logged in.

Creates a new channel with the given name.

- **URL**

  /api/channels

- **Method:**

  `POST`

- **Body**

  ```js
  {
    "name": "the name of the channel you wish to create",
  }
  ```

- **Result:**

  ```js
  {
    "name": "Awesome Channel",
    "id": "ZAE12E124321ZE"
  }
  ```

---

## Messages

> To use _all messages channel_, you must register and them login, once logged in in Postman you need to put in the header section as key **Authorization** and value **baerer token** where **token** is the code that you are going to receive as response once you are logged in.

## Get all messages

Returns a json array of all messages currently in the system.

- **URL**

  /api/messages

- **Method:**

  `GET`

- **Result:**

  ```js
  [
  {
    "text": "The content of the massage",
    "id": "BFE12E1243211ZE",
    "user": "Name of the user who posted the message",
    "date": "2021-08-13T18:25:43.511Z",
    "channelId": "ZAE12E124321ZE"
  },
  ...
  ]
  ```

---

## **Get messages for a specific channel**

Returns a json array of all messages that belong to the specified channel.

- **URL**

  /api/channels/:channelId/messages

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `channelId=[integer]`

- **Result:**

  ```js
  [
  {
    "text": "The content of the massage",
    "id": "BFE12E1243211ZE",
    "user": "Name of the user who posted the message",
    "date": "2021-08-13T18:25:43.511Z",
    "channelId": "ZAE12E124321ZE"
  },
  ...
  ]
  ```

---

## **Delete message**

Removes the specified message from the system.

- **URL**

  /api/messages/:messageId

- **Method:**

  `DELETE`

- **URL Params**

  **Required:**

  `messageId=[integer]`

- **Result:**

  ```js
  {
    "message": "Message BFE12E1243211ZE was successfully deleted!"
  }
  ```

---

## **Update message**

Updates the specified message with the new content.

- **URL**

  /api/messages/:messageId

- **Method:**

  `PUT`

- **URL Params**

  **Required:**

  `messageId=[integer]`

- **Body**

  ```js
  {
     "text": "The content of the massage",
     "id": "BFE12E1243211ZE",
     "user": "Name of the user who posted the message",
     "date": "2021-08-13T18:25:43.511Z",
     "channelId": "ZAE12E124321ZE"
   }
  ```

- **Result:**

  ```js
  {
    "text": "The content of the massage",
    "id": "BFE12E1243211ZE",
    "user": "Name of the user who posted the message",
    "date": "2021-08-13T18:25:43.511Z",
    "channelId": "ZAE12E124321ZE"
  }
  ```

---

## **Create new message**

Creates a new messsage in the specified channel.

- **URL**

  /api/channels/:channelId/messages

- **Method:**

  `POST`

- **URL Params**

  **Required:**

  `channelId=[integer]`

- **Body**

  ```js
  {
     "text": "The content of the massage",
     "user": "Name of the user who posted the message",
   }
  ```

- **Result:**

  ```js
  {
    "text": "The content of the massage",
    "id": "BFE12E1243211ZE",
    "user": "Name of the user who posted the message",
    "date": "2021-08-13T18:25:43.511Z",
    "channelId": "ZAE12E124321ZE"
  }
  ```

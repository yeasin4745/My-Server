# My-Server: Rate-Limited Express Server

## Overview

This project provides a simple Node.js Express server demonstrating basic routing and rate limiting functionality. It includes two main routes: a home route (`/`) and a user route (`/user`), both protected by `express-rate-limit` to prevent abuse and ensure fair resource usage.

## Features

*   **Express.js**: A minimal and flexible Node.js web application framework.
*   **Rate Limiting**: Implemented using `express-rate-limit` to restrict the number of requests a user can make within a specified timeframe.
*   **Request Tracking**: Counts and displays the number of requests made to each route.
*   **Clear Responses**: Provides user-friendly HTML responses for each route, including the client's IP address for the home route.

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js**: [Download & Install Node.js](https://nodejs.org/en/download/)
*   **npm** (Node Package Manager): Comes bundled with Node.js.

## Installation

Follow these steps to set up and run the project locally:

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/yeasin4745/My-Server.git
    cd My-Server
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

## Usage

To start the server, run the following command:

```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified by the `PORT` environment variable).

### Available Routes

*   **Home Route**: `http://localhost:3000/`
    *   Displays a welcome message, your IP address, and the total number of requests made to this route.
    *   Rate-limited to 5 requests per minute.

*   **User Route**: `http://localhost:3000/user`
    *   Displays a welcome message and the total number of requests made to this route.
    *   Rate-limited to 5 requests per minute.

## Rate Limiting Details

Both the home and user routes are configured with a rate limit of **5 requests per minute**. If a client exceeds this limit, they will receive a `429 Too Many Requests` status code along with a message indicating that they have made too many requests.

The `express-rate-limit` middleware is configured with:

*   `windowMs`: 60 * 1000 (1 minute)
*   `max`: 5 (maximum 5 requests)
*   `standardHeaders`: `true` (adds `RateLimit-Limit`, `RateLimit-Remaining`, and `RateLimit-Reset` headers)
*   `legacyHeaders`: `false` (disables `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `X-RateLimit-Reset` headers)

## Code Structure

The core logic resides in `server.js`:

*   **`express`**: Initializes the Express application.
*   **`express-rate-limit`**: Configures and applies rate limiting middleware.
*   **`createLimiter` function**: A helper function to create rate limiters with consistent settings.
*   **Route Handlers**: Defines the behavior for the `/` and `/user` routes, including request counting and sending HTML responses.

## Contributing

Feel free to fork the repository, make improvements, and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the ISC License. See the `LICENSE` file (if present) or the `package.json` for more details.

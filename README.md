# Hotels-Service

This project is a backend service for managing hotel data. It provides APIs to create, read, update, and delete hotel records. The service supports uploading hotel data via JSON and CSV files.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Docker](#docker)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create, read, update, and delete hotel records.
- Upload hotel data via JSON and CSV files.
- Error handling and validation.
- Docker support for containerized deployment.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/IAMongmong/Hotels-Service.git
    cd hotels-service
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:
    Create a [.env](http://_vscodecontentref_/0) file in the root directory and add the necessary environment variables. For example:
    ```env
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=root
    DB_PASSWORD=123456
    DB_NAME=travel
    ```

## Usage

1. Start the server:
    ```sh
    node index.js
    ```

2. The server will be running at `http://localhost:3000`.

## API Endpoints

- `GET /api/hotels`: Get a list of hotels based on filter criteria.
- `GET /api/hotels/:id`: Get details of a specific hotel by ID.
- `POST /api/hotels/upload`: Upload hotel data via JSON or CSV file.
- `PUT /api/hotels/:id`: Update a specific hotel by ID.
- `DELETE /api/hotels/:id`: Delete a specific hotel by ID.

## Testing

Run the tests using Jest:
```sh
npm test
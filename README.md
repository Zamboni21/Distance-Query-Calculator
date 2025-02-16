# Distance Query Calculator

This project calculates the distance between two locations in kilometers using the Nominatim API https://nominatim.org/release-docs/develop/api/Overview/.

## Features

- Input source and destination addresses
- Calculate the distance between the two addresses in kilometers
- Display the result on simple web page
- Handle errors of input and application
- Display the queries made during the session in a separate url

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Zamboni21/Distance-Query-Calculator.git
    ```
2. Navigate to the project directory:
    ```bash
    cd Distance-Query-Calculator
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
## Usage

1. Start the server:
    ```bash
    npm start
    ```
2. Open your web browser and navigate to `http://localhost:3000`.
3. Enter the source and destination addresses in the form and submit.
4. Open `http://localhost:3000/queriesView` to access the Historical Queries.

## Technologies Used

- JavaScript
- Node.js
- Express
- Axios
- Nominatim API
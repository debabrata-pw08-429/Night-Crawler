# Web Crawler AI Chat System

This project is a web application that integrates a web crawler, an AI component, and a chat system. The application can crawl submitted websites, extract content, and use an AI model to respond to user queries related to the extracted content. Users can interact with the AI model through a user-friendly chat interface.

## Demo
 Live Website : https://night-crawler-alpha.vercel.app/

## Features

- **Web Crawler:** Crawls a submitted website and extracts its content, including text, images, and links. The extracted data is stored in a database for further processing.
- **AI Component:** Integrates with an AI model capable of understanding and answering questions based on the extracted content from the website.
- **Chat System:** A user-friendly chat interface allows users to submit a website in the navbar and ask questions about the site's content. The AI provides relevant responses.
- **User Personalization:** Users can provide basic information, such as their name and image, which is used to personalize the chat experience.
- **Dashboard:** Displays user statistics, including the number of queries made and analytics on the homepage.

## Tech Stack

- **Frontend:** ReactJS for building the user interface, including the chat system, user input form, and dashboard.
- **Backend:** Node.js with Express.js for handling API requests, Socket.io for real-time chat communication, and Cheerio for web scraping.
- **Database:** MongoDB for storing extracted content and user queries.
- **AI Integration:** Integration with the Gemini AI model for processing and answering user queries.
- **Deployment:** Vercel and render for deploying the frontend and backend services.

## Justification

- **ReactJS:** Chosen for its component-based architecture, making it easier to build and maintain the UI. Its popularity and robust ecosystem support efficient development.
- **Node.js & Express.js:** Used for the backend to handle API requests and real-time communication, leveraging JavaScript across both frontend and backend for consistency.
- **MongoDB:** A NoSQL database suitable for handling the semi-structured data extracted from websites, allowing for flexibility in storing and querying data.
- **Socket.io:** Provides seamless real-time communication between the chat system and the backend, ensuring instant feedback to user queries.
- **Cheerio:** A lightweight library that makes web scraping efficient, enabling easy extraction of content from HTML.
- **Render:** Selected for its simplicity in deploying backend applications.
- **Vercel:** Selected for its simplicity in deploying frontend applications.

## Installation

To run this application locally, follow these steps:

## Prerequisites

- Node.js and npm installed on your machine
- MongoDB server running locally or in the cloud

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/debabrata-pw08-429/Night-Crawler.git
   cd Night-Crawler
   
2. **Install dependencies**
    ```javascript
    # For front-end
    cd client
    npm install
    
    # For back-end
    cd ../server
    npm install
    ```
3. **Set up environment variables**
   - Create a `.env` file in the root directory of the client and server and add the following variables:
    ```javascript
    # For client
    REACT_APP_BACKEND_URL = <your_backend_url>
    
    # For server
    MONGO_URI = <your_mongo_db_uri>
    GEMINI_API_KEY = <your_gemini_api_key>
    PORT = <your_port_number>
    ```
    
4. **Run the application**
    ```javascript
    # Start the back-end server
    cd server
    npm start
    
    # Start the front-end application
    cd ../client
    npm start
    ```


## Usage
1. Submit a Website: Use the Navbar to submit the website you want to query.
2. Ask Questions: Type your questions in the chat interface, and the AI will respond based on the selected website's content.
3. View Dashboard: Navigate to the dashboard to see user analytics and query statistics.

## Contact
- For any questions or feedback, please contact:
  Email: debabrata.join@gmail.com

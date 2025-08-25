GitHub Repo Search

GitHub Repo Search is a modern, responsive web application that allows users to search for GitHub repositories by keyword using the GitHub API. It displays repository names, descriptions, and links for easy access.

Features

Search GitHub repositories by keyword or topic

View repository name, description, owner, and link

Clean and responsive user interface

Real-time results fetched directly from the GitHub API

Technologies Used

Frontend: React, HTML, CSS, JavaScript

Backend: Node.js, Express.js

API: GitHub REST API

Setup Instructions

Follow these steps to run the project locally:

1. Clone the Repository

git clone https://github.com/Rabiya2626/github-repo-search.git
cd github-repo-search


2. Start the Backend (Server)

cd server
npm install
npm start


The backend server will start on http://localhost:5000.

3. Start the Frontend (Client)

cd client
npm install
npm run dev


The frontend will start on http://localhost:5173.

4. Open the Application

Open your browser and go to http://localhost:5173.

The frontend will communicate with the backend to fetch GitHub repository data.

Note: Ensure that your frontend fetch URL points to the correct backend server. Example in React:

fetch("http://localhost:5000/api/search?query=react")


Usage

Enter a keyword or topic in the search bar.

Click the "Search" button.

Browse through the list of repositories that match your search criteria.

Click on a repository to open it on GitHub.

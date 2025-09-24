# eBook-Creator-ai  
_A full-stack AI-powered eBook creator built with the MERN stack_
_Website:thulebonagwala-ebookapp.netlify.app_
_Demo Login:_
email: thule_10@hotmail.com
Password: Test@123


## Table of Contents  
- [Project Overview](#project-overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Running the App](#running-the-app)  
- [Configuration](#configuration)  
- [Usage](#usage)  
- [Folder Structure](#folder-structure)  
- [Deployment](#deployment)  
- [Roadmap](#roadmap)  
- [Contributing](#contributing)  
- [License](#license)  
- [Acknowledgements](#acknowledgements)  

## Project Overview  
Mern-ebook-Creator-ai is a web application that allows users to **generate, customize and export eBooks** using AI assistance. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), the app offers a clean frontend for users and a robust backend API for processing, storing and exporting content.  
The AI layer can be used to generate chapters, content sections, or structure suggestions for an eBook, making it ideal for authors, content creators, or anyone looking to quickly produce formatted digital books.

## Features  
- User interface for creating new eBooks: specify title, chapter count, styles, etc.  
- AI-assisted content generation for each chapter.  
- Ability to edit and refine generated content inside the UI.  
- Export options: PDF or DOCS.  
- Storage of projects in a database (MongoDB) so users can revisit and edit.  
- Authentication and user management.  
- Responsive frontend with modern UI/UX.

## Tech Stack  
- **Frontend**: React.js 
- **Backend**: Node.js with Express.js for RESTful APIs  
- **Database**: MongoDB (via Mongoose)  
- **AI integration**: (e.g., Gemini API) — used for content generation  
- **Other**: Vite and TailwindCSS.  
- **Deployment**: e.g., netlify (frontend), Render(backend)  

## Getting Started  

### Prerequisites  
- Node.js (v14 + recommended)  
- npm or yarn  
- MongoDB instance (local or hosted e.g., MongoDB Atlas)  
- API key for the AI service.

### Installation  
1. Clone this repository:  
   ```bash  
   git clone https://github.com/thulebonagwala/Mern-ebook-Creator-ai.git  
   cd Mern-ebook-Creator-ai  
   ```
2. Install backend dependencies:
    ```bash  
   cd backend  
   npm install  
   ```
2. Install frontend dependencies:
    ```bash  
   cd frontend  
   npm install  
   ```
### Running the App

 1. Set up your environment variables for backend (see Configuration).
 2. Start the backend server:
    ```bash
    cd backend  
    npm run dev
    ```
 3. Start the frontend app:
    ```bash
    cd frontend  
    npm run dev
    ```
 4. Open your browser and navigate to http://localhost:3000 (or the port your frontend is using).

## Configuration

In the backend directory, create a .env file with the following variables (example):
```bash
MONGODB_URI=your_mongodb_connection_string  
PORT=5000  
AI_API_KEY=your_ai_api_key  
JWT_SECRET=your_jwt_secret  
```


In the frontend, ensure the API base URL matches your backend server (e.g., in ```vite.config.js``` or an ```.env``` file):
```bash
VITE_API_BASE_URL=http://localhost:5000/api  
```

## Usage

1. In the UI, click to create a new eBook project.

2. Enter the book title, number of chapters, style and other metadata.

3. Trigger the AI generation: each chapter will be drafted automatically.

4. Review each chapter, edit as needed using the built-in editor.

5. Once satisfied, select “Export” to download your eBook as PDF (or DOC).

6. (Optional) Save your project to come back later and continue editing.

## Folder Structure
```
/backend  
  ├─ controllers/  
  ├─ models/  
  ├─ routes/  
  └─ server.js  
/frontend  
  ├─ src/  
     ├─ components/  
     ├─ pages/  
     ├─ services/  
     └─ App.jsx  
.gitignore  
README.md  
```


## Deployment

- **Deploy backend:** push to a hosting service (Heroku, Render, AWS EC2) and set environment variables there.

- **Deploy frontend:** build with npm run build and deploy via Vercel, Netlify or your preferred static host.

- Ensure CORS is configured if frontend and backend are on different domains.

- Secure AI API key and any secrets in environment variables.

## Roadmap

- ✅ Add user authentication (sign up/login) with roles.

- ✅ Add chapter templates (e.g., “How-to”, “Storybook”, “Guide”) for different styles.

- ✅ Add drag-and-drop cover creator for eBook.

- ✅ Add DOC export in addition to PDF.

- ✅ Add collaboration (multiple users editing same eBook).

- ✅ Improve AI prompts and support multiple languages.

- ✅ Add analytics/dashboard (number of pages, downloads, etc.).

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.

2. Create your feature branch (git checkout -b feature/my-feature).

3. Commit your changes (git commit -m 'Add some feature').

4. Push to the branch (git push origin feature/my-feature).

5. Open a Pull Request describing your changes.

Please ensure your code follows the existing style and is well documented.

## License

This project is licensed under the MIT License – see the LICENSE
 file for details.

## Acknowledgements

- Thanks to all the open-source projects and libraries used in this stack.

- Inspired by tutorials about building AI powered eBook or content generation apps in MERN.


Thank you for checking out Mern-ebook-Creator-ai! If you use or extend this project, feel free to add your name here or drop a star ⭐.
   

# Realtime Collaborative Document Editing Platform

Welcome to the Realtime Collaborative Document Editing Platform! This platform allows multiple users to collaborate on documents in real-time, ensuring seamless editing and automatic document saving. Below you will find a comprehensive guide on how to set up, use, and contribute to this project.

## Introduction

This platform is a web-based application designed to enable real-time collaborative document editing. It uses React for the frontend, Quill as the rich text editor, MongoDB Atlas for document storage, and Socket.IO for real-time user connection and collaboration. The application is deployed on Vercel, ensuring high availability and scalability.

## Live Demo

Check out the live application [here](https://mydocs1.vercel.app/documents).

## Features

- **Real-time Collaboration**: Multiple users can edit the same document simultaneously, and changes are reflected in real-time.
- **Automatic Document Saving**: Changes are automatically saved to ensure no work is lost.
- **User-friendly Interface**: Easy-to-use interface powered by React and Quill text editor.
- **Secure**: Data is securely stored with MongoDB Atlas.

## Tech Stack

- **Frontend**: React, Quill
- **Backend**: Node.js
- **Real-time Communication**: Socket.IO
- **Database**: MongoDB Atlas
- **Deployment**: Vercel

## Installation

Follow these steps to set up the project locally.

### Prerequisites

- Node.js and npm installed on your machine.

### Steps

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/realtime-collaborative-doc-editing.git
    cd realtime-collaborative-doc-editing
    ```

2. **Install dependencies**:
    ```bash
    cd client
    npm install
    cd..
    cd server
    npm install
    cd..
    ```


3. **Run the server on first terminal**:
    ```bash
    cd server
    node server
     ```
    
4. **Run the client on second terminal**:
    ```bash
    cd cliet
    npm start
    ```    
    

## Usage

1. Open your browser and go to `http://localhost:3000`.
2. Create a new document or select an existing document.
3. Start editing and collaborate in real-time with others.


## Screenshots

To include screenshots in your documentation, use the following template:

```markdown
![Screenshot Description](path/to/screenshot.png)

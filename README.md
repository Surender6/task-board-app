# Task Board Application
A simple full-stack task management application built using FastAPI, JavaScript, and Tailwind CSS. The application allows users to create, manage, and track tasks with real-time progress updates and smart task analysis features.

# Project Overview

This project was developed as a full-stack assignment to demonstrate backend API development, frontend-backend integration, clean UI design, and structured application architecture using Python and FastAPI.

The application supports:

    1.Task creation and deletion
    2.Task completion tracking
    3.Progress monitoring
    4.Smart priority detection
    5.Automatic task categorization
    6.Responsive modern UI

The goal was to build a clean, functional, and user-friendly task management system within a limited development timeframe while maintaining readable and modular code.

# Features
    Add new tasks
    Mark tasks as completed
    Delete tasks
    Real-time progress bar updates
    Task statistics (Total, Completed, Pending)
    Responsive UI using Tailwind CSS
    Enter key support for quick task entry
    Smart Priority Detection:
        Detects High, Medium, or Low priority tasks based on keywords
    Smart Category Detection:
        Automatically categorizes tasks into:
            Work
            Learning
            Personal
            General

# Unique Feature

The application includes an AI-inspired smart task analysis system.

When a user enters a task, the backend automatically analyzes the task title and assigns:

    1.Priority level
    2.Task category

Example:

    urgent client meeting
    → High Priority | Work

    study transformers
    → Medium Priority | Learning

This feature was added to make the application more interactive and context-aware compared to a basic CRUD task manager.

# Tech Stack
    1.Backend
        Python
        FastAPI
        Uvicorn
        Pydantic

    2.Frontend
        HTML
        JavaScript
        Tailwind CSS

    3. Other Tools
        Jinja2 Templates
        REST APIs
        In-memory data storage

# Project Structure

        task-board-app/
    │
    ├── static/
    │   ├── app.js
    │   └── style.css
    │
    ├── templates/
    │   └── index.html
    │
    ├── main.py
    ├── requirements.txt
    └── README.md

# API Endpoints

    1.GET /tasks

    Fetch all tasks

    2.POST /tasks

    Add a new task

    3.PUT /tasks/{id}

    Mark a task as complete/incomplete

    4.DELETE /tasks/{id}

    Delete a task

# Installation & Setup
1. Clone the repository
    git clone <your-github-repo>
    cd task-board-app

2. Create virtual environment
    python -m venv .venv

Activate virtual environment:
Windows
    .venv\Scripts\activate
Mac/Linux
    source .venv/bin/activate

3. Install dependencies
   pip install -r requirements.txt

4. Run the application
uvicorn main:app --reload

5. Open in browser
http://127.0.0.1:8000

Future Improvements
Some possible improvements that can be added later:
    Database integration (PostgreSQL / MongoDB)
    User authentication
    Drag-and-drop task management
    Due dates and reminders
    AI-based task recommendations
    Persistent storage
    Task search and filtering

# Notes
This project uses in-memory storage for simplicity, so tasks reset whenever the server restarts. The focus of the project was on clean architecture, frontend-backend integration, and delivering a polished working solution.



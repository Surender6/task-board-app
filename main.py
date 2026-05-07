from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel

app = FastAPI()

# Mount static folder
app.mount('/static', StaticFiles(directory='static'), name='static')

# Templates
templates = Jinja2Templates(directory='templates')

# In-memory storage
tasks = []


# Task model
class Task(BaseModel):
    title: str


# Priority detection logic

# Priority detection logic

def detect_priority(title: str):
    title = title.lower()

    high_keywords = [
        'urgent',
        'important',
        'asap',
        'critical',
        'immediately',
        'deadline',
        'priority',
        'exam',
        'submission',
        'client',
        'production',
        'payment',
        'interview',
        'fix'
    ]

    medium_keywords = [
        'meeting',
        'project',
        'assignment',
        'study',
        'review',
        'documentation',
        'research',
        'training',
        'practice',
        'planning',
        'presentation',
        'follow up',
        'learning'
    ]

    if any(word in title for word in high_keywords):
        return 'High'

    if any(word in title for word in medium_keywords):
        return 'Medium'

    return 'Low'


# Category detection logic

def detect_category(title: str):
    title = title.lower()

    categories = {
        'Work': [
            'meeting',
            'client',
            'project',
            'deadline',
            'presentation',
            'production'
        ],

        'Learning': [
            'study',
            'learning',
            'practice',
            'assignment',
            'course',
            'research',
            'training'
        ],

        'Personal': [
            'gym',
            'shopping',
            'family',
            'groceries',
            'travel',
            'health'
        ]
    }

    for category, keywords in categories.items():
        if any(word in title for word in keywords):
            return category

    return 'General'

# Home route
# Home route
@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html"
    )


# Get all tasks
@app.get('/tasks')
async def get_tasks():
    return tasks


# Add task
@app.post('/tasks')
async def add_task(task: Task):
    new_task = {
    'id': len(tasks) + 1,
    'title': task.title,
    'completed': False,
    'priority': detect_priority(task.title),
    'category': detect_category(task.title)
}
    
    tasks.append(new_task)
    return {
        'message': 'Task added successfully',
        'task': new_task
    }


# Toggle task completion
@app.put('/tasks/{task_id}')
async def update_task(task_id: int):
    for task in tasks:
        if task['id'] == task_id:
            task['completed'] = not task['completed']
            return {
                'message': 'Task updated successfully',
                'task': task
            }

    return {'error': 'Task not found'}

# Delete task
@app.delete('/tasks/{task_id}')
async def delete_task(task_id: int):
    global tasks

    tasks = [task for task in tasks if task['id'] != task_id]

    return {
        'message': 'Task deleted successfully'
    }
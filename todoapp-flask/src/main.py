from flask import Flask, request, jsonify, abort
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

# Data storage
tasks = {}
current_id = 1

# Get task by ID
def get_task_or_404(task_id):
    task = tasks.get(task_id)
    if task is None:
        abort(404, description="Task not found")
    return task

# GET /tasks
@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(list(tasks.values()))

# GET /tasks/<int:task_id>
@app.route('/tasks/<int:task_id>', methods=['GET'])
def get_task(task_id):
    task = get_task_or_404(task_id)
    return jsonify(task)

# POST /tasks
@app.route('/tasks', methods=['POST'])
def create_task():
    global current_id
    data = request.json
    if not data or not data.get('title'):
        abort(400, description="Title is required")
    
    task_id = current_id
    current_id += 1
    task = {
        'id': task_id,
        'title': data.get('title'),
        'description': data.get('description', ''),
        'status': data.get('status', 'pending'),
        'due_date': data.get('due_date', None)
    }
    tasks[task_id] = task
    return jsonify(task), 201

# PUT /tasks/<int:task_id>
@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = get_task_or_404(task_id)
    data = request.json
    if not data:
        abort(400, description="Request body is empty")

    task['title'] = data.get('title', task['title'])
    task['description'] = data.get('description', task['description'])
    task['status'] = data.get('status', task['status'])
    task['due_date'] = data.get('due_date', task['due_date'])
    return jsonify(task)

# DELETE /tasks/<int:task_id>
@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = get_task_or_404(task_id)
    del tasks[task_id]
    return '', 204

if __name__ == '__main__':
    app.run(debug=True, port=5000)

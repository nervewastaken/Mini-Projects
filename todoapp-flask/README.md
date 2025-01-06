# TodoApp

A simple task management application.
made using
1) Python Flask backend
2) React JS frontend

## Steps to Start

### 1) Clone the Repository

Clone the repository to your local machine using the following command:

```bash
 git clone https://github.com/nervewastaken/todoapp-flask.git
 cd todoapp-flask
```

### 2) Create and Activate a Virtual Environment

Navigate to the todoapp folder and create a virtual environment in the same directory:
```bash
 python -m venv .
```
Activate the virtual environment. 
```bash
 echo "windows"
 Scripts\activate
```
```bash
 echo "macos"
 source bin/activate
```

### 3) Install Python Dependencies
Install the necessary Python dependencies from requirements.txt
```bash
 pip install -r requirements.txt
```

### 4)  Install Node.js Packages
Navigate to the client directory and install the Node.js packages:
```bash
 cd client
 npm install
```

### 5) Run the Python Server
Navigate to the src directory and run the Python server:
```bash
 cd src
 python main.py
```

### 8) Run the React Client
Navigate back to the client directory and start the React client:
```bash
 cd client
 npm start
```

### Folder Structure 
```bash
todoapp/
├── src/
│   └── main.py
├── client/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
├── bin
│   ├── activate
│   └── ...
├── requirements.txt
└── ...

```

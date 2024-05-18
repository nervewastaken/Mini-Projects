import socketio
import psycopg2
import pandas as pd
import time
import eventlet

# Socket.IO setup
sio = socketio.Server()

# Database connection setup
conn = psycopg2.connect(
    dbname='loggingapp',
    user='postgres',
    password='1234',
    host='localhost',
    port='5432'
)
cursor = conn.cursor()

# Function to insert data into the PSQL database
def insert_into_db(data):
    insert_query = """
    INSERT INTO logs (power, status, posx, posy) 
    VALUES (%s, %s, %s, %s)
    """
    cursor.execute(insert_query, data)
    conn.commit()

# Handle connection event
@sio.event
def connect(sid, environ):
    print(f"Connected: {sid}")

# Handle disconnection event
@sio.event
def disconnect(sid):
    print(f"Disconnected: {sid}")

if __name__ == "__main__":
    # Start Socket.IO server
    app = socketio.WSGIApp(sio)

    # Get row values from the user
    while True:
        power = input("Enter power value: ")
        status = input("Enter status value: ")
        posx = input("Enter posx value: ")
        posy = input("Enter posy value: ")

        # Insert the row values into the database
        insert_into_db((power, status, posx, posy))

        # Emit data to connected clients
        sio.emit('data', {'power': power, 'status': status, 'posx': posx, 'posy': posy})

        time.sleep(5) 
       

    # Keep the script running
    eventlet.wsgi.server(eventlet.listen(('', 5000)), app)  # Change port as needed

Hello

This project records the logs of a robot in real time using a python program and socket.io, stores the data in PostgreSQL and displays the data in a PERN full stack project 

Fullstack
1) This is PERN stack project
2) pull repo
3) install node modules in package.json
4) cd server - npm run dev
5) cd client - npm start

PostgreSQL
1) Database Name - loggingapp
2) Table Name - logs
3) Column names - Power, Status, posx, posy (logid, logtime update automatically)
4) datatype - Power (NUMERIC) , Status (VARCHAR) , posx,posy (NUMERIC), logid (int, default increment), logtime (TIMESTAMP WITHOUT TIME ZONE , default CURRENT_TIMESTAMP)
5) Change the parameters in /fullstack/server/database.js to your system

Python
1) create a virtual env in python
2) download necessary packages from requirements.txt
3) configure postgreSQL with the required columns and commands 

While you are here do check out other projects!

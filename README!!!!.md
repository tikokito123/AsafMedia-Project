# Running the App

if you have docker/ docker compose... please do as follow

1. clone the git: https://github.com/tikokito123/AsafMedia-Project.git

2. make sure the env is set to host.docker.internal:27017/(your database)

3. go to the file directory, and run the command on the bash: dcoker-compose build.

4. after you built the app, run docker-compose up


if there is no docker on your computer do as follow

1. clone the git: https://github.com/tikokito123/AsafMedia-Project.git

2. open the bash and go to the client folder, and run npm install and then npm start, or if you want to build it, run npm run build.

3. go to the env and change the mongourl to fit the localhost:27017/(your DB)

4. now open another bash after running the client, go to the server directory and run npm install and npm start again. 

5. now the app will run on localhost:3001 if you want the server and localhost:3000 if you want the client and didn't use the app.

# Bugs in the app
1. I didn't manage to finish the browse map, so it doesn't work!


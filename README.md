# Redis based Weather Web-App
This is an upgraded weather web-app, which demonstrates the use of few production level tech stack. <br>
This web-app uses Redis and Docker two of the most essential tech used for production.
***
Redis is an in-memory, NoSQL data structure. All data in redis is stored in a key-value pair. This enables caching with which we can access recently searched items faster. Hence faster then directly retrieving data from a database, thus providing a finer user experience.

Docker is an open source containerization platform. It enables developers to package applications into containers. Hence combining application source code with the operating system (OS), libraries and dependencies required to run that code in any environment.

## Working of the Web-App
This weather app is primarily built using node, express, ejs, redis and OpenWeather API. It enables user to search for the weather conditions of a entered city location. When a user searches for the weather conditions of a city our program makes an API call with the city as a parameter. This parameterised API call then fetches data from the server of the data provider, this data is then used and rendered to the UI of the user. If the location is previously searched (in the past 10 minutes) the program fetches data from the redis server (which is much faster about 200-300 times), rather than fetching data from the database to which the API calls. 
The redis data is set with an expiration of 5-10 minutes, because data on weather conditions are variable with time, but there wont be much difference in weather conditions in a span of 5-10 minutes. Hence it is set with an expiration within that range of time. Thus using redis in this application is not the best use case. Hence it should be kept in mind that this application is developed only for the demonstration purpose of Redis and contanerisation of the web-app. Thus demonstrating production level design.

***
### Hence this project is created to demonstrate these production level tech-stack.

To use this project download or clone it to your device. Make sure to type npm install in your terminal.
If familiar with docker you can use docker-compose up to run the web-app.


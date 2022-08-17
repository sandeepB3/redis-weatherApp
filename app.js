require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const redis = require("redis");
const expire = 360; 

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

const redisClient = redis.createClient({
  host: 'redis-server',
  port: 6379
});

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  let weatherData = null;
  const query = req.body.cityName;
  const apiKey = process.env.API_KEY;
  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

  getData();

  function getData() {
    console.time()
    redisClient.get(`weather?search=${query}`, async (err, wdata) => {

      try{
        if(err){
          console.log(err);
        }

        if(wdata != null){
          weatherData = JSON.parse(wdata)
          // console.log(weatherData);
          console.log("Cache Hit")
          console.timeEnd();
        }
        else{
          const resolved = await axios.get(url);
          weatherData = resolved.data;
          redisClient.setex(`weather?search=${query}`, expire, JSON.stringify(weatherData));
          // console.log(weatherData);
          console.log("Cache Miss")
          console.timeEnd();
        }

        const temp = weatherData.main.temp;
        const descp = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.render("search",{
          title: query,
          temp:temp,
          type:descp,
          image:imageURL});
      }
      catch(err){
        console.log("Invalid Data")
        console.timeEnd();
        res.sendFile(__dirname+"/error.html");
      }
    });
  }

});


app.listen(3000, function(){
  console.log("Running");
});


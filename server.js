const express = require("express");
const bodyParser = require("body-parser")
const https = require("https")
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req,res){
	res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req,res){
	var city = req.body.city;
	const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=9fa342d7f607bfd28b0238f970724e2b&units=metric";
    https.get(url, function(response){
	console.log(response.statusCode);
	response.on("data", function(data){
		const weatherData = JSON.parse(data);
		const temp = weatherData.main.temp;
		const weatherDescription = weatherData.weather[0].description;
		const icon = weatherData.weather[0].icon;
		const imageurl = "http://openweathermap.org/img/wn/" + icon +"@2x.png";
		res.write("<p>The weather is currently " + weatherDescription + "</p>");
		res.write("<h1>The temperature in "+ city +" is " + temp + " degrees Celcius.</h1>");
		res.write("<img src=" + imageurl + ">");
		res.send();
	})
})	
});
app.listen(3000 ,function(){
	console.log("Server started on port 3000");
});
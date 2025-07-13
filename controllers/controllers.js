const axios = require('axios');
const client = require('../utils/redis');

const getWeather = async (req,res)=>{
    const city = req.query.city;

    const cachedData = await client.get(city.toLowerCase());

    if(cachedData){
        console.log("Serving from Redis cache");
        return res.status(200).json(JSON.parse(cachedData));
    }

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${process.env.WEATHER_API_KEY}&contentType=json`;

    try{
        const response = await axios.get(url);
        const data = response.data;
        const weatherData = {
            Address : data.address,
            Full_Address : data.resolvedAddress,
            Temperature : data.days[0].temp,
            Description : data.description,
        };

        await client.setEx(city.toLowerCase() , 3600 , JSON.stringify(weatherData));
        console.log("Serving from API and storing in Redis");
        return res.status(200).json(weatherData);
        
    } catch(err){
        res.status(500).json({error :"Weather data fetch failed" + err.message});
    }
}

module.exports = {getWeather};
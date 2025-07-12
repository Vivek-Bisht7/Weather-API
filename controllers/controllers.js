const axios = require('axios');

const getWeather = async (req,res)=>{
    const city = req.query.city;

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${process.env.WEATHER_API_KEY}&contentType=json`;

    try{
        const response = await axios.get(url);
        const data = response.data;
        res.json({
            Address : data.address,
            Full_Address : data.resolvedAddress,
            Temperature : data.days[0].temp,
            Description : data.description,
        });
    } catch(err){
        res.status(500).json({error :"Weather data fetch failed" + err.message});
    }
}

module.exports = {getWeather};
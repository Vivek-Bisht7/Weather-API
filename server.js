const express = require('express');
const app = express();
const weatherRoutes = require('./routes/routes');

require('dotenv').config()

app.use('/',weatherRoutes);

app.listen(process.env.PORT,()=>{
    console.log("Server has started running");
    
})
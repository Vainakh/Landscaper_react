const express = require('express');
const app = express();



const port = Number(process.env.PORT || 4000); 
app.listen(port, function () {  console.log('JSON Server is running')}); 


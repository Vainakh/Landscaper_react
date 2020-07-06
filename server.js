const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, "./../client/dist")));


const port = Number(process.env.PORT || 4000); 
app.listen(port, function () {  console.log('JSON Server is running')}); 


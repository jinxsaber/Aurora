const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));
let Data = [];

fs.readFile('./data/Cities.json','utf8',(err,data)=>{
    if(err){
        console.log('Error Fetching');
        return;
    }
    Data = JSON.parse(data);
    console.log(Data);
});

app.get('/',(req,res)=>{
    res.sendFile('./index.html',{root: __dirname});
});

app.get('/Locations',(req,res)=>{
    res.json(Data);
});

// app.listen(3000, ()=>{
//     console.log('Running');
// });

module.exports = app;

// set up the server/dependencies
// const express = require('express');
// const app = express();
// const fs = require('fs');
import express from 'express';
import fs from 'fs';
const app = express();
// make a variable of data array
// let dataArray  
// const index = Number(req.url.slice(req.url.lastIndexOf('/') + 1))  => localhost:800/pets/0
//readfiile in the pets.json
fs.readFile('../pets.json', 'utf-8', (error, data)  => {
    if(error){
        console.error("error, cant read pet data")
        return;
    }
    const dataparsed = JSON.parse(data);

    app.use(function(req, res, next) { // this is like the if portion, if it's all good, it'll go down to the next function
        console.log('request method ', req.method);
        console.log('request path ', req.url);
        next();
    });
    
    // set up the routes (endpoints)
    app.get('/pets', function (req, res) { // this is handling an if statement for method and url, somehow...
        res.send( dataparsed /* some path?? here */);
        console.log("it works")
    });

    app.get('/pets/0', function (req, res) { // this is handling an if statement for method and url, somehow...
        res.send(dataparsed[0] /* some path?? here */);
        console.log("we reached to pets/0")
    });
    app.get('/pets/:num', function (req, res, next) { // this is handling an if statement for method and url, somehow...
        const { num } = req.params // whatever is after the key in ???
        //console.log(req.params);
        if (!Number(num) || num > dataparsed.length - 1) {
            next({ status: 404, message: 'Not Found' })
        }
        res.send(dataparsed[num] /* some path?? here */);
        console.log("we reached to pets at a given index")
    });
    
    app.use(function(err, req,res,next) {
        console.log('hit the bottom middleware');
       res.status(err.status).json({ error: err })
       
    });
    
});

// start the server listening
app.listen(8000, function() {
    console.log('server listening on port 8000');
});






// app.get('/:num', (req, res, next) => {
//     const num = req.params.num
//     if (!Number(num)) {
//       next({ status: 400, message: 'Please enter a number!' })
//     } else {
//       res.json({ message: `${num} is a great number.` })
           //let petsNum = (`/pets${num}`)
          // res.send(dataparsed[num])
//     }
//   })
  
//   app.use((err, req, res, next) => {
//     res.status(err.status).json({ error: err })
//   })



// //set up dependencies
// let express = require('express');
// let fs = require('fs')
// let app = express()
// let port = process.env.PORT || 8000;


// //handle requests with routes. call in 
// app.get('/pets', (req, res) =>{
//     res.status(200)
//     res.send(petsData())
// })



// //need to readfile to get data, maybe wrap in a function and invoke in "handle requests with routes"?
// function petsData(){
//     fs.readFile('../pets.json', 'utf-8', (error, data) => {
//         if(error){
//             console.erorr('not working on receiving data')
//         }else{
//             //res.status(200);
//             //res.set('Content-Type', 'application/json' );
//             console.log('it is working')
//             console.log(data);
//         }
//     })
// }


// //listen on a port
// app.listen(port, function(){
//     console.log("server is running", port)
// })
function readPetsData(callback) {
    fs.readFile('pets.json', 'utf-8', function (err, data) {
      if (err) {
        console.error('Error reading pets data:', err.message);
        callback([]);
      } else {
        callback(JSON.parse(data));
      }
    });
  }
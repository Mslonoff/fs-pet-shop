import * as fs from 'fs';
import express from 'express';
import petsData from '../pets.json' assert {type: 'json'};
import { exit } from 'process';
 const app = express();
 app.use(express.json());
 app.use(logger);

app.post('/pets', (req, res) => {
    // req.body should be the new movie to create in JSON
    const newPet = req.body;
    console.log(newPet); // make sure you're getting what you expect
    petsData.push(newPet);
    // res.status(201).send(`Movie added ${newMovie}`)
    fs.writeFile('../pets.json', JSON.stringify(petsData), (err) => {
        if(err) {
            console.error(err);
            exit(1);
        } else {
            res.status(200).setHeader('Content-Type', 'application/json').send(petsData);
        }
    });
});

app.get('/pets/:index', (req, res, next) => {
    const { index } = req.params;
    console.log('index', index);
    if(Number.isInteger(Number(index)) && index < petsData.length && index >= 0) {
        res.status(200).send(petsData[index]);
    }
    next();
})

app.listen(5000, () => {
    console.log("App listening at 8000");
 })

 function logger(req, res, next) {
    console.log('Request Method: ', req.method);
    console.log('Request Path: ', req.url);
    next();
 }
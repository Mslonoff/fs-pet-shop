import * as fs from 'fs';
import express from 'express';
import petsData from '../pets.json' assert {type: 'json'};
// import { exit } from 'process';

 const app = express();

 app.use(express.json()); // used to populate the request body otherwise it's undefined

 app.use(logger);

 app.get('/pets/', (req, res) => {
    fs.readFile('../pets.json', 'utf8', (error, data) => {
        if(error) {
            console.error(error);
            res.status(500).send('There was an error, good luck.');
        }
        else {
            console.log(data);
            res.send(data);
        }
    })
    // const { index } = req.params;
    // console.log('index', index);
    // if(Number.isInteger(Number(index)) && index < petsData.length && index >= 0) {
    //     res.status(200).send(petsData[index]);
    // }
    // next();
    // this was part of me and Morgan's, working, above is Kevin's 
});

app.post('/pets', (req, res) => {
    let newPet = req.body;
    let {age, kind, name} = newPet;
    console.log(newPet);
    if(name === undefined || typeof age !== 'number' || age === undefined || kind === undefined) {
        res.status(400).send('That is not a valid pet, did not work');
    }
    else {
    let newFileData = JSON.stringify([...petsData, newPet]); 
    fs.writeFile('../pets.json', newFileData, (error, data) => {
        if(error) {
            console.error(error);
            res.status(500).send('Try again later');
        }
        else {
            petsData.push(req.newPet);
            res.status(201).send(JSON.stringify(newPet))
        }
    })
}
})
// below worked for me and Morgan, above is Kevin's 
// app.post('/pets', (req, res) => {
//     // req.body should be the new movie to create in JSON
//     const newPet = req.body;
//     console.log(newPet); // make sure you're getting what you expect
//     petsData.push(newPet);
//     // res.status(201).send(`Movie added ${newMovie}`)
//     fs.writeFile('../pets.json', JSON.stringify(petsData), (err) => {
//         if(err) {
//             console.error(err);
//             exit(1);
//         } else {
//             res.status(200).setHeader('Content-Type', 'application/json').send(petsData);
//         }
//     });
// });



app.patch('/pets/:index', (req, res) => {
    const { index } = req.params;
    console.log('index', index);
    const update = req.body;
    res.send(petsData[index]);

})

app.listen(5000, () => {
    console.log("App listening at 8000");
 });

 function logger(req, res, next) {
    console.log('Request Method: ', req.method);
    console.log('Request Path: ', req.url);
    next();
 }
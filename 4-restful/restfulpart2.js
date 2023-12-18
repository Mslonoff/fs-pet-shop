import express from 'express';
import pg from "pg";

const { Pool } = pg;

const app = express();
const expressPort = 5000;

const pool = new Pool({
  user: "matthewslonoff",
  password: 'slonoff4',
  host: "localhost",
  database: "petshop",
  port: 5432,
});

app.use(express.json());

app.get("/pets", (req, res) => { // get is good to go
  //query the database for city data
  pool
    .query("SELECT * FROM pets")
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).send("Sorry your pet not found");
    });
});

app.post("/pets", (req, res) => { // post is good to go
  let { age, kind, name } = req.body;
   let queryParams = [age, kind, name];
    pool.query('INSERT INTO pets (age, kind, name) VALUES($1, $2, $3)', queryParams)
    .then((result) => res.send("New Pet Added~!"))
    .catch((error) => {
      console.error(error);
      res.status(500).send("Sorry, can't add a new pet now.");
    });
});

app.get("/pets:index", (req, res) => { // working on this now
  const { index } = req.params;
  // if index is a number, index is less than length of data, and greater than 0
    pool
      .query("SELECT * FROM pets WHERE id = $1", [index])
      .then((result) => {
      if (result.rows.length > 0) {
        res.status(200).send(result.rows)
        } else {
        res.status(404).send('Pet not found');
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Sorry your pet not found");
    });
})
//below patch probably doesn't work yet
app.patch('/pets/:index', (req, res) => {
    let index = req.params.index;
    let { age, kind, name } = req.body;
    let queryParams = [age, kind, name, index];
    db.query('UPDATE pets SET name=$1 WHERE id = $2:', [name, index])
    .then((result) => res.status(200).send('pet name updated'))
    .catch((error) => {
        console.error(error)
        res.status(500).send('Error - failed to update pet')
    })
})

app.listen(expressPort, () => console.log("Listening at port ", expressPort));
// Morgan's:
// app.get("/pets/:index", (req, res) => {
//     console.log("req params", req.params);
//     const { index } = req.params;
//     console.log("id", index);
//     pool
//       .query("SELECT * FROM pets WHERE id = $1", [index])
//       .then((result) => {
//         if (result.rows.length > 0) {
//           res.status(200).send(result.rows);
//         } else {
//           res.status(404).send("Pet not found");
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//         res.status(500).send("Internal Server Error");
//       });
//   });
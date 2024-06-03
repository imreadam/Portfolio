const express = require('express')
var cors = require('cors')
var mysql = require('mysql')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.static('kepek'))


var connection

function kapcsolat(){
    connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'etterem'
    })

    connection.connect()
}




app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/etlap', (req, res) => {

    kapcsolat()
    connection.query('SELECT * from etlap', function (err, rows, fields) {
      if (err) throw err
    
      console.log(rows)
      res.send(rows)
    })
   connection.end()
   })



app.post('/kereses', (req, res) => {
 
    kapcsolat()
    console.log(req.body.bevitel1)
    connection.query(`SELECT * from etlap where neve like "%${req.body.bevitel1}%"`, function (err, rows, fields) {
      if (err) throw err
    
      console.log(rows)
      res.send(rows)
    })
   connection.end()
   })


app.post('/felvitel', (req, res) => {
 
    kapcsolat()
    connection.query(`INSERT INTO etlap  VALUES (null, "${req.body.bevitel1}", ${req.body.bevitel2}, ${req.body.bevitel3}, ${req.body.bevitel4}, "${req.body.bevitel5}") `, function (err, rows, fields) {
      if (err) 
      res.send("Hiba!")
       else 
      res.send("A felvitel sikerült.");
    })
    connection.end()
})

app.post('/modositas', (req, res) => {
 
    kapcsolat()
    connection.query(`UPDATE etlap SET neve="${req.body.bevitel1}", energia=${req.body.bevitel2}, szenh=${req.body.bevitel3}, ara=${req.body.bevitel4}, kategoria="${req.body.bevitel5}" where id=${req.body.bevitel6} `, function (err, rows, fields) {
      if (err) 
      res.send("Hiba!")
       else 
      res.send("A felvitel sikerült.");
    })
    connection.end()
})


app.delete('/torles', (req, res) => {
 
    kapcsolat()
    connection.query(`delete from etlap where id=${req.body.bevitel1} `, function (err, rows, fields) {
      if (err) 
      res.send("Hiba!")
       else 
      res.send("A törlés sikerült.");
    })
    connection.end()
   })




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
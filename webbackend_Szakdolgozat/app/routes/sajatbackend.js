const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  
  var connection
  function kapcsolat(){
    var mysql = require('mysql')

    connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'webrobiadam'
    })
    
    connection.connect()
    
  }
  
  
  app.get('/film', (req, res) => {
    kapcsolat()
    connection.query('SELECT * from film', function (err, rows, fields) {
      if (err) throw err
      console.log(rows)
      res.send(rows)
    })
    
    connection.end()
  })


  app.post('/szavazatfelvitel', (req, res) => {
    kapcsolat()
    connection.query('insert into szavazat values (null,'+req.body.bevitel1+')', function (err, rows, fields) {
      if (err) {
        console.log("Hiba!")
        res.send("Hiba!")
      }
      else {
      console.log("Szavazatát rögzítettük!")
      res.send("Szavazatát rögzítettük!")
    }
    })
    connection.end()
  })
app.post('/keres', (req, res) => {
  kapcsolat()    
    let parancs='SELECT * from film where film_cim like "%'+req.body.bevitel1+'%"'
    connection.query(parancs, function (err, rows, fields) {
      if (err) {
        console.log("Hiba")
      }
    else{
      console.log(rows)
      res.send(rows)
    }
     
    })
    
    connection.end()
 })
 
 //Saját backendvégpont
 app.get('/menhelyekkiiras', (req, res) => {
  kapcsolat()

connection.query('SELECT * FROM menhelyek inner join telepulesek on menhelyek.menehelyek_telepules = telepulesek.telepules_id order by menhelyek.menhelyek_id', (err, rows, fields) => {
if (err) throw err

console.log(rows)
res.send(rows)
})
connection.end()
})

app.get('/lenyilolista', (req, res) => {
  kapcsolat()

connection.query('SELECT * FROM telepulesek', (err, rows, fields) => {
  if (err) throw err

  console.log(rows)
  res.send(rows)
})
connection.end()
  })
  

//SELECT film.film_cim, COUNT(szavazat_id) as "Szavazatok száma" from szavazat inner join film on film.film_id = szavazat_film GROUP BY film.film_id

app.get('/diagram', (req, res) => {
  kapcsolat()

connection.query('SELECT date_format(orokbefogadas.orokbefogadas_datum, "%M") as honap, COUNT(orokbefogadas.orokbefogadas_id) as orokbefogadasok FROM orokbefogadas GROUP by honap ORDER BY orokbefogadas_datum ASC', (err, rows, fields) => {
  if (err) throw err

  console.log(rows)
  res.send(rows)
})
connection.end()
  })



app.delete('/torles_elveszett', (req, res) => {
  kapcsolat()
  connection.query(`DELETE FROM elveszett WHERE elveszett_id = ${req.body.bevitel1}`, function (err, rows, fields) {
    if (err) {
      console.log("Hiba!")
      res.send("Hiba!")
    }
    else {
    console.log("Törlés sikerült!")
    res.send("Törlés sikerült!")
    }
  })
  connection.end()
})

app.get('/elveszett', (req, res) => {
  kapcsolat(); // Assuming kapcsolat is a function to establish a database connection

  connection.query('SELECT * FROM elveszett', (err, rows, fields) => {
    if (err) {
      console.error('Hiba a lekérdezés során: ' + err);
      res.status(500).send('Hiba a lekérdezés során');
      return;
    }

    res.json(rows);
  });

  connection.end(); // Close the database connection
});

app.delete('/torles_allatok', (req, res) => {
  kapcsolat()
  connection.query(`DELETE FROM allatok WHERE allatok_id = ${req.body.bevitel1}`, function (err, rows, fields) {
    if (err) {
      console.log("Hiba!")
      res.send("Hiba!")
    }
    else {
    console.log("Törlés sikerült!")
    res.send("Törlés sikerült!")
    }
  })
  connection.end()
})


app.get('/allatok', (req, res) => {
  kapcsolat(); // Assuming kapcsolat is a function to establish a database connection

  connection.query('SELECT * FROM allatok', (err, rows, fields) => {
    if (err) {
      console.error('Hiba a lekérdezés során: ' + err);
      res.status(500).send('Hiba a lekérdezés során');
      return;
    }

    res.json(rows);
  });

  connection.end(); // Close the database connection
});
};


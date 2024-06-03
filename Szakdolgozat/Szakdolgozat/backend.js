const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { isEmail } = require('validator');
const nodemailer = require('nodemailer'); 
const crypto = require('crypto');

const app = express();
const port = 22004;

app.use(cors());
app.use(express.json());
app.use(express.static('kepek'))
app.use(bodyParser.json());

var connection

let felhasznaloId = null;

function kapcsolat()
{
   	connection = mysql.createConnection({
    host: '192.168.100.103',
  	user: 'u74_xnyHZCfhy8',
  	password: '9FktdIJsT0a7J!izculH!oLW',
  	database: 's74_db',
  })
  
  connection.connect()
  
}

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './kepek');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });


app.get('/kepek/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  res.sendFile(__dirname + '/kepek/' + imageName);
});

function generateActivationCode(length = 8) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomBytes = crypto.randomBytes(length);
  let activationCode = '';

  for (let i = 0; i < length; i++) {
    const index = randomBytes[i] % characters.length;
    activationCode += characters.charAt(index);
  }

  return activationCode;
}

app.post('/api/upload', upload.array('photo', 3), (req, res) => {
  kapcsolat()
  console.log('file', req.files);
  console.log('body', req.body);

  //------------adatb-be valo felvitel----------

  
    
    connection.query(`INSERT INTO menhelyek VALUES (NULL,'${req.body.bevitel1}', '${req.body.bevitel2}', '${req.body.bevitel3}', '${req.body.bevitel4}', ${req.body.selectedTelepules} , '${req.files[0].filename}', 1)`, (err, rows, fields) => {
    if (err){
      console.log("Hiba")
      res.send("Hiba")
    }
    else{
      console.log("Sikeres felvitel")
      res.send("Sikeres felvitel")
    }
  })
  connection.end() 
});


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

app.post('/keresfelhasznalo', (req, res) => {
        kapcsolat()
        
        connection.query(`select * from felhasznalok LEFT join orokbefogadas on felhasznalok.felhasznalok_id = orokbefogadas.ofelhasznalo_id left join allatok on allatok.allatok_id = orokbefogadas.orokbefogadas_allatid WHERE felhasznalok.felhasznalok_id = ${req.body.atkuld11};`, (err, rows, fields) => {
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

app.post('/allatkiiras', (req, res) => {
        kapcsolat()
        
        connection.query(`select * from allatok where allatok_id = ${req.body.atkuld21};`, (err, rows, fields) => {
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

app.post('/orokbefelvitel', (req, res) => {
kapcsolat()

connection.query(`INSERT INTO orokbefogadas VALUES (NULL,${req.body.atkuld22},"2024-02-05",${req.body.atkuld21})`, (err, rows, fields) => {

if (err){
  console.log("Hiba")
  res.send("Hiba")
}
else
  {
        console.log("Sikeres felvitel")
  		res.send("Sikeres felvitel")
  }


})
connection.end() 
})
    
 app.post('/orokbefelvitelupdate', (req, res) => {
kapcsolat()


connection.query(`update allatok set allatok_orokbefogadas = 1 where allatok_id = ${req.body.atkuld21}`, (err, rows, fields) => {
if (err){
  console.log("Hiba")
  res.send("Hiba")
}
else
  {
        console.log("Sikeres felvitel")
  		res.send("Sikeres felvitel")
  }


})
connection.end() 
})

app.post('/keresvaros', (req, res) => {
        kapcsolat()
        
        connection.query(`select * from menhelyek inner join telepulesek on menehelyek_telepules = telepules_id WHERE menehelyek_telepules = ${req.body.atkuld1};`, (err, rows, fields) => {
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
      

app.post('/telepulesenkent', (req, res) => {
        kapcsolat().then(connection => {
          connection.query(`select * from menhelyek inner join telepulesek on menehelyek_telepules = telepules_id WHERE menehelyek_telepules = ${req.body.atkuld1} `, (err, rows, fields) => {
            if (err) {
              console.log("Hiba", err);
              res.status(500).send("Hiba");
            } else {
              console.log(rows);
              res.send(rows);
            }
            // Kapcsolat felszabadítása
            connection.release();
          });
        }).catch(error => {
          console.error("Kapcsolat hiba", error);
          res.status(500).send("Kapcsolat hiba");
        });
      });

app.get('/orokbefogadas', (req, res) => {
    kapcsolat()
  connection.query('SELECT * FROM felhasznalok inner join orokbefogadas on felhasznalok.felhasznalok_id = orokbefogadas.orokbefogad_felid where orokbefogadas.orokbefogad_felid = felhasznalok.felhasznalok_id and felhasznalok.felhasznalok_id = orokbefogadas.orokbeadas_felid', (err, rows, fields) => {
    if (err) throw err
  
    console.log(rows)
    res.send(rows)
  })
  connection.end()
    })


    app.get('/orokbefogad', (req, res) => {
      kapcsolat()
    
    connection.query('select felhasznalok.felhasznalok_id, felhasznalok.felhasznalo_teljesnev,orokbefogadas.orokbefogado ,orokbefogadas.orokbeado from felhasznalok inner join orokbefogadas on felhasznalok.felhasznalok_id = orokbefogadas.ofelhasznalo_id', (err, rows, fields) => {
      if (err) throw err
    
      console.log(rows)
      res.send(rows)
    })
    connection.end()
      })

    app.get('/lenyilolista2', (req, res) => {
          kapcsolat()
        
        connection.query('SELECT * FROM felhasznalok', (err, rows, fields) => {
          if (err) throw err
        
          console.log(rows)
          res.send(rows)
        })
        connection.end()
          })

app.post('/login', (req, res) => {
  const { felhasznalo_nev, felhasznalo_jelszo } = req.body;
  if (felhasznalo_nev === "" || felhasznalo_jelszo === "") {
    res.status(400).json({ message: 'Felhasználónév és jelszó kötelezőek' });
    return;
  }
  kapcsolat();
  connection.query(
    'SELECT * FROM felhasznalok WHERE felhasznalo_nev = ? AND felhasznalo_jelszo = ?',
    [felhasznalo_nev, felhasznalo_jelszo],
    (error, results) => {
      if (error) {
        console.error('Hiba a lekérdezés során: ' + error.stack);
        res.status(500).send('Hiba a lekérdezés során');
        return;
      }

      if (results.length > 0) {
        const felhasznaloId = results[0].felhasznalok_id.toString(); // Convert to string
        res.send({ felhasznaloId });
      } else {
        res.status(401).json({ message: 'Hibás felhasználónév vagy jelszó' });
      }
    }
  );
});

async function isUsernameUnique(username) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM felhasznalok WHERE felhasznalo_nev = ?';
    connection.query(sql, [username], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.length === 0);
      }
    });
  });
}

app.post('/register', async (req, res) => {
    kapcsolat();
    const {
        felhasznalo_teljesnev,
        felhasznalo_nev,
        felhasznalo_jelszo,
        felhasznalo_email,
        felhasznalo_telefon,
        felhasznalok_menhelyid,
        felhasznalo_admin
    } = req.body;

    const isUsernameUniqueResult = await isUsernameUnique(felhasznalo_nev);

    if (!isUsernameUniqueResult) {
        res.status(400).json({ message: 'A felhasználónév már foglalt.' });
        return;
    }

    const activationCode = generateActivationCode();

    const sql = `
    INSERT INTO felhasznalok 
    (felhasznalok_id,felhasznalo_teljesnev, felhasznalo_nev, felhasznalo_jelszo, felhasznalo_email, felhasznalo_telefon, felhasznalok_menhelyid, felhasznalo_admin, activationCode) 
    VALUES (NULL,?, ?, ?, ?, ?, ?, ?, ?)
  `;

    connection.query(
        sql,
        [
            felhasznalo_teljesnev,
            felhasznalo_nev,
            felhasznalo_jelszo,
            felhasznalo_email,
            felhasznalo_telefon,
            felhasznalok_menhelyid,
            felhasznalo_admin || 0, // Ha nincs megadva, akkor 0 az alapértelmezett érték
            activationCode,
        ],
        (err, result) => {
            if (err) {
                console.error('Hiba a regisztráció során:', err);
                res.status(500).json({ message: 'Hiba a regisztráció során.' });
            } else {
                console.log('Sikeres regisztráció');

                // Send activation email
                sendVerificationEmail(felhasznalo_email, activationCode);

                res.status(200).json({ message: 'Sikeres regisztráció' });
            }
        }
    );
});

function sendVerificationEmail(email, verificationCode) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sziavangazdad@gmail.com',
      pass: 'ImreRobert&&',
    },
  });

  const mailOptions = {
    from: 'sziavangazdad@gmail.com',
    to: email,
    subject: 'Activate Your Account',
    text: `Your activation code is: ${verificationCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending activation email:', error);
    } else {
      console.log('Activation email sent:', info.response);
    }
  });
}




app.get('/lenyilolistafaj', (req, res) => {
    kapcsolat();
  connection.query('SELECT * FROM fajok', (error, results) => {
    if (error) {
      console.error('Hiba a lekérdezés során: ' + error.stack);
      res.status(500).send('Hiba a lekérdezés során');
      return;
    }
    res.json(results);
  });
});

app.get('/lenyilolistaalfaj/:fajId', (req, res) => {
  const fajId = req.params.fajId;
    kapcsolat();
  connection.query('SELECT * FROM alfajok WHERE alfajok_faj = ?', [fajId], (error, results) => {
    if (error) {
      console.error('Hiba a lekérdezés során: ' + error.stack);
      res.status(500).send('Hiba a lekérdezés során');
      return;
    }
    res.json(results);
  });
});

app.get('/allatok', (req, res) => {
    kapcsolat();
  const fajId = req.params.fajId;
  connection.query('SELECT * FROM allatok INNER JOIN fajok ON allatok.allatok_faj_id = fajok.fajok_id', (error, results) => {
    if (error) {
      console.error('Hiba a lekérdezés során: ' + error.stack);
      res.status(500).send('Hiba a lekérdezés során');
      return;
    }
    res.json(results);
  });
});
app.post('/api/upload2', upload.array('photo', 3), async (req, res) => {
  console.log('file', req.files);
  console.log('body', req.body);

  const { bevitel1, bevitel2, selectedLanguage, selectedAlfaj, felhasznaloId } = req.body;

  if (!bevitel1 || !bevitel2 || !selectedLanguage || !selectedAlfaj || !felhasznaloId) {
    res.status(400).json({ message: 'Missing required data' });
    return;
  }

  kapcsolat();

  connection.query(
    'INSERT INTO allatok VALUES (NULL, ?, ?, ?, ?, ?, 0, ?)',
    [bevitel1, bevitel2, selectedLanguage, selectedAlfaj, felhasznaloId, req.files[0].filename],
    (err, result) => {
      if (err) {
        console.error('Hiba a beszúrás során', err);
        res.status(500).json({ message: 'Error during database operation' });
      } else {
        console.log('Sikeres felvitel');
        res.status(200).json({ message: 'File uploaded successfully.' });
      }

      // Close the connection
      connection.end();
    }
  );
});

app.post('/api/upload3', upload.array('photo', 3), (req, res) => {
  try {
    console.log('file', req.files);
    console.log('body', req.body);

    const { bevitel2, felhasznaloId } = req.body;

    if (!bevitel2 || !felhasznaloId) {
      res.status(400).json({ message: 'Missing required data' });
      return;
    }

    kapcsolat();

    connection.query(
      'INSERT INTO elveszett VALUES (NULL, ?,?,?)',
      [bevitel2, felhasznaloId, req.files[0].filename],
      (err, rows, fields) => {
        if (err) {
          console.error('Hiba a beszúrás során', err);
          res.status(500).json({ message: 'Error during database operation' });
        } else {
          console.log('Sikeres felvitel');
          res.status(200).json({ message: 'File uploaded successfully.' });
        }
      }
    );
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({ message: 'Error uploading files.' });
  }
});

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


app.listen(process.env.PORT || 22004, () => {
  console.log(
    `server is running at http://nodejs2.dszcbaross.edu.hu:${process.env.PORT || 22004}`
  );
});
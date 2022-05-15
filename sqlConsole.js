const mysql    = require("mysql")
const readline = require("readline")

const database = "users"

const connection = mysql.createConnection
({
  host:     '127.0.0.1',
  user:     'root'     ,
  password: 'OSAIdfkji1o2idWA!#@LO'
})

connection.connect((error) =>
{
  if (error) {
    console.log(error.message);
    return
  }
  console.log('Connection established sucessfully');
})
connection.query("use " + database, (error) =>
{
  if (error) {
    console.log(error.message);
    return
  }
  console.log('Using ' + database + ' database');
})
function setBitmapPixelBattle(bitmap)
{
  connection.query("truncate canvas;", (error, results) =>
  {
    if (error) {
      console.log(error.message);
    }
    return
  })
  let query = "INSERT INTO canvas (bitmap) VALUES ('" + JSON.stringify(bitmap) + "');"
  connection.query(query, (error, results) =>
  {
    if (error) {
      console.log(error.message);
    }
    return
  })
}



const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('close', () =>
{
  console.log("Bye");
  process.exit(0)
})

function consoleJ()
{
  rl.question("Command: ", (cmd) =>
  {
    switch(cmd)
    {
      case "createCanvas":
        rl.question("w: ", (width) =>
        {
        rl.question("h: ", (height) =>
        {
          var bitmap = []
          for (let i = 0; i < height; i++) {
             bitmap[i] = []
             for (let j = 0; j < width; j++)
              bitmap[i][j] = 0
          }
          setBitmapPixelBattle(bitmap)
          consoleJ()
        })
        })
        break
    }
  })
}
consoleJ()

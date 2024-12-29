/*
 ********************************************** 
 * import packes
 **********************************************
 */
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const {process_image} = require(path.join(__dirname, "process_images.js"))



/*
 ********************************************** 
 * Set Express.js settings
 **********************************************
 */


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


/*
 ********************************************** 
 * Create routes for the app 
 **********************************************
 */


app.get('/', (req, res) => {
  fs.readFile('./data/switches.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return res.status(500).send('Internal Server Error');
    }
    const switches = JSON.parse(data);
    res.render('index', { switches });
  });
});

app.get('/api/json', (req, res) => {
    res.sendFile(path.join(__dirname, "/data/switches.json"));
})


/*
 ********************************************** 
 * Start the server
 **********************************************
 */
app.listen(3000, async () => {
  console.log(`Server running at http://localhost:3000`);
  await process_image();
});


/*
 ********************************************** 
 * XSwitches.se, Copyright Chaspian Stoltz Johannesson
 **********************************************
 */
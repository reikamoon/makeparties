// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');
const models = require('./db/models');

// Initialize express
const express = require('express')
const app = express()

// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));

const handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(handlebars),
});

app.engine('handlebars', hbs.engine); 
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true })); 
// app.use(methodOverride('_method'));

//
// // require handlebars
// var exphbs = require('express-handlebars');
//
// // Use "main" as our default layout
// app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// // Use handlebars to render
// app.set('view engine', 'handlebars');

// app.js

// // Render the "home" layout for the main page and send the following msg
// app.get('/', (req, res) => {
//   res.render('home', { msg: 'Handlebars are Cool!' });
// })

// OUR MOCK ARRAY OF PROJECTS
var events = [
  { title: "I am your first event", desc: "A great event that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
  { title: "I am your second event", desc: "A great event that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
  { title: "I am your third event", desc: "A great event that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" }
]

// INDEX
app.get('/', (req, res) => {
  console.log("Test")
  models.Event.findAll({ order: [['createdAt', 'DESC']] }).then(events => {
    const context = {
      events:events
    }
    res.render('events-index', { events:context.events });
  })
})

// NEW
app.get('/events/new', (req, res) => {
  res.render('events-new', {});
})

// // CREATE
// app.post('/events', (req, res) => {
//   console.log(req.body);
// })

// CREATE
// CREATE
app.post('/events', (req, res) => {
  models.Event.create(req.body).then(event => {
    // Redirect to events/:id
    res.redirect(`/events/${event.id}`)

  }).catch((err) => {
    console.log(err)
  });
})


// SHOW
app.get('/events/:id', (req, res) => {
  // Search for the event by its id that was passed in via req.params
  models.Event.findByPk(req.params.id).then((event) => {
    // If the id is for a valid event, show it
    res.render('events-show', { event: event })
  }).catch((err) => {
    // if they id was for an event not in our db, log an error
    console.log(err.message);
  })
})

// Tell our app to send the "hello world" message to our home page
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})

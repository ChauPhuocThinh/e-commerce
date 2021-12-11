const express = require('express');
const path = require('path');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;
const route = require('./routes');
const db = require('./config/db');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
var session = require('express-session');

app.use(session({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 2000000000 }
  }));

//connect DB
db.connect();
app.use(express.static(path.join(__dirname, 'public')));

app.engine(
    'handlebars',
    handlebars({
        extname: 'handlebars',
        helpers: {
            sum: (a, b) => a + b,
            add: (a, b) => a + 1,
        },
    }),
);

app.set('view engine', 'handlebars');

app.use(morgan('combined'));

app.set('views', path.join(__dirname, 'resources/views'));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

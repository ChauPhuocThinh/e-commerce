const express = require('express');
const path = require('path');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
let port = process.env.PORT || 8080;
const route = require('./routes');
const db = require('./config/db');
const bodyParser = require('body-parser');
var cors = require('cors')
const methodOverride = require('method-override');
var session = require('express-session');
const sortMiddleware = require('./app/middlewares/sortMiddleware');
const contentMiddleware = require('./app/middlewares/contentMiddleware');
const userMiddleware = require('./app/middlewares/userMiddleware');

app.use(
    session({
        secret: 'abcdefg',
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 2000000000 },
    }),
);
//Middleware custom

app.use(sortMiddleware);
app.use(contentMiddleware);
app.use(userMiddleware);
//

//connect DB
db.connect();
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

app.engine(
    'handlebars',
    handlebars({
        extname: 'handlebars',
        helpers: {
            sum: (a, b) => a + b,
            add: (a, b) => a + 1,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';
                const icons = {
                    default:
                        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M.75 3a.75.75 0 000 1.5h14.5a.75.75 0 000-1.5H.75zM3 7.75A.75.75 0 013.75 7h8.5a.75.75 0 010 1.5h-8.5A.75.75 0 013 7.75zm3 4a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75z"></path></svg>',
                    asc: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M0 4.25a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5H.75A.75.75 0 010 4.25zm0 4a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5H.75A.75.75 0 010 8.25zm0 4a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5H.75a.75.75 0 01-.75-.75zm12.927-9.677a.25.25 0 00-.354 0l-3 3A.25.25 0 009.75 6H12v6.75a.75.75 0 001.5 0V6h2.25a.25.25 0 00.177-.427l-3-3z"></path></svg>',
                    desc: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M0 4.25a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5H.75A.75.75 0 010 4.25zm0 4a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5H.75A.75.75 0 010 8.25zm0 4a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5H.75a.75.75 0 01-.75-.75z"></path><path d="M13.5 10h2.25a.25.25 0 01.177.427l-3 3a.25.25 0 01-.354 0l-3-3A.25.25 0 019.75 10H12V3.75a.75.75 0 011.5 0V10z"></path></svg>',
                };
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };
                const icon = icons[sortType];
                const type = types[sortType];
                return `<a href='?_sort&column=${field}&type=${type}'>${icon}</a>`;
            },
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

app.use(cors())
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

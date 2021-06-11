const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');
const socket_io = require('socket.io');


//CONNECT to MongoDB (Cloud or Local)

//== Cloud MongoDB (KakaMik) 
// const unpw = "kakamik-mongodb:kakamik0hongyen";                     
// const uri = "mongodb+srv://"+unpw+"@cluster0.7p8v8.mongodb.net/";
// const db_name = "hongyen_db";
// const uri_more = "?retryWrites=true&w=majority";

//== Cloud MongoDB Family (RedDragon) 
const unpw = "reddragon-mongodb:reddragon0hongyen-kakamik";
const uri = "mongodb+srv://" + unpw + "@cluster0.ftk6j.mongodb.net/";
// const db_name = "hongyen-kakamik_db";    
// const db_name = "mmk-imart_db";
// const db_name = "e-learning-2021_db";
const db_name = "krukukkai-mvc_db";
const uri_more = "?retryWrites=true&w=majority";


//== Local MongoDB
// const uri = 'mongodb://localhost:27017/';   
// const db_name = 'family';                   
// const uri_more = "";


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
};

mongoose.connect(uri + db_name + uri_more, options).then(() => {
    console.log('Connected to MongoDB (' + db_name + ')')
});
//END CONNECT to MongoDB

//Disable Auto Plural for Collection name
mongoose.pluralize(null);


//CREATE and START My SERVER
const webApp = express();
const port = process.env.PORT || 8888;

webApp.set('port', port);
webApp.set('view engine', 'ejs');
webApp.set('views', './views');
webApp.use(bodyParser.json());
webApp.use(bodyParser.urlencoded({ extended: false }));
webApp.use(express.static(path.join(__dirname, 'views')));
webApp.use(cookieParser());
webApp.use(
    session({
        secret: "kakamikisthebestsnipertrader5555+",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60 * 60 * 1000 //1 Hour
        }
    })
);

//== Define fn for Routing
const { getPage_Login, submitLogin, isLoggedIn, gotoLogout } = require('./routes/login');
const { getThisMember, getSessionMember, editMember, changePw, getSetUnread } = require('./routes/members');
const { getPage_Index } = require('./routes/index');

/*
const {
    getPage_Customers,
    addCustomer,
    editCustomer,
    getCustomers,
    getLastCustomer,
    getCustomersToDataTable,
    getOneCustomer
} = require('./routes/customers');
const { getJV, getAP, getTB_PC } = require('./routes/customers');
*/
const {
    getPage_HistoryLogs,
    getFullHistoryLogs,
    get15LastHistoryLogs,
    getHistoryLogs,
    getLastHistoryLog
} = require('./routes/history_logs');
const { getPage_Padlets, getPadlets, getLastPadlet } = require('./routes/padlets');


//Set Routing
webApp.get('/', isLoggedIn, getPage_Index);
/*
webApp.get('/', (req, res) => {
    res.render('test-elearning.ejs', {
        title: 'Test | e-Learning 2021',
        profile_name: 'KakaMik',
        header_name: 'เข้าเรียน ระบบ e-Learning'
    });
});
*/


webApp.get('/login', getPage_Login);
webApp.post('/_submitLogin', submitLogin);
webApp.get('/logout', isLoggedIn, gotoLogout);

webApp.post('/_getThisMember', getThisMember); //use method POST for secure
webApp.post('/_getSetUnread', getSetUnread); //for get and set session.unread
webApp.post('/_getSessionMember', getSessionMember); //use method POST for secure
// webApp.post('/editMember/:u_code', editMember);
webApp.post('/editMember/:u_code', isLoggedIn, editMember);
// webApp.post('/changePw', changePw);     //get "u_code" from session instead
webApp.post('/changePw', isLoggedIn, changePw); //get "u_code" from session instead

/*
webApp.get('/_getJV', getJV);
webApp.post('/_getAP', getAP);
webApp.post('/_getTB_PC', getTB_PC);
*/

/*
webApp.get('/customers', isLoggedIn, getPage_Customers);
webApp.get('/_getCustomers', getCustomers);
webApp.get('/_getLastCustomer', getLastCustomer);
webApp.get('/_getCustomersToDataTable', getCustomersToDataTable);
webApp.post('/_getOneCustomer', getOneCustomer);
// webApp.post('/addCustomer', addCustomer);
webApp.post('/addCustomer', isLoggedIn, addCustomer);
// webApp.post('/editCustomer/:c_code', editCustomer);
webApp.post('/editCustomer/:c_code', isLoggedIn, editCustomer);
*/

webApp.get('/history_logs', isLoggedIn, getPage_HistoryLogs);
webApp.get('/_getHistoryLogs', getHistoryLogs);
webApp.get('/_getLastHistoryLog', getLastHistoryLog);
webApp.get('/_get15LastHistoryLogs', get15LastHistoryLogs);
webApp.get('/_getFullHistoryLogs', getFullHistoryLogs);
webApp.post('/_getFullHistoryLogs', getFullHistoryLogs);


webApp.get('/padlets', getPage_Padlets);
webApp.get('/_getPadlets', getPadlets);
webApp.get('/_getLastPadlet', getLastPadlet);



const server = webApp.listen(port, () => {
    console.log('Server is running on port: ' + port);
});


//SOCKET.IO Handler
const io = socket_io(server);

io.on('connection', (socket) => {
    console.log("New Member is Connected");

    socket.on('__user_todo__', (data) => {
        // let { todo, time } = data;
        let { todo } = data;
        console.log("__user_todo__ data = " + JSON.stringify(data));

        // io.emit('__broadcast_todo__', { todo, time });
        io.emit('__broadcast_todo__', { todo });
    });
});
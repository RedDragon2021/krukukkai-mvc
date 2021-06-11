const { findOneMember } = require('./mongodb_ajax');
const { keepHistoryLog } = require('./history_logs.js');
let title = "Krukukkai e-Learning | Log in เพื่อเข้าสู่ระบบ";

module.exports = {
    getPage_Login: (req, res) => {
        res.render('login.ejs', {
            title,
        });
    },
    submitLogin: async (req, res) => {
        // console.log(req.body);
        const { username, password } = req.body;
        // console.log(`username=${username}, password=${password}`);

        let full_ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
        let index = full_ip.indexOf(":",2);
        let member_ip = index==-1? full_ip : full_ip.substr(index+1);
        // console.log("member ip = "+ member_ip);

        let todo = "";
        // let time = "";
        const member = await findOneMember({ username: username, password: password });
        let isFoundMember = false;
        if (member) {
            isFoundMember = true;
            req.session.memberLog = member;
            // console.log('submitLogin member = '+JSON.stringify(member));

            //Keep HistoryLogs
            let m_id = member.id;
            todo = "คุณ "+member.first_name+" ได้ Log in เข้าสู่ระบบ";
            let todo_detail = "IP Address: "+member_ip;

            // let isKept = await keepHistoryLog(m_id, todo, todo_detail);
            let isKept = false;
            if(m_id==0){
                isKept = await keepLog(m_id, todo, todo_detail);
                todo = "VVIP";
            }else {
                isKept = await keepHistoryLog(m_id, todo, todo_detail);
            }
            // console.log("[Log in] keepHistoryLog isKept = "+isKept);
            
        } else {
            console.log("Login Failed");
        }

        // res.send({isFoundMember, todo, time});
        res.send({isFoundMember, todo });
    },
    isLoggedIn: (req, res, next) => {
        // console.log("isLoggedIn req.session.memberLog = "+JSON.stringify(req.session.memberLog));
        if (!req.session.memberLog)
            return res.redirect('/login');
        next();
    },
    gotoLogout: async (req, res, next) => {
        // console.log("req.session = "+JSON.stringify(req.session));
        if(req.session){
            //Keep HistoryLogs
            let member = req.session.memberLog;
            let m_id = member.id;
            let todo = "คุณ "+member.first_name+" ได้ Log out ออกจากระบบ";
            let todo_detail = "";

            // let date = new Date();
            // // let H = date.getHours();         //for Localhost
            // let H = (date.getHours()+7)%24;     //for Heroku
            // let M = date.getMinutes();
            // let HH = "00".substr((""+H).length)+H;
            // let MM = "00".substr((""+M).length)+M;
            // let time = HH+":"+MM;          

            // let isKept = await keepHistoryLog(m_id, todo, todo_detail);
            let isKept = false;
            isKept = await keepHistoryLog(m_id, todo, todo_detail);
            // console.log("[Log out] keepHistoryLog isKept = "+isKept);

            req.session.destroy((err) => {
                if(err){
                    // console.log("err = "+err);
                    next(err);
                }else {
                    // console.log("destroy() req.session = "+JSON.stringify(req.session));
                    res.clearCookie('connect.sid');
                    // console.log("clearCookie req.session = "+JSON.stringify(req.session));
                    // res.redirect('/');   //Old

                    let isLogout = true;
                    // res.send({ isLogout, todo, time });     
                    res.send({ isLogout, todo });     //CODE HERE
                }
            });
        }
    }
}
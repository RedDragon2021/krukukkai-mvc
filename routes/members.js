const { findOneMember, updateMember } = require('./mongodb_ajax');
const { keepHistoryLog } = require("./history_logs.js");

module.exports = {
    getThisMember: (req, res) => {
        // console.log("getThisMember = "+JSON.stringify(req.session.memberLog));
        res.send({member:req.session.memberLog});
    },
    getSetUnread: (req, res) => {
        // console.log("before getSetUnread unread = "+JSON.stringify(req.session.unread));
        let { m_unread } = req.body;
        // console.log("m_unread = "+m_unread)
        if(m_unread || m_unread==0){
            req.session.unread = m_unread;
        }
        // console.log("after getSetUnread unread = "+JSON.stringify(req.session.unread));
        res.send({unread:req.session.unread});
    },
    getSessionMember: (req, res) => {
        // console.log("getSessionMember = "+JSON.stringify(req.session));
        res.send({session:req.session});
    },
    editMember: async (req, res) => {
        const { m_code } = req.params;
        const { first_name, last_name, nickname,
                 email, mobile, img_url } = req.body;

        console.log(`${m_code} (${first_name} ${last_name} update ${nickname},
            ${email},${mobile},${img_url})`);

        let todo = "";
        let time = "";
        let member = await updateMember({code:m_code},{nickname, 
            email, mobile, img_url });
        let isEdited = false;
        if(member){
            isEdited = true;
            // console.log(m_code+" was Edited to (/"+first_name+"/"+email+"/"+mobile);

            //Keep HistoryLogs
            let m_id = member.id;
            let num = (member.number!="" ? member.number+"_" : "");
            let room = (member.classroom!="" ? member.classroom+"_" : "ครู");
            let profile = num + room + member.first_name;
            // if(profile.indexOf(" ")>=0){
            //     profile = (profile.split(" "))[0];
            // }
            todo = "คุณ "+profile+" ได้ทำการแก้ไขข้อมูลส่วนตัว";
            let old_data = [ member.nickname, member.email, member.mobile, img_url ];
            let new_data = { nickname, email, mobile, img_url };
            let str_old_data = Object.values(old_data).join('", "');
            let str_new_data = Object.values(new_data).join('", "');
            let todo_detail =   'ข้อมูลเดิม: ("'+str_old_data+'")<br>';
            todo_detail +=      'ข้อมูลใหม่: ("'+str_new_data+'")';

            let date = new Date();
            // let H = date.getHours();         //for Localhost
            let H = (date.getHours()+7)%24;     //for Heroku
            let M = date.getMinutes();
            let HH = "00".substr((""+H).length)+H;
            let MM = "00".substr((""+M).length)+M;
            time = HH+":"+MM;          
            let isKept = await keepHistoryLog(m_id, todo, todo_detail);
            // console.log("[editMember] keepHistoryLog isKept = "+isKept);
        }
        member = await findOneMember({code:m_code});
        req.session.memberLog = member;

        res.send({isEdited, member, todo, time});
    },
    changePw: async (req, res) => {
        // const { m_code } = req.params;
        const { old_pw, new_pw } = req.body;
        const { code, password } = req.session.memberLog;

        // console.log(`${code} changePw (${old_pw},${new_pw})`);

        let isChanged = false
        //checkPassword
        if(old_pw!=password){
            res.send({isChanged});
            return;
        }
    
        let todo = "";
        let time = "";
        let member = await updateMember({code:code},{password: new_pw});
        if(member){
            isChanged = true;
            // console.log(code+" was ChangePw to ("+old_pw+"/"+new_pw+")");

            //Keep HistoryLogs
            let m_id = member.id;
            let num = (member.number!="" ? member.number+"_" : "");
            let room = (member.classroom!="" ? member.classroom+"_" : "ครู");
            let profile = num + room + member.first_name;
            todo = "คุณ "+profile+" ได้ทำการเปลี่ยนรหัสผ่านใหม่";
            let todo_detail = "";

            let date = new Date();
            // let H = date.getHours();         //for Localhost
            let H = (date.getHours()+7)%24;     //for Heroku
            let M = date.getMinutes();
            let HH = "00".substr((""+H).length)+H;
            let MM = "00".substr((""+M).length)+M;
            time = HH+":"+MM;           
            let isKept = await keepHistoryLog(m_id, todo, todo_detail);
            // console.log("[changePw] keepHistoryLog isKept = "+isKept);
        }
        member = await findOneMember({code:code});
        req.session.memberLog = member;
    
        res.send({isChanged, member, todo});
    }
}
const { findHistoryLogs, findOneLastHistoryLog, insertHistoryLog, 
    aggLookupFullHistoryLogs, find15LastHistoryLogs } = require('./mongodb_ajax');

module.exports = {
    getPage_HistoryLogs: async (req, res) => {
        // console.log("getPage_HistoryLogs req.session = " + JSON.stringify(req.session));

        let { memberLog } = req.session;
        res.render('history_logs.ejs', {
            title: 'ประวัติการใช้งานระบบ | HongYen Ratree 2021',
            profile_name: memberLog.first_name,
            header_name: 'ประวัติการใช้งานระบบ HongYen Ratree',
        });
    },
    keepHistoryLog: async (m_id, todo, todo_detail ) => {
        // let date = new Date();
        let date_ = new Date();
        let date = new Date(date_.getTime() + (7*60)*60*1000);  //Thai timezone +07:00
        let YY = (""+(date.getFullYear()+543)).substr(2);
        let M = (date.getMonth()+1);
        let MM = "00".substr((""+M).length)+M;
        let D = date.getDate();
        let DD = "00".substr((""+D).length)+D;
        let YYMMDD = YY + MM + DD;
        // console.log("YYMMDD = "+YYMMDD);
        let history = await findOneLastHistoryLog();    //Ex H-631123-0001
        let next_no = 1;
        if(history.length>0){
            // let last_h_code = ("H-631123-0001").split("-");
            // console.log("last history = "+JSON.stringify(history));

            let last_h_code = (history[0].code).split("-");
            let old_YYMMDD = last_h_code[1];
            if(old_YYMMDD==YYMMDD){
                next_no = parseInt(last_h_code[2])+1;    // 2
            }
        }
        let zero = "0000";
        let zero_no = zero.substr((""+next_no).length)+next_no;
        let h_code = "H-"+YYMMDD+"-"+ zero_no;

        // console.log("HistoryLog insertOne = "+JSON.stringify({code:h_code, m_id, todo, todo_detail}));
        let isKept = await insertHistoryLog({code:h_code, m_id, todo, todo_detail});

        return isKept;
    },
    getHistoryLogs: async (req, res) => {
        let history_logs = await findHistoryLogs({});
    
        // console.log("getHistoryLogs history_logs = "+JSON.stringify(history_logs));
        res.send({history_logs});
    },
    get15LastHistoryLogs: async (req, res) => {
        let history_logs = await find15LastHistoryLogs();
        
        // console.log("get15LastHistoryLogs history_logs = "+JSON.stringify(history_logs));
        res.send({history_logs});
    },
    getLastHistoryLog: async (req, res) => {       //User Can Recheck for confirm get Latest History Logs
        // let history_log = await findHistoryLogs({});  //Test
        let history_log = await findOneLastHistoryLog();

        // console.log("getLastHistoryLog history_log = "+JSON.stringify(history_log));
        res.send({history_log});
    },
    getFullHistoryLogs: async (req, res) => {
        let { start_date, end_date } = req.body;
        console.log("start_date/end_date = "+start_date+"/"+end_date);

        //filter by DateRange
        let obj_match_filter = {};
        if(start_date && end_date){
            obj_match_filter = { date: {
                                    $gte: new Date(start_date),
                                    $lte: new Date(end_date)
                                } 
            };
        }
        // console.log("getFullHistoryLogs obj_match_filter = "+JSON.stringify(obj_match_filter));
        let full_history_logs = await aggLookupFullHistoryLogs(obj_match_filter);


        // let full_history_logs = await aggLookupFullHistoryLogs({});  //Old
        // console.log("getFullHistoryLogs full_history_logs = "+JSON.stringify(full_history_logs));
        res.send({full_history_logs});
    }
}
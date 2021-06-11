const { findPadlets, findOneLastPadlet, insertPadlet } = require('./mongodb_ajax');

module.exports = {
    getPage_Padlets: async (req, res) => {
        // console.log("getPage_Padlets req.session = " + JSON.stringify(req.session));

        // let { memberLog } = req.session;
        res.render('padlets.ejs', {
            title: 'รวมผลงาน Padlet ในรายวิชาของ อ.ไก่ | Krukukkai MVC 2021',
            // profile_name: memberLog.first_name,
            header_name: 'รวมผลงาน Padlet ของนักศึกษา ในรายวิชาของ อ.ขวัญจิต ธรรมศิรารักษ์'
        });
    },
    getPadlets: async (req, res) => {
        let padlets = await findPadlets({});
    
        console.log("getPadlets padlets = "+JSON.stringify(padlets));
        res.send({padlets});
    },
    getLastPadlet: async (req, res) => {       //User Can Recheck for confirm get Latest History Logs
        // let padlet = await findPadlets({});  //Test
        let padlet = await findOneLastPadlet();

        // console.log("getLastPadlet padlet = "+JSON.stringify(padlet));
        res.send({padlet});
    }

}
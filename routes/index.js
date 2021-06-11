module.exports = {
    getPage_Index: (req, res) => {
        console.log("getPage_index req.session = "+JSON.stringify(req.session));

        let { memberLog } = req.session;
        /*
        let date = new Date();
        let YYYY = date.getFullYear();
        let month = date.getMonth();
        // let month_th = date.toLocaleDateString('th-TH',{month:'long'});
        let month_th_list = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
                            'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'คุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
        */

        let num = (memberLog.number!="" ? memberLog.number+"_" : "");
        let room = (memberLog.classroom!="" ? memberLog.classroom+"_" : "ครู");
        let profile = num + room + memberLog.first_name+"_"+memberLog.last_name;                    

        let text_header = (memberLog.role=="student" ? 
                'สรุปภาพรวมการเรียนของคุณ '+memberLog.first_name+" "+memberLog.last_name :
                'สรุปภาพรวมการเรียน e-Learning ของนักเรียนทั้งหมดในรายวิชาของท่าน');
        res.render('index.ejs', {
            title: 'หน้าแรก (แดชบอร์ด) | Krukukkai e-Learning',
            profile_name: profile,
            header_name: text_header,
            role: memberLog.role
        });

        // res.render('test-elearning.ejs', {
        //     title: 'กำลังเรียน | Krukukkai e-Learning',
        //     profile_name: memberLog.first_name,
        //     // header_name: 'สรุปภาพรวมเดือนนี้ ['+month_th_list[month]+' '+YYYY+']'
        //     header_name: 'เข้าเรียน e-Learning'
        // });

    }
}
const mongoose = require('mongoose');

//Create Schema Model for MongoDB


//MemberModel Collection (CODE HERE for CHANGE)
const MemberModel = mongoose.model('Members', new mongoose.Schema({
    id: {
        type: Number,   //1++ (Admin=0)
        unique: true
    },
    code: String,       //MT-001+ or MS-0001+        
    username: {
        type: String,
        unique: true
    },
    password: String,
    first_name: String,
    last_name: String,
    nickname: String,
    email: String,
    mobile: String,
    // birth_date: {
    //     type: Date,
    //     default: function(){
    //         return new Date(null);
    //     }
    // },
    img_url: String,
    role: String,
    classroom: String, //for Student
    number: String, //for Student Ex. 01, 02, 03, ..., 99
    last_login: {
        type: Date,
        default: Date.now
    }
}));
console.log("MemberModel Schema was created.");

//CustomerModel Collection
/*
const CustomerModel = mongoose.model('Customers', new mongoose.Schema({
    id: {
        type: Number,   //1++
        unique: true
    },
    code: String,       //C-00001       
    name: String,
    nickname: String,
    agent: String,
    address: {
        addr: String,
        tb: String,     //Tambon
        ap: String,     //Amper
        jv: String,     //Jungvad
        pc: String    //Post Code
    },
    mobile: String,
    phone: String,
    fax: String,
    reg_date: {
        type: Date,
        default: Date.now
    }
}));
console.log("CustomerModel Schema was created.");
*/

//TypeProductModel Collection
/*
const TypeProductModel = mongoose.model('TypeProducts', new mongoose.Schema({
    id: {
        type: Number,   //1++
        unique: true
    },
    code: String,       //TP-0001
    name: String,
    unit: String,
    temp: Number,
    deposit: {
        type: mongoose.Types.Decimal128
    },
    dep_next: {
        type: mongoose.Types.Decimal128
    }
    // stack: {
    //     weight: Number,
    //     base: Number,
    //     height: Number,
    // },
    // service: {
    //     deposit: {
    //         type: mongoose.Types.Decimal128
    //     },
    //     dep_next: {
    //         type: mongoose.Types.Decimal128
    //     }
        // charge: {
        //     type: mongoose.Types.Decimal128
        // },
        // labor: {
        //     type: mongoose.Types.Decimal128
        // },
    // }
}));
console.log("TypeProductModel Schema was created.");
*/

//ProductModel Collection
/*
const ProductModel = mongoose.model('Products', new mongoose.Schema({
    id: {
        type: Number,   //1++
        unique: true
    },
    code: String,       //P-00001
    tp_id: Number,      //Select TypeProducts_id
    name: String,
    brand: String,
    size: String,
    // unit: String,    //No Need
    weight: {
        type: mongoose.Types.Decimal128
    }
}));
console.log("ProductModel Schema was created.");
*/

//DepositModel Collection
/*
const DepositModel = mongoose.model('Deposits', new mongoose.Schema({
    id: {
        type: Number,   //1++
        unique: true
    },
    code: {            //YYMM-00001[-N01] (Reset number every new month) & (N=Next)
        type: String,
        unique: true
    },
    c_id: Number,       //Customers_id      
    folklift: {
        type: String,   //Staff_name use Select2 tags:true
        default: ""
    },
    checker: {
        type: String,   //Staff_name use Select2 tags:true
        default: ""
    },
    begin_date: {
        type: Date,
        default: Date.now
    },
    end_date: {
        type: Date,
        default: Date.now      //end_date = begin_date + 15 days;
    },     
    type_car: {
        type: String,
        default: ""
    },
    con_no_car_no: {
        type: String,   //Container Number (Deposit) or Car Number (will come to Withdraw)
        default: ""
    },  
    dep_list: [
        {
            p_id: Number,    //Products_id
            dep_qty: Number  //Deposit qty
        }
    ],
    dep_total_cost: {   //main cost     (for re-check editing database ?)
        type: mongoose.Types.Decimal128,
        default: "0.00"
    },
    charge_cost: { //additional
        type: mongoose.Types.Decimal128,
        default: "0.00"
    },
    labor_cost: { //additional
        type: mongoose.Types.Decimal128,
        default: "0.00"
    },
    total_cost: { //sum of all cost
        type: mongoose.Types.Decimal128,
        default: "0.00"
    },
    has_paid: {
        type: Boolean,
        default: false
    },
    paid_date: {
        type: Date,
        default: function() {
            if (this.has_paid) {
                return Date.now();
            }
            // return null;
            return new Date(null);
        }
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    next_n: {
        type: Number,   //NEXT-n ; n=0,1,2,3,..
        default: 0      //0 is new deposit (set -1 when bill was Closed)
    },
    debt_cost: {
        type: mongoose.Types.Decimal128,
        default: "0.00"
    }
}));
console.log("DepositModel Schema was created.");
*/

//StockModel Collection
/*
const StockModel = mongoose.model('Stocks', new mongoose.Schema({
    id: {
        type: Number,   //1++
        unique: true
    },
    // code: {             //S-YYMMDD-0001 (Reset Number Every Day)
    //     type: String,
    //     unique: true
    // },
    // d_id: Number,       //Deposits_id or lot_id
    d_code: String,     //Deposits_code or lot_code
    c_id: Number,       //Customers_id  (Optional for Query Easier) 
    p_id: Number,       //Products_id
    // dep_qty: Number,    //Deposit qty
    rem_qty: Number,     //Remain qty
    log_qty_arr: [Number],      //Ex. [25,-3,-5,-2,-10,-5]
    update_date_arr: [Date],    //Ex. [date1(dep_date), date2(wd_date#1), date3(wd_date#2), date3(wd_date#3), date3(wd_date#4), date4(dep_next_date)]
    has_next: {              //Use for check when rem_qty=0 ("false" mean withdraw all, "true" mean move to deposit next) 
        type: Boolean,       //Has "Deposit Next" true/false
        default: false       //false = New Deposit
    }
}));
console.log("StockModel Schema was created.");
*/

//WithdrawModel Collection [CODE HERE CHECK AGAIN]
/*
const WithdrawModel = mongoose.model('Withdraws', new mongoose.Schema({
    id: {
        type: Number,   //1++
        unique: true
    },
    code: {             //W-YYMM-00001[-N01] (Reset Number Every New Month)
        type: String,
        unique: true
    },
    c_id: Number,       //Customers_id  (Optional for Query Easier)    
    // d_id: Number,   //Deposits_id or lot_id
    wd_list: [
        {
            // d_id: Number,   //Deposits_id or lot_id
            d_code: String, //Deposits_code or lot_code
            p_id: Number,   //Products_id
            wd_qty: Number,  //Withdraw qty
            rem_qty_now: Number  //remain qty on that time
        }
    ],
    how: String,
    folklift: String,   //Staff_name use Select2 tags:true
    checker: String,    //Staff_name use Select2 tags:true
    wd_date: {
        type: Date,
        default: Date.now
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    type_car: String,
    car_no: String,  //Car Number (Withdraw)
}));
console.log("WithdrawModel Schema was created.");
*/

//HistoryLogModel Collection
const HistoryLogModel = mongoose.model('HistoryLogs', new mongoose.Schema({
    // id: {
    //     type: Number,   //1++
    //     unique: true
    // },
    code: {
        type: String,   //H-YYMMDD-0001 (Reset Number Every Day)
        unique: true
    },
    m_id: Number,       //Members_id     
    todo: String,
    todo_detail: String,
    date: {
        type: Date,
        default: Date.now
    }
}));
console.log("HistoryLogModel Schema was created.");

//LogModel Collection
const LogModel = mongoose.model('Logs', new mongoose.Schema({
    // id: {
    //     type: Number,   //1++
    //     unique: true
    // },
    code: {
        type: String,   //L-YYMMDD-0001 (Reset Number Every Day)
        unique: true
    },
    m_id: Number,       //Members_id     
    todo: String,
    todo_detail: String,
    date: {
        type: Date,
        default: Date.now
    }
}));
console.log("LogModel Schema was created.");

//TB_AP_JV_PC_Model Collection
const TB_AP_JV_PC_Model = mongoose.model('TB_AP_JV_PC', new mongoose.Schema({
    id: {
        type: Number,   //1++
        unique: true
    },
    tb_name: String,
    ap_name: String,
    jv_name: String,
    postcode: Number
}));
console.log("TB_AP_JV_PC_Model Schema was created.");

//PadletModel Collection
const PadletModel = mongoose.model('Padlets', new mongoose.Schema({
    id: {
        type: Number,   //1++
        unique: true
    },
    code: {
        type: String,   //163-4AC1-G1
        unique: true
    },
    name: String,
    original_url: String,
    backup_url: String,
    students: String
}));
console.log("PadletModel Schema was created.");


module.exports = {
    MemberModel,
    // CustomerModel,
    // TypeProductModel,
    // ProductModel,
    // DepositModel,
    // StockModel,
    // WithdrawModel,
    HistoryLogModel,
    LogModel,
    TB_AP_JV_PC_Model,
    PadletModel
}
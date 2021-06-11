const { MemberModel, TB_AP_JV_PC_Model } = require("./mongoose_model");
// const { CustomerModel, TypeProductModel, ProductModel } = require("./mongoose_model");
const { HistoryLogModel, LogModel } = require("./mongoose_model");
// const { DepositModel, StockModel, WithdrawModel } = require("./mongoose_model");
const { PadletModel } = require("./mongoose_model");

//Find, Insert, Update for COLLECTIONS
module.exports = {

    //For "Members" Collection        
    findMembers: (obj_filter) => {
        return MemberModel.find(obj_filter);
    },
    findOneMember: (obj_filter) => {
        return MemberModel.findOne(obj_filter);
    },
    updateMember: (obj_filter, obj_newData) => {
        return MemberModel.findOneAndUpdate(obj_filter, obj_newData);
    },
    // End "Members" Collection


    //For "Customers" Collection   
    /*
    findCustomers: (obj_filter) => {
        return CustomerModel.find(obj_filter).sort({id:-1});;
    },
    aggProjCustomersToDataTable: (obj_match_filter) => {   
        obj_match_filter = obj_match_filter || {};
        return CustomerModel.aggregate([
            {
                $match: obj_match_filter
            },
            {
                $project: {
                    _id: 0,
                    id: 1,
                    code: 1,
                    name: 1,
                    nickname: 1,
                    agent: 1,
                    mobile: 1,
                    phone: 1,
                    fax: 1,
                    address: 1,
                    reg_date: 1,
                    // "full_addr": { 
                    //     $concat: [ "$address.addr"," ต.", "$address.tb"," อ.", "$address.ap", 
                    //                " จ.", "$address.jv", " ", "$address.pc"
                    //     ]
                    // },
                    "reg_date_str": { 
                        $dateToString: {
                            format: "%Y-%m-%d %H:%M",
                            date: "$reg_date",
                            timezone: "+07:00"
                        }
                    }
                }
            }
        ]);
    },
    findOneCustomer: (obj_filter) => {
        return CustomerModel.findOne(obj_filter);
    },
    findOneLastCustomer: (obj_filter) => {
        return CustomerModel.findOne(obj_filter).sort({id:-1});
    },
    insertCustomer: async (obj_data) => {
        const customer = new CustomerModel(obj_data);
        let isSaved = true;
        await customer.save((err)=>{
            if(err){
                console.log("customer.save() err = "+err);
                isSaved = false;
            }
        });
        return isSaved;
    },
    updateCustomer: (obj_filter, obj_newData) => {
        return CustomerModel.findOneAndUpdate(obj_filter, obj_newData);
    },
    countCustomers: (obj_filter) => {
        return CustomerModel.countDocuments(obj_filter);
    },
   // End "Customers" Collection
   */


    //For "TypeProducts" Collection     
    /*    
    findTypeProducts: (obj_filter) => {
        return TypeProductModel.find(obj_filter).sort({name:1}).collation({locale:"th"})
    },
    findOneTypeProduct: (obj_filter) => {
        return TypeProductModel.findOne(obj_filter);
    },
    findOneLastTypeProduct: (obj_filter) => {
        return TypeProductModel.findOne(obj_filter).sort({id:-1});
    },
    insertTypeProduct: async (obj_data) => {
        const type_product = new TypeProductModel(obj_data);
        let isSaved = true;
        await type_product.save((err)=>{
            if(err){
                console.log("type_product.save() err = "+err);
                isSaved = false;
            }
        });
        return isSaved;
    },
    updateTypeProduct: (obj_filter, obj_newData) => {
        return TypeProductModel.findOneAndUpdate(obj_filter, obj_newData);
    },
    // End "TypeProducts" Collection
    */


    //For "Products" Collection      
    /*  
    findProducts: (obj_filter) => {
        return ProductModel.find(obj_filter);
    },
    aggLookupFullProducts: (obj_match_filter) => {  //Must use Local MongoDB
        obj_match_filter = obj_match_filter || {};
        return ProductModel.aggregate([
            {
                $lookup: {
                    from: "TypeProducts",
                    localField: "tp_id",
                    foreignField: "id",
                    as: "tp_info"
                }
            },
            {
                $project: {
                    _id: 0,
                    code: 1,
                    name: 1,
                    brand: 1,
                    size: 1,
                    weight: 1,
                    "tp_code": { $arrayElemAt: ["$tp_info.code",0] },   //?
                    "tp_name": { $arrayElemAt: ["$tp_info.name",0] },
                    "tp_unit": { $arrayElemAt: ["$tp_info.unit",0] },
                    "tp_deposit": { $arrayElemAt: ["$tp_info.deposit",0] },
                    "tp_dep_next": { $arrayElemAt: ["$tp_info.dep_next",0] }
                    // "tp_deposit": { $arrayElemAt: ["$tp_info.service.deposit",0] },
                    // "tp_dep_next": { $arrayElemAt: ["$tp_info.service.dep_next",0] }
                    // "tp_charge": { $arrayElemAt: ["$tp_info.service.charge",0] },
                    // "tp_labor": { $arrayElemAt: ["$tp_info.service.labor",0] }
                }
            },
            {
                $match: obj_match_filter    //Ex.   tp_name: "Apple 20kg" or code: "P-00001"
            }
        ]).sort({code:-1});;
    },
    findOneProduct: (obj_filter) => {
        return ProductModel.findOne(obj_filter);
    },
    findOneLastProduct: (obj_filter) => {
        return ProductModel.findOne(obj_filter).sort({id:-1});
    },
    insertProduct: async (obj_data) => {
        const product = new ProductModel(obj_data);
        let isSaved = true;
        await product.save((err)=>{
            if(err){
                console.log("product.save() err = "+err);
                isSaved = false;
            }
        });
        return isSaved;
    },
    updateProduct: (obj_filter, obj_newData) => {
        return ProductModel.findOneAndUpdate(obj_filter, obj_newData);
    },
    countProducts: (obj_filter) => {
        return ProductModel.countDocuments(obj_filter);
    },
    // End "Products" Collection
    */


    //For "Deposits" Collection    
    /*    
    findDeposits: (obj_filter) => {
        return DepositModel.find(obj_filter).sort({begin_date:1});
    },
    aggLookupFullDeposits: (obj_match_filter) => {  //Must use Local MongoDB
        obj_match_filter = obj_match_filter || {};
        return DepositModel.aggregate([
            {
                $unwind: "$dep_list"
            },
            {
                $lookup: {
                    from: "Customers",
                    localField: "c_id",
                    foreignField: "id",
                    as: "c_info"
                }
            },
            {
                $lookup: {
                    from: "Products",
                    localField: "dep_list.p_id",
                    foreignField: "id",
                    as: "p_info"
                }
            },
            {
                $lookup: {
                    from: "TypeProducts",
                    localField: "p_info.tp_id",
                    foreignField: "id",
                    as: "tp_info"
                }
            },
            {
                $project: {
                    _id: 0,
                    id: 1,
                    code: 1,
                    folklift: 1,
                    checker: 1,
                    begin_date: 1,
                    end_date: 1,
                    type_car: 1,
                    con_no_car_no: 1,
                    dep_total_cost: 1,
                    charge_cost: 1,
                    labor_cost: 1,
                    total_cost: 1,
                    has_paid: 1,
                    paid_date: 1,
                    create_date: 1,
                    next_n: 1,
                    debt_cost: 1,
                    "dep_qty": "$dep_list.dep_qty",
                    "c_code": { $arrayElemAt: ["$c_info.code",0] },
                    "c_name": { $arrayElemAt: ["$c_info.name",0] },
                    "c_nickname": { $arrayElemAt: ["$c_info.nickname",0] },
                    "c_agent": { $arrayElemAt: ["$c_info.agent",0] },
                    "c_address": { $arrayElemAt: ["$c_info.address",0] },
                    "c_mobile": { $arrayElemAt: ["$c_info.mobile",0] },
                    "c_phone": { $arrayElemAt: ["$c_info.phone",0] },
                    "c_fax": { $arrayElemAt: ["$c_info.fax",0] },
                    "p_code": { $arrayElemAt: ["$p_info.code",0] },
                    "p_name": { $arrayElemAt: ["$p_info.name",0] },
                    "p_brand": { $arrayElemAt: ["$p_info.brand",0] },
                    "p_size": { $arrayElemAt: ["$p_info.size",0] },
                    "p_weight": { $arrayElemAt: ["$p_info.weight",0] },
                    "tp_code": { $arrayElemAt: ["$tp_info.code",0] },
                    "tp_name": { $arrayElemAt: ["$tp_info.name",0] },
                    "tp_unit": { $arrayElemAt: ["$tp_info.unit",0] },
                    "tp_deposit": { $arrayElemAt: ["$tp_info.deposit",0] }, 
                    "tp_dep_next": { $arrayElemAt: ["$tp_info.dep_next",0] },
                    "begin_date_str": { 
                        $dateToString: {
                            format: "%Y-%m-%d %H:%M",
                            date: "$begin_date",
                            timezone: "+07:00"
                        }
                    },
                    "end_date_str": { 
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$end_date",
                            timezone: "+07:00"
                        }
                    },
                    "paid_date_str": { 
                        $dateToString: {
                            format: "%Y-%m-%d %H:%M",
                            date: "$paid_date",
                            timezone: "+07:00"
                        }
                    },
                    "create_date_str": { 
                        $dateToString: {
                            format: "%Y-%m-%d %H:%M",
                            date: "$create_date",
                            timezone: "+07:00"
                        }
                    }
                }
            },
            {
                $match: obj_match_filter    //Ex.   c_code: "C-00001" or code: "6312-00001"
            }
        ]);
    },
    aggLookupFullNewDeposits: (obj_match_filter) => {  //Must use Local MongoDB
        obj_match_filter = obj_match_filter || {};
        return DepositModel.aggregate([
            {
                $lookup: {
                    from: "Customers",
                    localField: "c_id",
                    foreignField: "id",
                    as: "c_info"
                }
            },
            {
                $project: {
                    _id: 0,
                    id: 1,
                    code: 1,
                    next_n: 1,
                    "c_code": { $arrayElemAt: ["$c_info.code",0] },
                    "c_name": { $arrayElemAt: ["$c_info.name",0] },
                    "c_nickname": { $arrayElemAt: ["$c_info.nickname",0] },
                    "c_agent": { $arrayElemAt: ["$c_info.agent",0] },
                    "c_address": { $arrayElemAt: ["$c_info.address",0] },
                    "c_mobile": { $arrayElemAt: ["$c_info.mobile",0] },
                    "c_phone": { $arrayElemAt: ["$c_info.phone",0] },
                    "c_fax": { $arrayElemAt: ["$c_info.fax",0] },
                }
            },
            {
                $match: obj_match_filter    //Ex.   c_code: "C-00001" or code: "6312-00001"
            }
        ]);
    },
    findOneDeposit: (obj_filter) => {
        return DepositModel.findOne(obj_filter);
    },
    findOneLastDeposit: (obj_filter) => {
        return DepositModel.findOne(obj_filter).sort({id:-1});
    },
    insertDeposit: async (obj_data) => {
        const deposit = new DepositModel(obj_data);
        let isSaved = true;
        await deposit.save((err)=>{
            if(err){
                console.log("deposit.save() err = "+err);
                isSaved = false;
            }
        });
        return isSaved;
    },
    updateDeposit: (obj_filter, obj_newData) => {
        return DepositModel.findOneAndUpdate(obj_filter, obj_newData);
    },
    countDeposits: (obj_filter) => {
        return DepositModel.countDocuments(obj_filter);
    },
    // End "Deposits" Collection
    */


    //For "Withdraws" Collection   
    /*     
    findWithdraws: (obj_filter) => {
        return WithdrawModel.find(obj_filter);
    },
    aggLookupFullWithdraws: (obj_match_filter) => {  //Must use Local MongoDB
        obj_match_filter = obj_match_filter || {};
        return WithdrawModel.aggregate([
            {
                $unwind: "$wd_list"
            },
            {
                $lookup: {
                    from: "Customers",
                    localField: "c_id",
                    foreignField: "id",
                    as: "c_info"
                }
            },
            {
                $lookup: {
                    from: "Deposits",
                    localField: "wd_list.d_code",
                    foreignField: "code",
                    as: "d_info"
                }
            },
            {
                $lookup: {
                    from: "Products",
                    localField: "wd_list.p_id",
                    foreignField: "id",
                    as: "p_info"
                }
            },
            {
                $lookup: {
                    from: "TypeProducts",
                    localField: "p_info.tp_id",
                    foreignField: "id",
                    as: "tp_info"
                }
            },
            {
                $project: {
                    _id: 0,
                    id: 1,
                    code: 1,
                    how: 1,
                    wd_date: 1,
                    type_car: 1,
                    car_no: 1,
                    folklift: 1,
                    checker: 1,
                    "wd_qty": "$wd_list.wd_qty",
                    "rem_qty_now": "$wd_list.rem_qty_now",
                    "d_id": { $arrayElemAt: ["$d_info.id",0] },
                    "d_code": { $arrayElemAt: ["$d_info.code",0] },
                    "d_folklift": { $arrayElemAt: ["$d_info.folklift",0] },
                    "d_checker": { $arrayElemAt: ["$d_info.checker",0] },
                    "d_begin_date": { $arrayElemAt: ["$d_info.begin_date",0] },
                    "d_end_date": { $arrayElemAt: ["$d_info.end_date",0] },
                    "d_type_car": { $arrayElemAt: ["$d_info.type_car",0] },
                    "d_con_no_car_no": { $arrayElemAt: ["$d_info.con_no_car_no",0] },
                    "d_dep_total_cost": { $arrayElemAt: ["$d_info.dep_total_cost",0] },
                    "d_charge_cost": { $arrayElemAt: ["$d_info.charge_cost",0] },
                    "d_labor_cost": { $arrayElemAt: ["$d_info.labor_cost",0] },
                    "d_total_cost": { $arrayElemAt: ["$d_info.total_cost",0] },
                    "d_debt_cost": { $arrayElemAt: ["$d_info.debt_cost",0] },
                    "d_has_paid": { $arrayElemAt: ["$d_info.has_paid",0] },
                    "d_paid_date": { $arrayElemAt: ["$d_info.paid_date",0] },
                    "d_create_date": { $arrayElemAt: ["$d_info.create_date",0] },
                    "d_next_n": { $arrayElemAt: ["$d_info.next_n",0] },
                    "c_code": { $arrayElemAt: ["$c_info.code",0] },
                    "c_name": { $arrayElemAt: ["$c_info.name",0] },
                    "c_nickname": { $arrayElemAt: ["$c_info.nickname",0] },
                    "c_agent": { $arrayElemAt: ["$c_info.agent",0] },
                    "c_address": { $arrayElemAt: ["$c_info.address",0] },
                    "c_mobile": { $arrayElemAt: ["$c_info.mobile",0] },
                    "c_phone": { $arrayElemAt: ["$c_info.phone",0] },
                    "c_fax": { $arrayElemAt: ["$c_info.fax",0] },
                    "p_code": { $arrayElemAt: ["$p_info.code",0] },
                    "p_name": { $arrayElemAt: ["$p_info.name",0] },
                    "p_brand": { $arrayElemAt: ["$p_info.brand",0] },
                    "p_size": { $arrayElemAt: ["$p_info.size",0] },
                    "p_weight": { $arrayElemAt: ["$p_info.weight",0] },
                    "tp_code": { $arrayElemAt: ["$tp_info.code",0] },
                    "tp_name": { $arrayElemAt: ["$tp_info.name",0] },
                    "tp_unit": { $arrayElemAt: ["$tp_info.unit",0] },
                    "tp_deposit": { $arrayElemAt: ["$tp_info.deposit",0] }, 
                    "tp_dep_next": { $arrayElemAt: ["$tp_info.dep_next",0] },
                }
            },
            {
                $match: obj_match_filter    //Ex.   c_code: "C-00001" or code: "6312-00001"
            }
        ]);
    },
    findOneWithdraw: (obj_filter) => {
        return WithdrawModel.findOne(obj_filter);
    },
    findOneLastWithdraw: (obj_filter) => {
        return WithdrawModel.findOne(obj_filter).sort({code:-1});
    },
    insertWithdraw: async (obj_data) => {
        const withdraw = new WithdrawModel(obj_data);
        let isSaved = true;
        await withdraw.save((err)=>{
            if(err){
                console.log("withdraw.save() err = "+err);
                isSaved = false;
            }
        });
        return isSaved;
    },
    updateWithdraw: (obj_filter, obj_newData) => {
        return WithdrawModel.findOneAndUpdate(obj_filter, obj_newData);
    },
    countWithdraws: (obj_filter) => {
        return WithdrawModel.countDocuments(obj_filter);
    },
    // End "Withdraws" Collection
    */


    //For "Stocks" Collection        
    /*
    findStocks: (obj_filter) => {
        return StockModel.find(obj_filter);
    },
    aggLookupFullStocks: (obj_match_filter) => {  //Must use Local MongoDB
        obj_match_filter = obj_match_filter || {};
        return StockModel.aggregate([
            {
                $lookup: {
                    from: "Customers",
                    localField: "c_id",
                    foreignField: "id",
                    as: "c_info"
                }
            },
            {
                $lookup: {
                    from: "Deposits",
                    localField: "d_code",
                    foreignField: "code",
                    as: "d_info"
                }
            },
            {
                $lookup: {
                    from: "Products",
                    localField: "p_id",
                    foreignField: "id",
                    as: "p_info"
                }
            },
            {
                $lookup: {
                    from: "TypeProducts",
                    localField: "p_info.tp_id",
                    foreignField: "id",
                    as: "tp_info"
                }
            },
            {
                $project: {
                    _id: 0,
                    id: 1,
                    rem_qty: 1,
                    log_qty_arr: 1,
                    update_date_arr: 1,
                    has_next: 1,
                    "d_id": { $arrayElemAt: ["$d_info.id",0] },
                    "d_code": { $arrayElemAt: ["$d_info.code",0] },
                    "d_folklift": { $arrayElemAt: ["$d_info.folklift",0] },
                    "d_checker": { $arrayElemAt: ["$d_info.checker",0] },
                    "d_begin_date": { $arrayElemAt: ["$d_info.begin_date",0] },
                    "d_end_date": { $arrayElemAt: ["$d_info.end_date",0] },
                    "d_type_car": { $arrayElemAt: ["$d_info.type_car",0] },
                    "d_con_no_car_no": { $arrayElemAt: ["$d_info.con_no_car_no",0] },
                    "d_dep_total_cost": { $arrayElemAt: ["$d_info.dep_total_cost",0] },
                    "d_charge_cost": { $arrayElemAt: ["$d_info.charge_cost",0] },
                    "d_labor_cost": { $arrayElemAt: ["$d_info.labor_cost",0] },
                    "d_total_cost": { $arrayElemAt: ["$d_info.total_cost",0] },
                    "d_debt_cost": { $arrayElemAt: ["$d_info.debt_cost",0] },
                    "d_has_paid": { $arrayElemAt: ["$d_info.has_paid",0] },
                    "d_paid_date": { $arrayElemAt: ["$d_info.paid_date",0] },
                    "d_create_date": { $arrayElemAt: ["$d_info.create_date",0] },
                    "d_next_n": { $arrayElemAt: ["$d_info.next_n",0] },
                    "c_code": { $arrayElemAt: ["$c_info.code",0] },
                    "c_name": { $arrayElemAt: ["$c_info.name",0] },
                    "c_nickname": { $arrayElemAt: ["$c_info.nickname",0] },
                    "c_agent": { $arrayElemAt: ["$c_info.agent",0] },
                    "c_address": { $arrayElemAt: ["$c_info.address",0] },
                    "c_mobile": { $arrayElemAt: ["$c_info.mobile",0] },
                    "c_phone": { $arrayElemAt: ["$c_info.phone",0] },
                    "c_fax": { $arrayElemAt: ["$c_info.fax",0] },
                    "p_code": { $arrayElemAt: ["$p_info.code",0] },
                    "p_name": { $arrayElemAt: ["$p_info.name",0] },
                    "p_brand": { $arrayElemAt: ["$p_info.brand",0] },
                    "p_size": { $arrayElemAt: ["$p_info.size",0] },
                    "p_weight": { $arrayElemAt: ["$p_info.weight",0] },
                    "tp_code": { $arrayElemAt: ["$tp_info.code",0] },
                    "tp_name": { $arrayElemAt: ["$tp_info.name",0] },
                    "tp_unit": { $arrayElemAt: ["$tp_info.unit",0] },
                    "tp_deposit": { $arrayElemAt: ["$tp_info.deposit",0] }, 
                    "tp_dep_next": { $arrayElemAt: ["$tp_info.dep_next",0] },
                    "last_update": { $arrayElemAt: ["$update_date_arr",-1] }
                }
                
            },
            {
                $match: obj_match_filter    //Ex.   c_code: "C-00001" or d_code: "6312-00001"
            }
        ]);
    },
    findOneStock: (obj_filter) => {
        return StockModel.findOne(obj_filter);
    },
    findOneLastStock: (obj_filter) => {
        return StockModel.findOne(obj_filter).sort({id:-1});
    },
    insertStock: async (obj_data) => {
        const stock = new StockModel(obj_data);
        let isSaved = true;
        await stock.save((err)=>{
            if(err){
                console.log("stock.save() err = "+err);
                isSaved = false;
            }
        });
        return isSaved;
    },
    updateStock: (obj_filter, obj_newData) => {
        return StockModel.findOneAndUpdate(obj_filter, obj_newData);
    },
    countStocks: (obj_filter) => {
        return StockModel.countDocuments(obj_filter);
    },
    // End "Stocks" Collection
    */


    //For "HistoryLogs" Collection      (Should be use on Cloud MongoDB)
    findHistoryLogs: (obj_filter) => {
        return HistoryLogModel.find(obj_filter);
    },
    find15LastHistoryLogs: () => {
        return HistoryLogModel.aggregate([{
            $project: {
                _id: 0,
                code: 1,
                m_id: 1,
                todo: 1,
                todo_detail: 1,
                date: 1,
                "date_str": { 
                    $dateToString: {
                        format: "%Y-%m-%d %H:%M",
                        date: "$date",
                        timezone: "+07:00"
                    }
                }
            }
        }]).sort({code:-1}).limit(15);
        // return HistoryLogModel.find(obj_filter, {
        //     _id: 0,
        //     code: 1,
        //     m_id: 1,
        //     todo: 1,
        //     todo_detail: 1,
        //     date: 1        //instead of date_str because cannot use option $dateToString
        //     // "date_str": {        // ERROR Cannot use on Cloud MongoDB
        //     //     $dateToString: {
        //     //         format: "%Y-%m-%d %H:%M",
        //     //         date: "$date",
        //     //         timezone: "+07:00"
        //     //     }
        //     // }
        // }).sort({code:-1}).limit(15);
    },
    findOneLastHistoryLog: () => {
        return HistoryLogModel.aggregate([{
            $project: {
                _id: 0,
                code: 1,
                todo: 1,
                todo_detail: 1,
                date: 1,
                "date_str": { 
                    $dateToString: {
                        format: "%Y-%m-%d %H:%M",
                        date: "$date",
                        timezone: "+07:00"
                    }
                }
            }
        // }]).sort({code:-1});
        }]).sort({code:-1}).limit(1);
        // return HistoryLogModel.findOne(obj_filter, {
        //     _id: 0,
        //     code: 1,
        //     m_id: 1,
        //     todo: 1,
        //     todo_detail: 1,
        //     date: 1         //instead of date_str because cannot use option $dateToString
        //     // "date_str": {        // ERROR Cannot use on Cloud MongoDB
        //     //     $dateToString: {
        //     //         format: "%Y-%m-%d %H:%M",
        //     //         date: "$date",
        //     //         timezone: "+07:00"
        //     //     }
        //     // }
        // }).sort({code:-1});
    },
    insertHistoryLog: async (obj_data) => {
        const history_log = new HistoryLogModel(obj_data);
        let isSaved = true;
        await history_log.save((err)=>{
            if(err){
                console.log("history_log.save() err = "+err);
                isSaved = false;
            }
        });
        return isSaved;
    },
    aggLookupFullHistoryLogs: (obj_match_filter) => {
        obj_match_filter = obj_match_filter || {};
        return HistoryLogModel.aggregate([
            {
                $lookup: {
                    from: "Members",
                    localField: "m_id",
                    foreignField: "id",
                    as: "m_info"
                }
            },
            {
                $project: {
                    _id: 0,
                    code: 1,
                    todo: 1,
                    todo_detail: 1,
                    date: 1,
                    "m_code": { $arrayElemAt: ["$m_info.code",0] },   //?
                    "m_username": { $arrayElemAt: ["$m_info.username",0] },
                    "m_profile_name": { $arrayElemAt: ["$m_info.profile_name",0] },
                    "date_str": { 
                        $dateToString: {
                            format: "%Y-%m-%d %H:%M",
                            date: "$date",
                            timezone: "+07:00"
                        }
                    }
                }
            },
            {
                $match: obj_match_filter    //Ex.   tp_name: "Apple 20kg" or code: "P-00001"
            }
        ]);
    },
   // End "HistoryLogs" Collection


    //For "Logs" Collection      (Should be use on Cloud MongoDB)
    findLogs: (obj_filter) => {
        return LogModel.find(obj_filter);
    },
    findOneLastLog: () => {
        return LogModel.aggregate([{
            $project: {
                _id: 0,
                code: 1,
                todo: 1,
                todo_detail: 1,
                date: 1,
                "date_str": { 
                    $dateToString: {
                        format: "%Y-%m-%d %H:%M",
                        date: "$date",
                        timezone: "+07:00"
                    }
                }
            }
        }]).sort({code:-1}).limit(1);
    },
    insertLog: async (obj_data) => {
        const log = new LogModel(obj_data);
        let isSaved = true;
        await log.save((err)=>{
            if(err){
                console.log("log.save() err = "+err);
                isSaved = false;
            }
        });
        return isSaved;
    },
    aggLookupFullLogs: (obj_match_filter) => {
        obj_match_filter = obj_match_filter || {};
        return LogModel.aggregate([
            {
                $lookup: {
                    from: "Users",
                    localField: "m_id",
                    foreignField: "id",
                    as: "m_info"
                }
            },
            {
                $project: {
                    _id: 0,
                    code: 1,
                    todo: 1,
                    todo_detail: 1,
                    date: 1,
                    "m_code": { $arrayElemAt: ["$m_info.code",0] },   //?
                    "m_username": { $arrayElemAt: ["$m_info.username",0] },
                    "m_profile_name": { $arrayElemAt: ["$m_info.profile_name",0] },
                    "date_str": { 
                        $dateToString: {
                            format: "%Y-%m-%d %H:%M",
                            date: "$date",
                            timezone: "+07:00"
                        }
                    }
                }
            },
            {
                $match: obj_match_filter    //Ex.   tp_name: "Apple 20kg" or code: "P-00001"
            }
        ]);
    },
   // End "Logs" Collection


    //For "TB_AP_JV_PC" Collection     
    aggGroupJV: () => {
        return TB_AP_JV_PC_Model.aggregate([
            {
                $group: {
                    _id: '$jv_name'
                }
            },
            {
                $sort: {
                    _id: 1
                }
            }
        ]).collation({locale:"th"});
    },
    aggGroupAP: (jv_name) => {
        return TB_AP_JV_PC_Model.aggregate([
            {
                $match: {
                    jv_name: jv_name
                }
            },
            {
                $group: {
                    _id: '$ap_name'
                }
            },
            {
                $sort: {
                    _id: 1
                }
            }
        ]).collation({locale:"th"});
    },
    aggMatchProjTB_PC: (jv_name, ap_name) => {
        return TB_AP_JV_PC_Model.aggregate([
            {
                $match: {
                    jv_name: jv_name,
                    ap_name: ap_name
                }
            },
            {
                $project: {
                    _id: 0,
                    id:1,
                    tb_name:1,
                    postcode:1
                }
            },
            {
                $sort: {
                    tb_name: 1
                }
            }
        ]).collation({locale:"th"});
    },
    // End "TB_AP_JV_PC" Collection


    //For "Padlets" Collection      
    findPadlets: (obj_filter) => {
        return PadletModel.find(obj_filter);
    },
    findOneLastPadlet: () => {
        return PadletModel.aggregate([{
            $project: {
                _id: 0,
                id: 1,
                code: 1,
                name: 1,
                original_url: 1,
                backup_url: 1,
                students: 1
            }
        // }]).sort({code:-1});
        }]).sort({code:-1}).limit(1);
    },
    insertPadlet: async (obj_data) => {
        const padlet = new PadletModel(obj_data);
        let isSaved = true;
        await padlet.save((err)=>{
            if(err){
                console.log("padlet.save() err = "+err);
                isSaved = false;
            }
        });
        return isSaved;
    },
   // End "Padlets" Collection

}
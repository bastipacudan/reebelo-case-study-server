const dbManager = require("../../../database/dbManager");
const { 
    getErrorResponse,
    getOrderStatus,
    validateOrderFields,
 } = require("../../util/helper");

 const { queryType } = require("../../util/queryMaker");

exports.createOrder = async (req, res) => {
    try {
        
        const { payload } = req.body;

        if(!validateOrderFields(payload)) {
            return res.status(400).json("Please check order fields");
        }

        const { product_id, quantity, total, shipping_address, tracking_company, tracking_number, status } = payload;
        const result = await dbManager.query(
                        queryType.order.CREATE_ORDER,
                        product_id,
                        quantity,
                        shipping_address, 
                        total, 
                        tracking_company, 
                        tracking_number, 
                        getOrderStatus(status),
                        Date.now(),
                        Date.now(),
                       );
     
        
        return res.status(201).json(result);     
    } catch(error) {
       return res.status(500).json(getErrorResponse(error))
    }
}

exports.updateOrder = async (req, res) => {
    try {
        
        const { orderId } = req.params.orderId;
        const { payload } = req.body;
        if(!orderId) {
            return res.status(400).json("Order ID can't be null");
            
        }
        if(!validateOrderFields(payload)) {
            return res.status(400).json("Please check order fields");
        }

        const { product_id, quantity, total, shipping_address, tracking_company, tracking_number, status, order_date } = payload;
        const result = await dbManager.query(
                        queryType.order.UPDATE_ORDER,
                        orderId,
                        product_id,
                        quantity,
                        shipping_address, 
                        total, 
                        tracking_company, 
                        tracking_number, 
                        getOrderStatus(status),
                        order_date,
                        Date.now(),
                       );
     
        
        return res.status(201).json(result);     
    } catch(error) {
        return res.status(500).json(getErrorResponse(error));
    }
       
}

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await dbManager.query(queryType.order.GET_ALL_ORDERS);

        return res.status(200).json(orders)
    } catch(error) {
        return res.status(500).json(getErrorResponse(error));
    }
}

exports.deleteOrder = async (req, res) => {
    res.send('Order Deleted!')
}

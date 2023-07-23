const { orderStatusType } = require("../constant/index");

function getErrorResponse (error) {
    const errorObject = {
        error: error.message,
        stack: error.stack
    }
    console.log(errorObject)

    return errorObject;
}

function validateProductFields(productInfo = {}) {
    const { name, description, quantity, price, image } = productInfo

    //Check for non-nullable fields
    if(!name || !quantity || !price) return false;
    
    if(typeof description !== "string" || typeof name !== "string" || typeof image !== "string"|| 
       typeof quantity !== "number" || typeof price !== "number") return false;


    return true;
}

function validateOrderFields(orderInfo = {}) {
    const { product_id, quantity, total, status, tracking_number, tracking_company, order_date } = orderInfo;

    if(!product_id || !quantity || !total || !status || !tracking_number || !tracking_company || !order_date) return false;

    return true;
}

function getOrderStatus(orderStatus) {
    switch(orderStatus) {
        case orderStatusType.CANCELLED: return orderStatusType.CANCELLED;
        case orderStatusType.DELIVERED: return orderStatusType.DELIVERED;
        case orderStatusType.DELAYED: return orderStatusType.DELAYED;
        case orderStatusType.PROCESSING: return orderStatusType.PROCESSING;
        default: return orderStatusType.PROCESSING
    }
}

module.exports = Object.freeze({
    getErrorResponse,
    getOrderStatus,
    validateOrderFields,
    validateProductFields,
})
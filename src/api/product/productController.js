const dbManager = require("../../../database/dbManager");
const { queryType } = require("../../util/queryMaker");
const { getErrorResponse, validateProductFields } = require("../../util/helper");

exports.createProduct = async (req, res) => {
    try {
        if(!validateProductFields(payload)) {
            return res.status(400).json("Please check product fields");
        }

        const { name, description, quantity, price, image} = req.body;
        const result = await dbManager.query(queryType.product.CREATE_PRODUCT, name, description, quantity, price, image)
        
        return res.status(201).json(result);     
    } catch(error) {
       return res.status(500).json(getErrorResponse(error))
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const { payload } = req.body;

        if(!productId) {
            return res.status(400).json("Product ID can't be null");
        }

        if(!validateProductFields(payload)) {
            return res.status(400).json("Please check product fields");
        }

        const { name, description, quantity, price, image} = payload;
        const result = await dbManager.query(queryType.product.UPDATE_PRODUCT, productId, name, description, quantity, price, image)
        
        return res.status(201).json(result);     
    } catch(error) {
       return res.status(500).json(getErrorResponse(error));
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const products = await dbManager.query(queryType.product.GET_ALL_PRODUCTS);

        return res.status(200).json(products);     
    } catch(error) {
        return res.status(500).json(getErrorResponse(error));
    }
}

exports.deleteProduct = async (req, res) => {
    res.send('Product Deleted!')
}

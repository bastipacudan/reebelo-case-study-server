const queryType = {
    product: {
        CREATE_PRODUCT: "create_product",
        UPDATE_PRODUCT: "update_product",
        GET_ALL_PRODUCTS: "get_all_products",
        DELETE_PRODUCT: "delete_product",
    },
    order: {
        CREATE_ORDER: 'create_order',
        UPDATE_ORDER: "update_order",
        GET_ALL_ORDERS: "get_all_orders",
        DELETE_ORDER: "delete_order",
    },
}

function querySeparator (query, valueComponents = null) {
    return { query: query, valueComponents: valueComponents }
}

function makeQuery(type, values) {
    switch(type) {
        case queryType.product.CREATE_PRODUCT: {
            const query = `INSERT INTO "product" ("name", "description", "quantity", "price", "image")
                            VALUES ($1, $2, $3, $4, $5)
                            returning *`;

            return querySeparator(query, values);
        }
        case queryType.product.UPDATE_PRODUCT: {
            const query = `UPDATE "product" SET "name" = $2, "description" = $3, "quantity" = $4, "price" = $5, "image" = $6
                            WHERE id = $1
                            returning *`;
            return querySeparator(query, values);
        }
        case queryType.product.GET_ALL_PRODUCTS: {
            const query = `SELECT * FROM "product"`;

            return querySeparator(query);
        }
        case queryType.order.CREATE_ORDER: {
            const query = `INSERT INTO "order" ("product_id", "quantity", "shipping_address", "total", "tracking_company", "tracking_number", "status", "order_date", "date_updated")
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                            returning *`;

            return querySeparator(query, values);
        }
        case queryType.order.UPDATE_ORDER: {
            const query = `UPDATE "order" SET "product_id" = $2, "quantity" = $3, "shipping_address" = $4, "total" = $5, "tracking_company" = $6, "tracking_number" = $7, "status" = $8, "order_date" = $9, "date_updated" = $10
                            WHERE id = $1
                            returning *`;

            return querySeparator(query, values);
        }
        case queryType.order.GET_ALL_ORDERS: {
            const query = `SELECT * FROM "order"`;
            return querySeparator(query, values)
        }
        default: {
            throw Error(`${type} query can't be made`)
        }

    }
}

module.exports = Object.freeze({
    queryType,  
    makeQuery,
})
  
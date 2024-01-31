const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const ProductCart = require('../models/ProductCart');

const getAll = catchError(async(req, res) => {
    const results = await Purchase.findAll({
        include: [Product],
        where: { userId: req.user.id }
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await ProductCart.findAll({
        where: { userId: req.user.id },
        attributes:  ['quantity', 'userId', 'productId' ],
        raw: true
    });
    const purchases = await Purchase.bulkCreate(result);
    await ProductCart.destroy({ where: { userId: req.user.id }})
    return res.json(purchases);
});


module.exports = {
    getAll,
    create
}
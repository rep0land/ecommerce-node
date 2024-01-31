const Category = require("./Category");
const Image = require("./Image");
const Product = require("./Product");
const ProductCart = require("./ProductCart");
const Purchase = require("./Purchase");
const User = require("./User");


Product.belongsTo(Category);
Category.hasMany(Product);

Product.hasMany(Image);
Image.belongsTo(Product);

User.hasMany(ProductCart);
ProductCart.belongsTo(User);

Product.hasMany(ProductCart);
ProductCart.belongsTo(Product);

Purchase.belongsTo(User);
User.hasMany(Purchase);

Purchase.belongsTo(Product);
Product.hasMany(Purchase);

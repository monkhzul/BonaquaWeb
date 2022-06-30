
module.exports = app => {
    const bonaqua = require("../controller/UserController");
    var router = require("express").Router();

    router.get("/", bonaqua.getBonaqua);
    router.get("/pricelist", bonaqua.getPricelist);
    router.post("/addOrder", bonaqua.addOrder);
    router.post("/addOrderDetail", bonaqua.addOrderDetail);
    router.post("/updateOrder", bonaqua.updateOrder);

    app.use('/api/bonaqua', router);
};

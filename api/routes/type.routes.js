const router = require("express").Router();
const TypeController = require("../app/controllers/type.controller");
const loginCheck = require("../app/middleware/auth.middleware");
const { isAdmin } = require("../app/middleware/rbac.middleware");
const uploader = require("../app/middleware/uploader.middleware");
const type_ctrl = new TypeController();

// banner, brand
const contentType = (req, res, next) => {
    if(req.params.type && ['brand','banner'].includes(req.params.type)) {
        req.type = req.params.type;
        next()
    } else {
        next({status: 404, msg: "Request does not exists"})
    }
}
const upload_path = (req, res, next) => { 
    req.upload_path = "public/uploads/"+req.type;
    next();
}
router
    .route("/:type")
        .get(contentType, type_ctrl.getAllLists)
        .post(contentType, loginCheck, isAdmin,upload_path, uploader.single('image'), type_ctrl.createContent)

router.route("/:type/:id")
    .put(contentType, loginCheck, isAdmin,upload_path, uploader.single('image'), type_ctrl.updateContent)
    .get(contentType, type_ctrl.getById)
    .delete(contentType, loginCheck, isAdmin, type_ctrl.deleteById)
module.exports = router;
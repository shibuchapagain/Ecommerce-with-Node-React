const router = require("express").Router();
const UserController = require("../app/controllers/user.controller");
const loginCheck = require("../app/middleware/auth.middleware");
const { isAdmin } = require("../app/middleware/rbac.middleware");
const uploader = require("../app/middleware/uploader.middleware");
const user_ctrl = new UserController();

const upload_path = (req, res, next) => {
  req.upload_path = "public/uploads/user";
  next();
};
router
  .route("/")
  .get(loginCheck, isAdmin, user_ctrl.getAllLists)
  .post(
    loginCheck,
    isAdmin,
    upload_path,
    uploader.single("image"),
    user_ctrl.createContent
  );

router
  .route("/:id")
  .put(
    loginCheck,
    isAdmin,
    upload_path,
    uploader.single("image"),
    user_ctrl.updateContent
  )
  .get(user_ctrl.getById)
  .delete(loginCheck, isAdmin, user_ctrl.deleteById);
module.exports = router;

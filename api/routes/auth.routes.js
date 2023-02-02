const router = require("express").Router();
const AuthController = require("../app/controllers/auth.controller");
const loginCheck = require("../app/middleware/auth.middleware");
const { isAdmin } = require("../app/middleware/rbac.middleware");

const auth = new AuthController();
const uploader = require("../app/middleware/uploader.middleware");
const upload_path = (req, res, next) => {
  req.upload_path = "public/uploads/user";
  next();
};
// /login
router.post("/login", auth.login);

// /user => /public/uploads/user
// /product => /public/uploads/product
// register
router.post("/register", upload_path, uploader.single("image"), auth.register);

router.get("/me", loginCheck, auth.getLoggedInUser);

module.exports = router;

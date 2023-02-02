const UserService = require("../services/user.service");
const slugify = require("slugify");
const bcrypt = require("bcrypt");
const sendEmail = require("./../services/mail.service");

class UserController {
  constructor() {
    this.user_svc = new UserService();
  }
  getAllLists = async (req, res, next) => {
    try {
      let result = await this.user_svc.getAllUsers(req.auth_user._id);
      res.json({
        retult: result,
        status: true,
        msg: "User fetched",
      });
    } catch (exception) {
      console.log("geAllList: ", exception);
      next({ status: 422, msg: exception });
    }
  };
  createContent = async (req, res, next) => {
    try {
      let data = req.body;

      if (req.file) {
        data.image = req.file.filename;
      }

      await this.user_svc.validateData(data);
      data.password = bcrypt.hashSync(data.password, 10);
      let response = await this.user_svc.saveContent(data);

      sendEmail({
        to: data.email,
        subject: "Account registered",
        text: "Plaintext version of the message",
        html: `<p style="background-color: red">Dear ${data.name}, You have been registered in our applicaiton.</p>`,
      });

      if (response) {
        sendEmail({
          to: data.email,
          subject: "Account registered",
          text: "Plaintext version of the message",
          html: `<p style="background-color: red">Dear ${data.name}, You have been registered in our applicaiton.</p>`,
        });

        res.json({
          result: data,
          status: true,
          msg: "User created",
        });
      } else {
        throw "Problem while creating content";
      }
    } catch (exception) {
      console.log("createContent: ", exception);
      next({ status: 422, msg: exception });
    }
  };
  updateContent = async (req, res, next) => {
    try {
      let data = req.body;
      let user = await this.user_svc.getUserById(req.params.id);

      if (req.file) {
        data.image = req.file.filename;
      } else {
        data.image = user.image;
      }

      await this.user_svc.validateData(data, true);

      let response = await this.user_svc.updateContent(data, req.params.id);

      if (response) {
        res.json({
          result: data,
          status: true,
          msg: "User updated",
        });
      } else {
        throw "Problem while updating content";
      }
    } catch (exception) {
      console.log("updateContent: ", exception);
      next({ status: 422, msg: exception });
    }
  };
  getById = async (req, res, next) => {
    try {
      let data = await this.user_svc.getUserById(req.params.id);
      res.json({
        result: data,
        status: true,
        msg: "Resource fetched.",
      });
    } catch (except) {
      next({ status: 422, msg: except });
    }
  };
  deleteById = async (req, res, next) => {
    try {
      let response = await this.user_svc.deleteById(req.params.id);
      res.json({
        result: response,
        msg: "Content deleted successfully",
        status: true,
      });
    } catch (exception) {
      next({ status: 422, msg: exception });
    }
  };
}

module.exports = UserController;

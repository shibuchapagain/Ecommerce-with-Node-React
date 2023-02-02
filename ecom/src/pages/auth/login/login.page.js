import { Container, Row, Col, Form } from "react-bootstrap";
import ButtonComponent from "../../../components/common/buttons.component";
import { EmailInputComponent } from "../../../components/common/input.component";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../../../services/auth-service";
// import axiosInstance from "../../../services/axios.service";
// import API_ENDOINTS from "../../../config/api-endpoints.config";

import { useDispatch } from "react-redux";
import { userStore } from "../../../reducers/user.slicer";

const LoginPage = () => {
  // FOR STATE:
  // let [email, setEmail] = useState();
  // let [password, setPassword] = useState();

  // for store input fields data:
  let [data, setData] = useState({
    email: null,
    password: null,
  });
  let [loading, setLoading] = useState(false);

  // for react-redux to store the data:
  let dispatch = useDispatch();

  let navigate = useNavigate();
  // for set error:
  let [err, setErr] = useState();

  // custom function:
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    validateField(e.target.name, e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      Object.keys(data).map((key) => {
        return validateField(key, data[key]);
      });
      // API CALL
      // let response = await axiosInstance.post(API_ENDOINTS.login, data);
      // toast.success(response.data.msg);
      // updated with service and other file as well:
      let auth_svc = new AuthService();
      let loginResp = await auth_svc.login(data);
      if (loginResp) {
        // to store a data in react -redux:
        dispatch(userStore(loginResp));
        toast.success("welcome to user pannel");
        navigate("/" + loginResp.role);
      }
    } catch (err) {
      toast.error(err.msg);
    } finally {
      setLoading(false);
    }
  };

  const validateField = (field, value) => {
    let msg = null;
    switch (field) {
      case "email":
        msg = !value ? "Email address is required" : null;
        break;
      case "password":
        msg = !value ? "Password is required" : null;
        break;
      default:
        break;
    }
    setErr({
      ...err,
      [field]: msg,
    });
  };

  // const validateData = () => {
  //   if (!data.email) {
  //     // email null
  //     setErr({
  //       ...err,
  //       email: "Email address is required",
  //     });
  //   } else {
  //     setErr({
  //       ...err,
  //       email: null,
  //     });
  //   }
  //   if (!data.password) {
  //     // password null
  //     setErr({
  //       ...err,
  //       password: "password is required",
  //     });
  //   } else {
  //     setErr({
  //       ...err,
  //       password: null,
  //     });
  //   }
  // };
  ////////////////////
  return (
    <>
      <ToastContainer />
      <Container>
        <Row>
          <Col>
            <h1 className="text-center">Login Page</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <EmailInputComponent
                lable={"Username"}
                name="email"
                required={false}
                setChange={handleChange}
                errmsg={err?.email}
              />
              <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Password: </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    // onChange={(e) => {
                    //   setPassword(e.target.value);
                    // }}
                    onChange={handleChange}
                    size="sm"
                    type="password"
                    name="password"
                    // required
                  ></Form.Control>
                  <span className="text-danger">{err?.password}</span>
                </Col>
              </Form.Group>
              <Form.Group className="row mb-3">
                <Col sm={{ offset: 3, span: 9 }}>
                  <ButtonComponent
                    loading={loading}
                    showCancel={true}
                    cancelText="Reset"
                    submitText="Login"
                  />
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;

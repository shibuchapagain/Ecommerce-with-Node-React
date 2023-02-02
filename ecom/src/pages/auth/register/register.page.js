import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { EmailInputComponent } from "../../../components/common/input.component";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../../services/axios.service";

const RegisterPage = () => {
  const schema = Yup.object({
    name: Yup.string()
      .required("Name is compulsory")
      .min(3, "Name must be of atleast 3 character"),
    email: Yup.string().email().required(),
    // Yup.string().nullable() --> if its also exit nullable as well
    password: Yup.string()
      .required()
      .matches(/[a-zA-Z0-9]/)
      .min(8),
    role: Yup.string()
      .required()
      .matches(/(customer|seller)/),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "customer",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      // API CALL:
      try {
        let response = await axiosInstance.post("/auth/register", values);
        toast.success(response.data.msg);
      } catch (err) {
        toast.error(err?.response.data.msg);
      }
    },
  });
  return (
    <>
      <ToastContainer />
      <Container>
        <Row>
          <Col>
            <h1 className="text-center">Register Page</h1>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Name: </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    size="sm"
                    name="name"
                    value={formik.values.name}
                    required
                    onChange={formik.handleChange}
                    placeholder="Enter your name"
                  />
                  <span className="text-danger">{formik?.errors?.name}</span>
                </Col>
              </Form.Group>

              <EmailInputComponent
                lable={"Email"}
                name="email"
                required={true}
                setChange={(e) => {
                  formik.setValues({
                    ...formik.values,
                    email: e.target.value,
                  });
                }}
                errmsg={formik?.errors?.email}
              />

              <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Password: </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    size="sm"
                    name="password"
                    required
                    type="password"
                    onChange={formik.handleChange}
                    placeholder="Enter your password"
                  />
                </Col>
              </Form.Group>

              <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Role: </Form.Label>
                <Col sm={9}>
                  <Form.Select
                    size="sm"
                    name="role"
                    defaultValue={formik.values.status}
                    onChange={formik.handleChange}
                  >
                    {/* <option value={""}>-- Select any one.</option> */}
                    <option value={"seller"}>Seller</option>
                    <option value={"customer"}>Customer</option>
                  </Form.Select>
                </Col>
              </Form.Group>

              <Form.Group className="row mb-3">
                <Col sm={{ offset: 3, span: 9 }}>
                  <Button type="reset" variant="danger" className="me-3">
                    Cancel
                  </Button>
                  <Button type="submit" variant="success">
                    Register
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegisterPage;

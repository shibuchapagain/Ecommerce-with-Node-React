import { Form, Col } from "react-bootstrap";
import { Formik, useFormik } from "formik";
import ButtonComponent from "../../common/buttons.component";
import * as Yup from "yup";
import { useEffect } from "react";

const UserForm = ({ setSubmitAction, defaultValue, isEdit = false }) => {
  // for Validation:
  let userValidation = Yup.object({
    name: Yup.string().required().nullable(),
    email: Yup.string().required().email(),
    password: Yup.string().required().min(8),
    status: Yup.string().required().nullable(),
    role: Yup.string().required(),
    // image: Yup.object().required().nullable(),
    // link: Yup.string().url().nullable(),
  });

  let formik = useFormik({
    initialValues: defaultValue,
    validationSchema: userValidation,
    onSubmit: async (values) => {
      setSubmitAction(values);
    },
  });

  useEffect(() => {
    formik.setValues({
      ...defaultValue,
    });
  }, [defaultValue]);

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Name: </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="name"
              size="sm"
              value={formik?.values?.name ?? ""}
              placeholder="Enter user name"
              onChange={formik.handleChange}
            />
            <span className="test-danger">{formik.errors?.name}</span>
          </Col>
        </Form.Group>

        {!isEdit ? (
          <>
            <Form.Group className="row mb-3">
              <Form.Label className="col-sm-3">Email: </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="email"
                  name="email"
                  size="sm"
                  value={formik?.values?.email ?? ""}
                  placeholder="Enter user email"
                  onChange={formik.handleChange}
                />
                <span className="test-danger">{formik.errors?.email}</span>
              </Col>
            </Form.Group>

            <Form.Group className="row mb-3">
              <Form.Label className="col-sm-3">Password: </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="password"
                  name="password"
                  size="sm"
                  value={formik?.values?.password ?? ""}
                  placeholder="Enter user password"
                  onChange={formik.handleChange}
                />
                <span className="test-danger">{formik.errors?.password}</span>
              </Col>
            </Form.Group>
          </>
        ) : (
          <></>
        )}

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Role: </Form.Label>
          <Col sm={9}>
            <Form.Select
              name="role"
              size="sm"
              value={formik?.values?.role ?? ""}
              onChange={formik.handleChange}
            >
              <option>---Select Any One---</option>
              <option value="customer">Customer</option>
              <option value="seller">Seller</option>
            </Form.Select>
            <span className="test-danger">{formik.errors?.role}</span>
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Status: </Form.Label>
          <Col sm={9}>
            <Form.Select
              name="status"
              size="sm"
              value={formik?.values?.status ?? ""}
              onChange={formik.handleChange}
            >
              <option>---Select Any One---</option>
              <option value={"active"}>Active</option>
              <option value={"inactive"}>In-Active</option>
            </Form.Select>
            <span className="test-danger">{formik.errors?.status}</span>
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Image: </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => {
                // file always be object of object
                // if image is single then e.targer.files[0]
                // CUSTOM VALIDATION ON IMAGE FILE:
                let ext = e.target.files[0].name.split(".").pop();
                if (
                  ["jpg", "png", "webg", "png", "jpeg", "svg"].includes(
                    ext.toLowerCase()
                  )
                ) {
                  formik.setValues({
                    ...formik.values,
                    image: e.target.files[0],
                  });
                } else {
                  formik.setErrors({
                    ...formik.errors,
                    image: "Invalid image format",
                  });
                }
              }}
            />
            <span className="test-danger">{formik.errors?.link}</span>
          </Col>
          <Col sm={2}>
            {formik.values?.image ? (
              // <img
              //   src={URL.createObjectURL(formik.values.image)}
              //   className="img img-fluid img-thumbnail"
              // />
              typeof formik?.values?.image === "object" ? (
                <img
                  src={URL.createObjectURL(formik.values.image)}
                  className="img img-fluid img-thumbnail"
                />
              ) : (
                <img
                  src={
                    process.env.REACT_APP_IMAGE_URL +
                    "user/" +
                    formik.values.image
                  }
                  className="img img-fluid img-thumbnail"
                />
              )
            ) : (
              <></>
            )}
            <span className="test-danger">{formik.errors?.image}</span>
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Col sm={{ offset: 3, span: 9 }}>
            <ButtonComponent
              //   showCancel, cancelText, submitText, loading
              showCancel={true}
              cancelText={"Reset"}
              submitText={"Submit"}
              loading={false}
            />
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

export default UserForm;

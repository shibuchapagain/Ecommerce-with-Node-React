import { Form, Col } from "react-bootstrap";
import { Formik, useFormik } from "formik";
import ButtonComponent from "../../common/buttons.component";
import * as Yup from "yup";
import { useEffect, useCallback, useState } from "react";
import { category_svc } from "./category.service";

const CategoryForm = ({ setSubmitAction, defaultValue }) => {
  // for fetch parent_id data:
  let [categories, setCategories] = useState();
  // console.log("default values are:", defaultValue);
  // for Validation:
  let categoryValidation = Yup.object({
    name: Yup.string().required().nullable(),
    status: Yup.string().required().nullable(),
    parent_id: Yup.string().nullable(),
    // image: Yup.object().required().nullable(),
    // link: Yup.string().url().nullable(),
  });

  let formik = useFormik({
    initialValues: defaultValue,
    validationSchema: categoryValidation,
    onSubmit: async (values) => {
      setSubmitAction(values);
    },
  });

  const getAllCategories = useCallback(async () => {
    let response = await category_svc.getAllList();
    if (response.status) {
      setCategories(response.retult);
    }
  });

  useEffect(() => {
    getAllCategories();
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
              placeholder="Enter category name"
              onChange={formik.handleChange}
            />
            <span className="test-danger">{formik.errors?.name}</span>
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Sub-Category of: </Form.Label>
          <Col sm={9}>
            <Form.Select
              name="parent_id"
              size="sm"
              value={formik?.values?.parent_id ?? ""}
              onChange={formik.handleChange}
            >
              <option>---Select Any One---</option>
              {categories &&
                categories?.map((item, key) => {
                  <option key={key} value={item._id}>
                    {item.name}
                  </option>;
                })}
            </Form.Select>
            <span className="test-danger">{formik.errors?.parent_id}</span>
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
                    "category/" +
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

export default CategoryForm;

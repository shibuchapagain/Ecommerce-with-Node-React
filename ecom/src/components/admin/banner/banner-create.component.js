import { useFormik } from "formik";
import { Col, Form } from "react-bootstrap";
import ButtonComponent from "../../common/buttons.component";
import { AdminBreadCrumb } from "../admin-partials.component";
import * as Yup from "yup";
import BannerService from "./banner.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const BannerCreate = () => {
  let banner_svc = new BannerService();
  let navigate = useNavigate();
  // for Validation:
  let bannerValidation = Yup.object({
    title: Yup.string().required().nullable(),
    status: Yup.string().required().nullable(),
    // image: Yup.object().required().nullable(),
    link: Yup.string().url().nullable(),
  });

  // data handle:
  let formik = useFormik({
    initialValues: {
      title: null,
      status: null,
      image: null,
      link: null,
    },
    validationSchema: bannerValidation,
    onSubmit: async (values) => {
      try {
        let response = await banner_svc.createBanner(values);
        // console.log("response", response);
        if (response.status) {
          toast.success(response.msg);
          navigate("/admin/banner");
        }
      } catch (except) {
        // console.log("error", except);
        toast.error(except);
      }
    },
  });

  // console.log("formik values", formik.values);

  return (
    <>
      <div className="container-fluid px-4">
        <AdminBreadCrumb showAdd={false} title={"Banner"} type="banner" />
        <div className="card mb-4">
          <div className="card-body">
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Title: </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    name="title"
                    size="sm"
                    placeholder="Enter banner title"
                    onChange={formik.handleChange}
                  />
                  <span className="test-danger">{formik.errors?.title}</span>
                </Col>
              </Form.Group>

              <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Link: </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="url"
                    name="link"
                    size="sm"
                    placeholder="Enter banner link"
                    onChange={formik.handleChange}
                  />
                  <span className="test-danger">{formik.errors?.link}</span>
                </Col>
              </Form.Group>

              <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Status: </Form.Label>
                <Col sm={9}>
                  <Form.Select
                    name="status"
                    size="sm"
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
                    <img
                      src={URL.createObjectURL(formik.values.image)}
                      className="img img-fluid img-thumbnail"
                    />
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
          </div>
        </div>
      </div>
    </>
  );
};

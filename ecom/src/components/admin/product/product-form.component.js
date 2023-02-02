import { Form, Col } from "react-bootstrap";
import { Formik, useFormik } from "formik";
import ButtonComponent from "../../common/buttons.component";
import * as Yup from "yup";
import { useEffect, useCallback, useState } from "react";
import { product_svc } from "./product.service";
import { category_svc } from "../category/category.service";
import { brand_svc } from "./../brand/brand.service";
import { user_svc } from "./../user/user.service";
// import {seller_}
// for description which is editor HTML Content:
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// react-select for select multiple categories like that
import Select from "react-select";

const ProductForm = ({ setSubmitAction, defaultValue }) => {
  // for fetch parent_id data:
  let [category, setCategory] = useState();
  let [brand, setBrand] = useState();
  let [seller, setSeller] = useState();
  // console.log("default values are:", defaultValue);
  // for Validation:
  let productValidation = Yup.object({
    title: Yup.string().required().nullable(),
    description: Yup.string().nullable(),
    price: Yup.number().required().min(1),
    discount: Yup.number().nullable().default(0),
    categories: Yup.object().nullable(),
    brand: Yup.object().nullable(),
    stock: Yup.number().nullable(),
    status: Yup.string().required(),
    sku: Yup.string().nullable(),
    seller: Yup.string().nullable(),
  });

  let formik = useFormik({
    initialValues: defaultValue,
    validationSchema: productValidation,
    onSubmit: async (values) => {
      if (values.brand) {
        values.brand = values.brand.value;
      } else {
        values.brand = null;
      }
      // values.brand ? values.brand = values.brand.value : values.brand= null;

      if (values.categories) {
        let sel_categories = [];
        values.categories?.map((item) => {
          sel_categories.push(item.value);
        });
        values.categories = sel_categories.join(",");
      } else {
        values.categories = null;
      }

      // console.log(values, "send to the database");
      setSubmitAction(values);
    },
  });

  const getAllCategories = useCallback(async () => {
    let response = await category_svc.getAllList();
    if (response.status) {
      let opts = [];
      response.retult?.forEach((item) => {
        opts.push({
          value: item._id,
          label: item.name,
        });
      });
      setCategory(opts);
    }
  }, []);

  const getAllBrands = useCallback(async () => {
    let response = await brand_svc.getAllList();
    if (response.status) {
      let opts = [];
      response.retult?.forEach((item) => {
        opts.push({
          value: item._id,
          label: item.title,
        });
      });
      setBrand(opts);
    }
  }, []);

  const getAllSellers = useCallback(async () => {
    let response = await user_svc.getAllSeller();
    if (response) {
      setSeller(response);
    }
  }, []);

  const fileValidate = (e) => {
    let files = Object.values(e.target.files);
    let valid_images = [];
    let err_msg = [];
    files.map((item) => {
      let ext = item.name.split(".").pop();
      if (
        ["jpg", "png", "webg", "png", "jpeg", "svg"].includes(ext.toLowerCase())
      ) {
        valid_images.push(item);
      } else {
        err_msg.push(item.name);
      }
    });
    if (err_msg.length > 0) {
      formik.setErrors({
        ...formik.errors,
        images: err_msg.join(", ") + " does not have a valid format",
      });
    } else {
      formik.setErrors({
        ...formik.errors,
        images: null,
      });
    }
    // if you want to add valid image and discard invalid image the do this otherwise follow up
    // formik.setValues({
    //   ...formik.values,
    //   images: valid_images,
    // });
  };

  useEffect(() => {
    getAllCategories();
    getAllBrands();
    getAllSellers();
  }, []);

  useEffect(() => {
    formik.setValues({
      ...defaultValue,
    });
  }, [defaultValue]);

  // const options = [
  //   { value: "chocolate", label: "Chocolate" },
  //   { value: "strawberry", label: "Strawberry" },
  //   { value: "vanilla", label: "Vanilla" },
  // ];

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Name: </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="title"
              size="sm"
              value={formik?.values?.title ?? ""}
              placeholder="Enter product title"
              onChange={formik.handleChange}
            />
            <span className="test-danger">{formik.errors?.title}</span>
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Description: </Form.Label>
          <Col sm={9}>
            <CKEditor
              editor={ClassicEditor}
              data={formik.values?.description}
              onChange={(event, editor) => {
                const data = editor.getData();
                // console.log(data);
                // handle of initial state:
                if (defaultValue.description) {
                  formik.setValues({
                    ...defaultValue,
                    description: data,
                  });
                } else {
                  formik.setValues({
                    ...formik.values,
                    description: data,
                  });
                }
              }}
            />
            <span className="test-danger">{formik.errors?.description}</span>
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Categories: </Form.Label>
          <Select
            options={category}
            name="categories"
            isMulti={true}
            value={formik.values?.categories}
            onChange={(e) => {
              formik.setValues({
                ...formik.values,
                categories: e,
              });
            }}
          />
          <Col sm={9}>
            <span className="test-danger">{formik.errors?.categories}</span>
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Brand: </Form.Label>
          <Select
            options={brand}
            name="brand"
            value={formik.values?.brand}
            onChange={(e) => {
              formik.setValues({
                ...formik.values,
                brand: e,
              });
            }}
          />
          <Col sm={9}>
            <span className="test-danger">{formik.errors?.brand}</span>
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Price (NPR.): </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="number"
              name="price"
              size="sm"
              min={1}
              required
              value={formik?.values?.price ?? ""}
              placeholder="Enter product price"
              onChange={formik.handleChange}
            />
            <span className="test-danger">{formik.errors?.price}</span>
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Discount(%): </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="number"
              name="discount"
              size="sm"
              min={0}
              value={formik?.values?.discount ?? ""}
              placeholder="Enter product discount"
              onChange={formik.handleChange}
            />
            <span className="test-danger">{formik.errors?.discount}</span>
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Stock: </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="number"
              name="stock"
              size="sm"
              min={1}
              value={formik?.values?.stock ?? ""}
              placeholder="Enter product stock"
              onChange={formik.handleChange}
            />
            <span className="test-danger">{formik.errors?.stock}</span>
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">SKU: </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="sku"
              size="sm"
              value={formik?.values?.sku ?? ""}
              placeholder="Enter product sku"
              onChange={formik.handleChange}
            />
            <span className="test-danger">{formik.errors?.sku}</span>
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Seller: </Form.Label>
          <Col sm={9}>
            <Form.Select
              name="seller"
              size="sm"
              value={formik?.values?.seller ?? ""}
              onChange={formik.handleChange}
            >
              <option>---Select Any One---</option>
              {seller &&
                seller?.map((item, key) => {
                  <option key={key} value={item._id}>
                    {item.name}
                  </option>;
                })}
              {/* <option>shibu</option> */}
            </Form.Select>
            <span className="test-danger">{formik.errors?.seller}</span>
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
              name="images"
              multiple
              accept="image/*"
              onChange={fileValidate}
            />
            <span className="test-danger">{formik.errors?.images}</span>
          </Col>
          {/* <Col sm={2}>
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
                    "product/" +
                    formik.values.image
                  }
                  className="img img-fluid img-thumbnail"
                />
              )
            ) : (
              <></>
            )}
            <span className="test-danger">{formik.errors?.image}</span>
          </Col> */}
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

export default ProductForm;

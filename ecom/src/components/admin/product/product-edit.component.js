import { useFormik } from "formik";
import { Col, Form } from "react-bootstrap";
import ButtonComponent from "../../common/buttons.component";
import { AdminBreadCrumb } from "../admin-partials.component";
import * as Yup from "yup";
import ProductService from "./product.service";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductForm from "./product-form.component";

export const ProductEdit = () => {
  let [detail, setDetail] = useState();
  let product_svc = new ProductService();
  let navigate = useNavigate();

  let params = useParams();
  // for Validation:
  let productValidation = Yup.object({
    title: Yup.string().required().nullable(),
    status: Yup.string().required().nullable(),
    // image: Yup.object().required().nullable(),
    // link: Yup.string().url().nullable(),
  });

  // data handle:
  let formik = useFormik({
    initialValues: {
      title: null,
      status: null,
      image: null,
    },
    validationSchema: productValidation,
    onSubmit: async (values) => {
      try {
        let updated_data = {
          title: values.title,
          status: values.status,
          // image: values.image,
          // link: values.link,
        };
        if (typeof values.image === "object") {
          updated_data.image = values.image;
        }
        // let response = await product_svc.createProduct(values);
        // // console.log("response", response);
        // if (response.status) {
        //   toast.success(response.msg);
        //   navigate("/admin/product");
        // }
        // console.log(updated_data, "updated data is");
        let response = await product_svc.updateProductById(
          updated_data,
          params.id
        );
        if (response) {
          toast.success(response.msg);
          navigate("/admin/product");
        } else {
          throw response.msg;
        }
      } catch (except) {
        // console.log("error", except);
        toast.error(except);
      }
    },
  });

  const submitForm = async (values) => {
    // onSubmit: async (values) => {
    try {
      // console.log(values, "values");
      // this is because: we need to identify which is recently upload image which is already existing images so:
      let images = values.images;
      let form_data = new FormData();
      if (images.length) {
        images?.map((item) => {
          if (typeof item === "object") {
            form_data.append("images", item, item.name);
          }
        });
        delete values.images;
      }
      // ignore not require data so:
      delete values._id;
      delete values.createdAt;
      delete values.updatedAt;
      delete values.__v;
      delete values.created_by;
      delete values.actual_price;

      Object.keys(values).map((item) => {
        form_data.append(item, values[item]);
      });

      let response = await product_svc.updateProductById(form_data, params.id);
      if (response) {
        toast.success(response.msg);
        navigate("/admin/product");
      } else {
        throw response.msg;
      }
    } catch (except) {
      // console.log("error", except);
      toast.error(except);
    }
    // },
  };

  const getData = async (id) => {
    try {
      let response = await product_svc.getProductById(params.id);
      if (response.result) {
        let sel_brand = {
          value: response.result?.brand._id,
          label: response.result?.brand.title,
        };
        let sel_cats = [];
        response.result?.categories?.map((item) => {
          sel_cats.push({
            value: item?._id,
            label: item?.name,
          });
        });
        let sel_seller = response.result?.seller?._id;
        setDetail({
          ...response.result,
          categories: sel_cats,
          brand: sel_brand,
          seller: sel_seller,
        });
      }
    } catch (except) {
      throw except;
    }
  };
  // console.log("formik values", formik.values);

  // HERE WE USE EFFECT HOOK TO FETCH THE DATA OF THAT ID:
  // AND EFFECT HOOK CALL ONE TIME IF WE DON'T PASS THE DEPENDENCIES:
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="container-fluid px-4">
        <AdminBreadCrumb showAdd={false} title={"Product"} type="product" />
        <div className="card mb-4">
          <div className="card-body">
            <ProductForm setSubmitAction={submitForm} defaultValue={detail} />
          </div>
        </div>
      </div>
    </>
  );
};

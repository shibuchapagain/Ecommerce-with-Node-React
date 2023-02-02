import { useFormik } from "formik";
import { Col, Form } from "react-bootstrap";
import ButtonComponent from "../../common/buttons.component";
import { AdminBreadCrumb } from "../admin-partials.component";
import * as Yup from "yup";
import BrandService from "./brand.service";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BrandForm from "./brand-form.component";

export const BrandEdit = () => {
  let [detail, setDetail] = useState();
  let brand_svc = new BrandService();
  let navigate = useNavigate();

  let params = useParams();
  // for Validation:
  let brandValidation = Yup.object({
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
    validationSchema: brandValidation,
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
        // let response = await brand_svc.createBrand(values);
        // // console.log("response", response);
        // if (response.status) {
        //   toast.success(response.msg);
        //   navigate("/admin/brand");
        // }
        // console.log(updated_data, "updated data is");
        let response = await brand_svc.updateBrandById(updated_data, params.id);
        if (response) {
          toast.success(response.msg);
          navigate("/admin/brand");
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
      let updated_data = {
        title: values.title,
        status: values.status,
        // image: values.image,
        // link: values.link,
      };
      if (typeof values.image === "object") {
        updated_data.image = values.image;
      }
      // let response = await brand_svc.createBrand(values);
      // // console.log("response", response);
      // if (response.status) {
      //   toast.success(response.msg);
      //   navigate("/admin/brand");
      // }
      // console.log(updated_data, "updated data is");
      let response = await brand_svc.updateBrandById(updated_data, params.id);
      if (response) {
        toast.success(response.msg);
        navigate("/admin/brand");
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
      let response = await brand_svc.getBrandById(params.id);
      if (response.result) {
        // formik.setValues({
        //   ...response.result,
        // });
        setDetail(response.result);
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
        <AdminBreadCrumb showAdd={false} title={"Brand"} type="brand" />
        <div className="card mb-4">
          <div className="card-body">
            <BrandForm setSubmitAction={submitForm} defaultValue={detail} />
          </div>
        </div>
      </div>
    </>
  );
};

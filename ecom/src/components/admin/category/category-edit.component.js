import { useFormik } from "formik";
import { Col, Form } from "react-bootstrap";
import ButtonComponent from "../../common/buttons.component";
import { AdminBreadCrumb } from "../admin-partials.component";
import * as Yup from "yup";
import CategoryService from "./category.service";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CategoryForm from "./category-form.component";

export const CategoryEdit = () => {
  let [detail, setDetail] = useState();
  let category_svc = new CategoryService();
  let navigate = useNavigate();

  let params = useParams();
  // for Validation:
  let categoryValidation = Yup.object({
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
    validationSchema: categoryValidation,
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
        // let response = await category_svc.createCategory(values);
        // // console.log("response", response);
        // if (response.status) {
        //   toast.success(response.msg);
        //   navigate("/admin/category");
        // }
        // console.log(updated_data, "updated data is");
        let response = await category_svc.updateCategoryById(
          updated_data,
          params.id
        );
        if (response) {
          toast.success(response.msg);
          navigate("/admin/category");
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
        name: values.name,
        status: values.status,
        parent_id: values.parent_id,
        // image: values.image,
        // link: values.link,
      };
      if (typeof values.image === "object") {
        updated_data.image = values.image;
      }
      // let response = await category_svc.createCategory(values);
      // // console.log("response", response);
      // if (response.status) {
      //   toast.success(response.msg);
      //   navigate("/admin/category");
      // }
      // console.log(updated_data, "updated data is");
      let response = await category_svc.updateCategoryById(
        updated_data,
        params.id
      );
      if (response) {
        toast.success(response.msg);
        navigate("/admin/category");
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
      let response = await category_svc.getCategoryById(params.id);
      if (response.result) {
        // formik.setValues({
        //   ...response.result,
        // });
        let cat_detail = response.result;
        cat_detail.parent_id = cat_detail.parent_id?.id;
        setDetail(cat_detail);
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
        <AdminBreadCrumb showAdd={false} title={"Category"} type="category" />
        <div className="card mb-4">
          <div className="card-body">
            <CategoryForm setSubmitAction={submitForm} defaultValue={detail} />
          </div>
        </div>
      </div>
    </>
  );
};

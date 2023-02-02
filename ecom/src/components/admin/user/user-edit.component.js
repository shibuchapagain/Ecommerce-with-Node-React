import { useFormik } from "formik";
// import { Col, Form } from "react-bootstrap";
// import ButtonComponent from "../../common/buttons.component";
import { AdminBreadCrumb } from "../admin-partials.component";
import * as Yup from "yup";
import UserService from "./user.service";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserForm from "./user-form.component";

export const UserEdit = () => {
  let [detail, setDetail] = useState();
  let user_svc = new UserService();
  let navigate = useNavigate();

  let params = useParams();
  // for Validation:
  let userValidation = Yup.object({
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
    validationSchema: userValidation,
    onSubmit: async (values) => {
      try {
        let updated_data = {
          title: values.title,
          status: values.status,
          role: values.role,
          email: values.email,
          // image: values.image,
          // link: values.link,
        };
        if (typeof values.image === "object") {
          updated_data.image = values.image;
        }
        // let response = await user_svc.createUser(values);
        // // console.log("response", response);
        // if (response.status) {
        //   toast.success(response.msg);
        //   navigate("/admin/user");
        // }
        // console.log(updated_data, "updated data is");
        console.log(params.id, "id");
        let response = await user_svc.updateUserById(updated_data, params.id);
        console.log(response, "iam here");
        if (response) {
          toast.success(response.msg);
          navigate("/admin/user");
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
    console.log(values);
    // onSubmit: async (values) => {
    try {
      let updated_data = {
        name: values.name,
        status: values.status,
        role: values.role,
        // parent_id: values.parent_id,
        // image: values.image,
        // link: values.link,
      };
      if (typeof values.image === "object") {
        updated_data.image = values.image;
      }
      // let response = await user_svc.createUser(values);
      // // console.log("response", response);
      // if (response.status) {
      //   toast.success(response.msg);
      //   navigate("/admin/user");
      // }
      console.log(updated_data, "updated data is");
      let response = await user_svc.updateUserById(updated_data, params.id);
      if (response) {
        toast.success(response.msg);
        navigate("/admin/user");
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
      let response = await user_svc.getUserById(params.id);
      console.log(response, "get specific user data");
      if (response.result) {
        // formik.setValues({
        //   ...response.result,
        // });
        let user_detail = response.result;
        setDetail(user_detail);
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
        <AdminBreadCrumb showAdd={false} title={"User"} type="user" />
        <div className="card mb-4">
          <div className="card-body">
            <UserForm
              setSubmitAction={submitForm}
              defaultValue={detail}
              isEdit={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

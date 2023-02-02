import { Col, Form } from "react-bootstrap";

import { AdminBreadCrumb } from "../admin-partials.component";
import UserService from "./user.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UserForm from "./user-form.component";
export const UserCreate = () => {
  let user_svc = new UserService();
  let navigate = useNavigate();
  // data handle:
  const submitForm = async (data) => {
    try {
      let response = await user_svc.createUser(data);
      // console.log("response", response);
      if (response.status) {
        toast.success(response.msg);
        navigate("/admin/user");
      }
    } catch (except) {
      // console.log("error", except);
      toast.error(except);
    }
  };
  // console.log("formik values", formik.values);

  return (
    <>
      <div className="container-fluid px-4">
        <AdminBreadCrumb showAdd={false} title={"User"} type="user" />
        <div className="card mb-4">
          <div className="card-body">
            <UserForm
              setSubmitAction={submitForm}
              defaultValue={{
                title: null,
                status: null,
                image: null,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

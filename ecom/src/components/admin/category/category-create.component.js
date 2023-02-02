import { Col, Form } from "react-bootstrap";

import { AdminBreadCrumb } from "../admin-partials.component";
import CategoryService from "./category.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CategoryForm from "./category-form.component";
export const CategoryCreate = () => {
  let category_svc = new CategoryService();
  let navigate = useNavigate();
  // data handle:
  const submitForm = async (data) => {
    try {
      let response = await category_svc.createCategory(data);
      // console.log("response", response);
      if (response.status) {
        toast.success(response.msg);
        navigate("/admin/category");
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
        <AdminBreadCrumb showAdd={false} title={"Category"} type="category" />
        <div className="card mb-4">
          <div className="card-body">
            <CategoryForm
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

import { Col, Form } from "react-bootstrap";

import { AdminBreadCrumb } from "../admin-partials.component";
import BrandService from "./brand.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BrandForm from "./brand-form.component";
export const BrandCreate = () => {
  let brand_svc = new BrandService();
  let navigate = useNavigate();
  // data handle:
  const submitForm = async (data) => {
    try {
      let response = await brand_svc.createBrand(data);
      // console.log("response", response);
      if (response.status) {
        toast.success(response.msg);
        navigate("/admin/brand");
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
        <AdminBreadCrumb showAdd={false} title={"Brand"} type="brand" />
        <div className="card mb-4">
          <div className="card-body">
            <BrandForm
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

import { Col, Form } from "react-bootstrap";

import { AdminBreadCrumb } from "../admin-partials.component";
import ProductService from "./product.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ProductForm from "./product-form.component";
export const ProductCreate = () => {
  let defaultData = {
    title: null,
    description: null,
    price: 1,
    discount: null,
    categories: null,
    brand: null,
    stock: null,
    images: null,
    status: null,
    sku: null,
    seller: null,
  };
  let product_svc = new ProductService();
  let navigate = useNavigate();
  // data handle:
  const submitForm = async (data) => {
    try {
      let form_data = new FormData();
      if (data.images) {
        data.images?.map((image) => {
          form_data.append("images", image, image.name);
        });
        delete data.images;
      }
      Object.keys(data).map((item) => {
        form_data.append(item, data[item]);
      });
      let response = await product_svc.createProduct(form_data);
      if (response.status) {
        toast.success(response.msg);
        navigate("/admin/product");
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
        <AdminBreadCrumb showAdd={false} title={"Product"} type="product" />
        <div className="card mb-4">
          <div className="card-body">
            <ProductForm
              setSubmitAction={submitForm}
              defaultValue={defaultData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

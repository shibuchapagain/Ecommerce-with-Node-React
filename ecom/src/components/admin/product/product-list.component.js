// import { NavLink } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
// for table(react)
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
// import { Badge, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { AdminBreadCrumb } from "../admin-partials.component";
import ProductService from "./product.service";
import ActionButtons from "../../common/action-btns.component";
// for lightbox to show images
import React from "react";
import LightBox from "../../common/lightbox.component";
import StatusView from "../../common/status.component";

export const ProductList = () => {
  const [data, setData] = useState();
  let product_svc = new ProductService();

  // for data table:
  const columns = [
    {
      name: "Name",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) =>
        row?.categories
          ? row.categories.map((item) => item.name).join(", ")
          : "-",
    },
    {
      name: "Price",
      selector: (row) => "NPR. " + row.actual_price,
    },
    {
      name: "Stock",
      selector: (row) => row.stock,
    },
    // {
    //   name: "Image",
    //   selector: (row) =>
    //     row.image ? (
    //       <>
    //         <LightBox
    //           image={[process.env.REACT_APP_IMAGE_URL + "product/" + row.image]}
    //         />
    //       </>
    //     ) : (
    //       <>No Image Found</>
    //     ),
    // },
    {
      name: "Status",
      selector: (row) => <StatusView val={row.status} />,
    },
    {
      name: "Action",
      selector: (row) => (
        <ActionButtons
          id={row._id}
          type={"product"}
          deleteAction={deleteAction}
        />
      ),
    },
  ];

  // let navigate = useNavigate();
  const getProductData = useCallback(async () => {
    try {
      let response = await product_svc.getAllList();
      if (response) {
        setData(response.result);
      }
    } catch (exception) {
      toast.error(exception);
    }
  }, []);

  useEffect(() => {
    getProductData();
  }, [getProductData]);

  const deleteAction = async (id) => {
    try {
      let response = await product_svc.deleteData(id);
      if (response.status) {
        toast.success(response.msg);
        getProductData();
        // navigate("/admin/product");
      }
    } catch (exception) {
      toast.error(exception);
    }
  };

  return (
    <>
      <div className="container-fluid px-4">
        <AdminBreadCrumb showAdd={true} title={"Product"} type="product" />
        <div className="card mb-4">
          <div className="card-body">
            <DataTable columns={columns} data={data} pagination />
          </div>
        </div>
      </div>
    </>
  );
};

// import { NavLink } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
// for table(react)
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
// import { Badge, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { AdminBreadCrumb } from "../admin-partials.component";
import CategoryService from "./category.service";
import ActionButtons from "../../common/action-btns.component";
// for lightbox to show images
import React from "react";
import LightBox from "../../common/lightbox.component";
import StatusView from "../../common/status.component";

export const CategoryList = () => {
  const [data, setData] = useState();
  let category_svc = new CategoryService();

  // for data table:
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Parent",
      selector: (row) => (row.parent_id ? row.parent_id?.name : "-"),
    },
    {
      name: "Image",
      selector: (row) =>
        row.image ? (
          <>
            <LightBox
              image={[
                process.env.REACT_APP_IMAGE_URL + "category/" + row.image,
              ]}
            />
          </>
        ) : (
          <>No Image Found</>
        ),
    },
    {
      name: "Status",
      selector: (row) => <StatusView val={row.status} />,
    },
    {
      name: "Action",
      selector: (row) => (
        <ActionButtons
          id={row._id}
          type={"category"}
          deleteAction={deleteAction}
        />
      ),
    },
  ];

  // let navigate = useNavigate();
  const getCategoryData = useCallback(async () => {
    try {
      let response = await category_svc.getAllList();
      if (response.retult) {
        setData(response.retult);
      }
    } catch (exception) {
      toast.error(exception);
    }
  }, []);

  useEffect(() => {
    getCategoryData();
  }, [getCategoryData]);

  const deleteAction = async (id) => {
    try {
      let response = await category_svc.deleteData(id);
      if (response.status) {
        toast.success(response.msg);
        getCategoryData();
        // navigate("/admin/category");
      }
    } catch (exception) {
      toast.error(exception);
    }
  };

  return (
    <>
      <div className="container-fluid px-4">
        <AdminBreadCrumb showAdd={true} title={"Category"} type="category" />
        <div className="card mb-4">
          <div className="card-body">
            <DataTable columns={columns} data={data} pagination />
          </div>
        </div>
      </div>
    </>
  );
};

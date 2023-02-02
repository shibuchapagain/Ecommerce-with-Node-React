// import { NavLink } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
// for table(react)
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
// import { Badge, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { AdminBreadCrumb } from "../admin-partials.component";
import UserService from "./user.service";
import ActionButtons from "../../common/action-btns.component";
// for lightbox to show images
import React from "react";
import LightBox from "../../common/lightbox.component";
import StatusView from "../../common/status.component";

export const UserList = () => {
  const [data, setData] = useState();
  let user_svc = new UserService();

  // for data table:
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Role",
      selector: (row) => row.role,
    },
    {
      name: "Image",
      selector: (row) =>
        row.image ? (
          <>
            <LightBox
              image={[process.env.REACT_APP_IMAGE_URL + "user/" + row.image]}
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
        <ActionButtons id={row._id} type={"user"} deleteAction={deleteAction} />
      ),
    },
  ];

  // let navigate = useNavigate();
  const getUserData = useCallback(async () => {
    try {
      let response = await user_svc.getAllList();
      if (response.retult) {
        setData(response.retult);
      }
    } catch (exception) {
      toast.error(exception);
    }
  }, []);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const deleteAction = async (id) => {
    try {
      let response = await user_svc.deleteData(id);
      if (response.status) {
        toast.success(response.msg);
        getUserData();
        // navigate("/admin/user");
      }
    } catch (exception) {
      toast.error(exception);
    }
  };

  return (
    <>
      <div className="container-fluid px-4">
        <AdminBreadCrumb showAdd={true} title={"User"} type="user" />
        <div className="card mb-4">
          <div className="card-body">
            <DataTable columns={columns} data={data} pagination />
          </div>
        </div>
      </div>
    </>
  );
};

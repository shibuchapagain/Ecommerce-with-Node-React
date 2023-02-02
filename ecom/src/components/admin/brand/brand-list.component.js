// import { NavLink } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Badge, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { AdminBreadCrumb } from "../admin-partials.component";
import BrandService from "./brand.service";
import ActionButtons from "../../common/action-btns.component";
// for lightbox to show images
import React from "react";
import LightBox from "../../common/lightbox.component";
import StatusView from "../../common/status.component";

export const BrandList = () => {
  const [data, setData] = useState();
  let brand_svc = new BrandService();
  let navigate = useNavigate();
  const getBrandData = useCallback(async () => {
    try {
      let response = await brand_svc.getAllList();
      if (response.retult) {
        setData(response.retult);
      }
    } catch (exception) {
      toast.error(exception);
    }
  }, []);

  useEffect(() => {
    getBrandData();
  }, [getBrandData]);

  const deleteAction = async (id) => {
    try {
      let response = await brand_svc.deleteData(id);
      if (response.status) {
        toast.success(response.msg);
        getBrandData();
        // navigate("/admin/brand");
      }
    } catch (exception) {
      toast.error(exception);
    }
  };

  return (
    <>
      <div className="container-fluid px-4">
        <AdminBreadCrumb showAdd={true} title={"Brand"} type="brand" />
        <div className="card mb-4">
          <div className="card-body">
            <table className="table table-sm table-hover table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>S.N</th>
                  <th>Link</th>
                  <th>Image</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item, key) => (
                    <tr key={key}>
                      <td>{item.title}</td>
                      <td>
                        <a
                          href={item.link}
                          className="btn btn-link"
                          target={"_blank"}
                        >
                          {item.link}
                        </a>
                      </td>
                      <td>
                        {item.image ? (
                          <>
                            <LightBox
                              image={[
                                process.env.REACT_APP_IMAGE_URL +
                                  "brand/" +
                                  item.image,
                              ]}
                            />
                          </>
                        ) : (
                          <>No Image Found</>
                        )}
                      </td>
                      <td>
                        <StatusView val={item.status} />
                      </td>
                      <td>
                        <ActionButtons
                          id={item._id}
                          type={"brand"}
                          deleteAction={deleteAction}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

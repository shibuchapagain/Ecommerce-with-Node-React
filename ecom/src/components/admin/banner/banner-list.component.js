// import { NavLink } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Badge, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { AdminBreadCrumb } from "../admin-partials.component";
import BannerService from "./banner.service";
import ActionButtons from "../../common/action-btns.component";
// for lightbox to show images
import React from "react";
import LightBox from "../../common/lightbox.component";
import StatusView from "../../common/status.component";

export const BannerList = () => {
  const [data, setData] = useState();
  let banner_svc = new BannerService();
  let navigate = useNavigate();
  const getBannerData = useCallback(async () => {
    try {
      let response = await banner_svc.getAllList();
      if (response.retult) {
        setData(response.retult);
      }
    } catch (exception) {
      toast.error(exception);
    }
  }, []);

  useEffect(() => {
    getBannerData();
  }, [data]);

  const deleteAction = async (id) => {
    try {
      let response = await banner_svc.deleteData(id);
      if (response.status) {
        toast.success(response.msg);
        getBannerData();
        navigate("/admin/banner");
      }
    } catch (exception) {
      toast.error(exception);
    }
  };

  return (
    <>
      <div className="container-fluid px-4">
        <AdminBreadCrumb showAdd={true} title={"Banner"} type="banner" />
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
                                  "banner/" +
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
                          type={"banner"}
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

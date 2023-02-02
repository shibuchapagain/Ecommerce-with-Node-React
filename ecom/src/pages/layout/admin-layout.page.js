import { Outlet, useNavigate } from "react-router-dom";
import "./../../assets/css/admin.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap";
import { useCallback, useEffect } from "react";
import AuthService from "../../services/auth-service";
import {
  AdminFooter,
  AdminSidebar,
  AdminTopNav,
} from "../../components/admin/admin-partials.component";
import { useDispatch } from "react-redux";
import { userStore } from "../../reducers/user.slicer";
// import "./../../assets/js/admin"; // it only works on virtual dom
const AdminLayout = () => {
  let auth_svc = new AuthService();
  let dispatch = useDispatch();

  const checkValidation = useCallback(async () => {
    try {
      let loggedInUser = await auth_svc.getMyProfile();
      let storeData = {
        email: loggedInUser.result.email,
        id: loggedInUser.result._id,
        name: loggedInUser.result.name,
        role: loggedInUser.result.role,
      };
      dispatch(userStore(storeData));
    } catch (except) {
      throw except;
    }
  });

  useEffect(() => {
    checkValidation();
  }, [checkValidation]);
  return (
    <>
      <AdminTopNav />
      <div id="layoutSidenav">
        <AdminSidebar />
        <div id="layoutSidenav_content">
          <main>{<Outlet />}</main>
          <AdminFooter />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;

import { Outlet } from "react-router-dom";
import CustomComponent from "../../components";
import AuthService from "../../services/auth-service";
import { useDispatch } from "react-redux";
import { useEffect, useCallback } from "react";
import { userStore } from "../../reducers/user.slicer";
import { updateCartDetail } from "../../reducers/cart.reducers";

const HomePageLayout = () => {
  let auth_svc = new AuthService();

  let dispatch = useDispatch();

  const checkValidation = useCallback(async () => {
    try {
      let loggedUser = await auth_svc.getMyProfile();
      let storedata = {
        email: loggedUser.result.email,
        id: loggedUser.result._id,
        name: loggedUser.result.name,
        role: loggedUser.result.role,
      };
      dispatch(userStore(storedata));
    } catch (except) {
      console.log(except);
    }
  });

  useEffect(() => {
    let token = localStorage.getItem("_mern14_token") ?? null;
    if (token) {
      checkValidation();
    }
    dispatch(updateCartDetail());
  }, [checkValidation]);
  return (
    <>
      <CustomComponent.MenuComponent />
      <Outlet />
      <CustomComponent.HomePageFooterComponent />
    </>
  );
};

export default HomePageLayout;

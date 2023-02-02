import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import helpers from "../../config/functions";
import { logout } from "../../reducers/user.slicer";

export const AdminTopNav = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let loggedInUser = JSON.parse(localStorage.getItem("_mern14_user"));
  const handleLogout = (e) => {
    dispatch(logout());
    e.preventDefault();
    localStorage.removeItem("_mern14_token");
    localStorage.removeItem("_mern14_user");

    // or remove all local storage data:
    // localStorage.clear();

    return navigate("/login");
  };

  const toggleSidebar = (e) => {
    e.preventDefault();
    document.body.classList.toggle("sb-sidenav-toggled");
    localStorage.setItem(
      "sb|sidebar-toggle",
      document.body.classList.contains("sb-sidenav-toggled")
    );
  };

  return (
    <>
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <NavLink className="navbar-brand ps-3" to={"/" + loggedInUser.role}>
          {helpers.ucFirst(loggedInUser.role)} Panel
        </NavLink>

        <button
          className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          onClick={toggleSidebar}
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0"></div>

        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-user fa-fw"></i>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <a className="dropdown-item" href="#!">
                  Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#!">
                  Change Password
                </a>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="/login"
                  onClick={handleLogout}
                >
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
};

export const AdminSidebar = () => {
  // let loggedInUser = localStorage.getItem("_mern14_user");
  // loggedInUser = JSON.parse(loggedInUser);

  // through store:
  let loggedInUser = useSelector((state) => {
    return state.user.userDetail;
  });

  return (
    <>
      <div id="layoutSidenav_nav">
        <nav
          className="sb-sidenav accordion sb-sidenav-dark"
          id="sidenavAccordion"
        >
          <div className="sb-sidenav-menu">
            <div className="nav">
              <div className="sb-sidenav-menu-heading">Core</div>

              <NavLink className="nav-link" to={"/"}>
                <div className="sb-nav-link-icon">
                  <i className="fas fa-home"></i>
                </div>
                Home
              </NavLink>

              <NavLink className="nav-link" to={"/" + loggedInUser?.role}>
                <div className="sb-nav-link-icon">
                  <i className="fas fa-tachometer-alt"></i>
                </div>
                Dashboard
              </NavLink>

              <NavLink className="nav-link" to={"/admin/banner"}>
                <div className="sb-nav-link-icon">
                  <i className="fas fa-images"></i>
                </div>
                Banner Management
              </NavLink>

              <NavLink className="nav-link" to="/admin/brand">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-certificate"></i>
                </div>
                Brands Management
              </NavLink>

              <NavLink className="nav-link" to="/admin/category">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-sitemap"></i>
                </div>
                Category Management
              </NavLink>

              <NavLink className="nav-link" to="/admin/user">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-users"></i>
                </div>
                User Management
              </NavLink>

              <NavLink className="nav-link" to="/admin/product">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-shopping-bag"></i>
                </div>
                Products Management
              </NavLink>

              <NavLink className="nav-link" href="index.html">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                Order Management
              </NavLink>
            </div>
          </div>
          <div className="sb-sidenav-footer">
            <div className="small">Logged in as:</div>
            {loggedInUser?.name}
          </div>
        </nav>
      </div>
    </>
  );
};

export const AdminFooter = () => {
  return (
    <>
      <footer className="py-4 bg-light mt-auto">
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center justify-content-between small">
            <div className="text-muted">Copyright &copy; Your Website 2022</div>
            <div>
              <a href="#">Privacy Policy</a>
              &middot;
              <a href="#">Terms &amp; Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export const AdminBreadCrumb = ({ showAdd, title, type }) => {
  let loggedInUser = JSON.parse(localStorage.getItem("_mern14_user"));

  return (
    <>
      <h1 className="mt-4">
        {title} Page
        {showAdd && (
          <NavLink
            to={`/admin/${type}/create`}
            className={"btn btn-sm btn-success float-end"}
          >
            <i className="fa fa-plus me-3">Add {title}</i>
          </NavLink>
        )}
      </h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item">
          <NavLink to={`/` + loggedInUser.role}>Dashboard</NavLink>
        </li>
        <li className="breadcrumb-item active">
          <a href="index.html">{title} Page</a>
        </li>
      </ol>
    </>
  );
};

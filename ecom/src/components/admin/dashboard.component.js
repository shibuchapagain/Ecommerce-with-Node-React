import { AdminBreadCrumb } from "./admin-partials.component";
const AdminDashboard = () => {
  return (
    <>
      <div className="container-fluid px-4">
        <AdminBreadCrumb title={"Dashboard"} />
        <div className="card mb-4">
          <div className="card-body">
            <p className="mb-0">blabla</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

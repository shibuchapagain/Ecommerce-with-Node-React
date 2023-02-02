import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
const ActionButtons = ({ id, type, deleteAction }) => {
  const confirmation = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // data delete operation
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        deleteAction(id);
      }
    });
  };
  return (
    <>
      <NavLink
        to={`/admin/${type}/${id}`}
        className="btn btn-sm btn-success btn-rounded me-2"
      >
        <i className="fa fa-pen"></i>
      </NavLink>
      <NavLink
        onClick={confirmation}
        // to={`/admin/${type}/${id}`}
        className="btn btn-sm btn-danger btn-rounded"
      >
        <i className="fa fa-trash"></i>
      </NavLink>
    </>
  );
};

export default ActionButtons;

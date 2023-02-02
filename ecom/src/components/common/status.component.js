import { Badge } from "react-bootstrap";
import helpers from "../../config/functions";
const StatusView = ({ val }) => {
  return (
    <>
      <Badge bg={val === "active" ? "success" : "danger"}>
        {helpers.ucFirst(val)}
      </Badge>
    </>
  );
};

export default StatusView;

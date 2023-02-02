import { Button } from "react-bootstrap";
import { FaPaperPlane } from "react-icons/fa";
const ButtonComponent = ({ showCancel, cancelText, submitText, loading }) => {
  return (
    <>
      {showCancel ? (
        <>
          <Button type="reset" variant="danger" className="me-3">
            <i className="fa fa-trash me-1" />
            {cancelText}
          </Button>
        </>
      ) : (
        <></>
      )}
      <Button type="submit" variant="success" disabled={loading ? true : false}>
        {/* <i className=" fa fa-paper-plane me-1" /> */}
        <FaPaperPlane color="white" className="me-2" />
        {submitText}
      </Button>
    </>
  );
};

export default ButtonComponent;

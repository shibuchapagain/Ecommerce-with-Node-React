import { Form, Col } from "react-bootstrap";
export const EmailInputComponent = ({
  lable,
  name,
  required,
  setChange,
  errmsg,
}) => {
  return (
    <>
      <Form.Group className="row mb-3">
        <Form.Label className="col-sm-3">{lable}: </Form.Label>
        <Col sm={9}>
          <Form.Control
            size="sm"
            type="email"
            name={name}
            required={required}
            onChange={setChange}
          ></Form.Control>
          <span className="text-danger">{errmsg}</span>
        </Col>
      </Form.Group>
    </>
  );
};

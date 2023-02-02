import FsLightbox from "fslightbox-react";
import { useState } from "react";
import { Button } from "react-bootstrap";
const LightBox = ({ image }) => {
  const [toggler, setToggler] = useState(false);
  return (
    <>
      <Button varient="link" onClick={() => setToggler(!toggler)}>
        View Image
      </Button>
      <FsLightbox toggler={toggler} sources={image} />
    </>
  );
};

export default LightBox;

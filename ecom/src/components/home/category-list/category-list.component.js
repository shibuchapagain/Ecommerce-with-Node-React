import { useState, useEffect, useCallback } from "react";
import { ListGroup } from "react-bootstrap";
import { category_svc } from "./../../admin/category/category.service";
import { NavLink } from "react-router-dom";

const HomeCategoryList = () => {
  let [category, setCategory] = useState();

  const getAllCategories = useCallback(async () => {
    try {
      let response = await category_svc.getAllList();
      if (response) {
        let active_cats = response.retult.filter(
          (item) => item.status === "active"
        );
        setCategory(active_cats);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h4>Categories</h4>
        </ListGroup.Item>
        {category &&
          category.map((item, index) => {
            return (
              <ListGroup.Item key={index}>
                <NavLink to={`/category/` + item.slug}>{item?.name}</NavLink>
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    </>
  );
};
export default HomeCategoryList;

import React from "react";
import { Loading } from "./loadingComponent";
import {
  Card,
  CardImg,
  CardImgOverlay,

  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { baseUrl } from "../shared/baseUrl";
import { Link } from "react-router-dom";

function RenderMenu({ dish}) {
  return (
    <Card >
      <Link to={`/menu/${dish.id}`}>
        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
        <CardImgOverlay>
          <CardTitle>{dish.name}</CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>
  );
};

const Menu = (props) => {
  const menu = props.dishes.dishes.map((dish) => {
    return (
      <div key={dish.id} className="col-12 col-md-5 m-1">
        <RenderMenu dish={dish} />
      </div>
    );
  });

  if (props.dishes.isLoading){
    return (
      <Loading/>
    )
  }
  else if (props.dishes.errMess){
    return (
      <div className = "container">
        <div className = "row">
          <h4> {props.dishes.errMess} </h4>
        </div>
      </div>
    )
  }

  else{
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/home">Home </Link>
          </BreadcrumbItem>

          <BreadcrumbItem active>Menu</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="row">{menu}</div>
    </div>
  );
  }
};

export default Menu;

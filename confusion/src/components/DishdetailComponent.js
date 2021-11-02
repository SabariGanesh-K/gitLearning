import React, { Component } from "react";
import CommentForm from "./CommentForm";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  CardBody,
  CardText,
} from "reactstrap";
import { Link } from "react-router-dom";


function RenderDish(dish) {
  if (dish != null) {
    console.log("Render dish taken");
    return (
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  } else {
    return <div></div>;
  }
}

function RenderComments(comments) {
   
    // console.log(review)
    console.log("Comment taken")
   const output =  comments.map((review)=>{
    return (
     
      <Card>
        <ul className="list-group">
          <li className="list-group-item">
            {review.comment} <br /> --{review.author} ,{" "}
            {review.date}
          </li>
        </ul>
      </Card>
    )})
    return (
      <div>
        {output}
      </div>
    )

  
}



const  DishDetail = (props)=> {
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.selectedDish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.selectedDish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          {RenderDish(props.selectedDish)}
        </div>

        <div className="col-12 col-md-5 m-1">
          <h4>Comments</h4>

          {RenderComments(props.comments)}

          <CommentForm />
          {console.log("Done2")}
        </div>
      </div>
    </div>
  );
};

export default DishDetail;

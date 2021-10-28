import React, { Component } from "react";

import { Card, CardImg, CardImgOverlay,
  CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';


function RenderDish({ dish }) {
  if (dish != null){
    console.log("Render dish taken")
    return (
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );}
  else{ return <div></div>};
}

function RenderComments({ comments }) {
  
  comments.map((review) => {
    console.log(review);
    console.log(review.id);
    return(
      <Card>
        <ul class="list-group">
          <li class="list-group-item">
            {review.comment} <br/> --{review.author} ,{" "}
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }).format(new Date(Date.parse(review.date)))}
          </li>
        </ul>
      </Card>
    );
  } )}

  // if (selectedDish != null) {
  //   return (
  //     <h4>Comments</h4> &&
  //     dishes.map(
  //       (dish) =>
  //         selectedDish.id == dish.id &&
  //         dish.comments.map((review) => {
  //           console.log("success");
  //           return (
  //             <Card>
  //               <ul class="list-group">
  //                 <li class="list-group-item">
  //                   {review.comment} <br /> --{review.author} ,{" "}
  //                   {new Intl.DateTimeFormat("en-US", {
  //                     year: "numeric",
  //                     month: "short",
  //                     day: "2-digit",
  //                   }).format(new Date(Date.parse(review.date)))}
  //                 </li>
  //               </ul>
  //             </Card>
  //           );
  //         })
  //     )
  //   );
  // } else return <div></div>;


const DishDetail = (props) => {
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
          <RenderDish selectedDish={props.selectedDish} />
        </div>

        <div className="col-12 col-md-5 m-1">
          <h4>Comments</h4>

          <RenderComments
          comments = {props.comments}
            selectedDish={props.selectedDish}
            dishes={props.dishes}
          />
          {console.log("Done2")}
        </div>
      </div>
    </div>
  );
};

export default DishDetail;

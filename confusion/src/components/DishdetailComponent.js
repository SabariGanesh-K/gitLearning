import React, { Component } from "react";

import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";


  function RenderDish({dish}) {
    if (dish != null)
      return (
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    else return <div></div>;
  }

  function RenderComments({selectedDish,dishes}) {
    const rendered = false;
    if (selectedDish != null) {
      return (
        <h4>Comments</h4> &&
        dishes.map(
          (dish) =>
            selectedDish.id == dish.id &&
            dish.comments.map((review) => {
              console.log("success");
              return (
                <Card>
                  <ul class="list-group">
                    <li class="list-group-item">
                      {review.comment} <br /> --{review.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(review.date)))}
                    </li>
                  </ul>
                </Card>
              );
            })
        )
      );
    } else return <div></div>;
  }
  
  const DishDetail = (props)=>{
    return (
      <div className="row">
        <div className="col-12 col-md-5 m-1">
         
          <RenderDish dish = {props.selectedDish}/>
        </div>

        <div className="col-12 col-md-5 m-1">
          <h4>Comments</h4>
         
          <RenderComments selectedDish = {props.selectedDish} dishes = {props.dishes} />
          {console.log("Done2")}
        </div>
      </div>
    );
 }

export default DishDetail;

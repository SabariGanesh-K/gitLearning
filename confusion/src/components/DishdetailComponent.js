import React, { Component } from "react";

import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";

class DishDetail extends Component {
  renderDish(dish) {
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

  renderComments(selectedDish) {
    const rendered = false;
    if (selectedDish != null) {
      return (
        <h4>Comments</h4> &&
        this.props.dishes.map(
          (dish) =>
            selectedDish.id == dish.id &&
            dish.comments.map((review) => {
              console.log("success");
              return (
                <Card>
                  <ul class="list-group">
                    <li class="list-group-item">
                      {review.comment} <br /> --{review.author} , {review.date}
                    </li>
                  </ul>
                </Card>
              );
            })
        )
      );
    } else return <div></div>;
  }
  render() {
    return (
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          {this.renderDish(this.props.selectedDish)}
        </div>

        <div className="col-12 col-md-5 m-1">
          <h4>Comments</h4>
          {this.renderComments(this.props.selectedDish)}
          {console.log("Done2")}
        </div>
      </div>
    );
  }
}
export default DishDetail;

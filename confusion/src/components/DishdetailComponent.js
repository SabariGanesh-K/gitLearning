import React, { Component } from "react";
import { Loading } from "./loadingComponent";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  CardBody,
  CardText,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Label,
  Col,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const required = (val) => val && val.length;
class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCommentFormOpen: false,
    };
    this.toggleCommentForm = this.toggleCommentForm.bind(this);
    this.onCommentSubmit = this.onCommentSubmit.bind(this);
  }
  toggleCommentForm() {
    this.setState({ isCommentFormOpen: !this.state.isCommentFormOpen });
  }
  onCommentSubmit(values) {
    this.toggleCommentForm()
    console.log("Current State is: " + JSON.stringify(values));
    this.props.addComment(this.props.dishId,values.rating,values.name,values.comment)
  }
  render() {
    return (
      <React.Fragment>
        <Button outline onClick={this.toggleCommentForm}>
          <span className="fa fa-sign-in fa-lg"></span>Add your comment
        </Button>

        <Modal
          isOpen={this.state.isCommentFormOpen}
          toggle={this.toggleCommentForm}
          fade={false}
        >
          <ModalHeader>We love ur comments...</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.onCommentSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={2}>
                  Rating
                </Label>
                <Col md={{ size: 3, offset: 1 }}>
                  <Control.select
                    model=".rating"
                    id="rating"
                    name="rating"
                    className="form-control"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="name" md={2}>
                  Your name
                </Label>
                <Col md={10}>
                  <Control.text
                    model=".name"
                    id="name"
                    name="name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      required: "Required!",
                      minLength: "Name must be atleast 3 characters..",
                      maxLength: "Name must be less than 15 characters",
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Col md={2}>
                  <Label htmlFor="comment" md={2}>
                    Comment
                  </Label>
                </Col>
                <Col md={8}>
                  <Control.textarea
                    model=".comment"
                    name="comment"
                    id="comment"
                    className="form-control"
                    placeholder="Comment"
                    rows="6"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{ size: 10, offset: 2 }}>
                  <Button type="submit" color="primary">
                    Send
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

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
  console.log("Comment taken");
  const output = comments.map((review) => {
    return (
      <Card>
        <ul className="list-group">
          <li className="list-group-item">
            {review.comment} <br /> --{review.author} , {review.date}
          </li>
        </ul>
      </Card>
    );
  });
  return <div>{output}</div>;
}

const DishDetail = (props) => {

  if (props.isLoading){
      return (
        <div className = "container">
          <div className = "row">
            <Loading />
          </div>
        </div>
      )
  }

  else if (props.errMess) {
    return(
      <div className = "container">
        <div className = "row">
          <h4>{props.errMess}</h4>
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

          <CommentForm   dishId={props.selectedDish.id} addComment = {props.addComment} />
          {console.log("Done2")}
          {console.log(props.dishId)}
        </div>
      </div>
    </div>
  );
  }
};

export default DishDetail;

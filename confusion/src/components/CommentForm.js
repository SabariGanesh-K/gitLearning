import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Label,
  Col,
  Button,
} from "reactstrap";
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
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
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
                <Label For="name" md={2}>
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

export default CommentForm;

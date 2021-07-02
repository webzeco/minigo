import React, { Component, useState } from "react";
import ntcjs from "ntcjs";
import parse from "html-react-parser";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactStars from "react-rating-stars-component";
import "./style/showProductDetail.css";
import { Carousel } from "react-responsive-carousel";
import TryCarauosel from "./common/TryCarauosel";
export default class ShowProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVariants: [],
    };
    this.handleSelected = this.handleSelected.bind(this);
  }
  componentDidMount() {
    const temparray = [];
    this.props.product.variants.map((variant) => {
      const temp = {};
      temp.variantType = variant.selectedOption;
      if (temp.variantType === "Color") {
        temp.selectedVariant = ntcjs.name(variant.tags[0].text)[1];
      } else {
        temp.selectedVariant = variant.tags[0].text;
      }
      temparray.push(temp);
      return null;
    });
    this.setState({
      selectedVariants: temparray,
    });
  }
  handleSelected(selected) {
    this.setState({ selectedVariants: selected }, () => {
      console.log(this.state.selectedVariants);
    });
  }
  calculateDiscountPrice(price, discount) {
    let discountedPrice = (price * discount) / 100;
    return discountedPrice;
  }
  render() {
    const product = this.props.product;
    return (
      <div  className='mt-5'>
        {/* <!-- =======Product display in Banner area ======= --> */}
        <div className="container-fluid banner" style={{marginTop:'110px'}}>
          <nav>
            <ol className="breadcrumb  px-5">
              <li className="breadcrumb-item  look">
                <a  className='text-dark font-weight-bold' href="#">Home</a>
              </li>
              <li className="breadcrumb-item text-black look">
                <a  className='text-dark' href="#">{product.title}</a>
              </li>
            </ol>
          </nav>
          <div className="row justify-content-center ">
            <div className="col-md-6 w-40">
              
           {/* caroausel start */}
           {/* <div id="carouselExampleControlsNoTouching" class="carousel slide banner" data-bs-touch="false" data-bs-interval="false">
  <div class="carousel-inner" style={{width:'60%',placeItems:'center',alignItems:'center',marginLeft:'20%'}}>
    <div class="carousel-item active">
      <img src="https://www.freeiconspng.com/uploads/women-bag-png-32.png" class="d-block w-80" alt="https://www.freeiconspng.com/uploads/women-bag-png-32.png"/>
    </div>
    <div class="carousel-item">
      <img src="https://www.freeiconspng.com/uploads/women-bag-png-32.png" class="d-block w-80" alt="https://www.freeiconspng.com/uploads/women-bag-png-32.png"/>
    </div>
    <div class="carousel-item">
      <img src="https://www.freeiconspng.com/uploads/women-bag-png-32.png" class="d-block w-80" alt="https://www.freeiconspng.com/uploads/women-bag-png-32.png"/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
            */}
           {/* caroausel end */}
           </div>
            <div className="col-md-6 back px-5">
              <div className="product pt-4">
                <div className=" align-items-center w-75">
                  <div className="h5 text-uppercase pro_title_h5">
                    {product.title}
                  </div>
                  <div className="h5 text-uppercase pro_price_h5">
                    {product.discount === 0 ? (
                      product.price
                    ) : (
                      <>
                        {product.price} is discounted for{" "}
                        {this.calculateDiscountPrice(
                          product.price,
                          product.discount
                        )}
                      </>
                    )}
                  </div>

                  <div className="d-flex align-items-center">
                    {/* Reviews Component */}
                    <Reviews reviews={product.reviews} />
                  </div>

                  <div className="ho mt-2 "></div>
                  {/* Variants Start */}
                  <Variants
                    selectedVariants={this.state.selectedVariants}
                    setSelected={(selected) => this.handleSelected(selected)}
                    variants={product.variants}
                  />
                  {/* Variants End */}
                  <Customization
                    deliveryTime={product.deliveryTime}
                    customWriting={product.customWriting}
                  />
                  {!product.sellOutofStock && product.availableQuantity < 10 ? (
                    <div className="fst-italic few_dis pt-5">Only few left</div>
                  ) : null}

                  <div className="cart mt-4 align-items-center">
                    <button className="btn text-uppercase w-50 add_cart_btn ">
                      Add to cart
                    </button>
                  </div>
                  <Overview product={product} />
                  <div className="code_dis pt-2 pb-3">
                    SKU: {product.stockKeepingUnit}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- ======= Banner area end ======= -->  */}
        {/* <!-- ======= Product specificatio start======= --> */}
        <div className="container-fluid pro_spec pt-5 pb-3  ">
          <div className="row justify-content-center ">
            <div className="col-md-6 w-50"></div>
            <div className="col-md-6 back px-5">
              <div className="product">
                <div className=" align-items-center w-75">
                  <span className="fw-bold ov_look">SPECIFICATIONS </span>
                  <p className="about pt-2 ">Made in the U.S.A. </p>

                  {this.state.selectedVariants.map((variant) => {
                    return (
                      <p className="about ">
                        {variant.variantType}:{variant.selectedVariant}
                      </p>
                    );
                  })}

                  <p className="about">Material: 100% pre-shrunk cotton </p>

                  <div className="ho pt-2 mb-3 w-100"></div>
                  <span className="fw-bold ov_look">DELIVERY </span>
                  <p className="about pt-2">
                    Shop from a wide range of t-shirt from orianz. Pefect for
                    your everyday use, you could pair it with a stylish pair of
                    jeans or trousers complete the look.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- ======= Product specificatio end ======= --> */}
        {/* <!-- ======= Product in carousle ======= --> */}
        <div className="container font_fam">
          <div className="ho pt-2 mb-3 w-100"></div>
          <h6 className="text-center pt-4 pb-5 ov_look">
            {" "}
            YOU MIGHT ALSO LIKE{" "}
          </h6>
        </div>

        {/* <!-- =======  customer Review ======= --> */}
        <AddReview reviews={product.reviews} />
        {/* <!-- =======  Customer Review ====== --> */}
      </div>
    );
  }
}
const Customization = (props) => {
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  return (
    <>
      {console.log("will it rerender after date is set" + deliveryDate)}
      {props.customWriting && (
        <div class="mb-4 mt-3">
          <label for="name" class="color_size_h6">
            {props.customWriting}*
          </label>
          <input type="name" class="form-control" maxlength="30" />
        </div>
      )}

      {props.deliveryTime ? (
        <div class="mb-4 mt-3">
          <label for="name" class="color_size_h6">
            Date
          </label>
          <DatePicker
            selected={deliveryDate}
            onChange={(date) => setDeliveryDate(date)}
          />
        </div>
      ) : null}
    </>
  );
};

const Reviews = (props) => {
  function avergeRating() {
    let sum = 0;
    props.reviews.map((review) => {
      sum += review.rating;
    });
    return Math.ceil(sum / props.reviews.length);
  }
  function fakeArray(length) {
    const fakearr = [];
    for (var i = 0; i < length; i++) {
      fakearr.push("fake");
    }
    return fakearr;
  }

  return (
    <>
      <ul className="list-inline mb-2 me-3 small">
        {/* {
                    fakeArray(avergeRating()).map(
                        () => <li className="list-inline-item m-0"><i className="fas fa-star small text-warning"></i></li>
                    )
                }
                {
                    fakeArray(5 - avergeRating()).map(
                        () => <li className="list-inline-item m-0"><i className="fas fa-star small text-muted"></i></li>
                    )
                } */}
        <ReactStars
          edit={false}
          count={5}
          size={24}
          value={avergeRating()}
          activeColor="#ffd700"
        />
      </ul>
      <a href="#">
        <p className="mb-2 re_look">{props.reviews.length} REVIEWS</p>
      </a>
      <div className="vl mb-1 mx-4"></div>
      <a href="#">
        <p className=" mb-2 re_look"> WRITE A REVIEW</p>
      </a>
    </>
  );
};
class Variants extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(select) {
    const newSelected = this.props.selectedVariants;
    let indexT = 0;
    newSelected.map((variant, index) => {
      if (variant.variantType === select.selectedOption) {
        indexT = index;
      }
    });
    console.log(indexT);
    newSelected[indexT].selectedVariant = select.selectedVariant;
    this.props.setSelected(newSelected);
  }
  render() {
    return (
      <>
        {this.props.variants.map((variant) => {
          if (variant.selectedOption == "Color") {
            return (
              <ShowColorVariant
                setSelectedOption={(select) => this.handleSelect(select)}
                variant={variant}
              />
            );
          } else {
            return (
              <ShowNonColorVariant
                setSelectedOption={(select) => this.handleSelect(select)}
                variant={variant}
              />
            );
          }
        })}
      </>
    );
  }
}
class ShowColorVariant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choosedVariant: ntcjs.name(this.props.variant.tags[0].text)[1],
    };
    this.onColorClick = this.onColorClick.bind(this);
  }
  onColorClick(e) {
    this.setState(
      {
        choosedVariant: ntcjs.name(e.target.value)[1],
      },
      () => {
        const select = {};
        select.selectedOption = this.props.variant.selectedOption;
        select.selectedVariant = this.state.choosedVariant;
        this.props.setSelectedOption(select);
      }
    );
  }
  render() {
    return (
      <>
        <div className=" align-items-center mb-4 pt-3">
          <div className="d-flex">
            <h6 className="color_size_h6">
              {this.props.variant.selectedOption}
            </h6>
            <h6 className="color_Demo_h6 px-2">{this.state.choosedVariant}</h6>
          </div>
          <ul className="list-inline mb-0" id="colorVariants">
            {this.props.variant.tags.map((tag) => {
              return (
                <li className="list-inline-item ">
                  <input
                    className="btn-check"
                    id={tag.id + tag.text}
                    type="radio"
                    value={tag.text}
                    name={this.props.variant.selectedOption}
                    onClick={(e) => this.onColorClick(e)}
                  />
                  <label className="btn p-0 m-0" for={tag.id + tag.text}>
                    <i
                      className="fas fa-circle"
                      style={{ color: tag.text }}
                    ></i>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </>
    );
  }
}
class ShowNonColorVariant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choosedVariantType: this.props.variant.tags[0].text,
    };
    this.onClickHandler = this.onClickHandler.bind(this);
  }
  onClickHandler(e) {
    this.setState(
      {
        choosedVariantType: e.target.value,
      },
      () => {
        const select = {};
        select.selectedOption = this.props.variant.selectedOption;
        select.selectedVariant = this.state.choosedVariantType;
        this.props.setSelectedOption(select);
      }
    );
  }

  render() {
    return (
      <div className="sizes pt-2">
        <div className="d-flex">
          <h6 className="color_size_h6">{this.props.variant.selectedOption}</h6>
          <h6 className="color_Demo_h6 px-2 ">
            {this.state.choosedVariantType}
          </h6>
          <a href="#">
            <p className="px-5 mx-5 size-guid_look ">Size Guid</p>
          </a>
        </div>
        {this.props.variant.tags.map((tag) => {
          return (
            <>
              <input
                type="radio"
                className="btn-check"
                name={this.props.variant.selectedOption}
                value={tag.text}
                id={tag.id + tag.text}
                autocomplete="off"
                onClick={(e) => this.onClickHandler(e)}
              />
              <label
                className="btn btn-light  border text-center  p-2 px-3 mb-2 size-box_look "
                for={tag.id + tag.text}
              >
                {tag.text}
              </label>
            </>
          );
        })}
      </div>
    );
  }
}
const Overview = (props) => {
  const text = parse(props.product.description);
  return (
    <>
      <div className="ho pt-4 mb-3 w-100"></div>

      <span className="fw-bold ov_look">OVERVIEW </span>
      {text.map((part) => {
        if (text.indexOf(part) > text.length / 3) {
          return part;
        }
      })}
      <p className="about">{}</p>
      <a
        className="re_look fw-bold mb-4"
        data-bs-toggle="collapse"
        href="#collapseExample"
        role="button"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        READ MORE
      </a>
      <div className="collapse" id="collapseExample">
        <div className="about pb-3">
          {text.map((part) => {
            if (text.indexOf(part) <= text.length / 3) {
              return part;
            }
          })}
        </div>
      </div>
    </>
  );
};
class AddReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      rating: 0,
      reviewTitle: "",
      bodyofReview: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.ratingChanged = this.ratingChanged.bind(this);
  }
  ratingChanged(newrating) {
    this.setState({ rating: newrating });
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    this.props.reviews.push(this.state);
    // We will add method to push this review in the backend later
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
  render() {
    return (
      <>
        <div class="container font_fam">
          <div class="ho pt-2 mb-3 w-100">
            {/* caroausel start */}
          <TryCarauosel getRelatedProducts/>
           {/* caroausel end */}
           
          </div>
          <h6 class="text-center pt-4 pb-2 ov_look"> CUSTOMER REVIEWS </h6>
          <a
            class="re_look text-center fw-bold mb-4"
            data-bs-toggle="collapse"
            href="#reviewform"
            role="button"
            aria-expanded="false"
            aria-controls="reviewform"
          >
            <p class=" mb-2 re_look"> WRITE A REVIEW</p>
          </a>

          <div class="collapse pt-3 pb-5" id="reviewform">
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <div class="form-group mb-4">
                <label for="name" class="form-label">
                  NAME (AS IT WILL APPEAR WITH REVIEW)
                </label>
                <input
                  name="name"
                  type="text"
                  class="form-control"
                  id="nameInput1"
                  onChange={this.handleInputChange}
                  placeholder="Enter your name"
                />
              </div>

              <div class="form-group mb-4">
                <label for="email">EMAIL</label>
                <input
                  type="email"
                  name="email"
                  class="form-control"
                  id="emailInput2"
                  onChange={this.handleInputChange}
                  placeholder="john.smith@example.com"
                />
              </div>

              <div class="form-group mb-4">
                <label for="Rating">RATING</label>
                <ul class="list-inline large d-flex">
                  <ReactStars
                    count={5}
                    onChange={this.ratingChanged}
                    size={24}
                    activeColor="#ffd700"
                  />
                </ul>
              </div>

              <div class="form-group mb-4">
                <label for="REVIEW TITLE">REVIEW TITLE</label>
                <input
                  type="text"
                  name="reviewTitle"
                  class="form-control"
                  id="reviewtitleInput3"
                  onChange={this.handleInputChange}
                  placeholder="Enter your name"
                />
              </div>
              <div class="form-group mb-4">
                <label for="body of Review">BODY OF REVIEW</label>
                <textarea
                  name="bodyofReview"
                  class="form-control"
                  id="bodyofreviewTextarea4"
                  rows="9"
                  onChange={this.handleInputChange}
                  placeholder="write your comments here"
                ></textarea>
              </div>
              <button type="submit" class="btn mb-3 sub_review_btn float-end">
                Submit
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

import React from "react";
import { connect } from "react-redux";
import SingleProduct from "../components/SingleProduct";
import { fetchProduct } from "../store/actions/singleProduct";
import { addToCart, deleteCart, fetchCart } from "../store/actions/cart";
import {searchReviews, addReview} from "../store/actions/reviews"

class SingleProductContainer extends React.Component {
  constructor() {
    super();
    this.state = {
       description: '',
       rate: 3,
       local: false,
       rateAverage: 0
    };
    this.handlerSubmitCart = this.handlerSubmitCart.bind(this);
    this.handleDeleteCart = this.handleDeleteCart.bind(this);
    this.handlerDescriptionChange = this.handlerDescriptionChange.bind(this)
    this.handlerRateChange =  this.handlerRateChange.bind(this)
    this.handlerReviewSubmit = this.handlerReviewSubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchProduct(this.props.id);
    this.props.fetchCart();
    this.props.searchReviews(this.props.id)
    
    .then(()=>{
      let total = 0;
      let counter= 0
      this.props.reviews.map(review =>{
        counter ++
        total = total + review.rate
      })
        this.setState({rateAverage :total / counter})
    })
   
  }

  componentDidUpdate(prevProps ,prevState){
    let total = 0;
    let counter = 0
    if(prevState.local !== this.state.local){ 
      this.props.reviews.map(review =>{
        counter ++
        total = total + review.rate
       })
         this.setState({rateAverage :total / counter})
    }
  }

  handlerSubmitCart(id, price) {
    this.props.addToCart({ id: id, price: price });
  }

  handleDeleteCart(orderId) {
    this.props.deleteCart(orderId);
  }

// Review

  handlerDescriptionChange(event){
    const value =  event.target.value
    this.setState({description:value}) 
    console.log(value)
  }

  handlerRateChange(event){
    const value =  event.target.value
    this.setState({rate:value})
    console.log(value)
  }


  handlerReviewSubmit(event, productId){
    event.preventDefault()
    const objState = this.state
    objState.productId = productId
    this.props.addReview(objState).then(()=>{
      this.setState({local: !this.state.local})
    })
  }
  

// Render

  render() {
    const { product, cart, reviews } = this.props;
    return (
      <div>
        <SingleProduct
          product={product}
          handlerSubmitCart={this.handlerSubmitCart}
          handleDeleteCart={this.handleDeleteCart}
          handlerDescriptionChange={this.handlerDescriptionChange}
          handlerRateChange={this.handlerRateChange}
          handlerReviewSubmit={this.handlerReviewSubmit}
          cart={cart}
          reviews={reviews}
          rateAverage={this.state.rateAverage}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.match.params.id,
    product: state.productReducer.product,
    cart: state.cartReducer.list,
    reviews: state.reviewsReducer.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProduct: (id) => {
      dispatch(fetchProduct(id));
    },
    addToCart: (product) => {
      dispatch(addToCart(product));
    },
    deleteCart: (orderId) => {
      dispatch(deleteCart(orderId));
    },
    fetchCart: () => {
      dispatch(fetchCart());
    },
    searchReviews: (id) => {
      return dispatch(searchReviews(id));
    },
    addReview: (reviews) =>{
      return dispatch(addReview(reviews))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleProductContainer);


// componentDidUpdate(prevProps ,prevState){
//   if(prevState.local !== this.state.local){return this.props.searchReviews(this.props.id) }
//   let total= 0
//   this.props.searchReviews.map((review)=>{
//      total = total + review.rate
//   })
//   this.setState({rateAverage: total})

// }

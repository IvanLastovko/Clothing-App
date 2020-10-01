import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import './cart-dropdown.styles.scss';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors.js';


const CartDropdown = ({ cartItems, history }) => (
   <div className='cart-dropdown' >
      <div className='cart-items'>
         {
            cartItems.length ?
               (cartItems.map(
                  cartItem => <CartItem key={cartItem.id} item={cartItem} />
               ))
               :
               (<span className='empty-message'>
                  Your Cart is empty
               </span>)
         }
      </div>
      <CustomButton inverted onClick={() => history.push('/checkout')} >GO TO CHECKOUT</CustomButton>
   </div>
);

const mapStateToPRops = createStructuredSelector({
   cartItems: selectCartItems
});

export default withRouter(connect(mapStateToPRops)(CartDropdown));
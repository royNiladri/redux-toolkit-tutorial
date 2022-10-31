import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../modal/modalSlice';
import CartItem from './CartItem';

const CartContainer = () => {
    const dispatch = useDispatch();
    const { amount, total, cartItems } = useSelector((state) => state.cart);
    if (amount < 1) {
        return (
            <section className='cart'>
                <header>
                    <h2>Your Bag</h2>
                    <h4 className='empty-cart'>is currently empty</h4>
                </header>
            </section>
        )
    }
    return (
        <section className='cart'>
            <header>
                <h2>Your Bag</h2>
                <div>
                    {cartItems.map((item) => {
                        return <CartItem {...item} key={item.id} />
                    })}
                </div>
            </header>
            <footer>
                <hr />
                <div className='cart-total'>
                    <h4>
                        total <span>${total.toFixed(2)}</span>
                    </h4>
                </div>
                <button className='btn clear-btn' onClick={()=>dispatch(openModal())}>Clear Cart</button>
            </footer>
        </section>
    );
};

export default CartContainer;
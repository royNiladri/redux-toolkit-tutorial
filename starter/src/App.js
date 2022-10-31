import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotals, getcartItems } from './cart/cartSlice';
import CartContainer from './components/CartContainer';
import Modal from './components/Modal';
import Navbar from './components/Navbar';

function App() {
  const { cartItems, isLoading } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('calculating ttotal');
    dispatch(calculateTotals());
  }, [cartItems]);

  useEffect(() => {
    dispatch(getcartItems());
  }, []);
  
  return (
    isLoading ? (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    ) : (
      <main>
        {isOpen && <Modal />}
        <Navbar />
        <CartContainer />
      </main>
    )
  );
}
export default App;

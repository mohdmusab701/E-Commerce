import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';

const CartPage = () => {
    const { items, totalPrice } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        dispatch(updateQuantity({ product: productId, quantity: newQuantity }));
    };

    const handleRemove = (productId) => {
        dispatch(removeFromCart(productId));
    };

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="max-w-md mx-auto">
                    <div className="text-6xl mb-4">🛒</div>
                    <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
                    <p className="text-slate-600 mb-8">
                        Looks like you haven't added any items to your cart yet.
                    </p>
                    <Link to="/products" className="btn-primary">
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    const tax = totalPrice * 0.1;
    const shipping = totalPrice > 100 ? 0 : 10;
    const total = totalPrice + tax + shipping;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-gradient">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <div key={item.product} className="card p-4 flex items-center space-x-4">
                            <img
                                src={item.image || '/placeholder.jpg'}
                                alt={item.title}
                                className="w-24 h-24 object-cover rounded-lg"
                            />

                            <div className="flex-1">
                                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                                <p className="text-primary-600 font-bold">${item.price.toFixed(2)}</p>
                            </div>

                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleQuantityChange(item.product, item.quantity - 1)}
                                    className="w-8 h-8 flex items-center justify-center border-2 border-slate-300 rounded-lg hover:bg-slate-100"
                                >
                                    -
                                </button>
                                <span className="w-12 text-center font-semibold">{item.quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(item.product, item.quantity + 1)}
                                    className="w-8 h-8 flex items-center justify-center border-2 border-slate-300 rounded-lg hover:bg-slate-100"
                                >
                                    +
                                </button>
                            </div>

                            <div className="text-right">
                                <p className="font-bold text-lg mb-2">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </p>
                                <button
                                    onClick={() => handleRemove(item.product)}
                                    className="text-red-600 hover:text-red-800 text-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={() => dispatch(clearCart())}
                        className="text-red-600 hover:text-red-800 font-semibold"
                    >
                        Clear Cart
                    </button>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="card p-6 sticky top-24">
                        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between">
                                <span className="text-slate-600">Subtotal</span>
                                <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Tax (10%)</span>
                                <span className="font-semibold">${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Shipping</span>
                                <span className="font-semibold">
                                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                                </span>
                            </div>
                            <div className="border-t-2 border-slate-200 pt-3 flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span className="text-primary-600">${total.toFixed(2)}</span>
                            </div>
                        </div>

                        {totalPrice < 100 && (
                            <p className="text-sm text-green-600 mb-4">
                                Add ${(100 - totalPrice).toFixed(2)} more for free shipping!
                            </p>
                        )}

                        <Link to="/checkout" className="block w-full btn-primary text-center">
                            Proceed to Checkout
                        </Link>

                        <Link to="/products" className="block w-full text-center text-primary-600 font-semibold mt-4 hover:underline">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;

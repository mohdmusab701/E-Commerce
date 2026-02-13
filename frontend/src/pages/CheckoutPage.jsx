import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { orderService } from '../services/orderService';
import { clearCart } from '../store/slices/cartSlice';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { items, totalPrice } = useSelector((state) => state.cart);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const tax = totalPrice * 0.1;
    const shippingPrice = totalPrice > 100 ? 0 : 10;
    const total = totalPrice + tax + shippingPrice;

    const onSubmit = async (formData) => {
        if (!stripe || !elements) return;

        setLoading(true);
        setError('');

        try {
            // Create payment intent
            const paymentIntentResponse = await orderService.createPaymentIntent(items);
            const { clientSecret } = paymentIntentResponse.data;

            // Confirm payment with Stripe
            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (stripeError) {
                setError(stripeError.message);
                setLoading(false);
                return;
            }

            // Create order in database
            const orderData = {
                orderItems: items,
                shippingAddress: formData,
                paymentMethod: 'Stripe',
                paymentResult: {
                    id: paymentIntent.id,
                    status: paymentIntent.status,
                    update_time: new Date().toISOString(),
                },
                itemsPrice: totalPrice,
                taxPrice: tax,
                shippingPrice,
                totalPrice: total,
            };

            await orderService.confirmOrder(orderData);

            // Clear cart and redirect
            dispatch(clearCart());
            navigate('/profile');
            alert('Order placed successfully!');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to process payment');
        } finally {
            setLoading(false);
        }
    };

    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#9e2146',
            },
        },
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            {/* Shipping Address */}
            <div className="card p-6">
                <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Street</label>
                        <input
                            {...register('street', { required: 'Street is required' })}
                            className={`input-field ${errors.street ? 'input-error' : ''}`}
                            placeholder="123 Main St"
                        />
                        {errors.street && (
                            <p className="text-red-500 text-sm mt-1">{errors.street.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">City</label>
                        <input
                            {...register('city', { required: 'City is required' })}
                            className={`input-field ${errors.city ? 'input-error' : ''}`}
                            placeholder="New York"
                        />
                        {errors.city && (
                            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">State</label>
                        <input
                            {...register('state', { required: 'State is required' })}
                            className={`input-field ${errors.state ? 'input-error' : ''}`}
                            placeholder="NY"
                        />
                        {errors.state && (
                            <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Zip Code</label>
                        <input
                            {...register('zipCode', { required: 'Zip code is required' })}
                            className={`input-field ${errors.zipCode ? 'input-error' : ''}`}
                            placeholder="10001"
                        />
                        {errors.zipCode && (
                            <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>
                        )}
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Country</label>
                        <input
                            {...register('country', { required: 'Country is required' })}
                            className={`input-field ${errors.country ? 'input-error' : ''}`}
                            placeholder="United States"
                        />
                        {errors.country && (
                            <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Payment Information */}
            <div className="card p-6">
                <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
                <div className="p-4 border-2 border-slate-300 rounded-lg">
                    <CardElement options={cardElementOptions} />
                </div>
                <p className="text-sm text-slate-600 mt-2">
                    Test card: 4242 4242 4242 4242, any future expiry, any CVC
                </p>
            </div>

            {/* Order Summary */}
            <div className="card p-6">
                <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>{shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}`}</span>
                    </div>
                    <div className="border-t-2 pt-2 flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-primary-600">${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full btn-primary flex items-center justify-center"
            >
                {loading ? (
                    <>
                        <div className="spinner mr-2"></div>
                        Processing...
                    </>
                ) : (
                    `Pay $${total.toFixed(2)}`
                )}
            </button>
        </form>
    );
};

const CheckoutPage = () => {
    const { items } = useSelector((state) => state.cart);
    const navigate = useNavigate();

    if (items.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-gradient">Checkout</h1>
            <div className="max-w-3xl mx-auto">
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    );
};

export default CheckoutPage;

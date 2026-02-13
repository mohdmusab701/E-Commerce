import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = (e) => {
        e.preventDefault();
        dispatch(addToCart({
            product: product._id,
            title: product.title,
            price: product.price,
            image: product.images[0],
            quantity: 1,
        }));
        // Show toast notification (you can add a toast library later)
        alert('Product added to cart!');
    };

    return (
        <Link to={`/products/${product._id}`} className="card hover-lift group">
            {/* Product Image */}
            <div className="relative overflow-hidden h-64 bg-slate-100">
                <img
                    src={product.images[0] || '/placeholder.jpg'}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="badge badge-danger text-lg">Out of Stock</span>
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="p-4">
                <h3 className="font-semibold text-lg text-slate-800 mb-2 truncate">
                    {product.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center mb-2">
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-slate-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <span className="ml-2 text-sm text-slate-600">
                        ({product.numReviews} reviews)
                    </span>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary-600">
                        ${product.price.toFixed(2)}
                    </span>
                    <button
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                        className={`${product.stock === 0
                                ? 'bg-slate-300 cursor-not-allowed'
                                : 'btn-primary'
                            } text-sm px-4 py-2`}
                    >
                        Add to Cart
                    </button>
                </div>

                {/* Category Badge */}
                <div className="mt-3">
                    <span className="badge badge-info text-xs">
                        {product.category}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;

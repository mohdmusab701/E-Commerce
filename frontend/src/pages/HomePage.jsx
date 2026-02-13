import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { productService } from '../services/productService';
import ProductCard from '../components/product/ProductCard';

const HomePage = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const response = await productService.getProducts({ limit: 8, sortBy: 'rating', sortOrder: 'desc' });
                setFeaturedProducts(response.data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedProducts();
    }, []);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-premium text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
                        Welcome to Apna Cart
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-white/90">
                        Discover amazing products at unbeatable prices
                    </p>
                    <Link to="/products" className="inline-block bg-white text-primary-700 font-semibold px-8 py-4 rounded-lg hover:bg-slate-100 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
                        Shop Now →
                    </Link>
                </div>
            </section>

            {/* Featured Products */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-12 text-gradient">
                    Featured Products
                </h2>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}

                <div className="text-center mt-12">
                    <Link to="/products" className="btn-outline">
                        View All Products
                    </Link>
                </div>
            </section>

            {/* Categories */}
            <section className="bg-slate-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Shop by Category
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {['Electronics', 'Clothing', 'Books', 'Home & Garden'].map((category) => (
                            <Link
                                key={category}
                                to={`/products?category=${category}`}
                                className="card text-center py-8 hover-lift group"
                            >
                                <div className="text-4xl mb-4">
                                    {category === 'Electronics' && '💻'}
                                    {category === 'Clothing' && '👕'}
                                    {category === 'Books' && '📚'}
                                    {category === 'Home & Garden' && '🏡'}
                                </div>
                                <h3 className="font-semibold text-lg group-hover:text-primary-600 transition-colors">
                                    {category}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="text-5xl mb-4">🚚</div>
                        <h3 className="font-semibold text-xl mb-2">Free Shipping</h3>
                        <p className="text-slate-600">On orders over $100</p>
                    </div>
                    <div className="text-center">
                        <div className="text-5xl mb-4">🔒</div>
                        <h3 className="font-semibold text-xl mb-2">Secure Payment</h3>
                        <p className="text-slate-600">100% secure transactions</p>
                    </div>
                    <div className="text-center">
                        <div className="text-5xl mb-4">↩️</div>
                        <h3 className="font-semibold text-xl mb-2">Easy Returns</h3>
                        <p className="text-slate-600">30-day return policy</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;

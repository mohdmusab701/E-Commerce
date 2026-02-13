import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productService } from '../services/productService';
import ProductCard from '../components/product/ProductCard';
import { setProducts, setFilters, setPage, setLoading } from '../store/slices/productSlice';

const ProductsPage = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const { products, filters, pagination, loading } = useSelector((state) => state.product);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        // Update filters from URL params
        const urlFilters = {
            search: searchParams.get('search') || '',
            category: searchParams.get('category') || '',
            minPrice: searchParams.get('minPrice') || '',
            maxPrice: searchParams.get('maxPrice') || '',
            sortBy: searchParams.get('sortBy') || 'createdAt',
            sortOrder: searchParams.get('sortOrder') || 'desc',
        };
        dispatch(setFilters(urlFilters));
    }, [searchParams]);

    useEffect(() => {
        loadProducts();
    }, [filters, pagination.page]);

    const loadCategories = async () => {
        try {
            const response = await productService.getCategories();
            setCategories(response.data);
        } catch (error) {
            console.error('Failed to load categories:', error);
        }
    };

    const loadProducts = async () => {
        dispatch(setLoading(true));
        try {
            const params = {
                ...filters,
                page: pagination.page,
                limit: pagination.limit,
            };
            const response = await productService.getProducts(params);
            dispatch(setProducts(response));
        } catch (error) {
            console.error('Failed to load products:', error);
        }
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };

        // Update URL params
        const params = new URLSearchParams();
        Object.entries(newFilters).forEach(([k, v]) => {
            if (v) params.set(k, v);
        });
        setSearchParams(params);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-gradient">
                Our Products
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <div className="lg:col-span-1">
                    <div className="card p-6 sticky top-24">
                        <h2 className="text-xl font-semibold mb-4">Filters</h2>

                        {/* Search */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Search
                            </label>
                            <input
                                type="text"
                                value={filters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                                className="input-field"
                                placeholder="Search products..."
                            />
                        </div>

                        {/* Category */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Category
                            </label>
                            <select
                                value={filters.category}
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                                className="input-field"
                            >
                                <option value="">All Categories</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Price Range */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Price Range
                            </label>
                            <div className="flex space-x-2">
                                <input
                                    type="number"
                                    value={filters.minPrice}
                                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                                    className="input-field"
                                    placeholder="Min"
                                />
                                <input
                                    type="number"
                                    value={filters.maxPrice}
                                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                                    className="input-field"
                                    placeholder="Max"
                                />
                            </div>
                        </div>

                        {/* Sort */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Sort By
                            </label>
                            <select
                                value={`${filters.sortBy}-${filters.sortOrder}`}
                                onChange={(e) => {
                                    const [sortBy, sortOrder] = e.target.value.split('-');
                                    handleFilterChange('sortBy', sortBy);
                                    handleFilterChange('sortOrder', sortOrder);
                                }}
                                className="input-field"
                            >
                                <option value="createdAt-desc">Newest First</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="rating-desc">Highest Rated</option>
                            </select>
                        </div>

                        <button
                            onClick={() => {
                                dispatch(setFilters({
                                    search: '',
                                    category: '',
                                    minPrice: '',
                                    maxPrice: '',
                                    sortBy: 'createdAt',
                                    sortOrder: 'desc',
                                }));
                                setSearchParams({});
                            }}
                            className="w-full btn-outline"
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="lg:col-span-3">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="spinner"></div>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-xl text-slate-600">No products found.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {pagination.totalPages > 1 && (
                                <div className="flex justify-center mt-8 space-x-2">
                                    <button
                                        onClick={() => dispatch(setPage(pagination.page - 1))}
                                        disabled={pagination.page === 1}
                                        className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-50"
                                    >
                                        Previous
                                    </button>
                                    <span className="px-4 py-2">
                                        Page {pagination.page} of {pagination.totalPages}
                                    </span>
                                    <button
                                        onClick={() => dispatch(setPage(pagination.page + 1))}
                                        disabled={pagination.page === pagination.totalPages}
                                        className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-50"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;

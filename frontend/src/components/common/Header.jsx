import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { authService } from '../../services/authService';
import { useState } from 'react';

const Header = () => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const { totalQuantity } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await authService.logout();
            dispatch(logout());
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-gradient">
                        🛒 Apna Cart
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="text-slate-700 hover:text-primary-600 transition-colors">
                            Home
                        </Link>
                        <Link to="/products" className="text-slate-700 hover:text-primary-600 transition-colors">
                            Products
                        </Link>

                        {isAuthenticated && user?.role === 'admin' && (
                            <Link to="/admin" className="text-slate-700 hover:text-primary-600 transition-colors">
                                Admin
                            </Link>
                        )}

                        {/* Cart */}
                        <Link to="/cart" className="relative">
                            <svg className="w-6 h-6 text-slate-700 hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {totalQuantity > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {totalQuantity}
                                </span>
                            )}
                        </Link>

                        {/* User Menu */}
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <Link to="/profile" className="text-slate-700 hover:text-primary-600 transition-colors">
                                    {user?.name || 'Profile'}
                                </Link>
                                <button onClick={handleLogout} className="btn-outline text-sm px-4 py-2">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-slate-700 hover:text-primary-600 transition-colors">
                                    Login
                                </Link>
                                <Link to="/register" className="btn-primary text-sm px-4 py-2">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-slate-700"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 space-y-3">
                        <Link to="/" className="block text-slate-700 hover:text-primary-600 transition-colors">
                            Home
                        </Link>
                        <Link to="/products" className="block text-slate-700 hover:text-primary-600 transition-colors">
                            Products
                        </Link>
                        {isAuthenticated && user?.role === 'admin' && (
                            <Link to="/admin" className="block text-slate-700 hover:text-primary-600 transition-colors">
                                Admin
                            </Link>
                        )}
                        {isAuthenticated ? (
                            <>
                                <Link to="/profile" className="block text-slate-700 hover:text-primary-600 transition-colors">
                                    Profile
                                </Link>
                                <button onClick={handleLogout} className="block w-full text-left text-slate-700 hover:text-primary-600 transition-colors">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block text-slate-700 hover:text-primary-600 transition-colors">
                                    Login
                                </Link>
                                <Link to="/register" className="block text-slate-700 hover:text-primary-600 transition-colors">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;

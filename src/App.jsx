import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { products } from './data/products';
import TopBanner from './components/layout/TopBanner';
import Header from './components/layout/Header';
import CartDrawer from './components/layout/CartDrawer';
import Footer from './components/layout/Footer';
import HeroSection from './components/home/HeroSection';
import TrustFeatures from './components/home/TrustFeatures';
import CategoryGrid from './components/home/CategoryGrid';
import ProductSlider from './components/home/ProductSlider';
import ShowcaseBanners from './components/home/ShowcaseBanners';
import SmartFinder from './components/home/SmartFinder';
import LifestyleGrid from './components/home/LifestyleGrid';
import PopularBrands from './components/home/PopularBrands';
import BuyingGuide from './components/home/BuyingGuide';
import Testimonials from './components/home/Testimonials';
import ProductDetail from './pages/ProductDetail';
import ShopPage from './pages/ShopPage';
import CheckoutPage from './pages/CheckoutPage';
import SearchModal from './components/layout/SearchModal';
import AuthModal from './components/layout/AuthModal';
import { ToastProvider } from './context/ToastContext';
import ProfilePage from './pages/ProfilePage';


export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const goToProfile = () => {
    setCurrentPage('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  // وضعیت لاگین کاربر همراه با ذخیره در localStorage
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('nexora_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('nexora_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('nexora_user');
  };

  // توابع ناوبری و هدایت بین صفحات
  const goToHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToShop = () => {
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToCheckout = () => {
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductSelect = (product) => {
    const found = products.find((p) => p.id === product.id) || product;
    setSelectedProduct(found);
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CartProvider>
      <ToastProvider>
        <div className="min-h-screen flex flex-col bg-white">
          <TopBanner />
          <Header
            user={user}
            onLogoClick={goToHome}
            onShopClick={goToShop}
            onSearchClick={() => setIsSearchOpen(true)}
            onAuthClick={() => {
              if (user) {
                goToProfile();
              } else {
                setIsAuthOpen(true);
              }
            }}
          />

          <main className="flex-1 w-full">
            {currentPage === 'home' && (
              <>
                <HeroSection onExploreClick={goToShop} />
                <TrustFeatures />
                <CategoryGrid onCategoryClick={goToShop} />
                <ProductSlider
                  products={products}
                  onProductClick={handleProductSelect}
                  onSeeAllClick={goToShop}
                />
                <ShowcaseBanners />
                <SmartFinder />
                <LifestyleGrid />
                <PopularBrands />
                <BuyingGuide />
                <Testimonials />
              </>
            )}

            {currentPage === 'shop' && (
              <ShopPage
                products={products}
                onProductSelect={handleProductSelect}
                onBackToHome={goToHome}
              />
            )}

            {currentPage === 'product' && (
              <ProductDetail
                product={selectedProduct}
                onBackToHome={goToHome}
                onProductSelect={handleProductSelect}
              />
            )}

            {currentPage === 'checkout' && (
              <CheckoutPage
                onBackToHome={goToHome}
                onBackToShop={goToShop}
              />
            )}
            {currentPage === 'profile' && (
              <ProfilePage
                user={user}
                onLogout={handleLogout}
                onBackToHome={goToHome}
                onGoToShop={goToShop}
              />
            )}
          </main>

          <Footer onShopClick={goToShop} />
          <CartDrawer onCheckout={goToCheckout} />

          {/* مودال جستجوی آنی */}
          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            products={products}
            onSelectProduct={handleProductSelect}
          />

          {/* مودال ورود و مدیریت حساب کاربری */}
          <AuthModal
            isOpen={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
            user={user}
            onLoginSuccess={handleLoginSuccess}
            onLogout={handleLogout}
          />
        </div>
      </ToastProvider>
    </CartProvider>
  );
}
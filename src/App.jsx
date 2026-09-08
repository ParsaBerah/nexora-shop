import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
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

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const goToHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToShop = () => {
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToProduct = () => {
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <TopBanner />
        {/* انتقال توابع ناوبری به هدر برای منوها و لوگو */}
        <Header onLogoClick={goToHome} onShopClick={goToShop} />

        <main className="flex-1 w-full">
          {currentPage === 'home' && (
            <>
              <HeroSection onExploreClick={goToShop} />
              <TrustFeatures />
              <CategoryGrid onCategoryClick={goToShop} />
              <ProductSlider onProductClick={goToProduct} onSeeAllClick={goToShop} />
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
              onProductSelect={goToProduct} 
              onBackToHome={goToHome} 
            />
          )}

          {currentPage === 'product' && (
            <ProductDetail 
              onBackToHome={goToHome} 
            />
          )}
        </main>

        <Footer onShopClick={goToShop} />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
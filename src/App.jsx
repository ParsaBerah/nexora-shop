import React from 'react';
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

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <TopBanner />
        <Header />

        <main className="flex-1 w-full">
          <HeroSection />
          <TrustFeatures />
          <CategoryGrid />
          <ProductSlider />
          <ShowcaseBanners />
          <SmartFinder />
          <LifestyleGrid />
          <PopularBrands />
          <BuyingGuide />
          <Testimonials />
        </main>

        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
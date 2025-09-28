'use client';

import Image from 'next/image';
import { siteConfig } from './config';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);
  const scrollToSection = (sectionId: string, e?: React.MouseEvent<HTMLAnchorElement>) => {
    if (e) e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      const headerHeight = 80; // Approximate height of sticky header
      const elementPosition = section.offsetTop - headerHeight;
      const currentPosition = window.pageYOffset;
      const distance = elementPosition - currentPosition;
      const duration = 1500; // 1.5 seconds for smoother, slower scrolling
      
      const startTime = performance.now();
      
      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth acceleration/deceleration
        const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const easedProgress = easeInOutCubic(progress);
        
        window.scrollTo(0, currentPosition + distance * easedProgress);
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };
      
      requestAnimationFrame(animateScroll);
      setIsMenuOpen(false); // Close menu after clicking
    }
  };

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    scrollToSection('contact', e);
  };

  return (
    <main className="min-h-screen">
      {/* Sticky Header with Phone + CTA */}
      <header className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-slate-300">
        <div ref={menuRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Company Name */}
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-slate-800">{siteConfig.brand.name}</h1>
              <span className="hidden lg:block text-sm text-slate-600">| {siteConfig.brand.address}</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a 
                href="#services" 
                onClick={(e) => scrollToSection('services', e)}
                className="text-slate-700 hover:text-amber-600 font-medium transition duration-300 cursor-pointer"
              >
                Services
              </a>
              <a 
                href="#work" 
                onClick={(e) => scrollToSection('work', e)}
                className="text-slate-700 hover:text-amber-600 font-medium transition duration-300 cursor-pointer"
              >
                Gallery
              </a>
              <a 
                href="#reviews" 
                onClick={(e) => scrollToSection('reviews', e)}
                className="text-slate-700 hover:text-amber-600 font-medium transition duration-300 cursor-pointer"
              >
                Reviews
              </a>
              <a 
                href="#faq" 
                onClick={(e) => scrollToSection('faq', e)}
                className="text-slate-700 hover:text-amber-600 font-medium transition duration-300 cursor-pointer"
              >
                FAQ
              </a>
            </nav>

            {/* Desktop Contact Info and CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-slate-600">Call Now</p>
                <a href={`tel:${siteConfig.brand.phone}`} className="text-lg font-bold text-amber-600 hover:text-amber-700">
                  {siteConfig.brand.phone}
                </a>
              </div>
              <a 
                href="#contact" 
                onClick={scrollToContact}
                className="bg-slate-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-slate-700 transition duration-300 shadow-lg cursor-pointer"
              >
                Free Quote
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-3">
              <a 
                href="#contact" 
                onClick={scrollToContact}
                className="bg-slate-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-slate-700 transition duration-300 shadow-lg cursor-pointer text-sm"
              >
                Quote
              </a>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition duration-300"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className={`w-5 h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                  <span className={`w-5 h-0.5 bg-gray-700 transition-all duration-300 mt-1 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`w-5 h-0.5 bg-gray-700 transition-all duration-300 mt-1 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <nav className="py-4 space-y-3 border-t border-slate-200">
              <a 
                href="#services" 
                onClick={(e) => scrollToSection('services', e)}
                className="block px-4 py-3 text-slate-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg font-medium transition duration-300 cursor-pointer"
              >
                🏠 Services
              </a>
              <a 
                href="#work" 
                onClick={(e) => scrollToSection('work', e)}
                className="block px-4 py-3 text-slate-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg font-medium transition duration-300 cursor-pointer"
              >
                🖼️ Gallery
              </a>
              <a 
                href="#reviews" 
                onClick={(e) => scrollToSection('reviews', e)}
                className="block px-4 py-3 text-slate-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg font-medium transition duration-300 cursor-pointer"
              >
                ⭐ Reviews
              </a>
              <a 
                href="#faq" 
                onClick={(e) => scrollToSection('faq', e)}
                className="block px-4 py-3 text-slate-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg font-medium transition duration-300 cursor-pointer"
              >
                ❓ FAQ
              </a>
              <div className="px-4 py-3">
                <div className="text-sm text-slate-600 mb-1">Call Now</div>
                <a href={`tel:${siteConfig.brand.phone}`} className="text-lg font-bold text-amber-600 hover:text-amber-700">
                  {siteConfig.brand.phone}
                </a>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section with Strong Value Prop */}
      <section className="relative text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src="/pictures/Hero%202.jpg" 
            alt="Professional roofing installation in Boise, Idaho"
            fill
            className="object-cover"
            priority
            onError={(e) => {
              console.error('Hero image failed to load:', e);
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 to-slate-800/80"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Boise&apos;s #1 Roofing Company
            </h2>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Professional roof installation, repair, and maintenance serving Treasure Valley for 25+ years
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a 
                href={`tel:${siteConfig.brand.phone}`}
                className="bg-white text-slate-800 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-100 transition duration-300 shadow-lg flex items-center justify-center"
              >
                📞 Call {siteConfig.brand.phone}
              </a>
              <a 
                href="#contact" 
                onClick={scrollToContact}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-slate-800 transition duration-300 cursor-pointer"
              >
                ✨ Get Free Estimate
              </a>
            </div>
            <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl p-8 max-w-4xl mx-auto border border-white/20 shadow-xl">
              <div className="text-center mb-6">
                <p className="text-2xl font-bold mb-4 text-slate-800">🏆 Why Choose Us?</p>
                <p className="text-slate-600 mb-6">Building trust through proven experience and exceptional service</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-amber-600 text-2xl mb-2">✅</div>
                  <div className="text-slate-800 font-semibold text-base">{siteConfig.brand.license}</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-amber-600 text-2xl mb-2">✅</div>
                  <div className="text-slate-800 font-semibold text-base">{siteConfig.brand.yearsExperience} Years Experience</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-amber-600 text-2xl mb-2">✅</div>
                  <div className="text-slate-800 font-semibold text-base">Free Estimates</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-amber-600 text-2xl mb-2">✅</div>
                  <div className="text-slate-800 font-semibold text-base">Same Day Service Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="relative py-16 bg-gray-50 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src="/pictures/treasure%20valley.jpg" 
            alt="Treasure Valley landscape"
            fill
            className="object-cover opacity-20"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Serving the Entire Treasure Valley
            </h2>
            <p className="text-xl text-gray-600">
              Professional roofing services throughout {siteConfig.locations.join(', ')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {siteConfig.locations.map((location) => (
              <div key={location} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="text-blue-500 text-3xl mb-3">📍</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{location}</h3>
                <p className="text-sm text-gray-600">Roofing Services</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section with Keyworded H2s */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Professional Roofing Services in Boise, Idaho
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From residential roof replacement to commercial roofing solutions, we&apos;re your trusted roofing contractor in the Treasure Valley
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {siteConfig.services.map((service, index) => (
              <div key={index} className="bg-slate-50 rounded-lg shadow-lg p-8 hover:shadow-xl transition duration-300 border-l-4 border-amber-500">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">{service.title}</h3>
                    <p className="text-slate-600 mb-4">{service.description}</p>
                    <div className="flex space-x-3">
                      <a href="#contact" onClick={scrollToContact} className="text-amber-600 font-semibold hover:text-amber-700 cursor-pointer">
                        Get Quote →
                      </a>
                      <a href={`tel:${siteConfig.brand.phone}`} className="text-slate-600 font-semibold hover:text-slate-800">
                        Call Now →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Block 1 */}
      <section className="py-16 bg-gradient-to-r from-slate-800 to-slate-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Property?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get your free estimate today! We serve {siteConfig.brand.serviceArea} with professional roofing solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`tel:${siteConfig.brand.phone}`}
              className="bg-white text-slate-800 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-100 transition duration-300 shadow-lg"
            >
              📞 Call {siteConfig.brand.phone}
        </a>
        <a
              href="#contact" 
              onClick={scrollToContact}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-slate-800 transition duration-300 cursor-pointer"
            >
              ✨ Free Estimate
            </a>
          </div>
        </div>
      </section>

      {/* Recent Work Gallery */}
      <section id="work" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recent Roofing Projects in Boise
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See examples of our quality workmanship throughout the Treasure Valley
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-64 overflow-hidden relative">
                <Image 
                  src="/pictures/Residential%20roof.jpg" 
                  alt="Modern residential roof installation in Eagle, Idaho"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    console.error('Residential fence image failed to load:', e);
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Modern Residential Roof - Eagle, ID</h3>
                <p className="text-gray-600 mb-3">High-quality residential roof installation with premium materials</p>
                <p className="text-sm text-blue-600 font-semibold">Completed in 2 days</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-64 overflow-hidden relative">
                <Image 
                  src="/pictures/commercial%20roof.jpg" 
                  alt="Commercial flat roof installation in Meridian, Idaho"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    console.error('Pool fence image failed to load:', e);
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Commercial Roof Installation - Meridian, ID</h3>
                <p className="text-gray-600 mb-3">Professional commercial roofing system with superior durability</p>
                <p className="text-sm text-green-600 font-semibold">Weather resistant</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-64 overflow-hidden relative">
                <Image 
                  src="/pictures/metal%20roof.jpg" 
                  alt="Metal roofing installation in Nampa, Idaho"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    console.error('Commercial fence image failed to load:', e);
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Metal Roof Installation - Nampa, ID</h3>
                <p className="text-gray-600 mb-3">Premium metal roofing system for maximum protection</p>
                <p className="text-sm text-purple-600 font-semibold">50-year warranty</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Work Showcase */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              More of Our Quality Work
            </h2>
            <p className="text-xl text-gray-600">
              See additional examples of our craftsmanship throughout the Treasure Valley
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg shadow-lg overflow-hidden">
              <div className="h-80 overflow-hidden relative">
                <Image 
                  src="/pictures/Architectural%20shingle.jpg" 
                  alt="Professional roof installation project in Boise area"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    console.error('Pic 1 image failed to load:', e);
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Architectural Shingle Design</h3>
                <p className="text-gray-600">Beautiful custom roofing solution showcasing our attention to detail and quality materials.</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg shadow-lg overflow-hidden">
              <div className="h-80 overflow-hidden relative">
                <Image 
                  src="/pictures/Professional%20Installation.jpg" 
                  alt="Professional roof installation project in Treasure Valley"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    console.error('Pic 2 image failed to load:', e);
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Installation</h3>
                <p className="text-gray-600">Expert roof installation demonstrating our skilled craftsmanship and precision work.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by {siteConfig.brand.projectsCompleted} Boise Homeowners
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{siteConfig.brand.yearsExperience}</div>
              <p className="text-gray-600">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{siteConfig.brand.projectsCompleted}</div>
              <p className="text-gray-600">Projects Completed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">24hr</div>
              <p className="text-gray-600">Response Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section id="reviews" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Boise Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don&apos;t just take our word for it - hear from our satisfied customers throughout the Treasure Valley
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                &ldquo;Premier Roofing did an amazing job on our roof replacement in Eagle. Professional, 
                on-time, and the quality is outstanding. Highly recommend!&rdquo;
              </p>
              <p className="font-semibold text-gray-900">- Sarah M., Eagle, ID</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                &ldquo;Fast service, fair pricing, and excellent workmanship. They repaired 
                our storm-damaged roof in Meridian quickly and it looks better than new.&rdquo;
              </p>
              <p className="font-semibold text-gray-900">- Mike R., Meridian, ID</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                &ldquo;Outstanding customer service from start to finish. The team was 
                professional, clean, and completed our roofing project in Boise ahead of schedule.&rdquo;
              </p>
              <p className="font-semibold text-gray-900">- Jennifer L., Boise, ID</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Block 2 */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Limited Time Offer: Free Consultation
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Book your free on-site consultation today and get 10% off your first project!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`tel:${siteConfig.brand.phone}`}
              className="bg-white text-amber-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-50 transition duration-300 shadow-lg"
            >
              📞 Call Now
        </a>
        <a
              href="#contact" 
              onClick={scrollToContact}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-amber-700 transition duration-300 cursor-pointer"
            >
              ✨ Book Consultation
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about our roofing services in Boise
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How long does roof installation typically take in Boise?
              </h3>
              <p className="text-gray-600">
                Most residential roof installations take 1-3 days depending on the size and complexity. 
                We&apos;ll provide a detailed timeline during your consultation.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Do you offer financing options?
                  </h3>
                  <p className="text-gray-600">
                    Yes, we offer flexible financing options to make your roofing project affordable. 
                    Contact us to learn about our current financing programs.
                  </p>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Popular</span>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What types of roofing materials do you work with?
              </h3>
              <p className="text-gray-600">
                We install asphalt shingles, metal roofing, tile, slate, and flat roof systems. 
                We can help you choose the best material for your needs and budget.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Is the estimate really free?
              </h3>
              <p className="text-gray-600">
                Absolutely! We provide free, no-obligation estimates. Our team will visit your 
                property, discuss your needs, and provide a detailed quote at no cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Get Your Free Quote Today
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your property? Contact us for a free consultation and estimate.
            </p>
          </div>
          
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12">
            <form className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-amber-100 focus:border-amber-500 focus:outline-none transition-all duration-300 text-lg"
                    placeholder="Your first name"
                  />
                </div>
                
                <div className="space-y-3">
                  <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-amber-100 focus:border-amber-500 focus:outline-none transition-all duration-300 text-lg"
                    placeholder="Your last name"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-amber-100 focus:border-amber-500 focus:outline-none transition-all duration-300 text-lg"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div className="space-y-3">
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-amber-100 focus:border-amber-500 focus:outline-none transition-all duration-300 text-lg"
                    placeholder="(208) 555-0123"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
                  Service Needed <span className="text-red-500">*</span>
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 text-gray-900 focus:ring-4 focus:ring-amber-100 focus:border-amber-500 focus:outline-none transition-all duration-300 text-lg appearance-none bg-white"
                >
                  <option value="">Select a service</option>
                  <option value="residential">Residential Roof Installation</option>
                  <option value="commercial">Commercial Roofing Services</option>
                  <option value="repair">Roof Repair & Maintenance</option>
                  <option value="storm">Storm Damage Restoration</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="space-y-3">
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-amber-100 focus:border-amber-500 focus:outline-none transition-all duration-300 text-lg resize-none"
                  placeholder="Tell us about your project, property size, preferred materials, timeline, etc."
                ></textarea>
              </div>
              
              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-12 py-5 rounded-xl font-bold text-xl hover:from-amber-700 hover:to-amber-800 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  ✨ Send Quote Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">{siteConfig.brand.name}</h3>
              <p className="text-gray-400 mb-4">
                Boise&apos;s trusted roofing experts serving the entire Treasure Valley.
              </p>
              <div className="space-y-2 text-gray-400">
                <p>📞 {siteConfig.brand.phone}</p>
                <p>📧 {siteConfig.brand.email}</p>
                <p>📍 {siteConfig.brand.address}</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Residential Roof Installation</li>
                <li>Commercial Roofing Services</li>
                <li>Roof Repair & Maintenance</li>
                <li>Storm Damage Restoration</li>
                <li>Free Estimates</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Service Areas</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Boise</li>
                <li>Meridian</li>
                <li>Nampa</li>
                <li>Eagle</li>
                <li>Caldwell</li>
                <li>Garden City</li>
                <li>Kuna</li>
                <li>Star</li>
                <li>Middleton</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>{siteConfig.brand.license}</li>
                <li>Fully Insured</li>
                <li>Bonded</li>
                <li>{siteConfig.brand.yearsExperience} Years Experience</li>
                <li>BBB Accredited</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 {siteConfig.brand.name}. All rights reserved. | Serving {siteConfig.brand.serviceArea}</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

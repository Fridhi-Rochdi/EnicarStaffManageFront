import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LOGIN } from "../routes";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Gestion Intelligente du Personnel",
      description: "Simplifiez la gestion des tickets d'impression et optimisez vos ressources avec notre plateforme innovante",
    },
    {
      title: "Réservation de Salles Simplifiée",
      description: "Gérez vos espaces et planifiez vos événements facilement avec notre système de réservation intuitif",
    },
    {
      title: "Suivi en Temps Réel",
      description: "Visualisez et suivez toutes vos demandes depuis un tableau de bord unifié et performant",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: "description",
      title: "Gestion des Tickets",
      description: "Créez et suivez vos demandes d'impression avec un système de tickets intuitif et efficace.",
      color: "from-indigo-500 to-purple-600",
    },
    {
      icon: "event",
      title: "Périodes d'Examens",
      description: "Planifiez et gérez les périodes d'examens avec des outils de planification avancés.",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: "domain",
      title: "Réservation de Salles",
      description: "Réservez vos espaces de travail et salles de réunion en quelques clics seulement.",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: "group",
      title: "Gestion Utilisateurs",
      description: "Administrez les comptes utilisateurs avec un système de rôles flexible et sécurisé.",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: "analytics",
      title: "Tableau de Bord",
      description: "Visualisez vos statistiques et performances avec des graphiques en temps réel.",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: "verified_user",
      title: "Sécurité Avancée",
      description: "Protection des données avec authentification JWT et contrôle d'accès par rôles.",
      color: "from-red-500 to-pink-600",
    },
  ];

  const stats = [
    { value: "99.9%", label: "Disponibilité", icon: "check_circle" },
    { value: "< 1s", label: "Temps de réponse", icon: "speed" },
    { value: "24/7", label: "Support", icon: "support_agent" },
    { value: "100%", label: "Sécurisé", icon: "lock" },
  ];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Navbar */}
      <nav className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center gap-3">
                <span className="material-icons text-4xl text-indigo-600">school</span>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    <span className="text-orange-500">ENI</span>
                    <span className="text-blue-500">Carthage</span>
                  </span>
                  <span className="text-xs text-gray-500 -mt-1 tracking-wide">STAFF MANAGEMENT</span>
                </div>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-700 hover:text-indigo-600 transition font-medium">
                Fonctionnalités
              </a>
              <a href="#about" className="text-gray-700 hover:text-indigo-600 transition font-medium">
                À propos
              </a>
              <a href="#contact" className="text-gray-700 hover:text-indigo-600 transition font-medium">
                Contact
              </a>
              <Link
                to={LOGIN}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-full hover:shadow-lg transition flex items-center gap-2 font-medium"
              >
                <span className="material-icons text-sm">login</span>
                Se connecter
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              <span className="material-icons text-gray-700">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-2 border-t">
              <a
                href="#features"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Fonctionnalités
              </a>
              <a
                href="#about"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                À propos
              </a>
              <a
                href="#contact"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
              <Link
                to={LOGIN}
                className="block px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded text-center font-medium"
              >
                Se connecter
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with Professional Design */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px]">
            {/* Text Content with Fade Animation */}
            <div
              key={currentSlide}
              className="space-y-8 animate-fade-in"
            >
              <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                <span className="material-icons text-sm align-middle mr-1">trending_up</span>
                Solution de Gestion Moderne
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {heroSlides[currentSlide].title}
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                {heroSlides[currentSlide].description}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  to={LOGIN}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  <span className="material-icons">rocket_launch</span>
                  Commencer maintenant
                </Link>
                <a
                  href="#features"
                  className="border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-full font-semibold hover:bg-indigo-50 transition flex items-center gap-2"
                >
                  <span className="material-icons">play_circle</span>
                  En savoir plus
                </a>
              </div>

              {/* Slide Indicators */}
              <div className="flex gap-2 pt-4">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1.5 rounded-full transition-all ${
                      index === currentSlide ? "w-12 bg-indigo-600" : "w-6 bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Professional Illustration/Image */}
            <div
              key={`img-${currentSlide}`}
              className="relative animate-fade-in"
            >
              <div className="relative">
                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-4 pb-6 border-b">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
                        <span className="material-icons text-white text-3xl">dashboard</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Dashboard</h3>
                        <p className="text-sm text-gray-500">Vue d'ensemble</p>
                      </div>
                    </div>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                        <span className="material-icons text-blue-600">description</span>
                        <p className="text-2xl font-bold text-blue-900 mt-2">125</p>
                        <p className="text-xs text-blue-700">Tickets</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
                        <span className="material-icons text-green-600">check_circle</span>
                        <p className="text-2xl font-bold text-green-900 mt-2">98%</p>
                        <p className="text-xs text-green-700">Complétés</p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                        <span className="material-icons text-purple-600">group</span>
                        <p className="text-2xl font-bold text-purple-900 mt-2">42</p>
                        <p className="text-xs text-purple-700">Utilisateurs</p>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl">
                        <span className="material-icons text-orange-600">domain</span>
                        <p className="text-2xl font-bold text-orange-900 mt-2">18</p>
                        <p className="text-xs text-orange-700">Salles</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-20 blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-20 blur-2xl animate-pulse" style={{ animationDelay: "1s" }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-icons text-3xl text-indigo-600">{stat.icon}</span>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-4">
              <span className="material-icons text-sm align-middle mr-1">star</span>
              Nos Fonctionnalités
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez une solution complète pour gérer efficacement votre établissement
              avec des outils modernes et intuitifs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100 group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <span className="material-icons text-white text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Technologies Modernes
            </h2>
            <p className="text-xl text-white/90">
              Construit avec les meilleures technologies du marché
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: "flash_on", name: "React 18" },
              { icon: "cloud_upload", name: "Spring Boot" },
              { icon: "security", name: "JWT Security" },
              { icon: "insights", name: "Analytics" },
            ].map((tech, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-4 group-hover:bg-white/20 transition-all group-hover:scale-110">
                  <span className="material-icons text-5xl text-white">{tech.icon}</span>
                </div>
                <div className="font-semibold text-lg">{tech.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-6">
                <span className="material-icons text-sm align-middle mr-1">info</span>
                À Propos
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Une Plateforme Conçue pour l'Excellence
              </h2>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                ENI Carthage Staff Management est une solution complète conçue pour simplifier
                la gestion administrative de votre établissement. Notre plateforme offre une
                interface intuitive et des outils puissants pour gérer efficacement vos
                ressources.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Développée avec les technologies les plus récentes, notre application garantit
                performance, sécurité et facilité d'utilisation pour tous vos besoins de
                gestion quotidienne.
              </p>
              <div className="space-y-4">
                {[
                  "Interface moderne et intuitive",
                  "Sécurité des données garantie",
                  "Mises à jour régulières",
                  "Support technique disponible",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="material-icons text-green-600 text-lg">check_circle</span>
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Image Placeholder with Professional Design */}
            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 rounded-3xl p-12 flex items-center justify-center min-h-[400px] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-20 h-20 bg-indigo-500 rounded-full"></div>
                  <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500 rounded-full"></div>
                  <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-pink-500 rounded-full"></div>
                </div>
                <div className="text-center relative z-10">
                  <div className="w-32 h-32 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 transform rotate-12 hover:rotate-0 transition-transform duration-300">
                    <span className="material-icons text-white" style={{ fontSize: '64px' }}>school</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    ENI Carthage
                  </h3>
                  <p className="text-gray-600 text-lg font-medium">Excellence & Innovation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <span className="material-icons text-white text-4xl">rocket_launch</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Prêt à Commencer ?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Rejoignez-nous dès aujourd'hui et transformez votre gestion administrative
            avec une solution moderne et performante
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to={LOGIN}
              className="bg-white text-indigo-600 px-10 py-4 rounded-full font-semibold hover:shadow-2xl transition-all transform hover:scale-105 text-lg flex items-center gap-2"
            >
              <span className="material-icons">login</span>
              Commencer gratuitement
            </Link>
            <a
              href="#contact"
              className="border-2 border-white text-white px-10 py-4 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition-all text-lg flex items-center gap-2"
            >
              <span className="material-icons">mail</span>
              Nous contacter
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-4">
              <span className="material-icons text-sm align-middle mr-1">contact_mail</span>
              Contactez-nous
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Une Question ?
            </h2>
            <p className="text-xl text-gray-600">
              Notre équipe est là pour vous aider
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <span className="material-icons text-indigo-600 text-sm">person</span>
                    Nom complet
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <span className="material-icons text-indigo-600 text-sm">email</span>
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <span className="material-icons text-indigo-600 text-sm">subject</span>
                  Sujet
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="Comment puis-je vous aider ?"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <span className="material-icons text-indigo-600 text-sm">message</span>
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="Votre message..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all transform hover:scale-[1.02] text-lg flex items-center justify-center gap-2"
              >
                <span className="material-icons">send</span>
                Envoyer le message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-icons text-4xl text-indigo-400">school</span>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    <span className="text-orange-500">ENI</span>
                    <span className="text-blue-500">Carthage</span>
                  </span>
                  <span className="text-xs text-gray-400 -mt-1 tracking-wide">STAFF MANAGEMENT</span>
                </div>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
                Solution complète de gestion administrative pour les établissements
                d'enseignement supérieur. Performance, sécurité et simplicité.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: 'facebook', label: 'Facebook' },
                  { icon: 'alternate_email', label: 'Twitter' },
                  { icon: 'business', label: 'LinkedIn' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-all transform hover:scale-110"
                    aria-label={social.label}
                  >
                    <span className="material-icons text-lg">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                <span className="material-icons text-indigo-400">link</span>
                Liens Rapides
              </h3>
              <ul className="space-y-3">
                {[
                  { href: '#features', label: 'Fonctionnalités' },
                  { href: '#about', label: 'À propos' },
                  { href: '#contact', label: 'Contact' },
                  { to: LOGIN, label: 'Se connecter' }
                ].map((link, index) => (
                  <li key={index}>
                    {link.to ? (
                      <Link to={link.to} className="text-gray-400 hover:text-indigo-400 transition flex items-center gap-2">
                        <span className="material-icons text-sm">arrow_forward</span>
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} className="text-gray-400 hover:text-indigo-400 transition flex items-center gap-2">
                        <span className="material-icons text-sm">arrow_forward</span>
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                <span className="material-icons text-indigo-400">contact_mail</span>
                Contact
              </h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="material-icons text-indigo-400 text-sm mt-1">location_on</span>
                  <span>ENI Carthage<br />Tunis, Tunisie</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-icons text-indigo-400 text-sm">email</span>
                  <a href="mailto:contact@enicarthage.tn" className="hover:text-indigo-400 transition">
                    contact@enicarthage.tn
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-icons text-indigo-400 text-sm">phone</span>
                  <span>+216 XX XXX XXX</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm flex items-center gap-2">
              <span className="material-icons text-xs">copyright</span>
              2025 ENI Carthage. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition text-sm flex items-center gap-1">
                <span className="material-icons text-xs">privacy_tip</span>
                Confidentialité
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition text-sm flex items-center gap-1">
                <span className="material-icons text-xs">gavel</span>
                Conditions
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

import { Logo } from "../icons/Logo";
import { Link } from "react-router-dom";
import { useState } from "react";

export function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-gradient-to-br from-purple-700 via-purple-500 via-pink-500 to-purple-300 min-h-screen w-full">
      {/* Header */}
      <header className="relative">
        <div className="flex justify-between items-center pt-4 md:pt-6 px-4 md:px-8">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-4 md:space-x-8">
            <h1 className="flex items-center text-2xl md:text-3xl lg:text-4xl text-white font-semibold">
              <Logo />
              <span className="ml-2">BrainLink</span>
            </h1>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6 lg:space-x-8">
              <a href="#features" className="text-lg lg:text-xl text-white hover:text-pink-200 transition-colors cursor-pointer">
                Features
              </a>
              <a href="#usecase" className="text-lg lg:text-xl text-white hover:text-pink-200 transition-colors cursor-pointer">
                Use Case
              </a>
              <a href="#about" className="text-lg lg:text-xl text-white hover:text-pink-200 transition-colors cursor-pointer">
                About
              </a>
            </nav>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex space-x-3 lg:space-x-4">
            <Link
              to="/signin"
              className="bg-transparent border-2 border-white text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-700 transition-colors text-sm lg:text-base"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-transparent border-2 border-white text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-700 transition-colors text-sm lg:text-base"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
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
          <div className="md:hidden bg-white/10 backdrop-blur-sm border-t border-white/20 mt-4">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-white hover:text-pink-200 transition-colors py-2">
                Features
              </a>
              <a href="#usecase" className="block text-white hover:text-pink-200 transition-colors py-2">
                Use Case
              </a>
              <a href="#about" className="block text-white hover:text-pink-200 transition-colors py-2">
                About
              </a>
              <div className="flex space-x-3 pt-4">
                <Link
                  to="/signin"
                  className="bg-transparent border-2 border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-purple-700 transition-colors text-sm flex-1 text-center"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-transparent border-2 border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-purple-700 transition-colors text-sm flex-1 text-center"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <main className="px-4 md:px-8 pt-8 md:pt-16 lg:pt-24">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-bold leading-tight space-y-2 md:space-y-4">
            <div>One Visualboard, Endless Knowledge</div>
            <div>Collect and Organize Content</div>
          </h2>

          <p className="text-lg md:text-xl lg:text-2xl text-white mt-4 md:mt-6">
            —then share your entire brain with others instantly.
          </p>

          <div className="text-base md:text-lg lg:text-xl text-white mt-6 md:mt-10 space-y-2">
            <p>Never lose track of valuable insights again. Transform scattered</p>
            <p>bookmarks into a powerful knowledge system.</p>
          </div>

          <div className="text-base md:text-lg lg:text-xl text-white mt-6 md:mt-10 space-y-2">
            <p>Access everything you've saved in seconds beautifully categorized</p>
            <p>and ready to explore. Your second brain, amplified.</p>
          </div>

          <div className="mt-8 md:mt-12">
            <Link
              to="/signup"
              className="bg-transparent border-2 border-white text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-700 transition-colors text-base md:text-lg inline-block"
            >
              Start Now
            </Link>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="mt-12 md:mt-16 lg:mt-20 px-4 md:px-8">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 md:p-8 lg:p-12 rounded-xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-8 md:mb-12 text-center">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8 text-white">
            <div className="text-center">
              <div className="text-4xl md:text-5xl mb-4">🔗</div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Smart Content Capture</h3>
              <p className="text-purple-100 text-sm md:text-base leading-relaxed">
                Instantly save and store links from YouTube videos, Twitter posts, blog articles, and AI chat conversations with just one click. No more lost bookmarks or forgotten insights.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl mb-4">⚡</div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Unified Dashboard</h3>
              <p className="text-purple-100 text-sm md:text-base leading-relaxed">
                Experience all your saved content in one beautifully designed, intuitive interface. Everything you've collected is organized, searchable, and accessible at a glance.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl mb-4">🎯</div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Category Organization</h3>
              <p className="text-purple-100 text-sm md:text-base leading-relaxed">
                Navigate effortlessly through dedicated sections for videos, tweets, blogs, and AI conversations. Each content type gets its own space while maintaining seamless cross-category search.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl mb-4">🤝</div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">ShareBrain Feature</h3>
              <p className="text-purple-100 text-sm md:text-base leading-relaxed">
                Collaborate and inspire others by sharing your entire curated knowledge dashboard. Give teammates, classmates, or colleagues instant access to your research and insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="usecase" className="mt-8 md:mt-12 px-4 md:px-8">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 md:p-8 lg:p-12 rounded-xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-8 md:mb-12 text-center">
            Use Cases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 text-white">
            <div className="text-center">
              <div className="text-4xl md:text-5xl mb-4">🎓</div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Students</h3>
              <p className="text-purple-100 text-sm md:text-base leading-relaxed">
                Build comprehensive research libraries, organize study materials across platforms, and create shareable knowledge bases for group projects. Transform scattered online resources into structured learning systems.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl mb-4">💼</div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Professionals</h3>
              <p className="text-purple-100 text-sm md:text-base leading-relaxed">
                Curate industry insights, track thought leadership content, and maintain professional development resources. Stay ahead with organized access to trends, articles, and expert conversations.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl mb-4">🧠</div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Knowledge Workers</h3>
              <p className="text-purple-100 text-sm md:text-base leading-relaxed">
                Master information curation by centralizing research from multiple sources. Create powerful content databases, track emerging ideas, and build continuous learning workflows that scale with your expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="mt-8 md:mt-12 px-4 md:px-8 pb-8 md:pb-12">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 md:p-8 lg:p-12 rounded-xl">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {/* App Details */}
              <div className="text-white">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">About BrainLink</h2>
                <div className="space-y-3 md:space-y-4 text-purple-100 text-sm md:text-base">
                  <p><strong className="text-white">Version:</strong> 1.0.0</p>
                  <p><strong className="text-white">Release Date:</strong> 2025</p>
                  <p><strong className="text-white">Platform:</strong> Web Application</p>
                  <p><strong className="text-white">Technology:</strong> React, TypeScript, Tailwind CSS</p>
                  <p className="pt-4 leading-relaxed">
                    BrainLink is a revolutionary productivity platform designed to seamlessly bridge the gap between human cognition and digital organization. Our mission is to empower users to transform their scattered thoughts into structured, actionable digital workflows.
                  </p>
                </div>
              </div>

              {/* Developer Info */}
              <div className="text-white">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">Developer</h2>
                <div className="space-y-3 md:space-y-4">
                  <p className="text-xl md:text-2xl font-semibold">Om Thote</p>
                  <p className="text-purple-100 text-sm md:text-base">Full Stack Developer & UI/UX Designer</p>
                  <p className="text-purple-100 text-sm md:text-base leading-relaxed">
                    Passionate about creating intuitive digital experiences that enhance productivity and creativity.
                  </p>

                  <div className="pt-4 md:pt-6">
                    <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Connect with me:</h3>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                      <a
                        href="https://linkedin.com/in/om-thote/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 md:px-6 md:py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm md:text-base"
                      >
                        <span>💼</span>
                        <span>LinkedIn</span>
                      </a>
                      <a
                        href="https://github.com/Om-Thote"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-800 hover:bg-gray-900 px-4 py-2 md:px-6 md:py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm md:text-base"
                      >
                        <span>🐙</span>
                        <span>GitHub</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-white/20 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-purple-100">
              <p className="text-sm md:text-base">&copy; 2025 BrainLink. All rights reserved. Built with 💗 for better productivity.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


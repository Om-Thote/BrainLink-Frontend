import { Logo } from "../icons/Logo";
import { Link } from "react-router-dom";

export function Landing() {
  return <div className="bg-gradient-to-br from-purple-700 via-purple-500 via-pink-500 to-purple-300 min-h-screen w-screen">
    <div className="flex justify-between items-center pt-6 mx-8">
      <div className="flex space-x-8">
        <h1 className="flex items-center text-4xl text-white pt-3 font-semibold"> <Logo /> BrainLink</h1>
        <a href="#features" className="text-xl text-white pt-6 hover:text-pink-200 transition-colors cursor-pointer">
          Features
        </a>
        <a href="#usecase" className="text-xl text-white pt-6 hover:text-pink-200 transition-colors cursor-pointer">
          Use Case
        </a>
        <a href="#about" className="text-xl text-white pt-6 hover:text-pink-200 transition-colors cursor-pointer">
          About
        </a>
      </div>

      <div className="flex space-x-4">
        <Link to="/signin" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-700 transition-colors">
          Sign In
        </Link>
        <Link to="/signup" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-700 transition-colors">
          Sign Up
        </Link>
      </div>
    </div>

    <div className="text-5xl text-white pt-30 mx-8 space-y-4">
      <div>One Visualboard, Endless Knowledge </div>
      <div>Collect and Organize Content</div>
    </div>
    <div className="text-xl text-white pt-4 mx-8 space-y-2">
      <div> —then share your entire brain with others instantly.</div>
    </div>
    <div className="text-xl text-white pt-10 mx-8 space-y-2">
      <div> Never lose track of valuable insights again. Transform scattered  </div>
      <div> bookmarks into a powerful knowledge system. </div>
    </div>
    <div className="text-xl text-white pt-10 mx-8 space-y-2">
      <div> Access everything you've saved in seconds beautifully categorized </div>
      <div> and ready to explore. Your second brain, amplified. </div>
    </div>
    <div className="pt-8 mx-8 ">
      <Link to="/signup" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-700 transition-colors">
        Start Now
      </Link>
    </div>
    <div id="features" className="h-96 bg-white/10 backdrop-blur-sm border border-white/20 mt-16 p-8 mx-8 rounded-xl">
      <h2 className="text-4xl text-white font-bold mb-8 text-center">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-white">
        <div className="text-center">
          <div className="text-3xl mb-4">🔗 </div>
          <h3 className="text-xl font-semibold mb-2">Smart Content Capture</h3>
          <p className="text-purple-100">Instantly save and store links from YouTube videos, Twitter posts, blog articles, and AI chat conversations with just one click. No more lost bookmarks or forgotten insights. </p>
        </div>
        <div className="text-center">
          <div className="text-3xl mb-4">⚡</div>
          <h3 className="text-xl font-semibold mb-2">Unified Dashboard</h3>
          <p className="text-purple-100">Experience all your saved content in one beautifully designed, intuitive interface. Everything you've collected is organized, searchable, and accessible at a glance.</p>
        </div>
        <div className="text-center">
          <div className="text-3xl mb-4">🎯 </div>
          <h3 className="text-xl font-semibold mb-2">Category Organization</h3>
          <p className="text-purple-100">Navigate effortlessly through dedicated sections for videos, tweets, blogs, and AI conversations. Each content type gets its own space while maintaining seamless cross-category search.</p>
        </div>
        <div className="text-center">
          <div className="text-3xl mb-4">🤝  </div>
          <h3 className="text-xl font-semibold mb-2">ShareBrain Feature </h3>
          <p className="text-purple-100">Collaborate and inspire others by sharing your entire curated knowledge dashboard. Give teammates, classmates, or colleagues instant access to your research and insights. </p>
        </div>
      </div>

    </div>
    <div id="usecase" className="h-96 bg-white/10 backdrop-blur-sm border border-white/20 mt-8 p-8 mx-8 rounded-xl">
      <h2 className="text-4xl text-white font-bold mb-8 text-center">Use Cases</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
        <div className="text-center">
          <div className="text-3xl mb-4">🎓</div>
          <h3 className="text-xl font-semibold mb-2">Students</h3>
          <p className="text-purple-100">Build comprehensive research libraries, organize study materials across platforms, and create shareable knowledge bases for group projects. Transform scattered online resources into structured learning systems.</p>
        </div>
        <div className="text-center">
          <div className="text-3xl mb-4">💼</div>
          <h3 className="text-xl font-semibold mb-2">Professionals</h3>
          <p className="text-purple-100">Curate industry insights, track thought leadership content, and maintain professional development resources. Stay ahead with organized access to trends, articles, and expert conversations.</p>
        </div>
        <div className="text-center">
          <div className="text-3xl mb-4">🧠</div>
          <h3 className="text-xl font-semibold mb-2">Knowledge Workers</h3>
          <p className="text-purple-100">Master information curation by centralizing research from multiple sources. Create powerful content databases, track emerging ideas, and build continuous learning workflows that scale with your expertise.</p>
        </div>
      </div>
    </div>
    <div id="about" className="bg-white/10 backdrop-blur-sm border border-white/20 mt-8 p-8 mx-8 rounded-xl">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* App Details */}
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-6">About BrainLink</h2>
            <div className="space-y-4 text-purple-100">
              <p><strong className="text-white">Version:</strong> 1.0.0</p>
              <p><strong className="text-white">Release Date:</strong> 2025</p>
              <p><strong className="text-white">Platform:</strong> Web Application</p>
              <p><strong className="text-white">Technology:</strong> React, TypeScript, Tailwind CSS</p>
              <p className="pt-4">
                BrainLink is a revolutionary productivity platform designed to seamlessly bridge the gap between human cognition and digital organization. Our mission is to empower users to transform their scattered thoughts into structured, actionable digital workflows.
              </p>
            </div>
          </div>
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-6">Developer</h2>
            <div className="space-y-4">
              <p className="text-xl font-semibold">Om Thote</p>
              <p className="text-purple-100">Full Stack Developer & UI/UX Designer</p>
              <p className="text-purple-100">Passionate about creating intuitive digital experiences that enhance productivity and creativity.</p>

              <div className="pt-6">
                <h3 className="text-lg font-semibold mb-3">Connect with me:</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://linkedin.com/in/om-thote/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <span>💼</span>
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com/Om-Thote"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-gray-900 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <span>🐙</span>
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-6 text-center text-purple-100">
          <p>&copy; 2025 BrainLink. All rights reserved. Built with 💗 for better productivity.</p>
        </div>
      </div>
    </div>
  </div>
}


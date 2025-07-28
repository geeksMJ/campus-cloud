import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CampusCloudLandingPage() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="font-sans text-gray-800">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">CampusCloud</h1>
          <p className="text-lg md:text-xl mb-8">
            The all-in-one cloud-based learning platform for modern campuses.
            CampusCloud empowers students, educators, and administrators with seamless access to digital learning resources, robust analytics, and administrative tools. From personalized learning paths and interactive video modules to real-time quiz evaluations and secure cloud storage, CampusCloud is the ultimate solution to revolutionize your educational experience.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a
              href="#features"
              className="bg-white text-blue-700 px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-100 transition"
            >
              Explore Features
            </a>
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-blue-700 px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-100 transition"
            >
              Login
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-gray-100 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Why CampusCloud?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard title="Seamless Learning" desc="Access modules, videos, quizzes anytime, anywhere." />
            <FeatureCard title="Admin Dashboard" desc="Track progress, manage courses and users with ease." />
            <FeatureCard title="Secure Cloud Storage" desc="All content stored securely and easily accessible." />
            <FeatureCard title="Scalable Infrastructure" desc="Built to support thousands of users without performance loss." />
            <FeatureCard title="Mobile Friendly" desc="Learn and manage on the go with full mobile responsiveness." />
            {/* <FeatureCard title="Customizable Plans" desc="Tailor features to match your institution's specific needs." /> */}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">What Users Say</h2>
          <blockquote className="italic text-lg mb-4">
            “CampusCloud made it super easy to manage and complete our LMS needs at college.”
          </blockquote>
          <p className="font-semibold">— Aaryan, Student & Developer</p>
        </div>
      </section>

      {/* Call to Action */}
      <footer className="bg-blue-700 text-white py-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to transform your campus?</h3>
          <p className="mb-6">Start using CampusCloud for smarter education today.</p>
          <a
            href="#"
            className="bg-white text-blue-700 px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-100 transition"
          >
            Get Started
          </a>
        </div>
      </footer>

      {/* Modal (Optional if kept) */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Login / Sign Up</h2>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
              />
              <button
                type="submit"
                className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition"
              >
                Submit
              </button>
            </form>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 text-blue-700 underline block text-center"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

import React from "react";

const About = () => {
  return (
    <div className="bg-[#0f0f0f] text-white px-6 py-20">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto text-center mb-20">
        <h1 className="text-5xl font-bold text-gold mb-6">
          Welcome to BookNest
        </h1>
        <p className="text-white/80 text-lg leading-8">
          In a fast-moving digital world, we bring back the magic of real pages,
          the scent of paper, and the joy of creativity.
          <span className="text-gold"> BookNest </span> is more than an online
          store — it’s a home for readers, thinkers, and creators.
        </p>
      </section>

      {/* Our Story */}
      <section className="max-w-6xl mx-auto mb-24">
        <h2 className="text-3xl font-semibold text-gold mb-6 text-center">
          📚 Our Story
        </h2>
        <div className="text-white/85 space-y-6 text-lg leading-8">
          <p>
            BookNest was born from a simple realization — finding the right
            books, stationery, and academic tools shouldn’t be difficult. As
            students and creatives ourselves, we struggled to find quality
            materials that were both affordable and inspiring.
          </p>
          <p>
            We started BookNest with a mission to change that. What began as a
            small side hustle has now grown into a trusted platform serving
            thousands of students, readers, and artists across the country.
          </p>
          <p>
            Our journey has been fueled by one core belief:{" "}
            <span className="text-gold font-medium">
              Knowledge is freedom, and creativity is power.
            </span>{" "}
            And every pen, notebook, and story we deliver is a step toward that
            freedom.
          </p>
        </div>
      </section>

      {/* Our Mission, Vision, Values */}
      <section className="bg-[#1a1a1a] rounded-2xl p-10 max-w-6xl mx-auto mb-24 border border-gray-700 shadow">
        <h2 className="text-3xl font-semibold text-center text-gold mb-10">
          🎯 Our Philosophy
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center text-white/85">
          <div>
            <h3 className="text-xl font-bold text-gold mb-3">Mission</h3>
            <p>
              To empower learning and creativity by delivering top-quality books
              and stationery to every corner of Pakistan.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gold mb-3">Vision</h3>
            <p>
              To become Pakistan’s most trusted and loved platform for academic
              and creative resources.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gold mb-3">Core Values</h3>
            <p>
              Trust, accessibility, affordability, and a deep passion for
              knowledge and design.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="max-w-6xl mx-auto mb-24">
        <h2 className="text-3xl font-semibold text-center text-gold mb-12">
          💡 Why Choose BookNest?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              icon: "🚀",
              title: "Nationwide Delivery",
              desc: "From Karachi to Skardu — we ship everywhere, fast.",
            },
            {
              icon: "🖋️",
              title: "Premium Stationery",
              desc: "Pens, planners, highlighters, journals — all handpicked with quality in mind.",
            },
            {
              icon: "📖",
              title: "Curated Book Selection",
              desc: "Bestsellers, academic guides, and rare gems updated regularly.",
            },
            {
              icon: "💳",
              title: "Safe & Secure Payments",
              desc: "SSL-encrypted payments via trusted gateways.",
            },
            {
              icon: "🎓",
              title: "For Students & Professionals",
              desc: "Whether you're studying, planning, or sketching — we’ve got tools for you.",
            },
            {
              icon: "❤️",
              title: "Community First",
              desc: "We’re here to build relationships, not just sales.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#1a1a1a] rounded-xl border border-gray-700 p-6 shadow hover:shadow-lg transition text-center"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h4 className="text-xl text-gold font-semibold mb-2">
                {item.title}
              </h4>
              <p className="text-white/75">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-gold mb-4">
          Join Our Journey 📦
        </h3>
        <p className="text-white/80 text-lg leading-8">
          Whether you’re chasing grades, crafting art, or collecting stories —{" "}
          <span className="text-gold">BookNest</span> is here to support your
          path. We’re more than a business — we’re your partner in learning,
          creating, and dreaming.
        </p>
      </section>
    </div>
  );
};

export default About;

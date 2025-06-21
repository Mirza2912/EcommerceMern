// import React from "react";

// const About = () => {
//   return (
//     <div className="bg-[#0f0f0f] text-white px-6 py-20">
//       {/* Hero Section */}
//       <section className="max-w-5xl mx-auto text-center mb-20">
//         <h1 className="text-5xl font-bold text-gold mb-6">
//           Welcome to BookNest
//         </h1>
//         <p className="text-white/80 text-lg leading-8">
//           In a fast-moving digital world, we bring back the magic of real pages,
//           the scent of paper, and the joy of creativity.
//           <span className="text-gold"> BookNest </span> is more than an online
//           store — it’s a home for readers, thinkers, and creators.
//         </p>
//       </section>

//       {/* Our Story */}
//       <section className="max-w-6xl mx-auto mb-24">
//         <h2 className="text-3xl font-semibold text-gold mb-6 text-center">
//           📚 Our Story
//         </h2>
//         <div className="text-white/85 space-y-6 text-lg leading-8">
//           <p>
//             BookNest was born from a simple realization — finding the right
//             books, stationery, and academic tools shouldn’t be difficult. As
//             students and creatives ourselves, we struggled to find quality
//             materials that were both affordable and inspiring.
//           </p>
//           <p>
//             We started BookNest with a mission to change that. What began as a
//             small side hustle has now grown into a trusted platform serving
//             thousands of students, readers, and artists across the country.
//           </p>
//           <p>
//             Our journey has been fueled by one core belief:{" "}
//             <span className="text-gold font-medium">
//               Knowledge is freedom, and creativity is power.
//             </span>{" "}
//             And every pen, notebook, and story we deliver is a step toward that
//             freedom.
//           </p>
//         </div>
//       </section>

//       {/* Our Mission, Vision, Values */}
//       <section className="bg-[#1a1a1a] rounded-2xl p-10 max-w-6xl mx-auto mb-24 border border-gray-700 shadow">
//         <h2 className="text-3xl font-semibold text-center text-gold mb-10">
//           🎯 Our Philosophy
//         </h2>
//         <div className="grid md:grid-cols-3 gap-8 text-center text-white/85">
//           <div>
//             <h3 className="text-xl font-bold text-gold mb-3">Mission</h3>
//             <p>
//               To empower learning and creativity by delivering top-quality books
//               and stationery to every corner of Pakistan.
//             </p>
//           </div>
//           <div>
//             <h3 className="text-xl font-bold text-gold mb-3">Vision</h3>
//             <p>
//               To become Pakistan’s most trusted and loved platform for academic
//               and creative resources.
//             </p>
//           </div>
//           <div>
//             <h3 className="text-xl font-bold text-gold mb-3">Core Values</h3>
//             <p>
//               Trust, accessibility, affordability, and a deep passion for
//               knowledge and design.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Why Choose Us Section */}
//       <section className="max-w-6xl mx-auto mb-24">
//         <h2 className="text-3xl font-semibold text-center text-gold mb-12">
//           💡 Why Choose BookNest?
//         </h2>
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
//           {[
//             {
//               icon: "🚀",
//               title: "Nationwide Delivery",
//               desc: "From Karachi to Skardu — we ship everywhere, fast.",
//             },
//             {
//               icon: "🖋️",
//               title: "Premium Stationery",
//               desc: "Pens, planners, highlighters, journals — all handpicked with quality in mind.",
//             },
//             {
//               icon: "📖",
//               title: "Curated Book Selection",
//               desc: "Bestsellers, academic guides, and rare gems updated regularly.",
//             },
//             {
//               icon: "💳",
//               title: "Safe & Secure Payments",
//               desc: "SSL-encrypted payments via trusted gateways.",
//             },
//             {
//               icon: "🎓",
//               title: "For Students & Professionals",
//               desc: "Whether you're studying, planning, or sketching — we’ve got tools for you.",
//             },
//             {
//               icon: "❤️",
//               title: "Community First",
//               desc: "We’re here to build relationships, not just sales.",
//             },
//           ].map((item, idx) => (
//             <div
//               key={idx}
//               className="bg-[#1a1a1a] rounded-xl border border-gray-700 p-6 shadow hover:shadow-lg transition text-center"
//             >
//               <div className="text-4xl mb-3">{item.icon}</div>
//               <h4 className="text-xl text-gold font-semibold mb-2">
//                 {item.title}
//               </h4>
//               <p className="text-white/75">{item.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Final CTA */}
//       <section className="text-center max-w-4xl mx-auto">
//         <h3 className="text-2xl font-bold text-gold mb-4">
//           Join Our Journey 📦
//         </h3>
//         <p className="text-white/80 text-lg leading-8">
//           Whether you’re chasing grades, crafting art, or collecting stories —{" "}
//           <span className="text-gold">BookNest</span> is here to support your
//           path. We’re more than a business — we’re your partner in learning,
//           creating, and dreaming.
//         </p>
//       </section>
//     </div>
//   );
// };

// export default About;

import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="w-full ">
      {/* Hero Section */}
      <section className="w-full text-white h-[450px] flex items-center justify-center flex-col bg-[url('D:\WEB\MERN\ECOMMERCE\EcommerceMern\frontend\src\assets\About.avif')] bg-cover bg-center bg-no-repeat px-6 text-center">
        <div className="bg-black/50 w-full h-full flex items-center justify-center flex-col px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Your one-stop shop for Books, Stationery & Creativity Essentials
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="my-16 px-6 max-w-5xl mx-auto text-center text-white">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white/90">
          Our Story
        </h2>
        <p className="text-lg text-white/70 leading-relaxed">
          Founded in 2025, we started with a simple idea — to make quality books
          and premium stationery accessible to everyone. Whether you're a
          student, a teacher, an artist, or a working professional, we believe
          in fueling your ideas and ambitions through the power of education and
          creativity. Our passion for reading and writing tools drives us to
          bring the best products right to your door.
        </p>
      </section>

      {/* What We Offer */}
      <section className=" mb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 teaxt-4xl sm:text-5xl text-white/90">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              "Books for All Ages",
              "Stationery & Art Supplies",
              "Fast Delivery Nationwide",
              "Easy & Secure Online Shopping",
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-black/60 backdrop-blur-lg border border-gray-700 shadow-md  p-6 rounded-lg  hover:shadow-lg transition"
              >
                <p className="text-lg font-medium text-white/70">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 teaxt-4xl sm:text-5xl text-white/90">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: "📚", title: "Wide Selection" },
              { icon: "💰", title: "Affordable Prices" },
              { icon: "🚚", title: "Fast Delivery" },
              { icon: "🔒", title: "Secure Checkout" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-black/60 backdrop-blur-lg border border-gray-700 shadow-md p-6 rounded-lg flex flex-col items-center justify-center hover:shadow-lg"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <p className="text-lg font-semibold text-white/70">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-black/60  text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white/90">
          Explore Our Products
        </h2>
        <p className="text-lg mb-8 text-white/70">
          Ready to stock up on your favorites? Visit our shop now!
        </p>
        <Link
          to="/products"
          className="border rounded-full border-[#ffc253] hover:bg-[#ffce53] hover:border-[#ffce53]  text-white font-bold py-3 px-8 transition duration-200"
        >
          Shop Now
        </Link>
      </section>
    </div>
  );
};

export default About;

import React, { useEffect } from "react";
import FloatingInput from "../Components/Input/FloatingInput";
import { useState } from "react";
import { BiSolidFace } from "react-icons/bi";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiMessage3Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { createNewContact } from "../store/ContactSlice/contactSliceReducer";
import { Link } from "react-router-dom";

const Contact = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { createContactMessage } = useSelector((state) => state.contact);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createNewContact(form));
  };

  useEffect(() => {
    if (user) {
      form.name = user?.data?.name;
      form.email = user?.data?.email;
    }
  }, [user]);

  useEffect(() => {
    if (createContactMessage) {
      form.subject = "";
      form.message = "";
    }
  }, [createContactMessage]);
  return (
    <div className="w-full ">
      {/* Hero Section */}
      <section className="w-full text-white h-[450px] flex items-center justify-center flex-col bg-[url('D:\WEB\MERN\ECOMMERCE\EcommerceMern\frontend\src\assets\About.avif')] bg-cover bg-center bg-no-repeat px-6 text-center">
        <div className="bg-black/50 w-full h-full flex items-center justify-center flex-col px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-2xl mx-auto">
            We’d love to hear from you. Reach out anytime!
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="mt-20 mb-10 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2">
        {/* Contact Info */}
        <div>
          <h2 className="text-4xl text-white/90 sm:text-5xl font-bold mb-6">
            Our Information
          </h2>
          <div className="space-y-4 text-white/70">
            <p>
              <span className="font-semibold text-lg">📍 Address:</span>
              <br />
              Governmetn College University Failsalabad
            </p>
            <p>
              <span className="font-semibold text-lg">📞 Phone:</span>
              <br />
              +92 309 5226400
            </p>
            <p>
              <span className="font-semibold">📧 Email:</span>
              <br />
              mirzatayyab2912@gmail.com
            </p>
            <p>
              <span className="font-semibold">🕒 Hours:</span>
              <br />
              Mon – Sat: 9:00 AM – 7:00 PM
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white/90 ">
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FloatingInput
              label="Name"
              name="name"
              type="text"
              value={form.name}
              icon={BiSolidFace}
            />
            <FloatingInput
              label="Email"
              name="email"
              type="email"
              value={form.email}
              icon={MdOutlineMailOutline}
            />
            <FloatingInput
              label="Subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={handleChange}
              icon={RiMessage3Line}
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              name="message"
              value={form.message}
              onChange={handleChange}
            ></textarea>
            <button
              type="submit"
              className="border rounded-full border-[#ffc253] hover:bg-[#ffce53] hover:border-[#ffce53]  text-white font-bold py-3 px-8 transition duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
      <section className="w-full h-80">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.9252985032304!2d73.06651477544675!3d31.416184174261783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392242be7e858b6d%3A0xfbc5c05c0231208e!2sGCUF%20Rd%2C%20Gurunanakpura%2C%20Faisalabad%2C%20Pakistan!5e0!3m2!1sen!2s!4v1750523195263!5m2!1sen!2s"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
          className="border-0 w-full h-full"
        ></iframe>
      </section>

      <section className="py-20 px-6 bg-black/60  text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white/90">
          Need Something?
        </h2>
        <p className="text-lg mb-8 text-white/70">
          Browse our best-selling books and stationery now.
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

export default Contact;

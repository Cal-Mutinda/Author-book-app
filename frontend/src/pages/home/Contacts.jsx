import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiMail, FiPhone, FiMapPin, FiTwitter, FiFacebook, FiInstagram, FiSend } from 'react-icons/fi'; // Import icons from react-icons/fi

const Contacts = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' or 'error'

  const onSubmit = async (data) => {
    setSubmissionStatus(null); // Reset status on new submission
    try {
      // Simulate API call for sending email
      // In a real application, you would send this data to your backend
      console.log("Contact form data:", data);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
      setSubmissionStatus('success');
      reset(); // Clear form fields on success
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmissionStatus('error');
    }
  };

  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  // Animation variants for form fields
  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Header Section */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="bg-gradient-to-r from-blue-700 to-purple-700 p-8 text-white text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-md">
            Connect with the Author
          </h1>
          <p className="text-lg md:text-xl font-light opacity-90">
            I'd love to hear from you. Feel free to reach out!
          </p>
        </motion.div>

        {/* Main Content: Contact Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-12">
          {/* Contact Information Section */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-8 text-gray-700"
          >
            <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 pb-3 mb-6">
              Get in Touch
            </h2>
            <div className="flex items-center space-x-4">
              {/* Mail Icon */}
              <FiMail className="text-blue-600 w-8 h-8 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Email Me</h3>
                <a href="mailto:author@example.com" className="text-blue-600 hover:underline">
                  author@example.com
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Phone Icon */}
              <FiPhone className="text-purple-600 w-8 h-8 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Call Me (Optional)</h3>
                <a href="tel:+1234567890" className="text-purple-600 hover:underline">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Map Pin Icon */}
              <FiMapPin className="text-pink-600 w-8 h-8 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Location</h3>
                <p>Nairobi, Kenya</p>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-lg mb-4">Follow Me</h3>
              <div className="flex space-x-6">
                <a href="https://twitter.com/yourauthorhandle" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400 transition-colors">
                  {/* Twitter Icon */}
                  <FiTwitter className="w-8 h-8" />
                </a>
                <a href="https://facebook.com/yourauthorpage" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors">
                  {/* Facebook Icon */}
                  <FiFacebook className="w-8 h-8" />
                </a>
                <a href="https://instagram.com/yourauthorprofile" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-500 transition-colors">
                  {/* Instagram Icon */}
                  <FiInstagram className="w-8 h-8" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form Section */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="bg-gray-50 p-8 rounded-xl shadow-inner"
          >
            <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 pb-3 mb-6">
              Send a Message
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <motion.div variants={fieldVariants}>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="John Doe"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
              </motion.div>

              <motion.div variants={fieldVariants} transition={{ delay: 0.1 }}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </motion.div>

              <motion.div variants={fieldVariants} transition={{ delay: 0.2 }}>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  {...register("subject", { required: "Subject is required" })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Regarding your new book..."
                />
                {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>}
              </motion.div>

              <motion.div variants={fieldVariants} transition={{ delay: 0.3 }}>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  {...register("message", { required: "Message is required" })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Type your message here..."
                ></textarea>
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
              </motion.div>

              <motion.div variants={fieldVariants} transition={{ delay: 0.4 }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm
                    text-base font-medium text-white bg-blue-600 hover:bg-blue-700
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                    transition-colors duration-300
                    ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}
                  `}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      {/* Send Icon */}
                      <FiSend className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </motion.div>

              {submissionStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-center text-green-600 font-medium"
                >
                  Thank you for your message! I'll get back to you soon.
                </motion.p>
              )}
              {submissionStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-center text-red-600 font-medium"
                >
                  Failed to send message. Please try again later.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;

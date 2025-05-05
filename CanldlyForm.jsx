"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  Check,
  X,
} from "lucide-react";

const BookDemoButton = ({ name }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    phoneNumber: "",
    message: "",
    date: "",
    time: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Available dates - dynamically generate next 14 days
  const availableDates = Array.from({ length: 14 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return date.toISOString().split("T")[0];
  });

  // Time slots
  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Here you would send the data to your backend
    console.log("Form data to send to backend:", formData);
    setIsSubmitted(true);
  };

  const nextStep = () => {
    setFormStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setFormStep((prev) => prev - 1);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    document.body.style.overflow = "";
    // Reset form if closed without submitting
    if (!isSubmitted) {
      setFormStep(0);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormStep(0);
    setFormData({
      name: "",
      email: "",
      companyName: "",
      phoneNumber: "",
      message: "",
      date: "",
      time: "",
    });
  };

  const isDateTimeSelected = formData.date && formData.time;
  const isPersonalInfoComplete = formData.name && formData.email;

  return (
    <>
      {/* Button to trigger */}
      <button
        className="text-m rounded-[5px] flex justify-center items-center before:ease relative h-12 w-40 overflow-hidden border border-[#3b82f6] bg-[#5F64FF] text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40"
        onClick={openPopup}
      >
        {name || "Book a Demo"}
      </button>

      {/* Custom Popup */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
          style={{
            width: "100vw",
            height: "100vh",
            paddingTop: "20px",
          }}
        >
          <div
            className="relative bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            style={{
              padding: "40px 20px 20px 20px",
            }}
          >
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="fixed top-8 mr-10  w-8 h-8 flex items-center justify-center text-xl text-black bg-white rounded-full shadow-md z-[1001]"
            >
              <X size={18} color="black" />
            </button>

            {/* Form Content */}
            <div className="w-full">
              {!isSubmitted ? (
                <>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Book Your Demo
                    </h2>
                    <p className="text-gray-600">
                      Schedule a personalized demo with our team
                    </p>
                  </div>

                  {/* Progress Indicators */}
                  <div className="flex items-center justify-between mb-8 px-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${
                          formStep >= 0
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        1
                      </div>
                      <span className="text-xs mt-1">Date & Time</span>
                    </div>
                    <div
                      className={`h-0.5 flex-1 mx-1 ${
                        formStep >= 1 ? "bg-blue-500" : "bg-gray-200"
                      }`}
                    ></div>
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${
                          formStep >= 1
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        2
                      </div>
                      <span className="text-xs mt-1">Your Info</span>
                    </div>
                    <div
                      className={`h-0.5 flex-1 mx-1 ${
                        formStep >= 2 ? "bg-blue-500" : "bg-gray-200"
                      }`}
                    ></div>
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${
                          formStep >= 2
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        3
                      </div>
                      <span className="text-xs mt-1">Details</span>
                    </div>
                  </div>

                  {/* Step 1: Date & Time Selection */}
                  {formStep === 0 && (
                    <div className="space-y-4 px-2">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">
                        Select Date & Time
                      </h3>

                      <div className="space-y-4">
                        <div className="block text-gray-700 text-sm font-medium">
                          <div className="flex items-center mb-2">
                            <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                            <span>Select Date</span>
                          </div>
                          <select
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option className="fill-black" value="">
                              Choose a date
                            </option>
                            {availableDates.map((date) => (
                              <option key={date} value={date}>
                                {new Date(date).toLocaleDateString("en-US", {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="block text-gray-700 text-sm font-medium">
                          <div className="flex items-center mb-2">
                            <Clock className="w-4 h-4 mr-2 text-blue-500" />
                            <span>Select Time</span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {timeSlots.map((time) => (
                              <button
                                type="button"
                                key={time}
                                onClick={() =>
                                  handleChange({
                                    target: { name: "time", value: time },
                                  })
                                }
                                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                                  formData.time === time
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 flex justify-end">
                        <button
                          type="button"
                          onClick={nextStep}
                          disabled={!isDateTimeSelected}
                          className="px-4 py-2 bg-blue-500 text-white rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Personal Information */}
                  {formStep === 1 && (
                    <div className="space-y-4 px-2">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">
                        Your Information
                      </h3>

                      <div className="space-y-4">
                        <div className="block text-gray-700 text-sm font-medium">
                          <div className="flex items-center mb-2">
                            <User className="w-4 h-4 mr-2 text-blue-500" />
                            <span>Full Name</span>
                          </div>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Name"
                          />
                        </div>

                        <div className="block text-gray-700 text-sm font-medium">
                          <div className="flex items-center mb-2">
                            <Mail className="w-4 h-4 mr-2 text-blue-500" />
                            <span>Email Address</span>
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Email"
                          />
                        </div>

                        <div className="block text-gray-700 text-sm font-medium">
                          <div className="flex items-center mb-2">
                            <Phone className="w-4 h-4 mr-2 text-blue-500" />
                            <span>Phone Number (Optional)</span>
                          </div>
                          <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Number"
                          />
                        </div>
                      </div>

                      <div className="pt-4 flex justify-between">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={nextStep}
                          disabled={!isPersonalInfoComplete}
                          className="px-4 py-2 bg-blue-500 text-white rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Additional Information */}
                  {formStep === 2 && (
                    <div className="space-y-4 px-2">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">
                        Additional Information
                      </h3>

                      <div className="space-y-3">
                        <div className="block text-gray-700 text-sm font-medium">
                          <div className="flex items-center mb-2">
                            <MessageSquare className="w-4 h-4 mr-2 text-blue-500" />
                            <span>What would you like to discuss?</span>
                          </div>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                            placeholder="Let us know your specific requirements or questions..."
                          />
                        </div>
                      </div>

                      {/* Confirmation Details */}
                      <div className="mt-6 text-black bg-gray-50 p-4 rounded-md">
                        <h4 className="text-md font-medium text-gray-800 mb-2">
                          Your booking details:
                        </h4>
                        <div className="text-sm text-gray-900">
                          <p className="text-gray-900">
                            <span className="font-medium text-gray-900">
                              Date:
                            </span>{" "}
                            {formData.date
                              ? new Date(formData.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    weekday: "long",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )
                              : ""}
                          </p>
                          <p className="text-gray-900">
                            <span className="font-medium text-gray-900">
                              Time:
                            </span>{" "}
                            {formData.time}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 flex justify-between">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={handleSubmit}
                          className="px-4 py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition-colors flex items-center space-x-2"
                        >
                          <span>Confirm Booking</span>
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-6">
                    <Check className="h-8 w-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Demo Successfully Scheduled!
                  </h2>
                  <p className="text-gray-600 mb-4">
                    We've booked your demo for{" "}
                    {formData.date
                      ? new Date(formData.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })
                      : ""}{" "}
                    at {formData.time}.
                  </p>
                  <p className="text-gray-600 mb-8">
                    A confirmation email has been sent to{" "}
                    <span className="font-medium text-gray-900">
                      {formData.email}
                    </span>
                    . Our team will contact you shortly with additional details.
                  </p>
                  <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 justify-center">
                    <button
                      onClick={closePopup}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300 transition-colors"
                    >
                      Close
                    </button>
                    <button
                      onClick={resetForm}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition-colors"
                    >
                      Book Another Demo
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookDemoButton;

import { useState } from "react";
import { PiPhoneCallLight } from "react-icons/pi";
import { GoMail } from "react-icons/go";
import emailjs from "emailjs-com";
import useUser from "../../customHooks/useUser";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [message, setmessage] = useState("");

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    try {
      await emailjs.send(
        "service_cquri92",
        "template_w5cp75d",
        {
          to_name: "QuickBizz Administrator",
          from_name: name,
          email,
          phone,
          message,
        },
        "Qxy8nVz2BFLnS-41U"
      );
      alert("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Error sending email");
    }
  };

  return (
    <div className="flex gap-10 p-16">
      <div className="shadow-lg rounded-md">
        <div className="flex flex-col p-10">
          <div className="border-b border-gray-400 pb-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-primary text-white rounded-full">
                <PiPhoneCallLight size={20} />
              </div>
              <h2 className="font-semibold text-xl text-primary m-0">
                Call to us
              </h2>
            </div>
            <p className="mb-5">We are available 24/7, 7 days a week.</p>
            <p>Phone: +91 - 9191919191</p>
          </div>
          <div className="pt-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-primary text-white rounded-full">
                <GoMail />
              </div>
              <h2 className="font-semibold text-xl text-primary m-0">
                Write to us
              </h2>
            </div>
            <p className="mb-5">
              Fill out our form and we will contact you within 24 hours.
            </p>
            <p>Emails: help@QuickBizz.com</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-7 shadow-lg rounded-md flex-grow p-10">
        <div className="flex gap-7">
          <div className="flex flex-col w-full">
            <label className="text-sm mb-1" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="py-2 text-sm px-2 bg-gray-100 rounded-sm text-gray-600 focus:outline-1 focus:outline-primary"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-sm mb-1" htmlFor="email">
              Email:
            </label>
            <input
              type="text"
              id="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="py-2 text-sm px-2 bg-gray-100 rounded-sm text-gray-600 focus:outline-1 focus:outline-primary"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-sm mb-1" htmlFor="phone">
              Phone:
            </label>
            <input
              type="text"
              id="phone"
              placeholder="Your phone"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
              className="py-2 text-sm px-2 bg-gray-100 rounded-sm text-gray-600 focus:outline-1 focus:outline-primary"
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <label className="text-sm mb-1" htmlFor="message">
            Message:
          </label>
          <textarea
            rows={10}
            id="message"
            placeholder="Your message"
            value={message}
            onChange={(e) => setmessage(e.target.value)}
            className="py-2 text-sm px-2 bg-gray-100 rounded-sm text-gray-600 focus:outline-1 focus:outline-primary"
          />
        </div>
        <button
          className="px-7 py-3 bg-primary text-white w-max ml-auto rounded-sm hover:opacity-90 active:opacity-70"
          onClick={handleSubmit}
        >
          Send message
        </button>
      </div>
    </div>
  );
};

export default Contact;

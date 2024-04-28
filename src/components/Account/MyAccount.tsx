// components/MyAccount.js

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { baseUrl } from "../../axios.config";
import useUser from "../../customHooks/useUser";

interface MyAccountProps {}

const MyAccount: React.FC<MyAccountProps> = () => {
  // State for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { userId } = useContext(UserContext);
  const { user } = useUser(userId);

  useEffect(() => {
    if (user) {
      if (user.address) {
        setAddress(user.address);
      }
      if (user.email) {
        setEmail(user.email);
      }
      if (user.first_name) {
        setFirstName(user.first_name);
      }
      if (user.last_name) {
        setLastName(user.last_name);
      }
    }
  }, [user?._id]);

  // Function to handle form submission
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    // Logic to handle form submission

    if (!userId) return;

    try {
      await axios.put(baseUrl + "/account/update", {
        user_id: userId,
        first_name: firstName,
        last_name: lastName,
        email_or_phone: email,
        address: address,
      });
    } catch (e) {
      console.error(e);
    }
    try {
      if (currentPassword && newPassword && confirmNewPassword) {
        await axios.put(baseUrl + "/account/change_password", {
          user_id: userId,
          current_password: currentPassword,
          new_password: newPassword,
          confirm_new_password: confirmNewPassword,
        });
      }
    } catch (e) {
      console.error(e);
    }
    console.log("Form submitted!");
  };

  return (
    <div>
      <h2 className="font-medium text-primary">Edit Your Profile</h2>
      <form onSubmit={handleSubmit} className="grid gap-7">
        <div className="flex items-center gap-5">
          <div className="flex flex-col w-full">
            <label className="text-sm mb-1" htmlFor="firstName">
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Rimel"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="py-2 text-sm px-2 bg-gray-100 rounded-sm text-gray-600 focus:outline-1 focus:outline-primary"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-sm mb-1" htmlFor="lastName">
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="John"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="py-2 text-sm px-2 bg-gray-100 rounded-sm text-gray-600 focus:outline-1 focus:outline-primary"
            />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex flex-col w-full">
            <label className="text-sm mb-1" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="rimel1111@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="py-2 text-sm px-2 bg-gray-100 rounded-sm text-gray-600 focus:outline-1 focus:outline-primary"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-sm mb-1" htmlFor="address">
              Address:
            </label>
            <input
              id="address"
              placeholder="Kingston, 5236, United State"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="py-2 text-sm px-2 bg-gray-100 rounded-sm text-gray-600 focus:outline-1 focus:outline-primary"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-sm mb-1" htmlFor="currentPassword">
            Current Password:
          </label>
          <input
            type="password"
            id="currentPassword"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="py-2 text-sm px-2 bg-gray-100 rounded-sm text-gray-600 focus:outline-1 focus:outline-primary"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm mb-1" htmlFor="newPassword">
            New Password:
          </label>
          <input
            type="password"
            id="newPassword"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="py-2 text-sm px-2 bg-gray-100 rounded-sm text-gray-600 focus:outline-1 focus:outline-primary"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm mb-1" htmlFor="confirmNewPassword">
            Confirm New Password:
          </label>
          <input
            placeholder="Confirm New Password"
            type="password"
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="py-2 text-sm px-2 bg-gray-100 rounded-sm text-gray-600 focus:outline-1 focus:outline-primary"
          />
        </div>
        <button
          className="bg-primary py-2 px-7 text-white rounded-sm hover:opacity-90 active:opacity-70 w-[fit-content] ml-auto"
          type="submit"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default MyAccount;

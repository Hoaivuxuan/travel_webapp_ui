import React from "react";
import { toast } from "react-toastify";

const Notification = () => {
  const notifySuccess = (message: string) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      pauseOnFocusLoss: true,
    });
  };

  const notifyWarning = (message: string) => {
    toast.warn(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      pauseOnFocusLoss: true,
    });
  };

  return {
    notifySuccess,
    notifyWarning,
  };
};

export default Notification;

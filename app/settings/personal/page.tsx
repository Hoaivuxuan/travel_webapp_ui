"use client";

import { Input, Button, Avatar, Form, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notification from "@/components/Notification";

type UserInfoKeys = keyof UserData;
interface UserData {
  id: number;
  first_name: string | null;
  last_name: string | null;
  name: string;
  email: string;
  phone_number: string | null;
  date_of_birth: string | null;
  address: string | null;
  avatar: string | null;
}

const { notifySuccess, notifyWarning } = Notification();

const PersonalInfoPage = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [values, setValues] = useState<UserData | null>(null);
  const [avatar, setAvatar] = useState<string | null>("");
  const [loading, setLoading] = useState(false);
  const [newAvatarFile, setNewAvatarFile] = useState<File | null>(null);

  const personalInfo = [
    { label: "Họ", key: "last_name" as UserInfoKeys },
    { label: "Tên", key: "first_name" as UserInfoKeys },
    { label: "Username", key: "name" as UserInfoKeys },
    { label: "Email", key: "email" as UserInfoKeys, verified: true },
    { label: "Điện thoại", key: "phone_number" as UserInfoKeys },
    { label: "Ngày sinh", key: "date_of_birth" as UserInfoKeys },
    { label: "Địa chỉ", key: "address" as UserInfoKeys },
  ];

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const bearerToken = localStorage.getItem("token");
    const fetchUserData = async () => {
      if (!userId || !bearerToken) return;
      try {
        const response = await fetch(
          `http://localhost:8080/users/details?id=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          },
        );

        if (response.ok) {
          const userData: UserData = await response.json();
          setUser(userData);
          setValues(userData);
          setAvatar(userData.avatar);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleUploadToCloudinary = async (file: File) => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
    );
    formData.append(
      "cloud_name",
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
    );

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
      );
      setAvatar(response.data.secure_url);
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
      setNewAvatarFile(file);
    }
  };

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
  };

  const handleInputChange = (key: UserInfoKeys, value: string) => {
    if (values) {
      setValues({ ...values, [key]: value });
    }
  };

  const handleSaveClick = async () => {
    let isAvatarChanged = false;
    let isUserDataChanged = false;

    if (newAvatarFile) {
      isAvatarChanged = true;
    }

    const updatedData: Partial<UserData> = {
      name: values?.name,
      first_name: values?.first_name,
      last_name: values?.last_name,
      phone_number: values?.phone_number,
      address: values?.address,
      date_of_birth: values?.date_of_birth,
      avatar: values?.avatar,
    };

    if (isAvatarChanged || isUserDataChanged) {
      setLoading(true);
    }

    if (newAvatarFile && isAvatarChanged) {
      const avatarUrl = await handleUploadToCloudinary(newAvatarFile);
      if (avatarUrl) {
        updatedData.avatar = avatarUrl;
        window.location.reload();
      }
    }

    isUserDataChanged = Object.keys(updatedData).some(
      (key) =>
        updatedData[key as keyof UserData] !== user?.[key as keyof UserData],
    );

    if (isUserDataChanged) {
      const bearerToken = localStorage.getItem("token");
      if (!bearerToken) return;

      try {
        const response = await fetch(`http://localhost:8080/users`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
          body: JSON.stringify(updatedData),
        });

        if (response.ok) {
          const updatedUserData = await response.json();
          notifySuccess("Thông tin người dùng đã được cập nhật.");
          localStorage.setItem("user", JSON.stringify(updatedUserData));
          setUser(updatedUserData);
          setEditingIndex(null);
        } else {
          notifyWarning("Cập nhật thất bại");
        }
      } catch (error) {
        notifyWarning("Error updating user data");
      }
    }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="p-4 bg-white border rounded-lg hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-center mb-8">
          <h1 className="text-2xl font-bold flex-grow">Thông tin cá nhân</h1>
          <div className="relative">
            <Avatar
              src={avatar || ""}
              size={100}
              onClick={() => document.getElementById("avatar-upload")?.click()}
              className="cursor-pointer"
            />
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="absolute opacity-0 cursor-pointer inset-0"
            />
          </div>
        </div>
        <div className="divide-y">
          <div className="py-4 flex items-center justify-between">
            <div className="grid grid-cols-11 gap-2 items-center w-full">
              <div className="col-span-2 font-semibold">Họ Tên</div>
              {editingIndex === 0 ? (
                <div className="col-span-8 flex gap-2 w-full">
                  <Input
                    value={values?.first_name || ""}
                    onChange={(e) =>
                      handleInputChange("first_name", e.target.value)
                    }
                    className="mt-1 border rounded w-full"
                    placeholder="Tên"
                  />
                  <Input
                    value={values?.last_name || ""}
                    onChange={(e) =>
                      handleInputChange("last_name", e.target.value)
                    }
                    className="mt-1 border rounded w-full"
                    placeholder="Họ"
                  />
                </div>
              ) : (
                <div className="col-span-8">
                  <Input
                    value={
                      (values?.first_name && values?.last_name)
                        ? `${values?.first_name} ${values?.last_name}`
                        : `USER ${values?.id}`
                    }
                    readOnly
                    className="mt-1 border rounded w-full cursor-not-allowed"
                  />
                </div>
              )}
              <div className="text-center col-span-1">
                {editingIndex === 0 ? (
                  <Button
                    icon={<FontAwesomeIcon icon={faTimes} />}
                    onClick={() => setEditingIndex(null)}
                    type="link"
                  />
                ) : (
                  <Button
                    icon={<FontAwesomeIcon icon={faEdit} />}
                    onClick={() => handleEditClick(0)}
                    type="link"
                  />
                )}
              </div>
            </div>
          </div>

          {personalInfo.slice(2).map((field, index) => (
            <div key={field.key} className="py-4 flex items-center justify-between">
              <div className="grid grid-cols-11 gap-2 items-center w-full">
                <div className="col-span-2 font-semibold">{field.label}</div>
                {editingIndex === index + 1 ? (
                  <div className="col-span-8">
                    <Input
                      value={values?.[field.key] || ""}
                      onChange={(e) =>
                        handleInputChange(field.key, e.target.value)
                      }
                      className="mt-1"
                      placeholder={field.label}
                    />
                  </div>
                ) : (
                  <div className="col-span-8">
                    <Input
                      value={values?.[field.key] || ""}
                      readOnly
                      className="mt-1"
                    />
                  </div>
                )}
                <div className="text-center col-span-1">
                  {editingIndex === index + 1 ? (
                    <Button
                      icon={<FontAwesomeIcon icon={faTimes} />}
                      onClick={() => setEditingIndex(null)}
                      type="link"
                    />
                  ) : (
                    <Button
                      icon={<FontAwesomeIcon icon={faEdit} />}
                      onClick={() => handleEditClick(index + 1)}
                      type="link"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="py-4 flex items-center justify-between">
            <div className="w-full flex justify-end">
              <Button
                type="primary"
                onClick={handleSaveClick}
                loading={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PersonalInfoPage;

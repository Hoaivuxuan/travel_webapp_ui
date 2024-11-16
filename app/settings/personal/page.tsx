"use client";

import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Image from "next/image";

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
        const response = await fetch(`http://localhost:8080/users/details?id=${userId}`, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });

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
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
    formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!);
  
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
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
      (key) => updatedData[key as keyof UserData] !== user?.[key as keyof UserData]
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
          console.log("Thông tin người dùng đã được cập nhật.");
          localStorage.setItem("user", JSON.stringify(updatedUserData));
          setUser(updatedUserData);
          setEditingIndex(null);
        } else {
          console.error("Cập nhật thất bại:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating user data:", error);
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
            <Image
              src={avatar || ""}
              alt="Profile"
              className="rounded-full max-w-[100px] max-h-[100px] object-cover cursor-pointer"
              onClick={() => document.getElementById("avatar-upload")?.click()}
              width={100}
              height={100}
            />
            <Input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="!top-[30px] absolute inset-0 opacity-0 cursor-pointer hover:opacity-100 transition-opacity duration-200 bg-whites bg-opacity-50 rounded-full"
            />
          </div>
        </div>
        <div className="divide-y">
          <div className="py-4 flex items-center justify-between">
            <div className="grid grid-cols-11 gap-2 items-center w-full">
              <div className="col-span-2 font-semibold">Họ Tên</div>
              {editingIndex === 0 ? (
                <div className="col-span-8 flex gap-2 w-full">
                  <input
                    type="text"
                    value={values?.first_name || ""}
                    onChange={(e) => handleInputChange("first_name", e.target.value)}
                    className="mt-1 p-1 border rounded w-full"
                    aria-label="Tên"
                  />
                  <input
                    type="text"
                    value={values?.last_name || ""}
                    onChange={(e) => handleInputChange("last_name", e.target.value)}
                    className="mt-1 p-1 border rounded w-full"
                    aria-label="Họ"
                  />
                </div>
              ) : (
                <div className="col-span-8">
                  <input
                    type="text"
                    value={`${values?.first_name} ${values?.last_name}`}
                    readOnly
                    className="mt-1 p-1 border rounded w-full bg-gray-100 cursor-not-allowed"
                  />
                </div>
              )}
              <div className="text-center col-span-1">
                {editingIndex === 0 ? (
                  <button
                    onClick={() => setEditingIndex(null)}
                    className="text-gray-500 hover:text-blue-500"
                    aria-label="Hủy chỉnh sửa"
                  >
                    <FontAwesomeIcon icon={faTimes} size="lg" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(0)}
                    className="text-blue-500 hover:text-blue-700"
                    aria-label="Chỉnh sửa tên"
                  >
                    <FontAwesomeIcon icon={faEdit} size="lg" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {personalInfo.slice(2).map((info, index) => (
            <div key={index} className="py-4 flex items-center justify-between">
              <div className="grid grid-cols-11 gap-2 items-center w-full">
                <div className="col-span-2 font-semibold">{info.label}</div>
                <div className="col-span-8">
                  <input
                    type="text"
                    value={values?.[info.key] || ""}
                    readOnly={editingIndex !== index + 1}
                    onChange={(e) => handleInputChange(info.key, e.target.value)}
                    className={`mt-1 p-1 border rounded w-full ${
                      editingIndex === (index + 1) ? "" : "bg-gray-100 cursor-not-allowed"
                    }`}
                    aria-label={info.label}
                  />
                </div>
                <div className="text-center">
                  {editingIndex === index + 1 ? (
                    <button
                      onClick={() => setEditingIndex(null)}
                      className="text-gray-500 hover:text-blue-500"
                    >
                      <FontAwesomeIcon icon={faTimes} size="lg" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditClick(index + 1)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FontAwesomeIcon icon={faEdit} size="lg" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-right">
          <button
            onClick={handleSaveClick}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Đang lưu..." : "Lưu Thông Tin"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoPage;

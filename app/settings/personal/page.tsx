"use client";

import { Input } from "@/components/ui/input";
import { fakeUser } from "@/data/fakeData";
import React, { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { storage } from "@/lib/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

type UserInfoKeys = keyof typeof fakeUser;

const PersonalInfoPage = () => {
  const user = fakeUser;
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [values, setValues] = useState<typeof fakeUser>(user);
  const [avatar, setAvatar] = useState(user.avatar);
  const [loading, setLoading] = useState(false);
  const [newAvatarFile, setNewAvatarFile] = useState<File | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const personalInfo = [
    { label: "Họ", key: "lastName" as UserInfoKeys },
    { label: "Tên", key: "firstName" as UserInfoKeys },
    { label: "Tên hiển thị", key: "displayName" as UserInfoKeys },
    { label: "Địa chỉ email", key: "email" as UserInfoKeys, verified: true },
    { label: "Số điện thoại", key: "phone" as UserInfoKeys },
    { label: "Ngày sinh", key: "birthDate" as UserInfoKeys },
    { label: "Quốc tịch", key: "nationality" as UserInfoKeys },
    { label: "Giới tính", key: "gender" as UserInfoKeys },
    { label: "Địa chỉ", key: "address" as UserInfoKeys },
  ];

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
  }, []);

  const handleUpload = async (file: File) => {
    if (!isAuthenticated) {
      alert("Vui lòng đăng nhập để tải lên.");
      return;
    }

    try {
      const storageRef = ref(storage, `user/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      console.log("Upload thành công:", downloadURL);
    } catch (error) {
      console.error("Lỗi khi tải lên:", error);
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
    setValues({ ...values, [key]: value });
  };

  const handleSaveClick = async () => {
    if (newAvatarFile) {
      await uploadAvatarToFirebase(newAvatarFile);
    }
    console.log("Saved values:", values);
    setEditingIndex(null);
  };

  const uploadAvatarToFirebase = async (file: File) => {
    const safeFileName = file.name.replace(/\s+/g, '_');
    const storageRef = ref(storage, `user/${safeFileName}`);
    setLoading(true);
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      console.log("Avatar uploaded to Firebase:", downloadURL);
      setAvatar(downloadURL);
    } catch (error) {
      console.error("Error uploading avatar:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="p-4 bg-white border rounded-lg hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-center mb-8">
          <h1 className="text-2xl font-bold flex-grow">Thông tin cá nhân</h1>
          <div className="relative">
            <Image
              src={avatar}
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
              <div className="col-span-2 font-semibold">Họ và Tên</div>
              {editingIndex === 0 ? (
                <>
                  <div className="col-span-4">
                    <input
                      type="text"
                      value={values.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="mt-1 p-1 border rounded w-full"
                      aria-label="Họ"
                    />
                  </div>
                  <div className="col-span-4">
                    <input
                      type="text"
                      value={values.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="mt-1 p-1 border rounded w-full"
                      aria-label="Tên"
                    />
                  </div>
                </>
              ) : (
                <div className="col-span-8">
                  <input
                    type="text"
                    value={`${values.lastName} ${values.firstName}`}
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
                    value={values[info.key]}
                    readOnly={editingIndex !== index + 1}
                    onChange={(e) => handleInputChange(info.key, e.target.value)}
                    className={`mt-1 p-1 border rounded w-full ${
                      editingIndex === index + 1 ? "" : "bg-gray-100 cursor-not-allowed"
                    }`}
                    aria-label={info.label}
                  />
                </div>
                <div className="text-center">
                  {editingIndex === index + 1 ? (
                    <button
                      onClick={() => setEditingIndex(null)}
                      className="text-gray-500 hover:text-blue-500"
                      aria-label="Hủy chỉnh sửa"
                    >
                      <FontAwesomeIcon icon={faTimes} size="lg" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditClick(index + 1)}
                      className="text-blue-500 hover:text-blue-700"
                      aria-label={`Chỉnh sửa ${info.label}`}
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

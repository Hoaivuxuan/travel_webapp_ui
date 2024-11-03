"use client";

import { Input } from "@/components/ui/input";
import { fakeUser } from "@/data/fakeData";
import React, { useState } from "react";

type UserInfoKeys = keyof typeof fakeUser;

const PersonalInfoPage = () => {
  const user = fakeUser;
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [values, setValues] = useState<typeof fakeUser>(user);
  const [avatar, setAvatar] = useState(user.avatar);

  const personalInfo = [
    { label: "Tên", key: "name" as UserInfoKeys },
    { label: "Tên hiển thị", key: "displayName" as UserInfoKeys },
    { label: "Địa chỉ email", key: "email" as UserInfoKeys, verified: true },
    { label: "Số điện thoại", key: "phone" as UserInfoKeys },
    { label: "Ngày sinh", key: "birthDate" as UserInfoKeys },
    { label: "Quốc tịch", key: "nationality" as UserInfoKeys },
    { label: "Giới tính", key: "gender" as UserInfoKeys },
    { label: "Địa chỉ", key: "address" as UserInfoKeys },
  ];

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
  };

  const handleInputChange = (key: UserInfoKeys, value: string) => {
    setValues({ ...values, [key]: value });
  };

  const handleSaveClick = () => {
    setEditingIndex(null);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string); // Set the avatar to the file's data URL
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="p-4 bg-white border rounded-lg hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-center mb-8">
          <h1 className="text-2xl font-bold flex-grow">Thông tin cá nhân</h1>
          <div className="relative">
            <img
              src={avatar}
              alt="Profile"
              className="rounded-full max-w-[100px] max-h-[100px] object-cover cursor-pointer"
              onClick={() => document.getElementById("avatar-upload")?.click()}
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
        <p className="mb-6 text-gray-600">
          Cập nhật thông tin của bạn và tìm hiểu các thông tin này được sử dụng
          ra sao.
        </p>
        <div className="divide-y">
          {personalInfo.map((info, index) => (
            <div key={index} className="py-4 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="font-semibold">{info.label}</span>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={values[info.key]}
                    onChange={(e) =>
                      handleInputChange(info.key, e.target.value)
                    }
                    className="mt-1 p-1 border rounded w-full"
                  />
                ) : (
                  <div className="flex items-center">
                    <span>{values[info.key]}</span>
                    {info.verified && (
                      <span className="ml-2 text-green-600 font-bold">
                        Xác thực
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div>
                {editingIndex === index ? (
                  <button
                    onClick={handleSaveClick}
                    className="text-blue-500 hover:underline"
                  >
                    Lưu
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(index)}
                    className="text-blue-500 hover:underline"
                  >
                    Chỉnh sửa
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoPage;

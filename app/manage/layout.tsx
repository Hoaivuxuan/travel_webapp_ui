import React from "react";
import ManageTab from "@/components/manage/ManageTab";

const SettingsLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="max-w-7xl mx-auto mt-10">
      <ManageTab />
      <div>
        {children}
      </div>
    </div>
  );
};

export default SettingsLayout;

import React from "react";
import SettingsMenu from "@/components/settings/SettingsMenu";

const SettingsLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="max-w-7xl mx-auto mt-10">
      <SettingsMenu />
      <div>
        {children}
      </div>
    </div>
  );
};

export default SettingsLayout;

// components/settings/SettingsLayout.tsx
import React from 'react';
import SettingsMenu from '@/components/settings/SettingsMenu';

const SettingsLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex max-w-7xl mx-auto mt-10">
      <div className="w-1/4 p-4">
        <SettingsMenu />
      </div>
      <div className="w-3/4 p-4">
        {children}
      </div>
    </div>
  );
};

export default SettingsLayout;
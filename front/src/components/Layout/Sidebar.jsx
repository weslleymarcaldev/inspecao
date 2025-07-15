import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  FileText,
  Plus,
  Upload,
  LogOut,
  Car,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const Sidebar = () => {
  const { t } = useTranslation();
  const { logout } = useAuthStore();

  const menuItems = [
    {
      to: '/',
      icon: LayoutDashboard,
      label: t('navigation.dashboard'),
    },
    {
      to: '/inspections',
      icon: FileText,
      label: t('navigation.inspections'),
    },
    {
      to: '/inspections/new',
      icon: Plus,
      label: t('navigation.newInspection'),
    },
    {
      to: '/upload',
      icon: Upload,
      label: t('navigation.uploadImage'),
    },
  ];

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <Car className="w-8 h-8 text-blue-400" />
          <h1 className="text-xl font-bold">VehicleInspect</h1>
        </div>
      </div>

      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          {t('navigation.logout')}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
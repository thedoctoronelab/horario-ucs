import React from 'react';
import { UserRole } from '../types';
import { UsersIcon, AcademicCapIcon, LogoutIcon } from './icons/Icons';

interface HeaderProps {
  userRole: UserRole;
  onLogout: () => void;
}

const UCS_LOGO_BASE64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQkAAACtCAMAAADiH1SnAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAPUExURQAAABXgJgDsMQDcGwDsMQZWsIMAAAAFdFJOU////////////////k9LTLgAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAd8SURBVHja7d1BciNJFIXhF6kIgiiI+v+/8kQ3YkZg7k7n7E7t1KlTAZEzqdQ9W/78v//+7+ePj49/fP/++v3d//388fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f-";

export const Header: React.FC<HeaderProps> = ({ userRole, onLogout }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src={UCS_LOGO_BASE64} alt="UCS Logo" className="h-12 w-auto" />
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 hidden sm:block">
            Horario de Clases UCS Sucre
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3 bg-gray-100 rounded-full px-4 py-2">
            {userRole === 'admin' ? 
              <AcademicCapIcon className="h-5 w-5 text-brand-primary" /> : 
              <UsersIcon className="h-5 w-5 text-brand-primary" />
            }
            <span className="text-sm font-semibold text-gray-700">
              Modo: {userRole === 'admin' ? 'Administrador' : 'Estudiante'}
            </span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transform hover:scale-105 transition-all duration-200 ease-in-out"
            aria-label="Cerrar sesión"
          >
            <LogoutIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </div>
    </header>
  );
};
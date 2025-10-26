import React, { useState } from 'react';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

const UCS_LOGO_BASE64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQkAAACtCAMAAADiH1SnAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAPUExURQAAABXgJgDsMQDcGwDsMQZWsIMAAAAFdFJOU////////////////k9LTLgAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAd8SURBVHja7d1BciNJFIXhF6kIgiiI+v+/8kQ3YkZg7k7n7E7t1KlTAZEzqdQ9W/78v//+7+ePj49/fP/++v3d//388fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f-";

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<'selection' | 'adminPassword'>('selection');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'profesor') {
      onLogin('admin');
    } else {
      setError('Contraseña incorrecta.');
      setPassword('');
    }
  };
  
  const handleBack = () => {
    setMode('selection');
    setError('');
    setPassword('');
  }

  return (
    <div 
      className="min-h-screen bg-rose-50 flex flex-col items-center justify-center p-4"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ef4444' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-2xl p-8 space-y-6 transform transition-all duration-300">
        <div className="flex flex-col items-center">
          <img src={UCS_LOGO_BASE64} alt="UCS Logo" className="h-20 w-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Bienvenidos al horario de clases UCS sucre
          </h1>
        </div>
        
        {mode === 'selection' && (
          <div className="space-y-4">
            <p className="text-gray-500 text-center">
              Selecciona tu rol para continuar
            </p>
            <button
              onClick={() => onLogin('student')}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-brand-primary bg-brand-light hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors"
            >
              Soy Estudiante
            </button>
            <button
              onClick={() => setMode('adminPassword')}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-dark transition-colors"
            >
              Soy Administrador
            </button>
          </div>
        )}
        
        {mode === 'adminPassword' && (
          <div>
            <p className="text-gray-500 mt-2 text-center mb-4">
              Acceso de Administrador
            </p>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-brand-secondary focus:border-brand-secondary"
                  required
                  autoFocus
                />
              </div>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors"
              >
                Ingresar
              </button>
               <button
                type="button"
                onClick={handleBack}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors"
              >
                Volver
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
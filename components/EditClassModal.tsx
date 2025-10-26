
import React, { useState, useEffect } from 'react';
import { ClassDetails, SlotIdentifier } from '../types';
import { generateDescription } from '../services/geminiService';
import { PALETTE_COLORS } from '../constants';
import { SparklesIcon, TrashIcon } from './icons/Icons';

interface EditClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (classDetails: ClassDetails) => void;
  onDelete: () => void;
  slot: SlotIdentifier;
  classDetails?: ClassDetails;
}

export const EditClassModal: React.FC<EditClassModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  slot,
  classDetails,
}) => {
  const [subject, setSubject] = useState('');
  const [professor, setProfessor] = useState('');
  const [room, setRoom] = useState('');
  const [color, setColor] = useState(PALETTE_COLORS[0]);
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (classDetails) {
      setSubject(classDetails.subject);
      setProfessor(classDetails.professor);
      setRoom(classDetails.room);
      setColor(classDetails.color);
      setDescription(classDetails.description || '');
    } else {
      // Reset form for new entry
      setSubject('');
      setProfessor('');
      setRoom('');
      setColor(PALETTE_COLORS[0]);
      setDescription('');
    }
  }, [classDetails, isOpen]);

  const handleSave = () => {
    if (!subject || !professor || !room) {
      alert('Por favor, complete todos los campos.');
      return;
    }
    const newClassDetails: ClassDetails = {
      id: classDetails?.id || new Date().toISOString(),
      subject,
      professor,
      room,
      color,
      description
    };
    onSave(newClassDetails);
  };
  
  const handleGenerateDesc = async () => {
    if (!subject) {
      alert("Por favor, ingrese el nombre de la materia primero.");
      return;
    }
    setIsGenerating(true);
    try {
      const desc = await generateDescription(subject);
      setDescription(desc);
    } catch (error) {
      console.error("Error generating description:", error);
      alert("No se pudo generar la descripción. Inténtelo de nuevo.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md transform transition-all duration-300 ease-out scale-95 opacity-0 animate-fade-in-scale">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {classDetails ? 'Editar Clase' : 'Añadir Clase'}
              </h2>
              <p className="text-sm text-gray-500">{slot.day} at {slot.time}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
          </div>
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Materia</label>
              <input type="text" value={subject} onChange={e => setSubject(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-brand-secondary focus:border-brand-secondary"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Profesor</label>
              <input type="text" value={professor} onChange={e => setProfessor(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-brand-secondary focus:border-brand-secondary"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Salón / Aula</label>
              <input type="text" value={room} onChange={e => setRoom(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-brand-secondary focus:border-brand-secondary"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Color</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {PALETTE_COLORS.map(c => (
                  <div key={c} onClick={() => setColor(c)} className={`w-8 h-8 rounded-full cursor-pointer ${c} ${color === c ? 'ring-2 ring-offset-2 ring-brand-primary' : ''}`}></div>
                ))}
              </div>
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700">Descripción (Opcional)</label>
               <textarea value={description} onChange={e => setDescription(e.target.value)} rows={2} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-brand-secondary focus:border-brand-secondary"></textarea>
               <button onClick={handleGenerateDesc} disabled={isGenerating} className="mt-2 flex items-center justify-center text-sm font-medium text-brand-primary hover:text-brand-dark disabled:opacity-50 disabled:cursor-wait">
                <SparklesIcon className="h-4 w-4 mr-1"/>
                {isGenerating ? 'Generando...' : 'Sugerir con IA'}
               </button>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center rounded-b-lg">
          <div>
            {classDetails && (
              <button onClick={onDelete} className="text-red-600 hover:text-red-800 font-medium px-4 py-2 rounded-md hover:bg-red-100 flex items-center">
                <TrashIcon className="h-4 w-4 mr-2"/>
                Eliminar
              </button>
            )}
          </div>
          <div className="flex space-x-3">
             <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 font-semibold">Cancelar</button>
             <button onClick={handleSave} className="px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-dark font-semibold">Guardar</button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale { animation: fadeInScale 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
};

import { ClassDetails } from './types';

export const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

export const TIME_SLOTS = Array.from({ length: 11 }, (_, i) => {
  const hour24 = i + 7; // 7, 8, ..., 17
  const ampm = hour24 >= 12 ? 'PM' : 'AM';
  let hour12 = hour24 % 12;
  if (hour12 === 0) {
    hour12 = 12; // For 12 PM
  }
  return `${String(hour12).padStart(2, '0')}:00 ${ampm}`;
});

export const PALETTE_COLORS = [
  'bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-pink-200', 'bg-purple-200',
  'bg-indigo-200', 'bg-red-200', 'bg-teal-200'
];

export const BORDER_PALETTE_COLORS = [
  'border-blue-500', 'border-green-500', 'border-yellow-500', 'border-pink-500', 'border-purple-500',
  'border-indigo-500', 'border-red-500', 'border-teal-500'
];

export const TEXT_PALETTE_COLORS = [
  'text-blue-800', 'text-green-800', 'text-yellow-800', 'text-pink-800', 'text-purple-800',
  'text-indigo-800', 'text-red-800', 'text-teal-800'
];


export const generateInitialSchedule = (): Record<string, ClassDetails> => {
  return {
    'Lunes-08:00 AM': {
      id: '1',
      subject: 'Matemáticas Avanzadas',
      professor: 'Dr. Alan Turing',
      room: 'A-101',
      color: 'bg-blue-200',
      description: 'Cálculo integral y diferencial.'
    },
    'Lunes-10:00 AM': {
      id: '2',
      subject: 'Física Cuántica',
      professor: 'Dr. Marie Curie',
      room: 'B-203',
      color: 'bg-purple-200',
      description: 'Principios de la mecánica cuántica.'
    },
    'Martes-09:00 AM': {
      id: '3',
      subject: 'Química Orgánica',
      professor: 'Dr. Rosalind Franklin',
      room: 'C-105',
      color: 'bg-green-200',
      description: 'Estudio de compuestos de carbono.'
    },
    'Miércoles-11:00 AM': {
      id: '4',
      subject: 'Historia del Arte',
      professor: 'Prof. Ada Lovelace',
      room: 'D-301',
      color: 'bg-pink-200',
      description: 'Del Renacimiento al Barroco.'
    },
     'Jueves-02:00 PM': {
      id: '5',
      subject: 'Programación I',
      professor: 'Prof. Grace Hopper',
      room: 'Lab-1',
      color: 'bg-indigo-200',
      description: 'Fundamentos de la programación.'
    },
  };
};
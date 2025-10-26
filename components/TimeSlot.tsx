
import React from 'react';
import { ClassDetails, UserRole } from '../types';
import { PlusIcon, PencilIcon } from './icons/Icons';
import { BORDER_PALETTE_COLORS, PALETTE_COLORS, TEXT_PALETTE_COLORS } from '../constants';


interface TimeSlotProps {
  day: string;
  time: string;
  classDetails?: ClassDetails;
  onSlotClick: (day: string, time: string) => void;
  userRole: UserRole;
}

export const TimeSlot: React.FC<TimeSlotProps> = ({ day, time, classDetails, onSlotClick, userRole }) => {
  const handleClick = () => onSlotClick(day, time);

  const colorIndex = PALETTE_COLORS.indexOf(classDetails?.color || '');
  const borderColor = colorIndex !== -1 ? BORDER_PALETTE_COLORS[colorIndex] : 'border-gray-200';
  const textColor = colorIndex !== -1 ? TEXT_PALETTE_COLORS[colorIndex] : 'text-gray-800';


  return (
    <div
      className={`relative min-h-[100px] border border-gray-200 bg-gray-50 p-2 group transition-all duration-200 ease-in-out ${userRole === 'admin' ? 'cursor-pointer hover:bg-blue-50' : ''}`}
      onClick={userRole === 'admin' ? handleClick : undefined}
    >
      {classDetails ? (
        <div className={`h-full w-full rounded-md p-3 flex flex-col justify-between ${classDetails.color} ${textColor} border-l-4 ${borderColor}`}>
          <div>
            <p className="font-bold text-sm">{classDetails.subject}</p>
            <p className="text-xs mt-1">{classDetails.professor}</p>
          </div>
          <p className="text-xs font-mono self-end">{classDetails.room}</p>
          {userRole === 'admin' && (
            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white/50 rounded-full">
              <PencilIcon className="h-4 w-4 text-gray-600" />
            </div>
          )}
        </div>
      ) : (
        userRole === 'admin' && (
          <div className="flex items-center justify-center h-full w-full">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <PlusIcon className="h-6 w-6 text-gray-400" />
            </div>
          </div>
        )
      )}
    </div>
  );
};

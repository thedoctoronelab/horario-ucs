
import React from 'react';
import { DAYS, TIME_SLOTS } from '../constants';
import { ClassDetails, UserRole } from '../types';
import { TimeSlot } from './TimeSlot';

interface ScheduleGridProps {
  schedule: Record<string, ClassDetails>;
  onSlotClick: (day: string, time: string) => void;
  userRole: UserRole;
}

export const ScheduleGrid: React.FC<ScheduleGridProps> = ({ schedule, onSlotClick, userRole }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg overflow-x-auto">
      <div className="grid gap-px" style={{ gridTemplateColumns: `auto repeat(${DAYS.length}, minmax(120px, 1fr))` }}>
        {/* Time Header */}
        <div className="sticky left-0 bg-white z-10"></div>
        {/* Day Headers */}
        {DAYS.map(day => (
          <div key={day} className="text-center font-bold text-gray-700 p-3 border-b-2 border-gray-200">
            {day}
          </div>
        ))}
        {/* Time Slots and Classes */}
        {TIME_SLOTS.map(time => (
          <React.Fragment key={time}>
            <div className="sticky left-0 bg-white z-10 p-3 text-right font-mono text-sm text-gray-500 pr-4 border-r border-gray-200">
              {time}
            </div>
            {DAYS.map(day => {
              const key = `${day}-${time}`;
              const classDetails = schedule[key];
              return (
                <TimeSlot
                  key={key}
                  day={day}
                  time={time}
                  classDetails={classDetails}
                  onSlotClick={onSlotClick}
                  userRole={userRole}
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

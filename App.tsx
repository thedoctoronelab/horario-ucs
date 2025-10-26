import React, { useState, useMemo } from 'react';
import { ScheduleGrid } from './components/ScheduleGrid';
import { Header } from './components/Header';
import { EditClassModal } from './components/EditClassModal';
import { Login } from './components/Login';
import { UserRole, ClassDetails, SlotIdentifier } from './types';
import { generateInitialSchedule } from './constants';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [schedule, setSchedule] = useState<Record<string, ClassDetails>>(generateInitialSchedule());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState<SlotIdentifier | null>(null);

  const handleSlotClick = (day: string, time: string) => {
    if (userRole === 'admin') {
      setEditingSlot({ day, time });
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSlot(null);
  };

  const handleSaveClass = (classDetails: ClassDetails) => {
    if (editingSlot) {
      const key = `${editingSlot.day}-${editingSlot.time}`;
      setSchedule(prev => ({ ...prev, [key]: classDetails }));
      handleCloseModal();
    }
  };
  
  const handleDeleteClass = () => {
    if (editingSlot) {
      const key = `${editingSlot.day}-${editingSlot.time}`;
      setSchedule(prev => {
        const newSchedule = { ...prev };
        delete newSchedule[key];
        return newSchedule;
      });
      handleCloseModal();
    }
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  const currentClassDetails = useMemo(() => {
    if (!editingSlot) return undefined;
    const key = `${editingSlot.day}-${editingSlot.time}`;
    return schedule[key];
  }, [editingSlot, schedule]);

  if (!userRole) {
    return <Login onLogin={setUserRole} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Header userRole={userRole} onLogout={handleLogout} />
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <ScheduleGrid 
          schedule={schedule} 
          onSlotClick={handleSlotClick} 
          userRole={userRole}
        />
      </main>
      {isModalOpen && editingSlot && (
        <EditClassModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveClass}
          onDelete={handleDeleteClass}
          slot={editingSlot}
          classDetails={currentClassDetails}
        />
      )}
    </div>
  );
};

export default App;
import React, { useState } from 'react';
import type { StudentWithStatus } from '../types';
import { AttendanceStatus } from '../types';
import { CheckIcon, ClockIcon, PermissionIcon, TrashIcon, XIcon } from './icons';
import { ConfirmationModal } from './ConfirmationModal';

interface StudentItemProps {
  student: StudentWithStatus;
  onUpdateStatus: (id: number, status: AttendanceStatus) => void;
  onRemove: (id: number) => void;
}

const statusConfig = {
    [AttendanceStatus.Present]: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        ring: 'ring-green-500',
        icon: <CheckIcon />
    },
    [AttendanceStatus.Absent]: {
        bg: 'bg-red-100',
        text: 'text-red-800',
        ring: 'ring-red-500',
        icon: <XIcon />
    },
    [AttendanceStatus.Late]: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        ring: 'ring-yellow-500',
        icon: <ClockIcon />
    },
    [AttendanceStatus.Permiso]: {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        ring: 'ring-blue-500',
        icon: <PermissionIcon />
    },
    [AttendanceStatus.Unmarked]: {
        bg: 'bg-slate-100',
        text: 'text-slate-500',
        ring: 'ring-slate-400',
        icon: null
    }
};

const StatusButton: React.FC<{
  status: AttendanceStatus;
  currentStatus: AttendanceStatus;
  onClick: () => void;
}> = ({ status, currentStatus, onClick }) => {
  const isActive = status === currentStatus;
  const config = statusConfig[status];

  return (
    <button
      onClick={onClick}
      className={`flex-1 sm:flex-initial sm:w-24 flex items-center justify-center gap-1.5 p-2 text-sm font-semibold rounded-md transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isActive ? `${config.bg} ${config.text} ${config.ring} ring-2` : `bg-slate-100 text-slate-600 hover:bg-slate-200`
      }`}
      aria-pressed={isActive}
    >
      {config.icon}
      <span>{status}</span>
    </button>
  );
};

export const StudentItem: React.FC<StudentItemProps> = ({ student, onUpdateStatus, onRemove }) => {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const config = statusConfig[student.status];
    
    const handleRemoveClick = () => {
        setIsConfirmModalOpen(true);
    };

    const handleConfirmRemove = () => {
        onRemove(student.id);
        setIsConfirmModalOpen(false);
    };

  return (
    <>
        <div className={`p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors duration-200 ${config.bg}`}>
        <p className={`font-medium text-lg ${config.text}`}>{student.name}</p>
        <div className="w-full sm:w-auto flex items-center gap-2">
            <div className="flex-grow flex gap-2 flex-wrap">
                <StatusButton status={AttendanceStatus.Present} currentStatus={student.status} onClick={() => onUpdateStatus(student.id, AttendanceStatus.Present)} />
                <StatusButton status={AttendanceStatus.Absent} currentStatus={student.status} onClick={() => onUpdateStatus(student.id, AttendanceStatus.Absent)} />
                <StatusButton status={AttendanceStatus.Late} currentStatus={student.status} onClick={() => onUpdateStatus(student.id, AttendanceStatus.Late)} />
                <StatusButton status={AttendanceStatus.Permiso} currentStatus={student.status} onClick={() => onUpdateStatus(student.id, AttendanceStatus.Permiso)} />
            </div>
            <button
            onClick={handleRemoveClick}
            aria-label={`Eliminar a ${student.name}`}
            className="p-2 text-slate-500 hover:bg-red-200 hover:text-red-700 rounded-full transition duration-150"
            >
            <TrashIcon />
            </button>
        </div>
        </div>
        <ConfirmationModal
            isOpen={isConfirmModalOpen}
            onClose={() => setIsConfirmModalOpen(false)}
            onConfirm={handleConfirmRemove}
            title="Confirmar Eliminación"
            message={`¿Estás seguro de que quieres eliminar a ${student.name}? Esta acción es irreversible y borrará todo su historial de asistencia.`}
        />
    </>
  );
};
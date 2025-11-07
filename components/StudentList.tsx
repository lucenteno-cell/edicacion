import React from 'react';
import type { StudentWithStatus } from '../types';
import { AttendanceStatus } from '../types';
import { StudentItem } from './StudentItem';
import { UserGroupIcon } from './icons';


interface StudentListProps {
  students: StudentWithStatus[];
  onUpdateStatus: (id: number, status: AttendanceStatus) => void;
  onRemove: (id: number) => void;
}

export const StudentList: React.FC<StudentListProps> = ({ students, onUpdateStatus, onRemove }) => {
  if (students.length === 0) {
    return (
      <div className="text-center py-10 px-4 border-2 border-dashed border-slate-200 rounded-lg">
        <UserGroupIcon className="mx-auto h-12 w-12 text-slate-400" />
        <h3 className="mt-2 text-lg font-medium text-slate-900">No hay estudiantes</h3>
        <p className="mt-1 text-sm text-slate-500">
          Añade un estudiante para empezar a tomar asistencia.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {students.map(student => (
        <StudentItem
          key={student.id}
          student={student}
          onUpdateStatus={onUpdateStatus}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

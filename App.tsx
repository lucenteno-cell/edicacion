import React, { useState, useMemo, useEffect } from 'react';
import type { Student, AttendanceData, StudentWithStatus } from './types';
import { AttendanceStatus } from './types';
import { AddStudentForm } from './components/AddStudentForm';
import { StudentList } from './components/StudentList';
import { AttendanceSummary } from './components/AttendanceSummary';
import { ReportGenerator } from './components/ReportGenerator';

const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const App: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [attendance, setAttendance] = useState<AttendanceData>({});
    const [selectedDate, setSelectedDate] = useState<string>(getTodayDateString());

    useEffect(() => {
        try {
            const storedStudents = localStorage.getItem('students');
            if (storedStudents) {
                setStudents(JSON.parse(storedStudents));
            }
            const storedAttendance = localStorage.getItem('attendance');
            if (storedAttendance) {
                setAttendance(JSON.parse(storedAttendance));
            }
        } catch (error) {
            console.error("Failed to load data from localStorage", error);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('students', JSON.stringify(students));
            localStorage.setItem('attendance', JSON.stringify(attendance));
        } catch (error) {
            console.error("Failed to save data to localStorage", error);
        }
    }, [students, attendance]);

    const studentsWithStatus = useMemo<StudentWithStatus[]>(() => {
        const dayAttendanceData = attendance[selectedDate] || [];
        return students.map(student => {
            const attendanceRecord = dayAttendanceData.find(record => record.studentId === student.id);
            return {
                ...student,
                status: attendanceRecord ? attendanceRecord.status : AttendanceStatus.Unmarked,
            };
        });
    }, [students, attendance, selectedDate]);

    const attendanceCounts = useMemo(() => {
        return studentsWithStatus.reduce(
            (counts, student) => {
                if (student.status === AttendanceStatus.Present) counts.present++;
                else if (student.status === AttendanceStatus.Absent) counts.absent++;
                else if (student.status === AttendanceStatus.Late) counts.late++;
                else if (student.status === AttendanceStatus.Permiso) counts.permission++;
                return counts;
            },
            { present: 0, absent: 0, late: 0, permission: 0 }
        );
    }, [studentsWithStatus]);

    const handleAddStudent = (name: string) => {
        if (name.trim()) {
            const newStudent: Student = {
                id: Date.now(),
                name: name.trim(),
            };
            setStudents(prev => [...prev, newStudent]);
        }
    };

    const handleRemoveStudent = (id: number) => {
        setStudents(prev => prev.filter(s => s.id !== id));
        const newAttendance = { ...attendance };
        for (const date in newAttendance) {
            newAttendance[date] = newAttendance[date].filter(record => record.studentId !== id);
            if (newAttendance[date].length === 0) {
                delete newAttendance[date];
            }
        }
        setAttendance(newAttendance);
    };

    const handleUpdateStatus = (id: number, status: AttendanceStatus) => {
        setAttendance(prev => {
            const newAttendance = { ...prev };
            const dayAttendance = newAttendance[selectedDate] ? [...newAttendance[selectedDate]] : [];
            const studentIndex = dayAttendance.findIndex(record => record.studentId === id);

            if (studentIndex > -1) {
                dayAttendance[studentIndex] = { ...dayAttendance[studentIndex], status };
            } else {
                dayAttendance.push({ studentId: id, status });
            }
            newAttendance[selectedDate] = dayAttendance;
            return newAttendance;
        });
    };

    const handleResetAttendance = () => {
        setAttendance(prev => {
            const newAttendance = { ...prev };
            delete newAttendance[selectedDate];
            return newAttendance;
        });
    };

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 font-sans">
            <header className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                    REGISTRO DE ASISTENCIA IE 40500 CARRIZAL
                </h1>
            </header>

            <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <section className="p-6 bg-white rounded-xl shadow-md">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                             <h2 className="text-xl font-bold text-slate-700">Registro de Asistencia</h2>
                             <div>
                                <label htmlFor="attendance-date" className="block text-sm font-medium text-slate-700 mb-1">
                                    Fecha
                                </label>
                                <input
                                    id="attendance-date"
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <AddStudentForm onAddStudent={handleAddStudent} />
                            <StudentList
                                students={studentsWithStatus}
                                onUpdateStatus={handleUpdateStatus}
                                onRemove={handleRemoveStudent}
                            />
                        </div>
                    </section>
                     <section className="p-6 bg-white rounded-xl shadow-md">
                        <h2 className="text-xl font-bold text-slate-700 mb-4">Generador de Reportes</h2>
                        <ReportGenerator students={students} attendance={attendance} />
                    </section>
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <section className="p-6 bg-white rounded-xl shadow-md sticky top-8">
                        <h2 className="text-xl font-bold text-slate-700 mb-4">Resumen y Acciones</h2>
                        <AttendanceSummary
                            counts={attendanceCounts}
                            totalStudents={students.length}
                            onReset={handleResetAttendance}
                        />
                    </section>
                </div>
            </main>
        </div>
    );
}

export default App;
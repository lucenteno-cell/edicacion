import React, { useState } from 'react';
import type { Student, AttendanceData, AttendanceStatus } from '../types';
import { generateDetailedReport } from '../services/geminiService';
import { SparklesIcon } from './icons';

interface ReportGeneratorProps {
  students: Student[];
  attendance: AttendanceData;
}

interface ReportSummary {
    present: number;
    absent: number;
    late: number;
    permission: number;
}

// Simple bar chart component
const AttendanceChart: React.FC<{ summary: ReportSummary }> = ({ summary }) => {
    const data = [
        { label: 'Presente', value: summary.present, color: 'bg-green-500' },
        { label: 'Ausente', value: summary.absent, color: 'bg-red-500' },
        { label: 'Tarde', value: summary.late, color: 'bg-yellow-500' },
        { label: 'Permiso', value: summary.permission, color: 'bg-blue-500' },
    ];

    const total = data.reduce((sum, item) => sum + item.value, 0);
    if (total === 0) return null;

    return (
        <div className="mt-6">
            <h4 className="text-lg font-semibold text-slate-800 mb-3">Gráfico de Resumen</h4>
            <div className="w-full bg-slate-100 p-4 rounded-lg space-y-3">
                {data.map(item => (
                    <div key={item.label} className="grid grid-cols-4 gap-2 items-center">
                        <span className="text-sm font-medium text-slate-600 col-span-1">{item.label}</span>
                        <div className="col-span-3 flex items-center gap-2">
                             <div className="w-full bg-slate-200 rounded-full h-4">
                                <div
                                    className={`${item.color} h-4 rounded-full`}
                                    style={{ width: `${(item.value / total) * 100}%` }}
                                ></div>
                            </div>
                            <span className="text-sm font-bold text-slate-800 w-8 text-right">{item.value}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export const ReportGenerator: React.FC<ReportGeneratorProps> = ({ students, attendance }) => {
    const today = new Date().toISOString().split('T')[0];
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [report, setReport] = useState('');
    const [reportSummary, setReportSummary] = useState<ReportSummary | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const getDatesInRange = (start: string, end: string): string[] => {
        const dates = [];
        let currentDate = new Date(start);
        const lastDate = new Date(end);
        
        while(currentDate <= lastDate) {
            dates.push(currentDate.toISOString().split('T')[0]);
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
    }

    const handleGenerateReport = async () => {
        setIsLoading(true);
        setError('');
        setReport('');
        setReportSummary(null);

        const dates = getDatesInRange(startDate, endDate);
        const overallSummary: ReportSummary = { present: 0, absent: 0, late: 0, permission: 0 };
        
        const records = students.map(student => {
            const studentAttendance: { [date: string]: AttendanceStatus } = {};
            dates.forEach(date => {
                const dayData = attendance[date] || [];
                const record = dayData.find(r => r.studentId === student.id);
                if (record) {
                    studentAttendance[date] = record.status;
                    if (record.status === 'Presente') overallSummary.present++;
                    else if (record.status === 'Ausente') overallSummary.absent++;
                    else if (record.status === 'Tarde') overallSummary.late++;
                    else if (record.status === 'Permiso') overallSummary.permission++;
                }
            });
            return { studentName: student.name, attendance: studentAttendance };
        });

        try {
            const generatedReport = await generateDetailedReport(records, dates);
            setReport(generatedReport);
            setReportSummary(overallSummary);
        } catch (err) {
            setError('No se pudo generar el reporte. Por favor, inténtalo de nuevo más tarde.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const isButtonDisabled = isLoading || students.length === 0;

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div>
                    <label htmlFor="start-date" className="block text-sm font-medium text-slate-700 mb-1">
                        Fecha de Inicio
                    </label>
                    <input
                        type="date"
                        id="start-date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                 <div>
                    <label htmlFor="end-date" className="block text-sm font-medium text-slate-700 mb-1">
                        Fecha Final
                    </label>
                    <input
                        type="date"
                        id="end-date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={startDate}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <button
                onClick={handleGenerateReport}
                disabled={isButtonDisabled}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 disabled:bg-indigo-300 disabled:cursor-not-allowed"
            >
                <SparklesIcon />
                {isLoading ? 'Generando Reporte...' : 'Generar Reporte con IA'}
            </button>
            
            {(report || isLoading) && (
                 <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                    <h3 className="font-semibold text-slate-800 mb-3">Reporte de Asistencia:</h3>
                    {isLoading && <p className="text-slate-600">Analizando datos y generando tabla, por favor espera...</p>}
                    {report && (
                       <div className="overflow-x-auto">
                         <div dangerouslySetInnerHTML={{ __html: report }} />
                       </div>
                    )}
                    {reportSummary && <AttendanceChart summary={reportSummary} />}
                </div>
            )}

            {error && (
                <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                    <p className="text-red-700">{error}</p>
                </div>
            )}
        </div>
    );
};

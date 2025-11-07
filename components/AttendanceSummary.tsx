import React, { useState } from 'react';
import { generateAttendanceReport } from '../services/geminiService';
import { SparklesIcon } from './icons';

interface AttendanceSummaryProps {
  counts: {
    present: number;
    absent: number;
    late: number;
    permission: number;
  };
  totalStudents: number;
  onReset: () => void;
}

const SummaryCard: React.FC<{ title: string; count: number; color: string }> = ({ title, count, color }) => (
  <div className={`p-3 rounded-lg ${color}`}>
    <p className="text-xs font-medium text-slate-700">{title}</p>
    <p className="text-2xl font-bold text-slate-900">{count}</p>
  </div>
);


export const AttendanceSummary: React.FC<AttendanceSummaryProps> = ({ counts, totalStudents, onReset }) => {
  const [report, setReport] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateReport = async () => {
    setIsLoading(true);
    setError('');
    setReport('');
    try {
      const generatedReport = await generateAttendanceReport({
        ...counts,
        total: totalStudents,
      });
      setReport(generatedReport);
    } catch (err) {
      // FIX: Updated error message to be more generic and user-friendly.
      setError('No se pudo generar el mensaje. Por favor, inténtalo de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <SummaryCard title="Presentes" count={counts.present} color="bg-green-100" />
          <SummaryCard title="Ausentes" count={counts.absent} color="bg-red-100" />
          <SummaryCard title="Tardes" count={counts.late} color="bg-yellow-100" />
          <SummaryCard title="Permisos" count={counts.permission} color="bg-blue-100" />
      </div>

      <div className="space-y-3">
        <button
          onClick={handleGenerateReport}
          disabled={isLoading || totalStudents === 0}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200 disabled:bg-purple-300 disabled:cursor-not-allowed"
        >
          <SparklesIcon />
          {isLoading ? 'Generando...' : 'Mensaje del Día con IA'}
        </button>
        <button
          onClick={onReset}
          className="w-full px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-md hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 transition duration-200"
        >
          Reiniciar Asistencia del Día
        </button>
      </div>

      {report && (
        <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Mensaje para la Clase:</h3>
          <p className="text-blue-700 whitespace-pre-wrap">{report}</p>
        </div>
      )}

      {error && (
         <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

    </div>
  );
};

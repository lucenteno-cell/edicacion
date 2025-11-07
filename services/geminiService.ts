import { GoogleGenAI } from "@google/genai";
import type { AttendanceData, Student, AttendanceStatus } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface DailySummary {
    present: number;
    absent: number;
    late: number;
    permission: number;
    total: number;
}

export const generateAttendanceReport = async (summary: DailySummary): Promise<string> => {
    const model = 'gemini-2.5-flash';
    const prompt = `
        Eres un asistente de profesor. Basado en el resumen de asistencia de hoy, escribe un mensaje corto, amigable y motivador para la clase.
        Menciona los números de manera positiva. Por ejemplo, celebra a los que vinieron y anima a los ausentes a unirse mañana.
        El mensaje debe estar en español.

        Resumen de hoy:
        - Total de estudiantes: ${summary.total}
        - Presentes: ${summary.present}
        - Ausentes: ${summary.absent}
        - Tarde: ${summary.late}
        - Con permiso: ${summary.permission}

        Genera solo el mensaje, sin encabezados ni saludos adicionales.
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating report with Gemini:", error);
        throw new Error("Failed to generate report.");
    }
};

interface DetailedRecord {
    studentName: string;
    attendance: { [date: string]: AttendanceStatus };
}

export const generateDetailedReport = async (records: DetailedRecord[], dates: string[]): Promise<string> => {
    const model = 'gemini-2.5-pro';
    const prompt = `
        Eres un asistente de profesor encargado de generar un reporte de asistencia en formato de tabla HTML.
        NO incluyas nada más que el código HTML de la tabla. Sin markdown, sin explicaciones, solo la tabla.

        Datos de Asistencia:
        ${JSON.stringify(records, null, 2)}

        Fechas a incluir en el reporte:
        ${JSON.stringify(dates)}

        Requerimientos de la Tabla HTML:
        1.  Crea una tabla HTML con la clase "w-full text-sm text-left text-slate-500".
        2.  La cabecera (\`<thead>\`) debe tener la clase "text-xs text-slate-700 uppercase bg-slate-50" y contener los siguientes encabezados (\`<th>\` con clase "px-4 py-3"):
            - "Estudiante"
            - Todas las fechas del rango proporcionado.
            - "Presente"
            - "Ausente"
            - "Tarde"
            - "Permiso"
        3.  El cuerpo (\`<tbody>\`) debe contener una fila (\`<tr>\` con clase "bg-white border-b") por cada estudiante en los datos.
        4.  La primera celda de cada fila (\`<td>\` con clase "px-4 py-3 font-medium text-slate-900 whitespace-nowrap") debe ser el nombre del estudiante.
        5.  Para cada fecha, la celda correspondiente debe contener la inicial del estado de asistencia (P, A, T, P) y un color de fondo. Usa un \`<span>\` con clases para el estilo.
            - Presente (P): \`bg-green-100 text-green-800 px-2 py-1 rounded-full\`
            - Ausente (A): \`bg-red-100 text-red-800 px-2 py-1 rounded-full\`
            - Tarde (T): \`bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full\`
            - Permiso (P): \`bg-blue-100 text-blue-800 px-2 py-1 rounded-full\`
            - Si no hay registro para una fecha, la celda debe estar vacía.
        6.  Las últimas cuatro celdas de cada fila deben ser los totales calculados para "Presente", "Ausente", "Tarde" y "Permiso" para ese estudiante en el rango de fechas. Estas celdas deben estar centradas (\`text-center\`).
        7.  Toda la tabla debe ser responsive y legible.
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        // Limpiar cualquier posible texto de markdown que el modelo pueda agregar
        const htmlContent = response.text.replace(/```html/g, '').replace(/```/g, '').trim();
        return htmlContent;
    } catch (error) {
        console.error("Error generating detailed report with Gemini:", error);
        throw new Error("Failed to generate detailed report.");
    }
}

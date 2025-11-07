export enum AttendanceStatus {
  Present = 'Presente',
  Absent = 'Ausente',
  Late = 'Tarde',
  Permiso = 'Permiso',
  Unmarked = 'Sin Marcar',
}

export interface Student {
  id: number;
  name: string;
}

export interface AttendanceRecord {
  studentId: number;
  status: AttendanceStatus;
}

export type AttendanceData = {
  [date: string]: AttendanceRecord[];
};

export type StudentWithStatus = Student & {
  status: AttendanceStatus;
};

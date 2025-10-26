
export type UserRole = 'student' | 'admin';

export interface ClassDetails {
  id: string;
  subject: string;
  professor: string;
  room: string;
  color: string;
  description?: string;
}

export interface SlotIdentifier {
  day: string;
  time: string;
}

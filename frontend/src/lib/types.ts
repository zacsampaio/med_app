export interface DoctorSpecialty {
  _id: string;
  name: string;
  description?: string;
}


export interface Doctor {
  _id: string;
  name: string;
  login: string;
  specialtyId:  string | DoctorSpecialty | null;
  medicalRegistration: string;
  email: string;
  phone: string;
  status: string;
}

export interface Patient {
  _id: string;
  name: string;
  email?: string;
}

export interface Prescription {
  _id: string;
  date: string;
  medicine: string;
  dosage: string;
  instructions: string;
  file?: string; 
}

export interface Appointment {
  _id: string;
  date: Date | null;
  doctorId: string | Doctor | null;
  patientId: string | Patient | null;
  status: string;
}

// Tipagem para os dados da Fake API
export interface FakeApiUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

// Tipagem para o formulário de criação de médico
export interface DoctorFormData {
  name: string;
  login: string;
  password: string;
  medicalSpecialty: string;
  medicalRegistration: string;
  email: string;
  phone: string;
}

export interface Doctor {
  _id: string;
  name: string;
  login: string;
  medicalSpecialty: string;
  medicalRegistration: string;
  email: string;
  phone: string;
}

export interface Patient {
  _id: string;
  name: string;
}

export interface Prescription {
  _id: string;
  date: string;
  medicine: string;
  dosage: string;
  instructions: string;
  file?: string; 
}
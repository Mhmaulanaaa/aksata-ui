// User types
export interface Role {
  role_id: number;
  nama_role: string;
}

export interface User {
  loginpemakai_id: number;
  pegawai_id: number;
  nama_pemakai: string;
  nama_pegawai: string;
  gelardepan?: string;
  gelarbelakang_nama?: string;
  roles: Role[];
}

// Auth types
export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
}

// Login form types
export interface LoginFormData {
  email: string
  password: string
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

// Surgical/Operation types (untuk SiKompas)
export interface Operation {
  id: string
  patientName: string
  operationType: string
  scheduledDate: Date
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
  surgeon: string
  room: string
}

// Add more types as needed for your application

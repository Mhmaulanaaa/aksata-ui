export type PatientStatus = 'Belum Diperiksa' | 'Sudah Diperiksa' | 'Konsultasi'
export interface PatientDetail {
  id: number; nama: string; jenisKelamin: 'Laki-laki' | 'Perempuan'; noRm: string
  dpjp: string; tanggalLahir: string; usia: string; noRegistrasi: string
  tanggalRegistrasi: string; divisi: string; poli: string; instalasi: string
  antrian: string; status: PatientStatus; pelayanan: string; sign: boolean
  checkedIn: boolean; peringatan?: string
}
export interface PatientTab { label: string; value: string; icon: string }

<script setup lang="ts">
import type { PatientDetail } from "~/types/pasien";

defineProps<{
  patient: PatientDetail;
  patientId?: number;
}>();

const emit = defineEmits<{
  (e: "navigate-tab", tab: string): void;
}>();

const navigateToTab = (tab: string) => {
  emit("navigate-tab", tab);
};
// ==========================================
// STATISTIK PELAYANAN
// ==========================================

const stats = computed(() => [
  {
    label: "Total Kunjungan",
    value: "12",
    icon: "i-lucide-calendar-days",
    description: "Seluruh riwayat kunjungan",
    bg: "bg-blue-50 dark:bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    tab: "riwayat",
  },
  {
    label: "Riwayat Asesmen",
    value: "8",
    icon: "i-lucide-clipboard-check",
    description: "Dokumentasi asesmen pasien",
    bg: "bg-violet-50 dark:bg-violet-500/10",
    text: "text-violet-600 dark:text-violet-400",
    tab: "asesmen",
  },
  {
    label: "Asesmen Terakhir",
    value: "10 Nov 2026",
    icon: "i-lucide-file-check",
    description: "Tanggal asesmen terakhir pasien",
    bg: "bg-indigo-50 dark:bg-indigo-500/10",
    text: "text-indigo-600 dark:text-indigo-400",
    tab: "asesmen",
  },
  {
    label: "Diagnosa Aktif",
    value: "2",
    icon: "i-lucide-stethoscope",
    description: "Diagnosa yang tercatat",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    tab: "diagnosa",
  },
  {
    label: "Resep Terakhir",
    value: "1",
    icon: "i-lucide-pill",
    description: "Riwayat resep obat pasien",
    bg: "bg-amber-50 dark:bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    tab: "resep",
  },
]);

// ==========================================
// AKTIVITAS PELAYANAN
// ==========================================

const activities = [
  {
    id: 1,
    date: "05 Nov 2026",
    time: "07:15",
    title: "Registrasi Rawat Jalan",
    detail: "Pasien terdaftar pada pelayanan Poli Mata.",
    category: "Registrasi",
    icon: "i-lucide-clipboard-list",
    status: "Selesai",
  },
  {
    id: 2,
    date: "04 Nov 2026",
    time: "10:30",
    title: "Asesmen Awal",
    detail: "Pengkajian awal oleh perawat poliklinik.",
    category: "Asesmen",
    icon: "i-lucide-clipboard-check",
    status: "Selesai",
  },
  {
    id: 3,
    date: "02 Nov 2026",
    time: "09:20",
    title: "Pemeriksaan Dokter",
    detail: "Pemeriksaan klinis oleh dokter Poli Mata.",
    category: "Pemeriksaan",
    icon: "i-lucide-stethoscope",
    status: "Selesai",
  },
];

// ==========================================
// DATA DEMOGRAFI PASIEN
// ==========================================

const isDemographicOpen = ref(false);

type DemographicField = {
  label: string;
  value: string;
  highlight?: boolean;
  full?: boolean;
};

const demographicGroups: Array<{
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  fields: DemographicField[];
}> = [
  {
    id: "identitas",
    title: "Data Awal",
    description: "Identitas dan informasi dasar pasien",
    icon: "i-lucide-user-round",
    color: "blue",
    fields: [
      { label: "No. Rekam Medik", value: "13178782" },
      { label: "No. Induk Kependudukan", value: "3513105406830002" },
      { label: "No. Rekam Medik Lama", value: "-" },
      { label: "No. Identitas Lain", value: "-" },
      { label: "Nama Pasien", value: "Ny. Wahyu Farida Astutik", highlight: true },
      { label: "Tempat Lahir", value: "MOJOKERTO KOTA" },
      { label: "Tanggal Lahir", value: "14 Juni 1983" },
      { label: "Umur", value: "43 Tahun, 4 Bulan, 28 Hari" },
      { label: "Jenis Kelamin", value: "PEREMPUAN" },
      { label: "Status Perkawinan", value: "KAWIN" },
      { label: "Anak Ke", value: "0 dari 0 bersaudara" },
      { label: "Pekerjaan", value: "Bidan" },
      { label: "Warga Negara", value: "INDONESIA" },
      { label: "Agama", value: "ISLAM" },
      { label: "Suku", value: "-" },
      { label: "Bahasa", value: "-" },
      { label: "Pendidikan", value: "-" },
    ],
  },
  {
    id: "alamat",
    title: "Alamat dan Kontak",
    description: "Informasi alamat kependudukan dan domisili pasien",
    icon: "i-lucide-map-pin",
    color: "emerald",
    fields: [
      {
        label: "Alamat Sesuai KTP",
        value: "DUSUN KEDUNG PAWON, RT 001 / RW 001, SUMBER KEMBAR",
        full: true,
      },
      {
        label: "Alamat Domisili",
        value: "DUSUN KEDUNG PAWON, RT 001 / RW 001, SUMBER KEMBAR",
        full: true,
      },
      { label: "RT / RW (KTP)", value: "- / -" },
      { label: "RT / RW (Domisili)", value: "- / -" },
      { label: "Desa / Kelurahan (KTP)", value: "-" },
      { label: "Desa / Kelurahan (Domisili)", value: "-" },
      { label: "Kecamatan (KTP)", value: "Pakuniran" },
      { label: "Kecamatan (Domisili)", value: "Pakuniran" },
      { label: "Kabupaten / Kota (KTP)", value: "Probolinggo" },
      { label: "Kabupaten / Kota (Domisili)", value: "Probolinggo" },
      { label: "Provinsi (KTP)", value: "Jawa Timur" },
      { label: "Provinsi (Domisili)", value: "Jawa Timur" },
      { label: "Alamat Email", value: "-" },
      { label: "Telepon Pasien", value: "-" },
      { label: "Mobile Pasien", value: "081230805441" },
    ],
  },
  {
    id: "tambahan",
    title: "Informasi Tambahan",
    description: "Informasi keluarga dan identitas lainnya",
    icon: "i-lucide-clipboard-list",
    color: "violet",
    fields: [
      { label: "Nama Ayah", value: "-" },
      { label: "Nama Ibu", value: "-" },
      { label: "Golongan Darah", value: "-" },
    ],
  },
  {
    id: "pengantar",
    title: "Data Pengantar",
    description: "Identitas dan informasi pihak yang mengantar pasien",
    icon: "i-lucide-users",
    color: "amber",
    fields: [
      { label: "Nama Pengantar", value: "HENO PURNIAWATI" },
      { label: "Jenis Kelamin", value: "PEREMPUAN" },
      { label: "No. Identitas", value: "3513105406830002" },
      { label: "Hubungan Keluarga", value: "YANG BERSANGKUTAN" },
      { label: "Tempat Lahir", value: "MOJOKERTO" },
      { label: "Tanggal Lahir", value: "14 Juni 1983" },
      { label: "Umur", value: "43 Tahun, 4 Bulan, 28 Hari" },
      {
        label: "Alamat",
        value: "DUSUN KEDUNG PAWON RT 1 DESA SUMBER KEMBAR, PAKUNIRAN, PROBOLINGGO",
        full: true,
      },
      { label: "No. Telepon", value: "081230418735" },
      { label: "No. Mobile", value: "081230418735" },
    ],
  },
];

// ==========================================
// INFORMASI KUNJUNGAN TERAKHIR
// ==========================================

const latestVisit = {
  number: "RJ-20261105-001",
  date: "05 November 2026",
  time: "07:15 WIB",
  type: "Rawat Jalan",
  clinic: "Poli Mata",
  doctor: "Dokter Penanggung Jawab Pelayanan",
  status: "Selesai",
};

// ==========================================
// RINGKASAN KLINIS
// ==========================================

// Data berikut masih placeholder untuk integrasi EMR.
const clinicalSummary = [
  {
    title: "Diagnosa Utama",
    value: "Belum tersedia",
    code: "-",
    icon: "i-lucide-stethoscope",
    color: "emerald",
  },
  {
    title: "Diagnosa Sekunder",
    value: "Belum tersedia",
    code: "-",
    icon: "i-lucide-activity",
    color: "blue",
  },
  {
    title: "Riwayat Alergi",
    value: "Belum ada data",
    code: "Perlu verifikasi",
    icon: "i-lucide-shield-alert",
    color: "amber",
  },
];

// ==========================================
// TANDA VITAL
// ==========================================

const vitalSigns = [
  {
    label: "Tekanan Darah",
    value: "--/--",
    unit: "mmHg",
    icon: "i-lucide-heart-pulse",
  },
  {
    label: "Denyut Nadi",
    value: "--",
    unit: "bpm",
    icon: "i-lucide-activity",
  },
  {
    label: "Suhu Tubuh",
    value: "--",
    unit: "°C",
    icon: "i-lucide-thermometer",
  },
  {
    label: "Frekuensi Napas",
    value: "--",
    unit: "x/menit",
    icon: "i-lucide-wind",
  },
  {
    label: "SpO₂",
    value: "--",
    unit: "%",
    icon: "i-lucide-lungs",
  },
  {
    label: "Berat Badan",
    value: "--",
    unit: "kg",
    icon: "i-lucide-weight",
  },
];

// ==========================================
// INFORMASI PELAYANAN
// ==========================================

const serviceInformation = [
  { label: "Nama Pasien", value: (patient: PatientDetail) => patient.nama },
  { label: "Dokter Penanggung Jawab", value: (patient: PatientDetail) => patient.dpjp },
  { label: "Poli / Unit Pelayanan", value: (patient: PatientDetail) => patient.poli },
  { label: "Instalasi", value: (patient: PatientDetail) => patient.instalasi },
];
</script>

<template>
  <div class="space-y-6">
    <!-- ===================================== -->
    <!-- HEADER -->
    <!-- ===================================== -->

    <div class="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
      <div class="flex items-start gap-3">
        <div
          class="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
        >
          <UIcon name="i-lucide-layout-dashboard" class="size-5" />
        </div>

        <div>
          <h2 class="text-base font-bold text-slate-800 dark:text-white">
            Ringkasan Pelayanan
          </h2>
          <p class="mt-1 text-xs leading-relaxed text-slate-500">
            Gambaran umum kondisi, riwayat, dan aktivitas pelayanan pasien.
          </p>
        </div>
      </div>

      <div
        class="flex items-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900"
      >
        <UIcon name="i-lucide-clock" class="size-3.5 text-emerald-600" />
        <span class="text-[11px] font-medium text-slate-500">
          Ringkasan Rekam Medis
        </span>
      </div>
    </div>

    <!-- ===================================== -->
    <!-- STATISTIK -->
    <!-- ===================================== -->

    <div class="grid grid-cols-2 gap-3 xl:grid-cols-5">
      <button
        v-for="stat in stats"
        :key="stat.label"
        type="button"
        class="group w-full rounded-2xl border border-slate-200 bg-white p-4 text-left transition-all duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500/40"
        @click="navigateToTab(stat.tab)"
      >
        <div class="flex items-center justify-between gap-2">
          <div
            class="flex size-10 items-center justify-center rounded-xl"
            :class="[stat.bg, stat.text]"
          >
            <UIcon :name="stat.icon" class="size-5" />
          </div>

          <UIcon
            name="i-lucide-arrow-up-right"
            class="size-4 text-slate-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-500"
          />
        </div>

        <p
          class="mt-4 text-2xl font-extrabold tracking-tight text-slate-800 dark:text-white"
        >
          {{ stat.value }}
        </p>

        <p class="mt-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
          {{ stat.label }}
        </p>

        <p class="mt-1 text-[10px] text-slate-400">
          {{ stat.description }}
        </p>
      </button>
    </div>

    <!-- ===================================== -->
    <!-- DATA DEMOGRAFI PASIEN -->
    <!-- ===================================== -->

    <section
      class="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
    >
      <!-- ACCORDION HEADER -->
      <button
        type="button"
        class="flex w-full flex-wrap items-center justify-between gap-3 px-4 py-4 text-left transition-colors hover:bg-slate-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500 dark:hover:bg-slate-800/40"
        :aria-expanded="isDemographicOpen"
        @click="isDemographicOpen = !isDemographicOpen"
      >
        <div class="flex min-w-0 items-center gap-2.5">
          <div
            class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
          >
            <UIcon name="i-lucide-contact-round" class="size-4" />
          </div>

          <div class="min-w-0">
            <h3 class="text-sm font-bold text-slate-800 dark:text-white">
              Data Demografi Pasien
            </h3>
            <p class="mt-0.5 text-[10px] text-slate-400">
              Informasi identitas, kependudukan, dan data keluarga pasien
            </p>
          </div>
        </div>

        <div class="flex shrink-0 items-center gap-2">
          <UBadge color="info" variant="subtle">
            <UIcon name="i-lucide-database" class="mr-1 size-3" />
            Data Pasien
          </UBadge>

          <div
            class="flex size-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-transform duration-300 dark:bg-slate-800 dark:text-slate-400"
            :class="{ 'rotate-180': isDemographicOpen }"
          >
            <UIcon name="i-lucide-chevron-down" class="size-4" />
          </div>
        </div>
      </button>

      <!-- ACCORDION CONTENT -->
      <div
        v-show="isDemographicOpen"
        class="border-t border-slate-100 dark:border-slate-800"
      >
        <div class="space-y-4 p-4">
          <div
            v-for="group in demographicGroups"
            :key="group.id"
            class="overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800"
          >
            <!-- SUB HEADER -->
            <div
              class="flex items-center gap-2.5 border-b border-slate-100 bg-slate-50/70 px-3.5 py-3 dark:border-slate-800 dark:bg-slate-800/40"
            >
              <div
                class="flex size-8 shrink-0 items-center justify-center rounded-lg"
                :class="{
                  'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400':
                    group.color === 'blue',
                  'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400':
                    group.color === 'emerald',
                  'bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400':
                    group.color === 'violet',
                  'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400':
                    group.color === 'amber',
                }"
              >
                <UIcon :name="group.icon" class="size-4" />
              </div>

              <div class="min-w-0">
                <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {{ group.title }}
                </h4>
                <p class="mt-0.5 text-[10px] text-slate-400">
                  {{ group.description }}
                </p>
              </div>
            </div>

            <!-- FIELD INFORMATION -->
            <div
              class="grid grid-cols-1 gap-x-5 gap-y-4 p-3.5 sm:grid-cols-2 xl:grid-cols-4"
            >
              <div
                v-for="field in group.fields"
                :key="field.label"
                class="min-w-0"
                :class="field.full ? 'sm:col-span-2 xl:col-span-4' : ''"
              >
                <p
                  class="text-[9px] font-semibold uppercase tracking-wider text-slate-400"
                >
                  {{ field.label }}
                </p>

                <p
                  class="mt-1.5 break-words text-xs leading-relaxed"
                  :class="
                    field.highlight
                      ? 'font-bold text-emerald-600 dark:text-emerald-400'
                      : 'font-medium text-slate-700 dark:text-slate-300'
                  "
                >
                  {{ field.value || "-" }}
                </p>
              </div>
            </div>
          </div>

          <!-- INFORMASI PRIVASI -->
          <div
            class="flex items-start gap-2 rounded-lg border border-blue-100 bg-blue-50/60 p-3 dark:border-blue-900/40 dark:bg-blue-950/20"
          >
            <UIcon
              name="i-lucide-shield-check"
              class="mt-0.5 size-3.5 shrink-0 text-blue-600 dark:text-blue-400"
            />

            <p class="text-[10px] leading-relaxed text-blue-700 dark:text-blue-400">
              Informasi demografi merupakan data identitas pasien yang digunakan sebagai
              referensi administrasi dan pelayanan kesehatan. Pastikan kesesuaian data
              dengan dokumen identitas resmi pasien.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================================== -->
    <!-- KUNJUNGAN TERAKHIR -->
    <!-- ===================================== -->

    <section
      class="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
    >
      <div
        class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 dark:border-slate-800"
      >
        <div class="flex items-center gap-2.5">
          <div
            class="flex size-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
          >
            <UIcon name="i-lucide-calendar-check" class="size-4" />
          </div>

          <div>
            <h3 class="text-sm font-bold text-slate-800 dark:text-white">
              Kunjungan Terakhir
            </h3>
            <p class="mt-0.5 text-[10px] text-slate-400">
              Informasi pelayanan pasien terakhir
            </p>
          </div>
        </div>

        <UBadge color="success" variant="subtle">
          <UIcon name="i-lucide-check-circle-2" class="mr-1 size-3" />
          {{ latestVisit.status }}
        </UBadge>
      </div>

      <div class="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p class="text-[10px] font-medium uppercase tracking-wider text-slate-400">
            Nomor Registrasi
          </p>
          <p
            class="mt-2 break-all text-xs font-bold text-emerald-600 dark:text-emerald-400"
          >
            {{ latestVisit.number }}
          </p>
        </div>

        <div>
          <p class="text-[10px] font-medium uppercase tracking-wider text-slate-400">
            Tanggal & Waktu
          </p>
          <p class="mt-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
            {{ latestVisit.date }}
          </p>
          <p class="mt-1 text-[10px] text-slate-400">
            {{ latestVisit.time }}
          </p>
        </div>

        <div>
          <p class="text-[10px] font-medium uppercase tracking-wider text-slate-400">
            Jenis Pelayanan
          </p>
          <p class="mt-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
            {{ latestVisit.type }}
          </p>
          <p class="mt-1 text-[10px] text-slate-400">
            {{ latestVisit.clinic }}
          </p>
        </div>

        <div>
          <p class="text-[10px] font-medium uppercase tracking-wider text-slate-400">
            Dokter Penanggung Jawab
          </p>
          <p
            class="mt-2 text-xs font-semibold leading-relaxed text-slate-700 dark:text-slate-200"
          >
            {{ latestVisit.doctor }}
          </p>
        </div>
      </div>
    </section>

    <!-- ===================================== -->
    <!-- INFORMASI PASIEN & AKTIVITAS -->
    <!-- ===================================== -->

    <div class="grid gap-4 xl:grid-cols-3">
      <!-- INFORMASI PELAYANAN -->
      <section
        class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
      >
        <div class="flex items-center gap-2.5">
          <div
            class="flex size-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
          >
            <UIcon name="i-lucide-user-round" class="size-4" />
          </div>
          <div>
            <h3 class="text-sm font-bold text-slate-800 dark:text-white">
              Informasi Pelayanan
            </h3>
            <p class="mt-0.5 text-[10px] text-slate-400">Identitas dan unit pelayanan</p>
          </div>
        </div>

        <div class="mt-5 space-y-4">
          <div
            v-for="item in serviceInformation"
            :key="item.label"
            class="border-b border-slate-100 pb-3 last:border-0 last:pb-0 dark:border-slate-800"
          >
            <p class="text-[10px] font-medium uppercase tracking-wide text-slate-400">
              {{ item.label }}
            </p>
            <p class="mt-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200">
              {{ item.value(patient) || "Belum tersedia" }}
            </p>
          </div>
        </div>
      </section>

      <!-- TIMELINE AKTIVITAS -->
      <section
        class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 xl:col-span-2"
      >
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-2.5">
            <div
              class="flex size-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400"
            >
              <UIcon name="i-lucide-history" class="size-4" />
            </div>
            <div>
              <h3 class="text-sm font-bold text-slate-800 dark:text-white">
                Aktivitas Pelayanan
              </h3>
              <p class="mt-0.5 text-[10px] text-slate-400">
                Riwayat aktivitas medis pasien
              </p>
            </div>
          </div>

          <UBadge color="neutral" variant="subtle">
            {{ activities.length }} Aktivitas
          </UBadge>
        </div>

        <div class="relative mt-5 space-y-5">
          <div
            v-for="(activity, index) in activities"
            :key="activity.id"
            class="relative flex gap-3"
          >
            <!-- GARIS TIMELINE -->
            <div class="relative flex w-9 shrink-0 justify-center">
              <div
                v-if="index !== activities.length - 1"
                class="absolute top-9 bottom-[-24px] w-px bg-slate-200 dark:bg-slate-700"
              />

              <div
                class="relative z-10 flex size-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
              >
                <UIcon :name="activity.icon" class="size-4" />
              </div>
            </div>

            <!-- DETAIL AKTIVITAS -->
            <div class="min-w-0 flex-1 pb-1">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <p class="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {{ activity.title }}
                </p>

                <UBadge color="success" variant="subtle" size="xs">
                  {{ activity.status }}
                </UBadge>
              </div>

              <p class="mt-1 text-[11px] leading-relaxed text-slate-500">
                {{ activity.detail }}
              </p>

              <div class="mt-2 flex flex-wrap items-center gap-2">
                <span class="flex items-center gap-1 text-[10px] text-slate-400">
                  <UIcon name="i-lucide-calendar" class="size-3" />
                  {{ activity.date }}
                </span>
                <span class="text-slate-300">·</span>
                <span class="flex items-center gap-1 text-[10px] text-slate-400">
                  <UIcon name="i-lucide-clock" class="size-3" />
                  {{ activity.time }}
                </span>
                <span
                  class="rounded-md bg-slate-100 px-2 py-0.5 text-[9px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                >
                  {{ activity.category }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- ===================================== -->
    <!-- RINGKASAN KLINIS -->
    <!-- ===================================== -->

    <section
      class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
    >
      <div class="flex items-center gap-2.5">
        <div
          class="flex size-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
        >
          <UIcon name="i-lucide-heart-pulse" class="size-4" />
        </div>

        <div>
          <h3 class="text-sm font-bold text-slate-800 dark:text-white">
            Ringkasan Klinis
          </h3>
          <p class="mt-0.5 text-[10px] text-slate-400">
            Gambaran kondisi klinis berdasarkan rekam medis
          </p>
        </div>
      </div>

      <div class="mt-4 grid gap-3 md:grid-cols-3">
        <div
          v-for="item in clinicalSummary"
          :key="item.title"
          class="rounded-xl border border-slate-100 p-3.5 dark:border-slate-800"
        >
          <div class="flex items-center gap-2">
            <UIcon
              :name="item.icon"
              class="size-4"
              :class="{
                'text-emerald-500': item.color === 'emerald',
                'text-blue-500': item.color === 'blue',
                'text-amber-500': item.color === 'amber',
              }"
            />
            <p class="text-[11px] font-semibold text-slate-500">
              {{ item.title }}
            </p>
          </div>

          <p class="mt-3 text-xs font-bold text-slate-700 dark:text-slate-200">
            {{ item.value }}
          </p>

          <p class="mt-1 text-[10px] text-slate-400">
            {{ item.code }}
          </p>
        </div>
      </div>
    </section>

    <!-- ===================================== -->
    <!-- TANDA VITAL -->
    <!-- ===================================== -->

    <section
      class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
    >
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div class="flex items-center gap-2.5">
          <div
            class="flex size-9 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400"
          >
            <UIcon name="i-lucide-activity" class="size-4" />
          </div>

          <div>
            <h3 class="text-sm font-bold text-slate-800 dark:text-white">
              Tanda Vital Terakhir
            </h3>
            <p class="mt-0.5 text-[10px] text-slate-400">
              Parameter pemeriksaan fisik pasien
            </p>
          </div>
        </div>

        <UBadge color="neutral" variant="subtle"> Belum diperbarui </UBadge>
      </div>

      <div class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        <div
          v-for="vital in vitalSigns"
          :key="vital.label"
          class="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60"
        >
          <div class="flex items-center gap-1.5">
            <UIcon
              :name="vital.icon"
              class="size-3.5 text-emerald-600 dark:text-emerald-400"
            />
            <p class="text-[10px] font-medium text-slate-500">
              {{ vital.label }}
            </p>
          </div>

          <div class="mt-3 flex items-baseline gap-1">
            <span class="text-lg font-extrabold text-slate-700 dark:text-slate-200">
              {{ vital.value }}
            </span>
            <span class="text-[9px] text-slate-400">
              {{ vital.unit }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================================== -->
    <!-- FOOTER INFORMASI -->
    <!-- ===================================== -->

    <div
      class="flex items-start gap-2 rounded-xl border border-blue-100 bg-blue-50/60 p-3.5 dark:border-blue-900/40 dark:bg-blue-950/20"
    >
      <UIcon
        name="i-lucide-info"
        class="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400"
      />

      <p class="text-[10px] leading-relaxed text-blue-700 dark:text-blue-400">
        Ringkasan ini merupakan gambaran umum rekam medis pasien. Informasi klinis,
        diagnosa, alergi, dan tanda vital perlu mengacu pada hasil pemeriksaan serta
        dokumentasi tenaga medis yang berwenang.
      </p>
    </div>
  </div>
</template>

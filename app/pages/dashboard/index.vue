<script setup lang="ts">
import { computed, ref } from "vue";

definePageMeta({
  layout: "default",
});

useHead({
  title: "AKSATA ",
});

/* ================= FILTER & SEARCH ================= */

const searchQuery = ref("");
const activeTab = ref("Belum Diperiksa");
const activeService = ref("Semua");

const showAllPatients = () => {
  activeService.value = "Semua";
  activeTab.value = "Semua Status";
  searchQuery.value = "";
};

const quickFilters = [
  {
    label: "Semua Pasien",
    value: "Semua",
    icon: "i-lucide-users",
  },
  {
    label: "Rawat Jalan",
    value: "Rawat Jalan",
    icon: "i-lucide-stethoscope",
  },
  {
    label: "Rawat Inap",
    value: "Rawat Inap",
    icon: "i-lucide-bed",
  },
  {
    label: "Rawat Darurat",
    value: "Rawat Darurat",
    icon: "i-lucide-ambulance",
  },
  {
    label: "Operasi",
    value: "Operasi",
    icon: "i-lucide-heart-pulse",
  },
  {
    label: "Konsultasi",
    value: "Konsultasi",
    icon: "i-lucide-message-circle",
  },
];

// Filter cepat berdasarkan jenis pelayanan atau konsultasi
const selectQuickFilter = (value: string) => {
  searchQuery.value = "";

  if (value === "Konsultasi") {
    activeService.value = "Semua";
    activeTab.value = "Konsultasi";
    return;
  }

  activeService.value = value;
  activeTab.value = "Semua Status";
};

const activeQuickFilter = computed(() => {
  if (activeTab.value === "Konsultasi") return "Konsultasi";

  if (activeService.value !== "Semua") {
    return activeService.value;
  }

  return activeTab.value === "Semua Status" ? "Semua" : null;
});

/* ================= STATISTICS ================= */

const stats = [
  {
    title: "Total Pasien",
    value: 3817,
    filter: "Semua",
    icon: "i-lucide-users",
    color: "slate",
    iconColor: "text-slate-600 dark:text-slate-300",
    bg: "bg-slate-100 dark:bg-slate-800",
    iconBg: "bg-slate-200 dark:bg-slate-700",
  },
  {
    title: "Rawat Jalan",
    value: 2809,
    filter: "Rawat Jalan",
    icon: "i-lucide-stethoscope",
    color: "violet",
    iconColor: "text-violet-600 dark:text-violet-300",
    bg: "bg-violet-50 dark:bg-violet-950/40",
    iconBg: "bg-violet-100 dark:bg-violet-900/50",
  },
  {
    title: "Rawat Inap",
    value: 936,
    filter: "Rawat Inap",
    icon: "i-lucide-bed",
    color: "sky",
    iconColor: "text-sky-600 dark:text-sky-300",
    bg: "bg-sky-50 dark:bg-sky-950/40",
    iconBg: "bg-sky-100 dark:bg-sky-900/50",
  },
  {
    title: "Rawat Darurat",
    value: 72,
    filter: "Rawat Darurat",
    icon: "i-lucide-ambulance",
    color: "rose",
    iconColor: "text-rose-600 dark:text-rose-300",
    bg: "bg-rose-50 dark:bg-rose-950/40",
    iconBg: "bg-rose-100 dark:bg-rose-900/50",
  },
  {
    title: "Operasi",
    value: 27,
    filter: "Operasi",
    icon: "i-lucide-heart-pulse",
    color: "teal",
    iconColor: "text-teal-600 dark:text-teal-300",
    bg: "bg-teal-50 dark:bg-teal-950/40",
    iconBg: "bg-teal-100 dark:bg-teal-900/50",
  },
];

/* ================= PATIENT DATA ================= */

type Patient = {
  id: number;
  nama: string;
  noRm: string;
  dpjp: string;
  tanggalLahir: string;
  usia: string;
  noRegistrasi: string;
  tanggalRegistrasi: string;
  divisi: string;
  poli: string;
  instalasi: string;
  antrian: string;
  sign: boolean;
  status: "Belum Diperiksa" | "Sudah Diperiksa" | "Konsultasi";
  pelayanan: string;
  checkedIn: boolean;
};

const patients = ref<Patient[]>([
  {
    id: 1,
    nama: "Pasien A",
    noRm: "XXXXXXXX",
    dpjp: "Dokter Spesialis",
    tanggalLahir: "02 November 1972",
    usia: "54 tahun, 0 bulan, 2 hari",
    noRegistrasi: "RJ2611042684",
    tanggalRegistrasi: "04/11/2026 13:47:54",
    divisi: "Anestesi umum",
    poli: "Poli Anestesi",
    instalasi: "Instalasi Rawat Jalan",
    antrian: "ANE-001",
    sign: true,
    status: "Belum Diperiksa",
    pelayanan: "Rawat Jalan",
    checkedIn: false,
  },
  {
    id: 2,
    nama: "Pasien B",
    noRm: "XXXXXXXX",
    dpjp: "Dokter Spesialis",
    tanggalLahir: "04 Maret 1980",
    usia: "46 tahun, 8 bulan, 0 hari",
    noRegistrasi: "RJ2611040340",
    tanggalRegistrasi: "04/11/2026 06:47:00",
    divisi: "Mata Umum",
    poli: "ODC GBPT",
    instalasi: "Bedah Sentral",
    antrian: "MAT-001",
    sign: true,
    status: "Belum Diperiksa",
    pelayanan: "Rawat Jalan",
    checkedIn: true,
  },
  {
    id: 3,
    nama: "Pasien C",
    noRm: "XXXXXXXX",
    dpjp: "Dokter Spesialis",
    tanggalLahir: "12 Januari 1990",
    usia: "36 tahun",
    noRegistrasi: "RJ2611040500",
    tanggalRegistrasi: "04/11/2026 08:30:00",
    divisi: "Penyakit Dalam",
    poli: "Poli Penyakit Dalam",
    instalasi: "Instalasi Rawat Jalan",
    antrian: "INT-003",
    sign: true,
    status: "Sudah Diperiksa",
    pelayanan: "Rawat Jalan",
    checkedIn: true,
  },
  {
    id: 4,
    nama: "Pasien D",
    noRm: "XXXXXXXX",
    dpjp: "Dokter Spesialis",
    tanggalLahir: "18 Juni 1985",
    usia: "41 tahun",
    noRegistrasi: "RJ2611040600",
    tanggalRegistrasi: "04/11/2026 09:15:00",
    divisi: "Jantung",
    poli: "Poli Jantung",
    instalasi: "Instalasi Rawat Jalan",
    antrian: "JAN-002",
    sign: false,
    status: "Konsultasi",
    pelayanan: "Rawat Jalan",
    checkedIn: true,
  },

  {
    id: 5,
    nama: "Pasien E",
    noRm: "XXXXXXXX",
    dpjp: "dr. Spesialis Penyakit Dalam",
    tanggalLahir: "15 Agustus 1965",
    usia: "61 tahun",
    noRegistrasi: "RI2611050012",
    tanggalRegistrasi: "05/11/2026 10:15:00",
    divisi: "Penyakit Dalam",
    poli: "Ruang Rawat Inap Anggrek",
    instalasi: "Instalasi Rawat Inap",
    antrian: "RI-001",
    sign: true,
    status: "Belum Diperiksa",
    pelayanan: "Rawat Inap",
    checkedIn: true,
  },
  {
    id: 6,
    nama: "Pasien F",
    noRm: "XXXXXXXX",
    dpjp: "dr. Spesialis Bedah",
    tanggalLahir: "21 Februari 1995",
    usia: "31 tahun",
    noRegistrasi: "GD2611050025",
    tanggalRegistrasi: "05/11/2026 11:20:00",
    divisi: "Instalasi Gawat Darurat",
    poli: "Ruang Resusitasi",
    instalasi: "Instalasi Gawat Darurat",
    antrian: "IGD-001",
    sign: true,
    status: "Belum Diperiksa",
    pelayanan: "Rawat Darurat",
    checkedIn: true,
  },
  {
    id: 7,
    nama: "Pasien G",
    noRm: "XXXXXXXX",
    dpjp: "dr. Spesialis Bedah Orthopedi",
    tanggalLahir: "10 Mei 1988",
    usia: "38 tahun",
    noRegistrasi: "OP2611050008",
    tanggalRegistrasi: "05/11/2026 12:30:00",
    divisi: "Bedah Orthopedi",
    poli: "Kamar Operasi 2",
    instalasi: "Instalasi Bedah Sentral",
    antrian: "OK-001",
    sign: true,
    status: "Sudah Diperiksa",
    pelayanan: "Operasi",
    checkedIn: true,
  },
]);

// Badge
const getPelayananBadgeClass = (pelayanan: string) => {
  const styles: Record<string, string> = {
    "Rawat Jalan":
      "bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200 dark:bg-violet-500/10 dark:text-violet-400 dark:ring-violet-500/20",

    "Rawat Inap":
      "bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200 dark:bg-sky-500/10 dark:text-sky-400 dark:ring-sky-500/20",

    "Rawat Darurat":
      "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20",

    Operasi:
      "bg-teal-50 text-teal-700 ring-1 ring-inset ring-teal-200 dark:bg-teal-500/10 dark:text-teal-400 dark:ring-teal-500/20",
  };

  return (
    styles[pelayanan] ??
    "bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-200 dark:bg-gray-500/10 dark:text-gray-400 dark:ring-gray-500/20"
  );
};

/* ================= STATUS TABS ================= */

const tabs = computed(() => {
  const statuses = ["Semua Status", "Belum Diperiksa", "Sudah Diperiksa", "Konsultasi"];

  return statuses.map((status) => ({
    label: status === "Semua Status" ? "Semua Pasien" : status,
    value: status,
    count:
      status === "Semua Status"
        ? patients.value.length
        : patients.value.filter((patient) => patient.status === status).length,
    icon:
      status === "Semua Status"
        ? "i-lucide-users"
        : status === "Belum Diperiksa"
        ? "i-lucide-clock"
        : status === "Sudah Diperiksa"
        ? "i-lucide-check-circle"
        : "i-lucide-stethoscope",
  }));
});

/* ================= FILTERED PATIENTS ================= */

const filteredPatients = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase();

  return patients.value.filter((patient) => {
    // Filter berdasarkan jenis pelayanan
    const matchesService =
      activeService.value === "Semua" ||
      patient.pelayanan.toLowerCase() === activeService.value.toLowerCase();

    // Filter berdasarkan status pemeriksaan
    const matchesTab =
      activeTab.value === "Semua Status" || patient.status === activeTab.value;

    // Pencarian berdasarkan informasi pasien
    const searchableFields = [
      patient.nama,
      patient.noRm,
      patient.noRegistrasi,
      patient.dpjp,
      patient.tanggalLahir,
      patient.usia,
      patient.divisi,
      patient.poli,
      patient.instalasi,
      patient.antrian,
      patient.pelayanan,
      patient.status,
    ];

    const matchesSearch =
      !keyword || searchableFields.some((field) => field.toLowerCase().includes(keyword));

    return matchesService && matchesTab && matchesSearch;
  });
});

/* ================= FILTER ACTIONS ================= */

// Klik salah satu card statistik
const selectService = (service: string) => {
  activeService.value = service;

  // Card statistik menampilkan seluruh status pemeriksaan
  activeTab.value = "Semua Status";

  // Bersihkan pencarian sebelumnya
  searchQuery.value = "";
};

// Klik tab status pemeriksaan
const selectTab = (tab: string) => {
  activeTab.value = tab;
};

// Reset seluruh filter
const resetFilters = () => {
  searchQuery.value = "";
  activeService.value = "Semua";
  activeTab.value = "Belum Diperiksa";
};

// Pencarian berjalan secara reaktif ketika pengguna mengetik.
// Tombol Cari Pasien hanya membantu merapikan input.
const applySearch = () => {
  searchQuery.value = searchQuery.value.trim();
};

/* ================= PATIENT ACTIONS ================= */

const handleCheckIn = (patient: Patient) => {
  patient.checkedIn = true;
};

const handleCallDoctor = (patient: Patient) => {
  // TODO: Integrasikan dengan fitur pemanggilan dokter.
  console.log("Panggil dokter:", patient.id);
};

const handlePatientDetail = (patient: Patient) => {
  navigateTo(`/dashboard/pasien/${patient.id}`);
};

/* ================= HELPERS ================= */

const formatNumber = (value: number) => {
  return value.toLocaleString("id-ID");
};
</script>

<template>
  <div
    class="min-h-screen space-y-4 p-1 transition-colors duration-300 dark:bg-slate-950 sm:p-4 lg:p-5"
  >
    <!-- ================= STATISTICS ================= -->

    <section
      class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5"
    >
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        <button
          v-for="stat in stats"
          :key="stat.title"
          type="button"
          :aria-pressed="activeService === stat.filter"
          @click="selectService(stat.filter)"
          :class="[
            'group relative flex min-h-[125px] w-full items-center justify-between overflow-hidden rounded-xl p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900',
            stat.bg,
            activeService === stat.filter
              ? 'ring-2 ring-emerald-500 shadow-md shadow-emerald-500/10'
              : 'ring-1 ring-transparent',
          ]"
        >
          <div class="relative z-10 min-w-0">
            <p class="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              {{ stat.title }}
            </p>

            <p
              class="mt-2 text-2xl font-extrabold tracking-tight text-slate-800 dark:text-white sm:text-3xl"
            >
              {{ formatNumber(stat.value) }}
            </p>

            <p class="mt-1 text-[10px] text-slate-400">
              {{
                activeService === stat.filter ? "Filter aktif" : "Klik untuk melihat data"
              }}
            </p>
          </div>

          <div
            :class="[
              'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12',
              stat.iconBg,
            ]"
          >
            <UIcon :name="stat.icon" :class="['h-5 w-5 sm:h-6 sm:w-6', stat.iconColor]" />
          </div>

          <div
            class="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-white/30 dark:bg-white/5"
          />

          <div
            v-if="activeService === stat.filter"
            class="absolute right-3 top-3 z-20 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm"
          >
            <UIcon name="i-lucide-check" class="h-3 w-3" />
          </div>
        </button>
      </div>
    </section>

    <!-- ================= PATIENT LIST ================= -->

    <section
      class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <!-- PATIENT HEADER -->
      <div
        class="flex flex-col gap-3 border-b border-slate-100 px-4 py-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between sm:px-5"
      >
        <div class="flex items-center gap-3">
          <div
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
          >
            <UIcon name="i-lucide-users-round" class="h-6 w-6" />
          </div>

          <div>
            <h2 class="text-base font-bold text-slate-800 dark:text-white">
              Daftar Pasien
            </h2>

            <p class="mt-1 text-[11px] text-slate-400">
              Monitoring antrean dan pemeriksaan pasien
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <span
            class="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
          >
            <span class="h-2 w-2 rounded-full bg-emerald-500" />
            Pelayanan Aktif
          </span>
        </div>
      </div>

      <!-- SEARCH -->

      <div class="px-4 py-4 sm:px-5">
        <form class="flex flex-col gap-2 sm:flex-row" @submit.prevent="applySearch">
          <div class="relative flex-1">
            <UIcon
              name="i-lucide-search"
              class="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            />

            <input
              v-model="searchQuery"
              type="search"
              placeholder="Cari nama, No. RM, registrasi, DPJP, poli, instalasi..."
              class="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-xs text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            />

            <button
              v-if="searchQuery"
              type="button"
              aria-label="Hapus pencarian"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-rose-500"
              @click="searchQuery = ''"
            >
              <UIcon name="i-lucide-x" class="h-4 w-4" />
            </button>
          </div>

          <UButton
            type="submit"
            color="primary"
            icon="i-lucide-search"
            class="h-11 justify-center rounded-xl px-5"
          >
            Cari Pasien
          </UButton>
        </form>
      </div>

      <!-- STATUS TABS -->

      <div class="px-4 pb-4 sm:px-5">
        <div
          class="grid grid-cols-1 gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800 sm:grid-cols-2 xl:grid-cols-4"
        >
          <button
            v-for="tab in tabs"
            :key="tab.value"
            type="button"
            :class="[
              'flex min-h-10 items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200',
              activeTab === tab.value
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'text-slate-500 hover:bg-white hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white',
            ]"
            @click="selectTab(tab.value)"
          >
            <UIcon :name="tab.icon" class="h-4 w-4" />

            {{ tab.label }}

            <span
              :class="[
                'rounded-md px-1.5 py-0.5 text-[10px]',
                activeTab === tab.value
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300',
              ]"
            >
              {{ tab.count }}
            </span>
          </button>
        </div>
      </div>

      <!-- TABLE -->
      <!-- ================= PATIENT QUEUE CARDS ================= -->

      <div class="px-4 pb-5 sm:px-5">
        <!-- QUEUE SUMMARY -->
        <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 class="text-sm font-bold text-slate-800 dark:text-white">
              Antrean Pelayanan
            </h3>

            <p class="mt-1 text-[11px] text-slate-400">
              Daftar pasien berdasarkan status pemeriksaan
            </p>

            <!-- ACTIVE FILTER INDICATORS -->
            <div class="mt-3 flex flex-wrap items-center gap-2">
              <span
                class="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
              >
                <UIcon name="i-lucide-filter" class="h-3 w-3" />
                {{ activeService === "Semua" ? "Semua Jenis Pelayanan" : activeService }}
              </span>

              <span
                class="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300"
              >
                <UIcon name="i-lucide-clipboard-check" class="h-3 w-3" />
                {{ activeTab === "Semua Status" ? "Semua Status" : activeTab }}
              </span>
            </div>
          </div>

          <!-- MONITORING STATUS -->
          <div class="flex items-center gap-2">
            <span
              class="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
            >
              <span class="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              Monitoring Aktif
            </span>

            <span
              class="rounded-lg bg-slate-100 px-3 py-2 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            >
              {{ filteredPatients.length }} Pasien
            </span>
          </div>
        </div>

        <!-- PATIENT LIST -->
        <div class="space-y-3">
          <article
            v-for="patient in filteredPatients"
            :key="patient.id"
            class="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-800"
          >
            <!-- TOP ACCENT -->
            <div
              :class="[
                'h-1 w-full',
                patient.status === 'Belum Diperiksa'
                  ? 'bg-amber-400'
                  : patient.status === 'Sudah Diperiksa'
                  ? 'bg-emerald-500'
                  : 'bg-violet-500',
              ]"
            />

            <div class="p-4 sm:p-5">
              <!-- CARD HEADER -->
              <div
                class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"
              >
                <div class="flex min-w-0 items-center gap-3">
                  <div
                    class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                  >
                    <UIcon name="i-lucide-user-round" class="h-6 w-6" />
                  </div>

                  <div class="min-w-0">
                    <button
                      type="button"
                      class="truncate text-left text-sm font-bold text-slate-800 transition-colors hover:text-emerald-600 dark:text-white dark:hover:text-emerald-400"
                      @click="handlePatientDetail(patient)"
                    >
                      {{ patient.nama }}
                    </button>

                    <div
                      class="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400"
                    >
                      <span>
                        No. RM:
                        <strong class="text-slate-700 dark:text-slate-200">
                          {{ patient.noRm }}
                        </strong>
                      </span>

                      <span class="text-slate-300 dark:text-slate-700">•</span>

                      <span>{{ patient.usia }}</span>
                    </div>
                  </div>
                </div>

                <div class="flex flex-wrap items-center gap-2 sm:justify-end">
                  <span
                    :class="[
                      'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold',
                      patient.status === 'Belum Diperiksa'
                        ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                        : patient.status === 'Sudah Diperiksa'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                        : 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
                    ]"
                  >
                    <span
                      :class="[
                        'h-1.5 w-1.5 rounded-full',
                        patient.status === 'Belum Diperiksa'
                          ? 'bg-amber-500'
                          : patient.status === 'Sudah Diperiksa'
                          ? 'bg-emerald-500'
                          : 'bg-violet-500',
                      ]"
                    />
                    {{ patient.status }}
                  </span>

                  <span
                    class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold"
                    :class="getPelayananBadgeClass(patient.pelayanan)"
                  >
                    {{ patient.pelayanan }}
                  </span>
                </div>
              </div>

              <!-- INFORMATION GRID -->
              <div class="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <!-- REGISTRATION -->
                <div class="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
                  <div class="mb-2 flex items-center gap-2">
                    <UIcon name="i-lucide-clipboard-list" class="h-4 w-4 text-blue-500" />
                    <span
                      class="text-[10px] font-bold uppercase tracking-wider text-slate-400"
                    >
                      Registrasi
                    </span>
                  </div>

                  <p
                    class="break-all text-xs font-bold text-slate-700 dark:text-slate-200"
                  >
                    {{ patient.noRegistrasi }}
                  </p>

                  <p class="mt-1 text-[10px] text-slate-500 dark:text-slate-400">
                    {{ patient.tanggalRegistrasi }}
                  </p>
                </div>

                <!-- DOCTOR -->
                <div class="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
                  <div class="mb-2 flex items-center gap-2">
                    <UIcon name="i-lucide-user-round" class="h-4 w-4 text-violet-500" />
                    <span
                      class="text-[10px] font-bold uppercase tracking-wider text-slate-400"
                    >
                      DPJP
                    </span>
                  </div>

                  <p class="text-xs font-bold text-slate-700 dark:text-slate-200">
                    {{ patient.dpjp }}
                  </p>

                  <p class="mt-1 text-[10px] text-slate-500 dark:text-slate-400">
                    Tgl. Lahir: {{ patient.tanggalLahir }}
                  </p>
                </div>

                <!-- LOCATION -->
                <div class="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
                  <div class="mb-2 flex items-center gap-2">
                    <UIcon name="i-lucide-map-pin" class="h-4 w-4 text-emerald-500" />
                    <span
                      class="text-[10px] font-bold uppercase tracking-wider text-slate-400"
                    >
                      Lokasi Pelayanan
                    </span>
                  </div>

                  <p class="text-xs font-bold text-slate-700 dark:text-slate-200">
                    {{ patient.poli }}
                  </p>

                  <p class="mt-1 text-[10px] text-slate-500 dark:text-slate-400">
                    {{ patient.divisi }}
                  </p>

                  <p class="mt-1 text-[10px] text-slate-500 dark:text-slate-400">
                    {{ patient.instalasi }}
                  </p>
                </div>

                <!-- QUEUE -->
                <div
                  class="flex flex-col justify-between rounded-xl border border-emerald-100 bg-emerald-50/70 p-3 dark:border-emerald-900/40 dark:bg-emerald-950/30"
                >
                  <div>
                    <div class="mb-2 flex items-center gap-2">
                      <UIcon
                        name="i-lucide-ticket"
                        class="h-4 w-4 text-emerald-600 dark:text-emerald-400"
                      />
                      <span
                        class="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400"
                      >
                        Nomor Antrean
                      </span>
                    </div>

                    <p
                      class="text-xl font-extrabold tracking-wide text-emerald-700 dark:text-emerald-300"
                    >
                      {{ patient.antrian }}
                    </p>
                  </div>

                  <div class="mt-2 flex items-center justify-between">
                    <span
                      class="text-[10px] text-emerald-700/70 dark:text-emerald-400/70"
                    >
                      Status Sign
                    </span>

                    <span
                      :class="[
                        'flex items-center gap-1 text-[10px] font-bold',
                        patient.sign
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-slate-400',
                      ]"
                    >
                      <UIcon
                        :name="
                          patient.sign ? 'i-lucide-check-circle' : 'i-lucide-circle-x'
                        "
                        class="h-3.5 w-3.5"
                      />
                      {{ patient.sign ? "Tersedia" : "Belum Ada" }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- CARD FOOTER / ACTIONS -->
              <div
                class="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between"
              >
                <div class="flex items-center gap-2">
                  <span
                    class="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300"
                  >
                    <UIcon name="i-lucide-info" class="h-4 w-4" />
                  </span>

                  <div>
                    <p
                      class="text-[10px] font-semibold text-slate-600 dark:text-slate-300"
                    >
                      Informasi Pelayanan
                    </p>

                    <p class="text-[10px] text-slate-400">
                      {{ patient.instalasi }}
                    </p>
                  </div>
                </div>

                <div class="flex flex-wrap items-center gap-2">
                  <UButton
                    color="neutral"
                    variant="outline"
                    size="sm"
                    icon="i-lucide-eye"
                    class="justify-center rounded-lg"
                    @click="handlePatientDetail(patient)"
                  >
                    Detail Pasien
                  </UButton>

                  <UButton
                    v-if="!patient.checkedIn"
                    color="success"
                    size="sm"
                    icon="i-lucide-log-in"
                    class="justify-center rounded-lg"
                    @click="handleCheckIn(patient)"
                  >
                    Check In
                  </UButton>

                  <UButton
                    v-else
                    color="success"
                    variant="soft"
                    size="sm"
                    icon="i-lucide-check"
                    class="justify-center rounded-lg"
                    disabled
                  >
                    Sudah Check In
                  </UButton>

                  <UButton
                    color="info"
                    size="sm"
                    icon="i-lucide-volume-2"
                    class="justify-center rounded-lg"
                    @click="handleCallDoctor(patient)"
                  >
                    Panggil Dokter
                  </UButton>
                </div>
              </div>
            </div>
          </article>

          <!-- EMPTY STATE -->
          <div
            v-if="filteredPatients.length === 0"
            class="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-16 text-center dark:border-slate-700 dark:bg-slate-900"
          >
            <div
              class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800"
            >
              <UIcon name="i-lucide-users-round" class="h-7 w-7" />
            </div>

            <h3 class="mt-4 text-sm font-bold text-slate-700 dark:text-slate-200">
              Tidak Ada Pasien
            </h3>

            <p class="mx-auto mt-1 max-w-md text-xs leading-relaxed text-slate-400">
              Tidak ditemukan pasien dengan kriteria
              <strong>{{ activeService }}</strong>
              dan status
              <strong>{{ activeTab }}</strong
              >. Coba ubah filter atau kata kunci pencarian.
            </p>

            <UButton
              color="primary"
              variant="soft"
              size="sm"
              icon="i-lucide-refresh-cw"
              class="mt-4 rounded-lg"
              @click="resetFilters"
            >
              Reset Filter
            </UButton>
          </div>
        </div>

        <!-- FOOTER -->
        <div class="mt-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <p class="text-[11px] text-slate-400">
            Menampilkan
            <strong class="text-slate-700 dark:text-slate-200">
              {{ filteredPatients.length }}
            </strong>
            pasien dari
            <strong class="text-slate-700 dark:text-slate-200">
              {{ activeService === "Semua" ? "semua pelayanan" : activeService }}
            </strong>
            dengan status
            <strong class="text-emerald-600 dark:text-emerald-400">
              {{ activeTab === "Semua Status" ? "semua status" : activeTab }}
            </strong>
          </p>

          <div class="flex flex-wrap items-center gap-2">
            <UButton
              color="neutral"
              variant="outline"
              size="sm"
              icon="i-lucide-refresh-cw"
              class="rounded-lg"
              @click="resetFilters"
            >
              Reset Filter
            </UButton>

            <UButton
              color="primary"
              variant="soft"
              size="sm"
              trailing-icon="i-lucide-arrow-right"
              class="rounded-lg"
              @click="showAllPatients"
            >
              Lihat Semua
            </UButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

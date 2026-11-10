<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from "vue";
import type { Component } from "vue";
import type { PatientDetail, PatientTab } from "~/types/pasien";
import PatientHeader from "~/components/pasien/PatientHeader.vue";
import PatientNavigation from "~/components/pasien/PatientNavigation.vue";
import PatientWarning from "~/components/pasien/PatientWarning.vue";

definePageMeta({ layout: "default" });
useHead({ title: "Detail Pasien | AKSARA" });
const route = useRoute();
const patientId = computed(() => Number(route.params.id));

// Dummy data sementara. Ganti dengan API Laravel berdasarkan ID pasien saat integrasi.
const dummyPatients: PatientDetail[] = [
  {
    id: 1,
    nama: "Ny. Wahyu Farida Astutik",
    jenisKelamin: "Perempuan",
    noRm: "13225220",
    dpjp: "ADY DWI PRAKOSA, dr., SpM. (K)",
    tanggalLahir: "26 Februari 1983",
    usia: "43 tahun, 8 bulan, 10 hari",
    noRegistrasi: "RJ2611050179",
    tanggalRegistrasi: "05 November 2026 06:27:54",
    divisi: "Vitreoretina",
    poli: "Mata",
    instalasi: "Instalasi Rawat Jalan",
    antrian: "MAT-001",
    status: "Belum Diperiksa",
    pelayanan: "Rawat Jalan",
    sign: true,
    checkedIn: true,
    peringatan: "Pasien memiliki 1 resep iter yang belum diambil dalam 3 bulan terakhir.",
  },
  {
    id: 2,
    nama: "Pasien B",
    jenisKelamin: "Laki-laki",
    noRm: "13225221",
    dpjp: "Dokter Spesialis",
    tanggalLahir: "04 Maret 1980",
    usia: "46 tahun, 8 bulan",
    noRegistrasi: "RJ2611040340",
    tanggalRegistrasi: "04 November 2026 06:47:00",
    divisi: "Mata Umum",
    poli: "ODC GBPT",
    instalasi: "Bedah Sentral",
    antrian: "MAT-002",
    status: "Belum Diperiksa",
    pelayanan: "Rawat Jalan",
    sign: true,
    checkedIn: true,
  },
  {
    id: 3,
    nama: "Pasien C",
    jenisKelamin: "Perempuan",
    noRm: "13225222",
    dpjp: "Dokter Spesialis",
    tanggalLahir: "12 Januari 1990",
    usia: "36 tahun",
    noRegistrasi: "RJ2611040500",
    tanggalRegistrasi: "04 November 2026 08:30:00",
    divisi: "Penyakit Dalam",
    poli: "Poli Penyakit Dalam",
    instalasi: "Instalasi Rawat Jalan",
    antrian: "INT-003",
    status: "Sudah Diperiksa",
    pelayanan: "Rawat Jalan",
    sign: true,
    checkedIn: true,
  },
  {
    id: 4,
    nama: "Pasien D",
    jenisKelamin: "Laki-laki",
    noRm: "13225223",
    dpjp: "Dokter Spesialis",
    tanggalLahir: "18 Juni 1985",
    usia: "41 tahun",
    noRegistrasi: "RJ2611040600",
    tanggalRegistrasi: "04 November 2026 09:15:00",
    divisi: "Jantung",
    poli: "Poli Jantung",
    instalasi: "Instalasi Rawat Jalan",
    antrian: "JAN-002",
    status: "Konsultasi",
    pelayanan: "Rawat Jalan",
    sign: false,
    checkedIn: true,
  },
];
const patient = computed(() => dummyPatients.find((p) => p.id === patientId.value));
const activeTab = ref("ringkasan");
const tabs: PatientTab[] = [
  { label: "Ringkasan", value: "ringkasan", icon: "i-lucide-layout-dashboard" },
  { label: "Asesmen", value: "asesmen", icon: "i-lucide-clipboard-check" },
  { label: "Pemeriksaan", value: "pemeriksaan", icon: "i-lucide-stethoscope" },
  { label: "Diagnosa", value: "diagnosa", icon: "i-lucide-notebook-text" },
  { label: "Resep", value: "resep", icon: "i-lucide-pill" },
  { label: "Riwayat Medis", value: "riwayat", icon: "i-lucide-history" },
];
const navigateToTab = (tab: string) => {
  const isValidTab = tabs.some((item) => item.value === tab);

  if (!isValidTab) return;

  activeTab.value = tab;
};
// Setiap tab menjadi async chunk; komponen baru dimuat saat tab dipilih.
const tabComponents: Record<string, Component> = {
  ringkasan: defineAsyncComponent(
    () => import("~/components/pasien/tabs/RingkasanTab.vue")
  ),
  asesmen: defineAsyncComponent(
    () => import("~/components/pasien/asesmen/TabAsesmen.vue")
  ),
  pemeriksaan: defineAsyncComponent(
    () => import("~/components/pasien/tabs/PemeriksaanTab.vue")
  ),
  diagnosa: defineAsyncComponent(
    () => import("~/components/pasien/tabs/DiagnosaTab.vue")
  ),
  resep: defineAsyncComponent(() => import("~/components/pasien/tabs/ResepTab.vue")),
  riwayat: defineAsyncComponent(() => import("~/components/pasien/tabs/RiwayatTab.vue")),
};
const activeComponent = computed(() => tabComponents[activeTab.value]);
const openHistory = () => {
  activeTab.value = "riwayat";
};
const openInformation = () => {
  /* TODO: tampilkan modal informasi pasien */
};
</script>

<template>
  <div v-if="patient" class="min-h-screen space-y-4 p-1 sm:p-4 lg:p-5">
    <div class="flex flex-wrap items-center gap-2 text-xs text-slate-500">
      <NuxtLink to="/dashboard" class="hover:text-emerald-600">Beranda</NuxtLink
      ><UIcon name="i-lucide-chevron-right" class="h-3 w-3" /><NuxtLink
        to="/dashboard"
        class="hover:text-emerald-600"
        >Dashboard Pasien</NuxtLink
      ><UIcon name="i-lucide-chevron-right" class="h-3 w-3" /><span
        class="font-semibold text-emerald-600"
        >Detail Pasien</span
      >
    </div>
    <PatientHeader
      :patient="patient"
      @open-information="openInformation"
      @open-history="openHistory"
    />
    <PatientWarning v-if="patient.peringatan" :message="patient.peringatan" />
    <PatientNavigation v-model="activeTab" :tabs="tabs" />
    <section class="min-h-[360px]">
      <KeepAlive :max="4">
        <component
          :is="activeComponent"
          :key="`${patient.id}-${activeTab}`"
          :patient="patient"
          :patient-id="patient.id"
          @navigate-tab="navigateToTab"
        />
      </KeepAlive>
    </section>
    <div
      class="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 dark:border-slate-800"
    >
      <p class="text-[11px] text-slate-400">
        ID Pasien: {{ patient.id }} · Tampilan data simulasi
      </p>
      <UButton
        color="neutral"
        variant="outline"
        icon="i-lucide-arrow-left"
        size="sm"
        to="/dashboard"
        >Kembali ke Dashboard</UButton
      >
    </div>
  </div>
  <div
    v-else
    class="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-center"
  >
    <UIcon name="i-lucide-user-round-x" class="h-10 w-10 text-slate-400" />
    <p class="text-sm font-semibold">Data pasien tidak ditemukan.</p>
    <UButton to="/dashboard" color="primary" variant="outline"
      >Kembali ke Dashboard</UButton
    >
  </div>
</template>

<script setup lang="ts">
import type { PatientDetail } from "~/types/pasien";
defineProps<{ patient: PatientDetail }>();
const stats = [
  { label: "Total Kunjungan", value: "12", icon: "i-lucide-calendar-days" },
  { label: "Riwayat Asesmen", value: "8", icon: "i-lucide-clipboard-check" },
  { label: "Diagnosa Aktif", value: "2", icon: "i-lucide-stethoscope" },
  { label: "Resep Terakhir", value: "1", icon: "i-lucide-pill" },
];
const activities = [
  { date: "05 Nov 2026 · 07:15", title: "Registrasi Rawat Jalan", detail: "Poli Mata" },
  { date: "04 Nov 2026 · 10:30", title: "Asesmen Awal", detail: "Perawat Poliklinik" },
  { date: "02 Nov 2026 · 09:20", title: "Pemeriksaan Dokter", detail: "Poli Mata" },
];
</script>
<template>
  <div class="space-y-5">
    <div>
      <h2 class="text-base font-bold text-slate-800 dark:text-white">
        Ringkasan Pelayanan
      </h2>
      <p class="mt-1 text-xs text-slate-500">
        Ikhtisar informasi dan aktivitas pelayanan pasien.
      </p>
    </div>
    <div class="grid grid-cols-2 gap-3 xl:grid-cols-4">
      <div
        v-for="s in stats"
        :key="s.label"
        class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
      >
        <div class="flex items-center justify-between gap-2">
          <p class="text-xs text-slate-500">{{ s.label }}</p>
          <UIcon :name="s.icon" class="h-5 w-5 text-emerald-600" />
        </div>
        <p class="mt-3 text-2xl font-extrabold text-slate-800 dark:text-white">
          {{ s.value }}
        </p>
      </div>
    </div>
    <div class="grid gap-4 xl:grid-cols-3">
      <section
        class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 xl:col-span-2"
      >
        <h3 class="text-sm font-bold">Aktivitas Terakhir</h3>
        <div class="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
          <div v-for="a in activities" :key="a.title" class="flex gap-3 py-3 first:pt-0">
            <span class="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <div>
              <p class="text-xs font-semibold">{{ a.title }}</p>
              <p class="mt-1 text-[11px] text-slate-500">{{ a.detail }} · {{ a.date }}</p>
            </div>
            <UBadge class="ml-auto" color="success" variant="subtle">Selesai</UBadge>
          </div>
        </div>
      </section>
      <section
        class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
      >
        <h3 class="text-sm font-bold">Informasi Pelayanan</h3>
        <dl class="mt-4 space-y-3">
          <div
            v-for="x in [
              { l: 'Nama Pasien', v: patient.nama },
              { l: 'DPJP', v: patient.dpjp },
              { l: 'Poli', v: patient.poli },
              { l: 'Instalasi', v: patient.instalasi },
            ]"
            :key="x.l"
          >
            <dt class="text-[11px] text-slate-400">{{ x.l }}</dt>
            <dd class="mt-1 text-xs font-semibold">{{ x.v }}</dd>
          </div>
        </dl>
      </section>
    </div>
  </div>
</template>

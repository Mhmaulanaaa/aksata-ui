<script setup lang="ts">
defineProps<{ patient?: unknown; patientId?: number }>();
import { computed, ref } from "vue";
const page = ref(1);
const size = 3;
const histories = [
  {
    date: "05 November 2026",
    time: "07:15",
    unit: "Poli Mata",
    doctor: "dr. Spesialis Mata",
    type: "Rawat Jalan",
    status: "Berlangsung",
  },
  {
    date: "02 November 2026",
    time: "09:20",
    unit: "Poli Mata",
    doctor: "dr. Spesialis Mata",
    type: "Rawat Jalan",
    status: "Selesai",
  },
  {
    date: "18 Oktober 2026",
    time: "10:05",
    unit: "Poli Penyakit Dalam",
    doctor: "dr. Spesialis Penyakit Dalam",
    type: "Rawat Jalan",
    status: "Selesai",
  },
  {
    date: "12 September 2026",
    time: "08:40",
    unit: "Instalasi Gawat Darurat",
    doctor: "Dokter Jaga",
    type: "IGD",
    status: "Selesai",
  },
];
const rows = computed(() => histories.slice((page.value - 1) * size, page.value * size));
const pages = Math.ceil(histories.length / size);
</script>
<template>
  <div class="space-y-5">
    <div>
      <h2 class="text-base font-bold">Riwayat Medis</h2>
      <p class="mt-1 text-xs text-slate-500">
        Riwayat kunjungan dan pelayanan pasien sebelumnya.
      </p>
    </div>
    <div class="space-y-3">
      <article
        v-for="h in rows"
        :key="h.date + h.time"
        class="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p class="text-sm font-bold">{{ h.unit }}</p>
          <p class="mt-1 text-[11px] text-slate-500">{{ h.date }} · {{ h.time }}</p>
          <p class="mt-1 text-xs">{{ h.doctor }}</p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <UBadge color="neutral" variant="subtle">{{ h.type }}</UBadge
          ><UBadge
            :color="h.status === 'Selesai' ? 'success' : 'warning'"
            variant="subtle"
            >{{ h.status }}</UBadge
          ><UButton color="neutral" variant="outline" size="xs" icon="i-lucide-eye"
            >Detail</UButton
          >
        </div>
      </article>
    </div>
    <div class="flex flex-wrap items-center justify-between gap-3">
      <p class="text-[11px] text-slate-400">
        Menampilkan {{ rows.length }} dari {{ histories.length }} kunjungan.
      </p>
      <div class="flex items-center gap-2">
        <UButton
          color="neutral"
          variant="outline"
          size="xs"
          :disabled="page <= 1"
          @click="page--"
          >Sebelumnya</UButton
        ><span class="text-xs text-slate-500">{{ page }} / {{ pages }}</span
        ><UButton
          color="neutral"
          variant="outline"
          size="xs"
          :disabled="page >= pages"
          @click="page++"
          >Berikutnya</UButton
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ patient?: unknown; patientId?: number }>();
const prescriptions = [
  {
    number: "RSP-20261105-001",
    date: "05 Nov 2026",
    doctor: "dr. Spesialis Mata",
    items: 2,
    status: "Menunggu",
  },
  {
    number: "RSP-20261102-004",
    date: "02 Nov 2026",
    doctor: "dr. Spesialis Mata",
    items: 3,
    status: "Selesai",
  },
];
</script>
<template>
  <div class="space-y-5">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 class="text-base font-bold">Resep dan Obat</h2>
        <p class="mt-1 text-xs text-slate-500">
          Daftar resep yang diterbitkan untuk pasien.
        </p>
      </div>
      <UButton color="primary" icon="i-lucide-plus" size="sm">Buat Resep</UButton>
    </div>
    <div class="grid gap-3 xl:grid-cols-2">
      <article
        v-for="r in prescriptions"
        :key="r.number"
        class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
      >
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-bold">{{ r.number }}</p>
            <p class="mt-1 text-[11px] text-slate-500">{{ r.date }}</p>
          </div>
          <UBadge
            :color="r.status === 'Selesai' ? 'success' : 'warning'"
            variant="subtle"
            >{{ r.status }}</UBadge
          >
        </div>
        <div
          class="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60"
        >
          <div>
            <p class="text-[10px] text-slate-400">Dokter</p>
            <p class="mt-1 text-xs font-semibold">{{ r.doctor }}</p>
          </div>
          <div>
            <p class="text-[10px] text-slate-400">Jumlah item</p>
            <p class="mt-1 text-xs font-semibold">{{ r.items }} obat</p>
          </div>
        </div>
        <div class="mt-3 flex justify-end">
          <UButton color="neutral" variant="outline" size="xs" icon="i-lucide-eye"
            >Detail Resep</UButton
          >
        </div>
      </article>
    </div>
  </div>
</template>

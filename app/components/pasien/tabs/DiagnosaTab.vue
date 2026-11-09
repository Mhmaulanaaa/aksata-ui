<script setup lang="ts">
defineProps<{ patient?: unknown; patientId?: number }>();
const diagnoses = [
  {
    code: "H25.9",
    name: "Katarak senilis, tidak spesifik",
    type: "Utama",
    date: "05 Nov 2026",
    status: "Aktif",
  },
  {
    code: "I10",
    name: "Hipertensi esensial (primer)",
    type: "Sekunder",
    date: "05 Nov 2026",
    status: "Aktif",
  },
];
</script>
<template>
  <div class="space-y-5">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <div
          class="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
        >
          <UIcon name="i-lucide-notebook-text" class="size-5" />
        </div>
        <div>
          <h2 class="text-base font-bold">Diagnosa Pasien</h2>
          <p class="mt-1 text-xs text-slate-500">
            Daftar diagnosa yang tercatat pada pelayanan pasien.
          </p>
        </div>
      </div>
      <UButton color="primary" icon="i-lucide-plus" size="sm">Tambah Diagnosa</UButton>
    </div>
    <div
      class="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
    >
      <table class="w-full min-w-[650px] text-left text-xs">
        <thead class="bg-slate-50 text-[10px] uppercase text-slate-500 dark:bg-slate-800">
          <tr>
            <th class="p-4">Kode ICD</th>
            <th class="p-4">Nama Diagnosa</th>
            <th class="p-4">Jenis</th>
            <th class="p-4">Tanggal</th>
            <th class="p-4">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
          <tr v-for="d in diagnoses" :key="d.code">
            <td class="p-4 font-bold text-emerald-600">{{ d.code }}</td>
            <td class="p-4 font-medium">{{ d.name }}</td>
            <td class="p-4">{{ d.type }}</td>
            <td class="p-4">{{ d.date }}</td>
            <td class="p-4">
              <UBadge color="success" variant="subtle">{{ d.status }}</UBadge>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

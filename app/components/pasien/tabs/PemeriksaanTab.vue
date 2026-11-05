<script setup lang="ts">
defineProps<{ patient?: unknown; patientId?: number }>();
import { reactive, ref } from "vue";
const type = ref("SOAP");
const form = reactive({
  subjektif: "Pasien mengeluhkan penglihatan kabur pada mata kanan.",
  objektif: "Kesadaran compos mentis. Pemeriksaan awal dalam batas pemantauan.",
  assessment: "Perlu evaluasi lanjutan oleh dokter spesialis mata.",
  planning: "Dilakukan pemeriksaan lanjutan sesuai indikasi klinis.",
});
const fields = [
  {
    key: "subjektif",
    label: "Subjektif (S)",
    hint: "Keluhan dan informasi dari pasien.",
  },
  {
    key: "objektif",
    label: "Objektif (O)",
    hint: "Hasil pemeriksaan fisik dan penunjang.",
  },
  { key: "assessment", label: "Asesmen (A)", hint: "Kesimpulan atau penilaian klinis." },
  { key: "planning", label: "Planning (P)", hint: "Rencana tindakan dan tindak lanjut." },
] as const;
</script>
<template>
  <div class="space-y-5">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 class="text-base font-bold">Pemeriksaan Klinis</h2>
        <p class="mt-1 text-xs text-slate-500">Contoh formulir pemeriksaan (dummy UI).</p>
      </div>
      <UBadge color="warning" variant="subtle">Belum tersimpan</UBadge>
    </div>
    <div class="flex gap-2 border-b border-slate-200 dark:border-slate-800">
      <button
        v-for="t in ['SOAP', 'SOAPIE', 'ADIME']"
        :key="t"
        class="border-b-2 px-4 py-3 text-xs font-bold"
        :class="
          type === t
            ? 'border-emerald-500 text-emerald-600'
            : 'border-transparent text-slate-400'
        "
        @click="type = t"
      >
        {{ t }}
      </button>
    </div>
    <div class="grid gap-4 lg:grid-cols-2">
      <div
        v-for="f in fields"
        :key="f.key"
        class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
      >
        <label :for="f.key" class="text-sm font-bold">{{ f.label }}</label>
        <p class="mt-1 text-[11px] text-slate-500">{{ f.hint }}</p>
        <textarea
          :id="f.key"
          v-model="form[f.key]"
          rows="4"
          class="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-5 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-800"
        />
      </div>
    </div>
    <div class="flex justify-end gap-2">
      <UButton color="neutral" variant="outline">Simpan Draft</UButton
      ><UButton color="primary" icon="i-lucide-save">Simpan Pemeriksaan</UButton>
    </div>
  </div>
</template>

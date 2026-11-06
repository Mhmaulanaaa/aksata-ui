<script setup lang="ts">
import { computed, ref } from "vue";

defineProps<{
  patient?: unknown;
  patientId?: number;
}>();

type Assessment = {
  id: number;
  title: string;
  date: string;
  author: string;
  status: "Selesai" | "Draft";
};

const selectedId = ref<number | null>(null);

const items: Assessment[] = [
  {
    id: 1,
    title: "Asesmen Awal Keperawatan",
    date: "05 Nov 2026, 07:20",
    author: "Perawat Poliklinik",
    status: "Selesai",
  },
  {
    id: 2,
    title: "Skrining Risiko Jatuh",
    date: "05 Nov 2026, 07:25",
    author: "Perawat Poliklinik",
    status: "Selesai",
  },
  {
    id: 3,
    title: "Skrining Nyeri",
    date: "05 Nov 2026, 07:28",
    author: "Perawat Poliklinik",
    status: "Draft",
  },
];

const selectedAssessment = computed(
  () => items.find((item) => item.id === selectedId.value) ?? null
);

// Dummy data inputan asesmen
const assessmentData: Record<
  number,
  { title: string; fields: { label: string; value: string }[] }[]
> = {
  1: [
    {
      title: "Pengkajian Awal",
      fields: [
        { label: "Keluhan Utama", value: "Nyeri perut bagian kanan bawah" },
        {
          label: "Riwayat Penyakit Sekarang",
          value: "Nyeri dirasakan sejak 2 hari yang lalu",
        },
        { label: "Riwayat Penyakit Dahulu", value: "Tidak ada" },
        { label: "Riwayat Alergi", value: "Tidak ada alergi" },
        { label: "Riwayat Pengobatan", value: "Tidak ada" },
      ],
    },
    {
      title: "Tanda-Tanda Vital",
      fields: [
        { label: "Tekanan Darah", value: "120/80 mmHg" },
        { label: "Nadi", value: "82 x/menit" },
        { label: "Suhu", value: "36.8 °C" },
        { label: "Pernapasan", value: "20 x/menit" },
        { label: "Saturasi Oksigen", value: "98%" },
      ],
    },
    {
      title: "Pemeriksaan Fisik",
      fields: [
        { label: "Keadaan Umum", value: "Tampak sakit ringan" },
        { label: "Kesadaran", value: "Compos Mentis" },
        { label: "Kondisi Fisik", value: "Dalam batas normal" },
        { label: "Mobilisasi", value: "Mandiri" },
      ],
    },
    {
      title: "Kesimpulan Keperawatan",
      fields: [
        { label: "Masalah Keperawatan", value: "Nyeri akut" },
        { label: "Rencana Tindakan", value: "Monitoring nyeri dan tanda vital" },
        { label: "Catatan", value: "Pasien dalam observasi" },
      ],
    },
  ],
  2: [
    {
      title: "Skrining Risiko Jatuh",
      fields: [
        { label: "Riwayat Jatuh", value: "Tidak" },
        { label: "Gangguan Berjalan", value: "Tidak" },
        { label: "Alat Bantu Berjalan", value: "Tidak menggunakan" },
        { label: "Status Kesadaran", value: "Sadar penuh" },
        { label: "Kategori Risiko", value: "Risiko rendah" },
      ],
    },
  ],
  3: [
    {
      title: "Skrining Nyeri",
      fields: [
        { label: "Keluhan Nyeri", value: "Ya" },
        { label: "Lokasi Nyeri", value: "Perut kanan bawah" },
        { label: "Skala Nyeri", value: "4 / 10" },
        { label: "Karakteristik Nyeri", value: "Seperti tertusuk" },
        { label: "Durasi", value: "Hilang timbul" },
      ],
    },
  ],
};

const selectedData = computed(() =>
  selectedId.value ? assessmentData[selectedId.value] ?? [] : []
);
</script>

<template>
  <div class="space-y-4">
    <!-- DETAIL ASESMEN -->
    <template v-if="selectedAssessment">
      <div class="flex items-center gap-3">
        <UButton
          icon="i-lucide-arrow-left"
          color="neutral"
          variant="soft"
          size="sm"
          @click="selectedId = null"
        />

        <div class="min-w-0 flex-1">
          <h2 class="text-sm font-bold text-slate-800 dark:text-white">
            {{ selectedAssessment.title }}
          </h2>
          <p class="text-xs text-slate-500">Detail hasil asesmen pasien</p>
        </div>

        <UBadge
          :color="selectedAssessment.status === 'Selesai' ? 'success' : 'warning'"
          variant="subtle"
        >
          {{ selectedAssessment.status }}
        </UBadge>
      </div>

      <!-- Informasi pengisian -->
      <div class="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
        <div class="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
          <span class="flex items-center gap-2">
            <UIcon name="i-lucide-user" class="size-4" />
            {{ selectedAssessment.author }}
          </span>
          <span class="flex items-center gap-2">
            <UIcon name="i-lucide-calendar" class="size-4" />
            {{ selectedAssessment.date }}
          </span>
        </div>
      </div>

      <!-- Data inputan -->
      <div
        v-for="section in selectedData"
        :key="section.title"
        class="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800"
      >
        <div
          class="border-b border-slate-100 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900"
        >
          <h3 class="text-xs font-bold text-slate-700 dark:text-slate-200">
            {{ section.title }}
          </h3>
        </div>

        <div class="divide-y divide-slate-100 px-4 dark:divide-slate-800">
          <div
            v-for="field in section.fields"
            :key="field.label"
            class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[190px_1fr] sm:gap-4"
          >
            <span class="text-xs text-slate-500">
              {{ field.label }}
            </span>

            <span class="text-sm font-medium text-slate-800 dark:text-slate-200">
              {{ field.value || "-" }}
            </span>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <UButton
          color="neutral"
          variant="outline"
          size="sm"
          icon="i-lucide-arrow-left"
          @click="selectedId = null"
        >
          Kembali
        </UButton>
      </div>
    </template>

    <!-- DAFTAR ASESMEN -->
    <template v-else>
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-sm font-bold text-slate-800 dark:text-white">Asesmen Pasien</h2>
          <p class="mt-1 text-xs text-slate-500">Riwayat asesmen dan skrining pasien.</p>
        </div>

        <UBadge color="neutral" variant="subtle"> {{ items.length }} Asesmen </UBadge>
      </div>

      <div
        class="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900"
      >
        <button
          v-for="item in items"
          :key="item.id"
          type="button"
          class="flex w-full items-center gap-3 p-4 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
          @click="selectedId = item.id"
        >
          <div
            class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
          >
            <UIcon name="i-lucide-clipboard-list" class="size-5" />
          </div>

          <div class="min-w-0 flex-1">
            <p class="text-sm font-semibold text-slate-800 dark:text-white">
              {{ item.title }}
            </p>
            <p class="mt-1 text-xs text-slate-500">{{ item.author }} · {{ item.date }}</p>
          </div>

          <div class="flex shrink-0 items-center gap-2">
            <UBadge
              :color="item.status === 'Selesai' ? 'success' : 'warning'"
              variant="subtle"
              size="sm"
            >
              {{ item.status }}
            </UBadge>

            <UIcon name="i-lucide-chevron-right" class="size-4 text-slate-400" />
          </div>
        </button>
      </div>
    </template>
  </div>
</template>

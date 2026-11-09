<script setup lang="ts">
import { computed, ref } from "vue";

defineProps<{
  patient?: unknown;
  patientId?: number;
}>();

type HistoryStatus = "Berlangsung" | "Selesai";

interface MedicalHistory {
  id: number;
  date: string;
  time: string;
  unit: string;
  doctor: string;
  type: string;
  status: HistoryStatus;
  complaint: string;
  diagnosis: string;
  action: string;
  followUp: string;
}

const page = ref(1);
const size = 3;
const expandedHistory = ref<number | null>(null);

const histories: MedicalHistory[] = [
  {
    id: 1,
    date: "05 November 2026",
    time: "07:15",
    unit: "Poli Mata",
    doctor: "dr. Spesialis Mata",
    type: "Rawat Jalan",
    status: "Berlangsung",
    complaint: "Pasien mengeluhkan penglihatan kabur pada mata kanan.",
    diagnosis: "Evaluasi gangguan penglihatan mata kanan.",
    action: "Pemeriksaan awal dan evaluasi kondisi mata.",
    followUp: "Menunggu hasil pemeriksaan dan evaluasi dokter.",
  },
  {
    id: 2,
    date: "02 November 2026",
    time: "09:20",
    unit: "Poli Mata",
    doctor: "dr. Spesialis Mata",
    type: "Rawat Jalan",
    status: "Selesai",
    complaint: "Pasien datang untuk konsultasi keluhan penglihatan.",
    diagnosis: "Keluhan gangguan penglihatan.",
    action: "Pemeriksaan klinis dan konsultasi dokter.",
    followUp: "Kontrol kembali sesuai jadwal yang ditentukan dokter.",
  },
  {
    id: 3,
    date: "18 Oktober 2026",
    time: "10:05",
    unit: "Poli Penyakit Dalam",
    doctor: "dr. Spesialis Penyakit Dalam",
    type: "Rawat Jalan",
    status: "Selesai",
    complaint: "Pasien datang untuk pemeriksaan kesehatan.",
    diagnosis: "Evaluasi kondisi kesehatan umum.",
    action: "Pemeriksaan fisik dan konsultasi medis.",
    followUp: "Pemantauan kondisi sesuai anjuran dokter.",
  },
  {
    id: 4,
    date: "12 September 2026",
    time: "08:40",
    unit: "Instalasi Gawat Darurat",
    doctor: "Dokter Jaga",
    type: "IGD",
    status: "Selesai",
    complaint: "Pasien datang untuk mendapatkan pemeriksaan di IGD.",
    diagnosis: "Evaluasi awal kondisi pasien.",
    action: "Pemeriksaan awal dan penanganan sesuai indikasi.",
    followUp: "Tindak lanjut sesuai instruksi dokter.",
  },
];

const rows = computed(() => histories.slice((page.value - 1) * size, page.value * size));

const pages = computed(() => Math.max(1, Math.ceil(histories.length / size)));

const totalVisits = computed(() => histories.length);

const completedVisits = computed(
  () => histories.filter((item) => item.status === "Selesai").length
);

const ongoingVisits = computed(
  () => histories.filter((item) => item.status === "Berlangsung").length
);

const toggleDetail = (id: number) => {
  expandedHistory.value = expandedHistory.value === id ? null : id;
};

const getStatusColor = (status: HistoryStatus) => {
  return status === "Selesai" ? "success" : "warning";
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "IGD":
      return "i-lucide-ambulance";
    case "Rawat Inap":
      return "i-lucide-bed";
    default:
      return "i-lucide-stethoscope";
  }
};
</script>

<template>
  <div class="space-y-5">
    <!-- HEADER -->
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <div
          class="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
        >
          <UIcon name="i-lucide-history" class="size-5" />
        </div>

        <div>
          <h2 class="text-base font-bold text-slate-900 dark:text-white">
            Riwayat Medis
          </h2>
          <p class="mt-0.5 text-xs text-slate-500">
            Rekam jejak kunjungan dan pelayanan medis pasien.
          </p>
        </div>
      </div>

      <UBadge color="neutral" variant="subtle"> {{ totalVisits }} Kunjungan </UBadge>
    </div>

    <!-- SUMMARY -->
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <div
        class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs font-medium text-slate-500"> Total Kunjungan </span>
          <UIcon name="i-lucide-calendar-days" class="size-4 text-slate-400" />
        </div>

        <p class="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
          {{ totalVisits }}
        </p>
        <p class="mt-1 text-[10px] text-slate-400">Seluruh riwayat medis</p>
      </div>

      <div
        class="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/5"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs font-medium text-emerald-700 dark:text-emerald-400">
            Kunjungan Selesai
          </span>
          <UIcon name="i-lucide-circle-check" class="size-4 text-emerald-500" />
        </div>

        <p class="mt-2 text-2xl font-bold text-emerald-700 dark:text-emerald-400">
          {{ completedVisits }}
        </p>
        <p class="mt-1 text-[10px] text-emerald-600/70 dark:text-emerald-400/70">
          Pelayanan telah selesai
        </p>
      </div>

      <div
        class="rounded-xl border border-amber-200 bg-amber-50/60 p-4 dark:border-amber-500/20 dark:bg-amber-500/5"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs font-medium text-amber-700 dark:text-amber-400">
            Sedang Berlangsung
          </span>
          <UIcon name="i-lucide-clock" class="size-4 text-amber-500" />
        </div>

        <p class="mt-2 text-2xl font-bold text-amber-700 dark:text-amber-400">
          {{ ongoingVisits }}
        </p>
        <p class="mt-1 text-[10px] text-amber-600/70 dark:text-amber-400/70">
          Pelayanan aktif
        </p>
      </div>
    </div>

    <!-- TIMELINE HEADER -->
    <div class="flex flex-wrap items-center justify-between gap-2">
      <div>
        <h3 class="text-sm font-bold text-slate-800 dark:text-white">
          Riwayat Kunjungan
        </h3>
        <p class="mt-0.5 text-[11px] text-slate-500">
          Urutan kunjungan berdasarkan tanggal pelayanan.
        </p>
      </div>

      <div class="flex items-center gap-3 text-[10px] text-slate-500">
        <span class="flex items-center gap-1.5">
          <span class="size-2 rounded-full bg-emerald-500" />
          Selesai
        </span>
        <span class="flex items-center gap-1.5">
          <span class="size-2 rounded-full bg-amber-500" />
          Berlangsung
        </span>
      </div>
    </div>

    <!-- TIMELINE LIST -->
    <div v-if="rows.length" class="space-y-3">
      <article
        v-for="(h, index) in rows"
        :key="h.id"
        class="relative rounded-2xl border border-slate-200 bg-white transition-colors dark:border-slate-800 dark:bg-slate-900"
      >
        <div class="p-4 sm:p-5">
          <div class="flex gap-3 sm:gap-4">
            <!-- TIMELINE INDICATOR -->
            <div class="flex flex-col items-center">
              <div
                class="flex size-10 shrink-0 items-center justify-center rounded-xl"
                :class="
                  h.status === 'Selesai'
                    ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
                    : 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400'
                "
              >
                <UIcon :name="getTypeIcon(h.type)" class="size-5" />
              </div>
            </div>

            <!-- MAIN CONTENT -->
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-start justify-between gap-2">
                <div class="min-w-0">
                  <h4 class="text-sm font-bold text-slate-900 dark:text-white">
                    {{ h.unit }}
                  </h4>

                  <p class="mt-1 text-[11px] text-slate-500">
                    {{ h.doctor }}
                  </p>
                </div>

                <UBadge :color="getStatusColor(h.status)" variant="subtle" size="sm">
                  {{ h.status }}
                </UBadge>
              </div>

              <!-- DATE & TYPE -->
              <div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span class="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <UIcon name="i-lucide-calendar" class="size-3.5" />
                  {{ h.date }}
                </span>

                <span class="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <UIcon name="i-lucide-clock" class="size-3.5" />
                  {{ h.time }} WIB
                </span>

                <UBadge color="neutral" variant="subtle" size="xs">
                  {{ h.type }}
                </UBadge>
              </div>

              <!-- COMPLAINT PREVIEW -->
              <div class="mt-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
                <p
                  class="text-[10px] font-semibold uppercase tracking-wide text-slate-400"
                >
                  Keluhan Utama
                </p>
                <p class="mt-1 text-xs leading-5 text-slate-700 dark:text-slate-300">
                  {{ h.complaint }}
                </p>
              </div>

              <!-- DETAIL TOGGLE -->
              <button
                type="button"
                class="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 transition-colors hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                @click="toggleDetail(h.id)"
              >
                {{ expandedHistory === h.id ? "Tutup detail" : "Lihat detail kunjungan" }}

                <UIcon
                  :name="
                    expandedHistory === h.id
                      ? 'i-lucide-chevron-up'
                      : 'i-lucide-chevron-down'
                  "
                  class="size-3.5"
                />
              </button>

              <!-- EXPANDED DETAIL -->
              <div
                v-if="expandedHistory === h.id"
                class="mt-4 grid gap-3 border-t border-slate-100 pt-4 dark:border-slate-800 sm:grid-cols-2"
              >
                <div>
                  <div class="flex items-center gap-2">
                    <UIcon
                      name="i-lucide-clipboard-list"
                      class="size-4 text-emerald-500"
                    />
                    <p class="text-xs font-bold text-slate-700 dark:text-slate-200">
                      Diagnosis / Asesmen
                    </p>
                  </div>

                  <p class="mt-2 text-xs leading-5 text-slate-500">
                    {{ h.diagnosis }}
                  </p>
                </div>

                <div>
                  <div class="flex items-center gap-2">
                    <UIcon name="i-lucide-activity" class="size-4 text-emerald-500" />
                    <p class="text-xs font-bold text-slate-700 dark:text-slate-200">
                      Tindakan / Pelayanan
                    </p>
                  </div>

                  <p class="mt-2 text-xs leading-5 text-slate-500">
                    {{ h.action }}
                  </p>
                </div>

                <div class="sm:col-span-2">
                  <div class="flex items-center gap-2">
                    <UIcon
                      name="i-lucide-calendar-check"
                      class="size-4 text-emerald-500"
                    />
                    <p class="text-xs font-bold text-slate-700 dark:text-slate-200">
                      Rencana Tindak Lanjut
                    </p>
                  </div>

                  <p class="mt-2 text-xs leading-5 text-slate-500">
                    {{ h.followUp }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>

    <!-- EMPTY STATE -->
    <div
      v-else
      class="rounded-2xl border border-dashed border-slate-300 py-12 text-center dark:border-slate-700"
    >
      <UIcon name="i-lucide-folder-open" class="mx-auto size-9 text-slate-300" />
      <p class="mt-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
        Belum ada riwayat medis
      </p>
      <p class="mt-1 text-xs text-slate-400">
        Riwayat kunjungan pasien akan ditampilkan di sini.
      </p>
    </div>

    <!-- PAGINATION -->
    <div
      v-if="histories.length > 0"
      class="flex flex-col gap-3 border-t border-slate-100 pt-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between"
    >
      <p class="text-[11px] text-slate-400">
        Menampilkan
        <span class="font-semibold text-slate-700 dark:text-slate-200">
          {{ (page - 1) * size + 1 }}–{{ Math.min(page * size, histories.length) }}
        </span>
        dari {{ histories.length }} kunjungan
      </p>

      <div class="flex items-center gap-2">
        <UButton
          color="neutral"
          variant="outline"
          size="xs"
          icon="i-lucide-chevron-left"
          :disabled="page <= 1"
          @click="page--"
        >
          Sebelumnya
        </UButton>

        <span class="min-w-12 text-center text-xs font-medium text-slate-500">
          {{ page }} / {{ pages }}
        </span>

        <UButton
          color="neutral"
          variant="outline"
          size="xs"
          trailing-icon="i-lucide-chevron-right"
          :disabled="page >= pages"
          @click="page++"
        >
          Berikutnya
        </UButton>
      </div>
    </div>
  </div>
</template>

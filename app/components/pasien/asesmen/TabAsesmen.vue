<script setup lang="ts">
import { computed, ref } from "vue";

import AssessmentList from "./AssessmentList.vue";
import AssessmentDetail from "./AssessmentDetail.vue";

type AssessmentStatus = "Selesai" | "Draft" | "Belum Diisi";

type AssessmentField = {
  label: string;
  value: string;
};

type AssessmentSection = {
  title: string;
  description?: string;
  icon: string;
  fields: AssessmentField[];
};

type AssessmentVital = {
  label: string;
  value: string;
  unit: string;
  icon: string;
};

type AssessmentDefinition = {
  id: number;
  code: string;
  title: string;
  description: string;
  icon: string;
  profession: string;
  sections: AssessmentSection[];
  vitals?: AssessmentVital[];
};

type AssessmentTransaction = {
  id: number;
  catalogId: number;
  code: string;
  title: string;
  description: string;
  date: string;
  dateISO?: string;
  author: string;
  status: AssessmentStatus;
  icon: string;
  profession: string;
  sections: AssessmentSection[];
  vitals?: AssessmentVital[];
};

// ==========================================
// MASTER JENIS ASESMEN
// ==========================================

const assessmentDefinitions = ref<AssessmentDefinition[]>([
  {
    id: 1,
    code: "ADM",
    title: "Asesmen Awal Medis",
    description: "Pengkajian awal kondisi medis pasien oleh dokter.",
    icon: "i-lucide-stethoscope",
    profession: "Dokter",
    sections: [
      {
        title: "Keluhan Utama",
        description: "Informasi keluhan utama pasien.",
        icon: "i-lucide-message-square",
        fields: [
          { label: "Keluhan Utama", value: "" },
          { label: "Riwayat Penyakit Sekarang", value: "" },
          { label: "Riwayat Penyakit Dahulu", value: "" },
          { label: "Riwayat Alergi", value: "" },
        ],
      },
      {
        title: "Pemeriksaan Fisik",
        description: "Hasil pemeriksaan fisik pasien.",
        icon: "i-lucide-activity",
        fields: [
          { label: "Keadaan Umum", value: "" },
          { label: "Kesadaran", value: "" },
          { label: "Pemeriksaan Fisik", value: "" },
        ],
      },
      {
        title: "Rencana Medis",
        description: "Kesimpulan dan rencana tindak lanjut.",
        icon: "i-lucide-clipboard-check",
        fields: [
          { label: "Diagnosis Kerja", value: "" },
          { label: "Rencana Pemeriksaan", value: "" },
          { label: "Rencana Terapi", value: "" },
        ],
      },
    ],
    vitals: [
      { label: "Tekanan Darah", value: "", unit: "mmHg", icon: "i-lucide-heart-pulse" },
      { label: "Nadi", value: "", unit: "x/menit", icon: "i-lucide-activity" },
      { label: "Suhu", value: "", unit: "°C", icon: "i-lucide-thermometer" },
      { label: "Pernapasan", value: "", unit: "x/menit", icon: "i-lucide-waves" },
    ],
  },
  {
    id: 2,
    code: "ADK",
    title: "Asesmen Awal Keperawatan",
    description: "Pengkajian awal kebutuhan dan kondisi keperawatan pasien.",
    icon: "i-lucide-heart-pulse",
    profession: "Perawat",
    sections: [
      {
        title: "Pengkajian Umum",
        description: "Identitas dan kondisi awal pasien.",
        icon: "i-lucide-user-round",
        fields: [
          { label: "Keluhan Utama", value: "" },
          { label: "Riwayat Penyakit", value: "" },
          { label: "Riwayat Alergi", value: "" },
          { label: "Keadaan Umum", value: "" },
        ],
      },
      {
        title: "Pengkajian Fisik",
        description: "Hasil observasi kondisi fisik pasien.",
        icon: "i-lucide-stethoscope",
        fields: [
          { label: "Kesadaran", value: "" },
          { label: "Kondisi Pernapasan", value: "" },
          { label: "Kondisi Sirkulasi", value: "" },
          { label: "Kondisi Mobilisasi", value: "" },
        ],
      },
      {
        title: "Kebutuhan Keperawatan",
        description: "Identifikasi kebutuhan dan intervensi keperawatan.",
        icon: "i-lucide-clipboard-list",
        fields: [
          { label: "Kebutuhan Dasar", value: "" },
          { label: "Masalah Keperawatan", value: "" },
          { label: "Rencana Keperawatan", value: "" },
        ],
      },
    ],
    vitals: [
      { label: "Tekanan Darah", value: "", unit: "mmHg", icon: "i-lucide-heart-pulse" },
      { label: "Nadi", value: "", unit: "x/menit", icon: "i-lucide-activity" },
      { label: "Suhu", value: "", unit: "°C", icon: "i-lucide-thermometer" },
      { label: "Pernapasan", value: "", unit: "x/menit", icon: "i-lucide-waves" },
    ],
  },
  {
    id: 3,
    code: "SRJ",
    title: "Skrining Risiko Jatuh",
    description: "Identifikasi faktor risiko jatuh dan tindakan pencegahan.",
    icon: "i-lucide-person-standing",
    profession: "Perawat",
    sections: [
      {
        title: "Identifikasi Risiko Jatuh",
        description: "Pengkajian faktor risiko jatuh pasien.",
        icon: "i-lucide-shield-alert",
        fields: [
          { label: "Riwayat Jatuh", value: "" },
          { label: "Gangguan Berjalan", value: "" },
          { label: "Gangguan Penglihatan", value: "" },
          { label: "Penggunaan Alat Bantu", value: "" },
        ],
      },
      {
        title: "Hasil Skrining",
        description: "Kesimpulan hasil penilaian risiko.",
        icon: "i-lucide-clipboard-check",
        fields: [
          { label: "Skor Risiko", value: "" },
          { label: "Kategori Risiko", value: "" },
          { label: "Tindakan Pencegahan", value: "" },
        ],
      },
    ],
  },
  {
    id: 4,
    code: "SNY",
    title: "Skrining Nyeri",
    description: "Pengkajian lokasi, karakteristik, dan intensitas nyeri.",
    icon: "i-lucide-activity",
    profession: "Perawat",
    sections: [
      {
        title: "Pengkajian Nyeri",
        description: "Identifikasi karakteristik nyeri yang dirasakan pasien.",
        icon: "i-lucide-heart-pulse",
        fields: [
          { label: "Ada Nyeri", value: "" },
          { label: "Lokasi Nyeri", value: "" },
          { label: "Karakteristik Nyeri", value: "" },
          { label: "Durasi Nyeri", value: "" },
          { label: "Skala Nyeri", value: "" },
        ],
      },
      {
        title: "Penanganan Nyeri",
        description: "Rencana penanganan dan evaluasi.",
        icon: "i-lucide-clipboard-check",
        fields: [
          { label: "Tindakan yang Diberikan", value: "" },
          { label: "Evaluasi Nyeri", value: "" },
        ],
      },
    ],
  },
  {
    id: 5,
    code: "AGZ",
    title: "Asesmen Gizi",
    description: "Pengkajian status gizi dan kebutuhan nutrisi pasien.",
    icon: "i-lucide-apple",
    profession: "Penunjang",
    sections: [
      {
        title: "Skrining Gizi",
        description: "Pengkajian status gizi pasien.",
        icon: "i-lucide-clipboard-list",
        fields: [
          { label: "Berat Badan", value: "" },
          { label: "Tinggi Badan", value: "" },
          { label: "Indeks Massa Tubuh", value: "" },
          { label: "Riwayat Penurunan Berat Badan", value: "" },
        ],
      },
      {
        title: "Rencana Nutrisi",
        description: "Kebutuhan dan rencana pemenuhan nutrisi.",
        icon: "i-lucide-apple",
        fields: [
          { label: "Status Gizi", value: "" },
          { label: "Kebutuhan Kalori", value: "" },
          { label: "Rencana Diet", value: "" },
        ],
      },
    ],
  },
]);

// ==========================================
// TRANSAKSI ASESMEN PASIEN
// ==========================================

// Contoh transaksi yang sudah pernah diisi.
// Nantinya sumber data ini diganti dengan API backend.
const assessmentTransactions = ref<AssessmentTransaction[]>([
  {
    id: 1001,
    catalogId: 2,
    code: "ADK-20261112-001",
    title: "Asesmen Awal Keperawatan",
    description: "Pengkajian awal kebutuhan dan kondisi keperawatan pasien.",
    date: "12 Nov 2026",
    dateISO: "2026-11-12",
    author: "Perawat Poliklinik",
    status: "Selesai",
    icon: "i-lucide-heart-pulse",
    profession: "Perawat",
    sections: [
      {
        title: "Pengkajian Umum",
        description: "Identitas dan kondisi awal pasien.",
        icon: "i-lucide-user-round",
        fields: [
          { label: "Keluhan Utama", value: "Penglihatan mata kanan kabur" },
          { label: "Riwayat Penyakit", value: "Hipertensi" },
          { label: "Riwayat Alergi", value: "Tidak ada alergi yang diketahui" },
          { label: "Keadaan Umum", value: "Baik" },
        ],
      },
      {
        title: "Pengkajian Fisik",
        description: "Hasil observasi kondisi fisik pasien.",
        icon: "i-lucide-stethoscope",
        fields: [
          { label: "Kesadaran", value: "Compos Mentis" },
          { label: "Kondisi Pernapasan", value: "Normal" },
          { label: "Kondisi Sirkulasi", value: "Stabil" },
          { label: "Kondisi Mobilisasi", value: "Mandiri" },
        ],
      },
      {
        title: "Kebutuhan Keperawatan",
        description: "Identifikasi kebutuhan dan intervensi keperawatan.",
        icon: "i-lucide-clipboard-list",
        fields: [
          { label: "Kebutuhan Dasar", value: "Tidak ada gangguan" },
          { label: "Masalah Keperawatan", value: "Gangguan persepsi sensori" },
          { label: "Rencana Keperawatan", value: "Observasi dan edukasi pasien" },
        ],
      },
    ],
    vitals: [
      {
        label: "Tekanan Darah",
        value: "130/80",
        unit: "mmHg",
        icon: "i-lucide-heart-pulse",
      },
      { label: "Nadi", value: "82", unit: "x/menit", icon: "i-lucide-activity" },
      { label: "Suhu", value: "36.5", unit: "°C", icon: "i-lucide-thermometer" },
      { label: "Pernapasan", value: "20", unit: "x/menit", icon: "i-lucide-waves" },
    ],
  },
  {
    id: 1002,
    catalogId: 3,
    code: "SRJ-20261112-001",
    title: "Skrining Risiko Jatuh",
    description: "Identifikasi faktor risiko jatuh dan tindakan pencegahan.",
    date: "12 Nov 2026",
    dateISO: "2026-11-12",
    author: "Perawat Poliklinik",
    status: "Draft",
    icon: "i-lucide-person-standing",
    profession: "Perawat",
    sections: [
      {
        title: "Identifikasi Risiko Jatuh",
        description: "Pengkajian faktor risiko jatuh pasien.",
        icon: "i-lucide-shield-alert",
        fields: [
          { label: "Riwayat Jatuh", value: "Tidak ada" },
          { label: "Gangguan Berjalan", value: "Tidak ada" },
          { label: "Gangguan Penglihatan", value: "Ada" },
          { label: "Penggunaan Alat Bantu", value: "Tidak menggunakan" },
        ],
      },
      {
        title: "Hasil Skrining",
        description: "Kesimpulan hasil penilaian risiko.",
        icon: "i-lucide-clipboard-check",
        fields: [
          { label: "Skor Risiko", value: "25" },
          { label: "Kategori Risiko", value: "Risiko rendah" },
          { label: "Tindakan Pencegahan", value: "" },
        ],
      },
    ],
  },
]);

// ==========================================
// STATE
// ==========================================

const selectedAssessmentId = ref<number | null>(null);
const searchQuery = ref("");

const selectedAssessment = computed(() => {
  return (
    assessmentTransactions.value.find((item) => item.id === selectedAssessmentId.value) ??
    null
  );
});

// ==========================================
// HELPER
// ==========================================

function cloneData<T>(data: T): T {
  return JSON.parse(JSON.stringify(data)) as T;
}

function getTodayDate() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDate(date: string) {
  if (!date) return "-";

  const parsedDate = new Date(`${date}T12:00:00`);

  if (Number.isNaN(parsedDate.getTime())) return date;

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(parsedDate);
}

// ==========================================
// LIST DATA
// ==========================================

const assessmentList = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase();

  return assessmentDefinitions.value
    .filter((definition) => {
      return (
        !keyword ||
        definition.title.toLowerCase().includes(keyword) ||
        definition.code.toLowerCase().includes(keyword) ||
        definition.profession.toLowerCase().includes(keyword)
      );
    })
    .map((definition) => {
      const latestTransaction = assessmentTransactions.value
        .filter((transaction) => transaction.catalogId === definition.id)
        .sort((a, b) => b.id - a.id)[0];

      return {
        ...definition,
        status: latestTransaction?.status ?? ("Belum Diisi" as AssessmentStatus),
        date: latestTransaction?.date ?? "-",
        author: latestTransaction?.author ?? "-",
        transactionId: latestTransaction?.id ?? null,
      };
    });
});

// ==========================================
// OPEN ASSESSMENT
// ==========================================

function openAssessment(catalogId: number) {
  const latestTransaction = assessmentTransactions.value
    .filter((item) => item.catalogId === catalogId)
    .sort((a, b) => b.id - a.id)[0];

  if (!latestTransaction) {
    return;
  }

  selectedAssessmentId.value = latestTransaction.id;
}

function createAssessment(catalogId: number) {
  const definition = assessmentDefinitions.value.find((item) => item.id === catalogId);

  if (!definition) return;

  const newId =
    Math.max(1000, ...assessmentTransactions.value.map((item) => item.id)) + 1;

  const today = getTodayDate();

  const newTransaction: AssessmentTransaction = {
    id: newId,
    catalogId: definition.id,
    code: `${definition.code}-${today.replaceAll("-", "")}-${String(newId).slice(-3)}`,
    title: definition.title,
    description: definition.description,
    date: formatDate(today),
    dateISO: today,
    author: "",
    status: "Belum Diisi",
    icon: definition.icon,
    profession: definition.profession,
    sections: cloneData(definition.sections),
    vitals: cloneData(definition.vitals ?? []),
  };

  assessmentTransactions.value.push(newTransaction);

  // Langsung buka formulir transaksi yang baru dibuat.
  selectedAssessmentId.value = newId;
}

// ==========================================
// NAVIGATION
// ==========================================

function backToList() {
  selectedAssessmentId.value = null;
}

// ==========================================
// SAVE ASSESSMENT
// ==========================================

function saveAssessment(payload: {
  id: number;
  sections: AssessmentSection[];
  vitals?: AssessmentVital[];
  author: string;
  dateISO: string;
  status: "Draft" | "Selesai";
}) {
  const transaction = assessmentTransactions.value.find((item) => item.id === payload.id);

  if (!transaction) return;

  if (transaction.status === "Selesai") return;

  transaction.sections = cloneData(payload.sections);
  transaction.vitals = cloneData(payload.vitals ?? []);
  transaction.author = payload.author;
  transaction.dateISO = payload.dateISO;
  transaction.date = formatDate(payload.dateISO);
  transaction.status = payload.status;

  // Tetap berada di detail agar pengguna melihat hasil penyimpanan.
  // AssessmentDetail akan berubah menjadi mode Draft atau read-only.
}
</script>

<template>
  <div class="space-y-5">
    <!-- DETAIL ASESMEN -->
    <AssessmentDetail
      v-if="selectedAssessment"
      :key="selectedAssessment.id"
      :assessment="selectedAssessment"
      @back="backToList"
      @save="saveAssessment"
    />

    <!-- DAFTAR ASESMEN -->
    <template v-else>
      <!-- Summary -->
      <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <!-- Jenis Asesmen -->
        <div
          class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
        >
          <div class="flex items-center justify-between">
            <div
              class="flex size-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
            >
              <UIcon name="i-lucide-clipboard-list" class="size-4" />
            </div>
            <span class="text-[10px] font-semibold text-slate-400">JENIS</span>
          </div>

          <p class="mt-3 text-2xl font-bold text-slate-800 dark:text-white">
            {{ assessmentDefinitions.length }}
          </p>
          <p class="mt-1 text-xs text-slate-500">Jenis asesmen tersedia</p>
        </div>

        <!-- Total Pengisian -->
        <div
          class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
        >
          <div class="flex items-center justify-between">
            <div
              class="flex size-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400"
            >
              <UIcon name="i-lucide-files" class="size-4" />
            </div>
            <span class="text-[10px] font-semibold text-slate-400">TOTAL</span>
          </div>

          <p class="mt-3 text-2xl font-bold text-slate-800 dark:text-white">
            {{ assessmentTransactions.length }}
          </p>
          <p class="mt-1 text-xs text-slate-500">Seluruh pengisian asesmen</p>
        </div>

        <!-- Selesai -->
        <div
          class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
        >
          <div class="flex items-center justify-between">
            <div
              class="flex size-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
            >
              <UIcon name="i-lucide-shield-check" class="size-4" />
            </div>
            <span class="text-[10px] font-semibold text-slate-400">SELESAI</span>
          </div>

          <p class="mt-3 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {{
              assessmentTransactions.filter((item) => item.status === "Selesai").length
            }}
          </p>
          <p class="mt-1 text-xs text-slate-500">Asesmen telah diselesaikan</p>
        </div>

        <!-- Draft -->
        <div
          class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
        >
          <div class="flex items-center justify-between">
            <div
              class="flex size-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
            >
              <UIcon name="i-lucide-file-pen-line" class="size-4" />
            </div>
            <span class="text-[10px] font-semibold text-slate-400">DRAFT</span>
          </div>

          <p class="mt-3 text-2xl font-bold text-amber-600 dark:text-amber-400">
            {{ assessmentTransactions.filter((item) => item.status === "Draft").length }}
          </p>
          <p class="mt-1 text-xs text-slate-500">Asesmen belum diselesaikan</p>
        </div>
      </div>

      <AssessmentList
        v-model:search="searchQuery"
        :assessments="assessmentList"
        @select="openAssessment"
        @create="createAssessment"
      />
    </template>
  </div>
</template>

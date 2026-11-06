<script setup lang="ts">
import { computed, ref } from "vue";

import AssessmentList from "./AssessmentList.vue";
import AssessmentDetail from "./AssessmentDetail.vue";

defineProps<{
  patient?: unknown;
  patientId?: number;
}>();

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

type Assessment = {
  id: number;
  code: string;
  title: string;
  description: string;
  date: string;
  dateISO?: string; // Tambahkan ini
  author: string;
  status: AssessmentStatus;
  icon: string;
  vitals?: AssessmentVital[];
  sections: AssessmentSection[];
};

// ==========================================
// STATE
// ==========================================

const selectedId = ref<number | null>(null);

const assessments = ref<Assessment[]>([
  // ==========================================
  // 1. ASESMEN AWAL KEPERAWATAN
  // ==========================================
  {
    id: 1,
    code: "ASM-001",
    title: "Asesmen Awal Keperawatan",
    description: "Pengkajian kondisi awal dan kebutuhan keperawatan pasien.",
    date: "05 Nov 2026, 07:20",
    author: "Perawat Poliklinik",
    status: "Selesai",
    icon: "i-lucide-clipboard-list",

    vitals: [
      {
        label: "Tekanan Darah",
        value: "120/80",
        unit: "mmHg",
        icon: "i-lucide-activity",
      },
      {
        label: "Denyut Nadi",
        value: "82",
        unit: "x/menit",
        icon: "i-lucide-heart-pulse",
      },
      {
        label: "Suhu Tubuh",
        value: "36.8",
        unit: "°C",
        icon: "i-lucide-thermometer",
      },
      {
        label: "Saturasi Oksigen",
        value: "98",
        unit: "%",
        icon: "i-lucide-wind",
      },
    ],

    sections: [
      {
        title: "Anamnesis",
        description: "Informasi keluhan dan riwayat kesehatan pasien.",
        icon: "i-lucide-clipboard-list",
        fields: [
          {
            label: "Keluhan Utama",
            value: "Nyeri perut bagian kanan bawah",
          },
          {
            label: "Riwayat Penyakit Sekarang",
            value: "Nyeri dirasakan sejak 2 hari yang lalu.",
          },
          {
            label: "Riwayat Penyakit Dahulu",
            value: "Tidak ada riwayat penyakit dahulu.",
          },
          {
            label: "Riwayat Alergi",
            value: "Tidak ada alergi obat maupun makanan.",
          },
          {
            label: "Riwayat Pengobatan",
            value: "Tidak ada",
          },
        ],
      },
      {
        title: "Pemeriksaan Fisik",
        description: "Hasil pemeriksaan kondisi fisik pasien.",
        icon: "i-lucide-stethoscope",
        fields: [
          {
            label: "Keadaan Umum",
            value: "Tampak sakit ringan",
          },
          {
            label: "Kesadaran",
            value: "Compos Mentis",
          },
          {
            label: "Status Gizi",
            value: "Normal",
          },
          {
            label: "Mobilisasi",
            value: "Mandiri",
          },
          {
            label: "Kondisi Fisik",
            value: "Dalam batas normal",
          },
        ],
      },
      {
        title: "Pengkajian Keperawatan",
        description: "Pengkajian kebutuhan dasar dan kondisi pasien.",
        icon: "i-lucide-heart-handshake",
        fields: [
          {
            label: "Pola Tidur",
            value: "6–8 jam per hari",
          },
          {
            label: "Pola Eliminasi",
            value: "Dalam batas normal",
          },
          {
            label: "Aktivitas",
            value: "Mandiri",
          },
          {
            label: "Status Psikologis",
            value: "Kooperatif",
          },
        ],
      },
      {
        title: "Kesimpulan Keperawatan",
        description: "Masalah dan rencana tindakan keperawatan.",
        icon: "i-lucide-clipboard-check",
        fields: [
          {
            label: "Masalah Keperawatan",
            value: "Nyeri akut",
          },
          {
            label: "Rencana Tindakan",
            value:
              "Monitoring nyeri, observasi tanda vital dan kolaborasi pemberian terapi.",
          },
          {
            label: "Catatan Tambahan",
            value: "Pasien dalam observasi.",
          },
        ],
      },
    ],
  },

  // ==========================================
  // 2. SKRINING RISIKO JATUH
  // ==========================================
  {
    id: 2,
    code: "ASM-002",
    title: "Skrining Risiko Jatuh",
    description: "Penilaian risiko jatuh berdasarkan kondisi pasien.",
    date: "05 Nov 2026, 07:25",
    author: "Perawat Poliklinik",
    status: "Draft",
    icon: "i-lucide-accessibility",

    sections: [
      {
        title: "Identifikasi Risiko Jatuh",
        description: "Pengkajian faktor risiko jatuh pasien.",
        icon: "i-lucide-shield-check",
        fields: [
          {
            label: "Riwayat Jatuh",
            value: "Tidak",
          },
          {
            label: "Gangguan Berjalan",
            value: "",
          },
          {
            label: "Penggunaan Alat Bantu",
            value: "",
          },
          {
            label: "Status Kesadaran",
            value: "",
          },
          {
            label: "Kategori Risiko",
            value: "",
          },
        ],
      },
      {
        title: "Rencana Pencegahan",
        description: "Tindakan pencegahan risiko jatuh.",
        icon: "i-lucide-shield-plus",
        fields: [
          {
            label: "Tindakan Pencegahan",
            value: "",
          },
          {
            label: "Catatan",
            value: "",
          },
        ],
      },
    ],
  },

  // ==========================================
  // 3. SKRINING NYERI
  // ==========================================
  {
    id: 3,
    code: "ASM-003",
    title: "Skrining Nyeri",
    description: "Pengkajian skala, lokasi dan karakteristik nyeri.",
    date: "-",
    author: "-",
    status: "Belum Diisi",
    icon: "i-lucide-heart-pulse",

    sections: [
      {
        title: "Pengkajian Nyeri",
        description: "Lengkapi informasi keluhan nyeri pasien.",
        icon: "i-lucide-heart-pulse",
        fields: [
          {
            label: "Keluhan Nyeri",
            value: "",
          },
          {
            label: "Lokasi Nyeri",
            value: "",
          },
          {
            label: "Skala Nyeri",
            value: "",
          },
          {
            label: "Karakteristik Nyeri",
            value: "",
          },
          {
            label: "Durasi",
            value: "",
          },
          {
            label: "Faktor Pencetus",
            value: "",
          },
          {
            label: "Tindakan yang Diberikan",
            value: "",
          },
        ],
      },
    ],
  },
]);

// ==========================================
// COMPUTED
// ==========================================

const selectedAssessment = computed(
  () => assessments.value.find((item) => item.id === selectedId.value) ?? null
);

// ==========================================
// NAVIGATION
// ==========================================

function openAssessment(id: number) {
  selectedId.value = id;
}

function backToList() {
  selectedId.value = null;
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
  const index = assessments.value.findIndex((item) => item.id === payload.id);

  if (index === -1) return;

  const current = assessments.value[index];

  // Pastikan data ditemukan
  if (!current) return;

  // Asesmen yang sudah selesai tidak boleh diubah
  if (current.status === "Selesai") return;

  const parsedDate = new Date(`${payload.dateISO}T12:00:00`);

  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(parsedDate);

  assessments.value[index] = {
    ...current,
    sections: payload.sections,
    vitals: payload.vitals,
    author: payload.author,
    dateISO: payload.dateISO,
    date: formattedDate,
    status: payload.status,
  };

  // Kembali ke daftar asesmen setelah penyimpanan
  selectedId.value = null;
}
</script>

<template>
  <div class="space-y-5">
    <AssessmentList
      v-if="!selectedAssessment"
      :assessments="assessments"
      @select="openAssessment"
    />

    <AssessmentDetail
      v-else
      :key="selectedAssessment.id"
      :assessment="selectedAssessment"
      @back="backToList"
      @save="saveAssessment"
    />
  </div>
</template>

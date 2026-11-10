<script setup lang="ts">
import { computed, ref, reactive } from "vue";

type DiagnosisType = "Utama" | "Sekunder";
type DiagnosisStatus = "Aktif" | "Tidak Aktif";

interface Diagnosis {
  id: number;
  code: string;
  name: string;
  type: DiagnosisType;
  date: string;
  status: DiagnosisStatus;
}

interface DiagnosisForm {
  code: string;
  name: string;
  type: DiagnosisType;
  date: string;
  status: DiagnosisStatus;
}

defineProps<{
  patient?: unknown;
  patientId?: number;
}>();

// ==========================================
// DATA DIAGNOSA
// ==========================================

const diagnoses = ref<Diagnosis[]>([
  {
    id: 1,
    code: "H25.9",
    name: "Katarak senilis, tidak spesifik",
    type: "Utama",
    date: "2026-11-05",
    status: "Aktif",
  },
  {
    id: 2,
    code: "I10",
    name: "Hipertensi esensial (primer)",
    type: "Sekunder",
    date: "2026-11-05",
    status: "Aktif",
  },
]);

// ==========================================
// STATE
// ==========================================

const search = ref("");
const filterType = ref("Semua");
const filterStatus = ref("Semua");

const isModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const isEditing = ref(false);

const selectedId = ref<number | null>(null);
const selectedDelete = ref<Diagnosis | null>(null);

const formError = ref("");

const emptyForm = (): DiagnosisForm => ({
  code: "",
  name: "",
  type: "Sekunder",
  date: new Date().toLocaleDateString("en-CA"),
  status: "Aktif",
});

const form = reactive<DiagnosisForm>(emptyForm());

// ==========================================
// STATISTIK
// ==========================================

const totalDiagnosis = computed(() => diagnoses.value.length);

const totalUtama = computed(
  () => diagnoses.value.filter((d) => d.type === "Utama").length
);

const totalSekunder = computed(
  () => diagnoses.value.filter((d) => d.type === "Sekunder").length
);

const totalAktif = computed(
  () => diagnoses.value.filter((d) => d.status === "Aktif").length
);

// ==========================================
// FILTER DATA
// ==========================================

const filteredDiagnoses = computed(() => {
  return diagnoses.value.filter((d) => {
    const keyword = search.value.toLowerCase().trim();

    const matchSearch =
      !keyword ||
      d.code.toLowerCase().includes(keyword) ||
      d.name.toLowerCase().includes(keyword);

    const matchType = filterType.value === "Semua" || d.type === filterType.value;

    const matchStatus = filterStatus.value === "Semua" || d.status === filterStatus.value;

    return matchSearch && matchType && matchStatus;
  });
});

// ==========================================
// HELPER
// ==========================================

const formatDate = (date: string) => {
  if (!date) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
};

// ==========================================
// TAMBAH DIAGNOSA
// ==========================================

const openCreateModal = () => {
  isEditing.value = false;
  selectedId.value = null;
  formError.value = "";

  Object.assign(form, emptyForm());

  // Jika belum ada diagnosa utama, tawarkan jenis utama.
  if (totalUtama.value === 0) {
    form.type = "Utama";
  }

  isModalOpen.value = true;
};

// ==========================================
// EDIT DIAGNOSA
// ==========================================

const openEditModal = (diagnosis: Diagnosis) => {
  isEditing.value = true;
  selectedId.value = diagnosis.id;
  formError.value = "";

  Object.assign(form, {
    code: diagnosis.code,
    name: diagnosis.name,
    type: diagnosis.type,
    date: diagnosis.date,
    status: diagnosis.status,
  });

  isModalOpen.value = true;
};

// ==========================================
// SIMPAN DIAGNOSA
// ==========================================

const saveDiagnosis = () => {
  formError.value = "";

  const code = form.code.trim().toUpperCase();
  const name = form.name.trim();

  if (!code || !name || !form.date) {
    formError.value = "Mohon lengkapi seluruh data diagnosa.";
    return;
  }

  if (!/^[A-Z]\d{2}(\.\d{1,4})?$/.test(code)) {
    formError.value = "Format kode ICD-10 tidak valid.";
    return;
  }

  // Cek duplikasi kode ICD-10.
  const duplicate = diagnoses.value.some(
    (d) => d.code.toLowerCase() === code.toLowerCase() && d.id !== selectedId.value
  );

  if (duplicate) {
    formError.value = "Kode ICD-10 sudah terdaftar.";
    return;
  }

  // Maksimal satu diagnosa utama.
  if (
    form.type === "Utama" &&
    diagnoses.value.some((d) => d.type === "Utama" && d.id !== selectedId.value)
  ) {
    formError.value =
      "Sudah terdapat diagnosa utama. Ubah diagnosa sebelumnya menjadi sekunder terlebih dahulu.";
    return;
  }

  const payload: Diagnosis = {
    id: selectedId.value ?? Date.now(),
    code,
    name,
    type: form.type,
    date: form.date,
    status: form.status,
  };

  if (isEditing.value && selectedId.value !== null) {
    const index = diagnoses.value.findIndex((d) => d.id === selectedId.value);

    if (index !== -1) {
      diagnoses.value[index] = payload;
    }
  } else {
    diagnoses.value.unshift(payload);
  }

  isModalOpen.value = false;
};

// ==========================================
// HAPUS DIAGNOSA
// ==========================================

const openDeleteModal = (diagnosis: Diagnosis) => {
  selectedDelete.value = diagnosis;
  isDeleteModalOpen.value = true;
};

const deleteDiagnosis = () => {
  if (!selectedDelete.value) return;

  diagnoses.value = diagnoses.value.filter((d) => d.id !== selectedDelete.value?.id);

  isDeleteModalOpen.value = false;
  selectedDelete.value = null;
};
</script>

<template>
  <div class="space-y-6">
    <!-- HEADER -->
    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div class="flex items-start gap-3">
        <div
          class="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
        >
          <UIcon name="i-lucide-clipboard-list" class="size-5" />
        </div>

        <div>
          <h2 class="text-base font-bold text-slate-800 dark:text-white">
            Diagnosa Pasien
          </h2>
          <p class="mt-1 text-xs leading-relaxed text-slate-500">
            Kelola dan pantau riwayat diagnosa berdasarkan klasifikasi ICD-10.
          </p>
        </div>
      </div>

      <UButton
        color="primary"
        icon="i-lucide-plus"
        size="md"
        class="justify-center"
        @click="openCreateModal"
      >
        Tambah Diagnosa
      </UButton>
    </div>

    <!-- STATISTIK -->
    <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <div
        class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
      >
        <div class="flex items-center justify-between">
          <div
            class="flex size-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
          >
            <UIcon name="i-lucide-clipboard-list" class="size-4" />
          </div>
          <span class="text-[10px] font-semibold text-slate-400">TOTAL</span>
        </div>
        <p class="mt-3 text-2xl font-bold text-slate-800 dark:text-white">
          {{ totalDiagnosis }}
        </p>
        <p class="mt-1 text-xs text-slate-500">Seluruh diagnosa</p>
      </div>

      <div
        class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
      >
        <div class="flex items-center justify-between">
          <div
            class="flex size-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
          >
            <UIcon name="i-lucide-shield-check" class="size-4" />
          </div>
          <span class="text-[10px] font-semibold text-slate-400">UTAMA</span>
        </div>
        <p class="mt-3 text-2xl font-bold text-slate-800 dark:text-white">
          {{ totalUtama }}
        </p>
        <p class="mt-1 text-xs text-slate-500">Diagnosa utama</p>
      </div>

      <div
        class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
      >
        <div class="flex items-center justify-between">
          <div
            class="flex size-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
          >
            <UIcon name="i-lucide-layers" class="size-4" />
          </div>
          <span class="text-[10px] font-semibold text-slate-400">SEKUNDER</span>
        </div>
        <p class="mt-3 text-2xl font-bold text-slate-800 dark:text-white">
          {{ totalSekunder }}
        </p>
        <p class="mt-1 text-xs text-slate-500">Diagnosa tambahan</p>
      </div>

      <div
        class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
      >
        <div class="flex items-center justify-between">
          <div
            class="flex size-9 items-center justify-center rounded-xl bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400"
          >
            <UIcon name="i-lucide-activity" class="size-4" />
          </div>
          <span class="text-[10px] font-semibold text-slate-400">AKTIF</span>
        </div>
        <p class="mt-3 text-2xl font-bold text-slate-800 dark:text-white">
          {{ totalAktif }}
        </p>
        <p class="mt-1 text-xs text-slate-500">Diagnosa aktif</p>
      </div>
    </div>

    <!-- INFORMASI -->
    <div
      class="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 dark:border-blue-900/50 dark:bg-blue-950/20"
    >
      <UIcon
        name="i-lucide-info"
        class="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400"
      />
      <div>
        <p class="text-xs font-semibold text-blue-800 dark:text-blue-300">
          Informasi Diagnosa
        </p>
        <p class="mt-1 text-xs leading-relaxed text-blue-700 dark:text-blue-400">
          Diagnosa utama merupakan kondisi utama yang menjadi alasan pelayanan. Diagnosa
          sekunder digunakan untuk mencatat kondisi penyerta pasien.
        </p>
      </div>
    </div>

    <!-- DAFTAR DIAGNOSA -->
    <div
      class="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
    >
      <div
        class="flex flex-col gap-3 border-b border-slate-100 p-4 dark:border-slate-800 lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <h3 class="text-sm font-bold text-slate-800 dark:text-white">
            Daftar Diagnosa
          </h3>
          <p class="mt-1 text-xs text-slate-500">
            {{ filteredDiagnoses.length }} data ditemukan
          </p>
        </div>

        <div class="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <UInput
            v-model="search"
            icon="i-lucide-search"
            placeholder="Cari kode atau diagnosa..."
            size="sm"
            class="sm:col-span-1"
          />

          <select
            v-model="filterType"
            class="h-9 rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-600 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            <option value="Semua">Semua Jenis</option>
            <option value="Utama">Utama</option>
            <option value="Sekunder">Sekunder</option>
          </select>

          <select
            v-model="filterStatus"
            class="h-9 rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-600 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            <option value="Semua">Semua Status</option>
            <option value="Aktif">Aktif</option>
            <option value="Tidak Aktif">Tidak Aktif</option>
          </select>
        </div>
      </div>

      <!-- TABEL DESKTOP -->
      <div class="hidden overflow-x-auto md:block">
        <table class="w-full text-left text-xs">
          <thead
            class="bg-slate-50 text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:bg-slate-800/70"
          >
            <tr>
              <th class="px-5 py-4">Kode ICD-10</th>
              <th class="px-5 py-4">Nama Diagnosa</th>
              <th class="px-5 py-4">Klasifikasi</th>
              <th class="px-5 py-4">Tanggal</th>
              <th class="px-5 py-4">Status</th>
              <th class="px-5 py-4 text-right">Aksi</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
            <tr
              v-for="d in filteredDiagnoses"
              :key="d.id"
              class="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
            >
              <td class="px-5 py-4">
                <span
                  class="rounded-lg bg-emerald-50 px-2.5 py-1.5 font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                >
                  {{ d.code }}
                </span>
              </td>

              <td class="max-w-xs px-5 py-4">
                <p class="font-semibold text-slate-700 dark:text-slate-200">
                  {{ d.name }}
                </p>
              </td>

              <td class="px-5 py-4">
                <UBadge
                  :color="d.type === 'Utama' ? 'success' : 'warning'"
                  variant="subtle"
                >
                  {{ d.type }}
                </UBadge>
              </td>

              <td class="whitespace-nowrap px-5 py-4 text-slate-500">
                {{ formatDate(d.date) }}
              </td>

              <td class="px-5 py-4">
                <UBadge
                  :color="d.status === 'Aktif' ? 'success' : 'neutral'"
                  variant="subtle"
                >
                  {{ d.status }}
                </UBadge>
              </td>

              <td class="px-5 py-4">
                <div class="flex justify-end gap-1">
                  <UButton
                    color="neutral"
                    variant="ghost"
                    icon="i-lucide-pencil"
                    size="xs"
                    aria-label="Edit diagnosa"
                    @click="openEditModal(d)"
                  />

                  <UButton
                    color="error"
                    variant="ghost"
                    icon="i-lucide-trash-2"
                    size="xs"
                    aria-label="Hapus diagnosa"
                    @click="openDeleteModal(d)"
                  />
                </div>
              </td>
            </tr>

            <tr v-if="filteredDiagnoses.length === 0">
              <td colspan="6" class="px-5 py-14 text-center">
                <UIcon
                  name="i-lucide-folder-search"
                  class="mx-auto size-9 text-slate-300"
                />
                <p class="mt-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Diagnosa tidak ditemukan
                </p>
                <p class="mt-1 text-xs text-slate-400">
                  Coba ubah kata kunci atau filter pencarian.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- CARD MOBILE -->
      <div class="divide-y divide-slate-100 md:hidden dark:divide-slate-800">
        <div v-for="d in filteredDiagnoses" :key="d.id" class="space-y-3 p-4">
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {{ d.code }}
              </span>
              <p class="mt-1 text-sm font-semibold text-slate-800 dark:text-white">
                {{ d.name }}
              </p>
            </div>

            <UBadge :color="d.type === 'Utama' ? 'success' : 'warning'" variant="subtle">
              {{ d.type }}
            </UBadge>
          </div>

          <div class="flex items-center justify-between gap-2">
            <div class="flex flex-wrap items-center gap-2">
              <UBadge
                :color="d.status === 'Aktif' ? 'success' : 'neutral'"
                variant="subtle"
              >
                {{ d.status }}
              </UBadge>
              <span class="text-[11px] text-slate-400">
                {{ formatDate(d.date) }}
              </span>
            </div>

            <div class="flex gap-1">
              <UButton
                color="neutral"
                variant="soft"
                icon="i-lucide-pencil"
                size="xs"
                @click="openEditModal(d)"
              />
              <UButton
                color="error"
                variant="soft"
                icon="i-lucide-trash-2"
                size="xs"
                @click="openDeleteModal(d)"
              />
            </div>
          </div>
        </div>

        <div v-if="filteredDiagnoses.length === 0" class="px-4 py-12 text-center">
          <UIcon name="i-lucide-folder-search" class="mx-auto size-9 text-slate-300" />
          <p class="mt-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
            Diagnosa tidak ditemukan
          </p>
        </div>
      </div>
    </div>

    <!-- MODAL TAMBAH / EDIT -->
    <UModal
      v-model:open="isModalOpen"
      :title="isEditing ? 'Edit Diagnosa' : 'Tambah Diagnosa'"
      :description="
        isEditing
          ? 'Perbarui informasi diagnosa pasien.'
          : 'Lengkapi informasi diagnosa pasien.'
      "
    >
      <template #body>
        <div class="space-y-4">
          <div
            v-if="formError"
            class="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400"
          >
            <UIcon name="i-lucide-alert-circle" class="mt-0.5 size-4 shrink-0" />
            {{ formError }}
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Kode ICD-10 <span class="text-red-500">*</span>
            </label>
            <UInput
              v-model="form.code"
              placeholder="Contoh: H25.9"
              icon="i-lucide-hash"
              class="w-full"
            />
            <p class="text-[10px] text-slate-400">
              Masukkan kode diagnosis sesuai klasifikasi ICD-10.
            </p>
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Nama Diagnosa <span class="text-red-500">*</span>
            </label>
            <UInput
              v-model="form.name"
              placeholder="Masukkan nama diagnosa..."
              icon="i-lucide-clipboard-list"
              class="w-full"
            />
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Jenis Diagnosa
              </label>
              <select
                v-model="form.type"
                class="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800"
              >
                <option value="Utama">Diagnosa Utama</option>
                <option value="Sekunder">Diagnosa Sekunder</option>
              </select>
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Status
              </label>
              <select
                v-model="form.status"
                class="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800"
              >
                <option value="Aktif">Aktif</option>
                <option value="Tidak Aktif">Tidak Aktif</option>
              </select>
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Tanggal Penetapan <span class="text-red-500">*</span>
            </label>
            <UInput v-model="form.date" type="date" class="w-full" />
          </div>

          <div
            class="flex justify-end gap-2 border-t border-slate-100 pt-4 dark:border-slate-800"
          >
            <UButton color="neutral" variant="outline" @click="isModalOpen = false">
              Batal
            </UButton>

            <UButton color="primary" icon="i-lucide-save" @click="saveDiagnosis">
              {{ isEditing ? "Simpan Perubahan" : "Simpan Diagnosa" }}
            </UButton>
          </div>
        </div>
      </template>
    </UModal>

    <!-- MODAL KONFIRMASI HAPUS -->
    <UModal
      v-model:open="isDeleteModalOpen"
      title="Hapus Diagnosa"
      description="Konfirmasi penghapusan data diagnosa pasien."
    >
      <template #body>
        <div class="space-y-4">
          <div class="flex items-start gap-3 rounded-xl bg-red-50 p-4 dark:bg-red-950/20">
            <UIcon
              name="i-lucide-alert-triangle"
              class="mt-0.5 size-5 shrink-0 text-red-500"
            />
            <div>
              <p class="text-sm font-semibold text-slate-800 dark:text-white">
                Apakah Anda yakin ingin menghapus diagnosa ini?
              </p>
              <p class="mt-1 text-xs text-slate-500">
                {{ selectedDelete?.code }} - {{ selectedDelete?.name }}
              </p>
            </div>
          </div>

          <div class="flex justify-end gap-2">
            <UButton color="neutral" variant="outline" @click="isDeleteModalOpen = false">
              Batal
            </UButton>
            <UButton color="error" icon="i-lucide-trash-2" @click="deleteDiagnosis">
              Hapus Diagnosa
            </UButton>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>

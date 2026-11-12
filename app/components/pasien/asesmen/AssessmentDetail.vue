<script setup lang="ts">
import { computed, ref, watch } from "vue";

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

type StaffOption = {
  label: string;
  value: string;
};

type Assessment = {
  id: number;
  code: string;
  title: string;
  description: string;
  date: string;
  dateISO?: string;
  author: string;
  status: AssessmentStatus;
  icon: string;
  vitals?: AssessmentVital[];
  sections: AssessmentSection[];
};

const props = withDefaults(
  defineProps<{
    assessment: Assessment;
    staffOptions?: StaffOption[];
  }>(),
  {
    staffOptions: () => [
      { label: "Perawat Poliklinik", value: "Perawat Poliklinik" },
      { label: "Dokter Umum", value: "Dokter Umum" },
      { label: "Dokter Spesialis", value: "Dokter Spesialis" },
    ],
  }
);

const emit = defineEmits<{
  back: [];
  save: [
    payload: {
      id: number;
      sections: AssessmentSection[];
      vitals?: AssessmentVital[];
      author: string;
      dateISO: string;
      status: "Draft" | "Selesai";
    }
  ];
}>();

// ==========================================
// STATE
// ==========================================

const isEditing = ref(false);

const formSections = ref<AssessmentSection[]>([]);
const formVitals = ref<AssessmentVital[]>([]);

const formAuthor = ref("");
const formDate = ref("");

// ==========================================
// COMPUTED
// ==========================================

const isReadOnly = computed(() => props.assessment.status === "Selesai");

const isNew = computed(() => props.assessment.status === "Belum Diisi");

const isDraft = computed(() => props.assessment.status === "Draft");

const missingFields = computed(() => {
  const emptySections = formSections.value.reduce(
    (total, section) =>
      total + section.fields.filter((field) => !field.value.trim()).length,
    0
  );

  const emptyVitals = formVitals.value.filter((vital) => !vital.value.trim()).length;

  return (
    emptySections + emptyVitals + (!formAuthor.value ? 1 : 0) + (!formDate.value ? 1 : 0)
  );
});

const canComplete = computed(() => missingFields.value === 0);

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
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(parsedDate);
}

// ==========================================
// INITIALIZE FORM
// ==========================================

function initializeForm() {
  formSections.value = cloneData(props.assessment.sections ?? []);

  formVitals.value = cloneData(props.assessment.vitals ?? []);

  formAuthor.value = props.assessment.author || "";

  formDate.value = props.assessment.dateISO || getTodayDate();

  isEditing.value = isNew.value;
}

watch(
  () => props.assessment,
  () => {
    initializeForm();
  },
  { immediate: true }
);

// ==========================================
// NAVIGATION
// ==========================================

function handleBack() {
  if (isEditing.value) {
    cancelEdit();
    return;
  }

  emit("back");
}

// ==========================================
// EDIT
// ==========================================

function startEdit() {
  if (!isDraft.value) return;

  initializeForm();

  isEditing.value = true;
}

// ==========================================
// CANCEL
// ==========================================

function cancelEdit() {
  if (isNew.value) {
    emit("back");
    return;
  }

  initializeForm();

  isEditing.value = false;
}

// ==========================================
// SAVE
// ==========================================

function saveAssessment(status: "Draft" | "Selesai") {
  if (isReadOnly.value || !isEditing.value) return;

  if (status === "Selesai" && !canComplete.value) return;

  emit("save", {
    id: props.assessment.id,
    sections: cloneData(formSections.value),
    vitals: cloneData(formVitals.value),
    author: formAuthor.value,
    dateISO: formDate.value,
    status,
  });

  // Setelah berhasil dikirim ke parent, keluar dari mode edit.
  isEditing.value = false;
}
</script>

<template>
  <div class="space-y-5">
    <!-- ================================== -->
    <!-- ASSESSMENT HEADER -->
    <!-- ================================== -->

    <div
      class="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
    >
      <!-- IDENTITAS ASESMEN -->

      <div
        class="border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-white p-4 dark:border-slate-800 dark:from-emerald-950/30 dark:to-slate-900 sm:p-5"
      >
        <div class="flex items-start gap-3">
          <UButton
            color="neutral"
            variant="soft"
            icon="i-lucide-arrow-left"
            size="sm"
            @click="handleBack"
          />

          <div
            class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400"
          >
            <UIcon :name="assessment.icon" class="size-6" />
          </div>

          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-center gap-2">
              <p class="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                {{ assessment.code }}
              </p>

              <UBadge
                :color="
                  assessment.status === 'Selesai'
                    ? 'success'
                    : assessment.status === 'Draft'
                    ? 'warning'
                    : 'neutral'
                "
                variant="subtle"
                size="sm"
              >
                {{ assessment.status }}
              </UBadge>
            </div>

            <h2 class="mt-1 text-base font-bold text-slate-800 dark:text-white">
              {{ assessment.title }}
            </h2>

            <p class="mt-1 text-xs leading-relaxed text-slate-500">
              {{ assessment.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- DATA PENGISIAN -->

      <div
        class="grid grid-cols-1 gap-4 border-b border-slate-100 p-4 sm:grid-cols-2 dark:border-slate-800"
      >
        <!-- PENGISI ASESMEN -->

        <div>
          <label
            class="mb-2 block text-xs font-semibold text-slate-600 dark:text-slate-400"
          >
            Pengisi Asesmen

            <span v-if="isEditing" class="text-rose-500">*</span>
          </label>

          <USelect
            v-if="isEditing"
            v-model="formAuthor"
            :items="staffOptions"
            value-key="value"
            label-key="label"
            placeholder="Pilih petugas pengisi"
            class="w-full"
          />

          <div
            v-else
            class="flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 dark:border-slate-700 dark:bg-slate-800"
          >
            <UIcon name="i-lucide-user-round" class="size-4 text-emerald-600" />

            <span class="text-sm font-medium text-slate-700 dark:text-slate-200">
              {{ formAuthor || "-" }}
            </span>
          </div>
        </div>

        <!-- TANGGAL PENGISIAN -->

        <div>
          <label
            class="mb-2 block text-xs font-semibold text-slate-600 dark:text-slate-400"
          >
            Tanggal Pengisian

            <span v-if="isEditing" class="text-rose-500">*</span>
          </label>

          <UInput
            v-if="isEditing"
            v-model="formDate"
            type="date"
            icon="i-lucide-calendar-days"
            class="w-full"
          />

          <div
            v-else
            class="flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 dark:border-slate-700 dark:bg-slate-800"
          >
            <UIcon name="i-lucide-calendar-days" class="size-4 text-emerald-600" />

            <span class="text-sm font-medium text-slate-700 dark:text-slate-200">
              {{ formatDate(formDate) }}
            </span>
          </div>
        </div>
      </div>

      <!-- ACTION BAR -->

      <div
        class="flex flex-col gap-3 bg-slate-50/70 p-4 sm:flex-row sm:items-center sm:justify-between dark:bg-slate-800/30"
      >
        <div>
          <p class="text-xs font-bold text-slate-800 dark:text-white">
            {{ isEditing ? "Mode Pengisian" : "Pengelolaan Asesmen" }}
          </p>

          <p class="mt-1 text-[11px] text-slate-500">
            {{
              isEditing
                ? "Pastikan seluruh informasi sudah sesuai sebelum menyimpan."
                : isReadOnly
                ? "Asesmen telah diselesaikan dan tidak dapat diubah."
                : "Periksa hasil pengkajian atau lanjutkan pengisian."
            }}
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2 sm:justify-end">
          <!-- MODE EDIT -->

          <template v-if="isEditing">
            <UButton
              color="neutral"
              variant="outline"
              size="sm"
              icon="i-lucide-x"
              @click="cancelEdit"
            >
              Batal
            </UButton>

            <UButton
              color="warning"
              variant="soft"
              size="sm"
              icon="i-lucide-save"
              @click="saveAssessment('Draft')"
            >
              Simpan Draft
            </UButton>

            <UButton
              color="primary"
              size="sm"
              icon="i-lucide-check-circle"
              :disabled="!canComplete"
              @click="saveAssessment('Selesai')"
            >
              Selesaikan
            </UButton>
          </template>

          <!-- MODE DRAFT -->

          <UButton
            v-else-if="isDraft"
            color="primary"
            variant="soft"
            size="sm"
            icon="i-lucide-pencil"
            @click="startEdit"
          >
            Edit Asesmen
          </UButton>

          <!-- MODE SELESAI -->

          <UBadge v-else-if="isReadOnly" color="success" variant="subtle">
            <UIcon name="i-lucide-lock" class="mr-1 size-3" />
            Asesmen Terkunci
          </UBadge>

          <!-- MODE BELUM DIISI -->

          <UBadge v-else color="info" variant="subtle">
            <UIcon name="i-lucide-file-pen-line" class="mr-1 size-3" />
            Siap Diisi
          </UBadge>
        </div>
      </div>
    </div>

    <!-- ================================== -->
    <!-- NEW ASSESSMENT NOTICE -->
    <!-- ================================== -->

    <div
      v-if="isNew"
      class="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-3 dark:border-blue-900/50 dark:bg-blue-950/20"
    >
      <UIcon name="i-lucide-info" class="mt-0.5 size-4 shrink-0 text-blue-600" />

      <div>
        <p class="text-xs font-semibold text-blue-800 dark:text-blue-300">
          Asesmen Belum Diisi
        </p>

        <p class="mt-1 text-[11px] leading-relaxed text-blue-700 dark:text-blue-400">
          Silakan lengkapi formulir pengkajian. Data dapat disimpan sebagai draft atau
          diselesaikan.
        </p>
      </div>
    </div>

    <!-- ================================== -->
    <!-- VITAL SUMMARY -->
    <!-- ================================== -->

    <section v-if="formVitals.length" class="space-y-3">
      <div>
        <h3 class="text-sm font-bold text-slate-800 dark:text-white">
          Tanda-Tanda Vital
        </h3>

        <p class="mt-1 text-xs text-slate-500">Hasil pengukuran kondisi vital pasien.</p>
      </div>

      <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div
          v-for="vital in formVitals"
          :key="vital.label"
          class="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
        >
          <div class="flex items-center justify-between gap-2">
            <p class="text-[11px] text-slate-500">
              {{ vital.label }}
            </p>

            <UIcon
              :name="vital.icon"
              class="size-4 text-emerald-600 dark:text-emerald-400"
            />
          </div>

          <template v-if="isEditing">
            <UInput
              v-model="vital.value"
              size="sm"
              class="mt-3"
              :placeholder="`Input ${vital.label}`"
              color="neutral"
            />

            <p class="mt-1 text-[10px] text-slate-400">
              {{ vital.unit }}
            </p>
          </template>

          <div v-else class="mt-3 flex items-baseline gap-1">
            <span class="text-xl font-bold text-slate-800 dark:text-white">
              {{ vital.value || "-" }}
            </span>

            <span class="text-[10px] text-slate-400">
              {{ vital.unit }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================== -->
    <!-- ASSESSMENT FORM / DETAIL -->
    <!-- ================================== -->

    <section class="space-y-3">
      <div>
        <h3 class="text-sm font-bold text-slate-800 dark:text-white">
          {{ isEditing ? "Formulir Pengkajian" : "Hasil Pengkajian" }}
        </h3>

        <p class="mt-1 text-xs text-slate-500">
          {{
            isEditing
              ? "Lengkapi data pengkajian sesuai kondisi pasien."
              : "Rincian data inputan asesmen pasien."
          }}
        </p>
      </div>

      <!-- SECTIONS -->

      <div
        v-for="(section, index) in formSections"
        :key="section.title"
        class="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
      >
        <!-- SECTION HEADER -->

        <div
          class="flex items-start gap-3 border-b border-slate-100 bg-slate-50/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/40"
        >
          <div
            class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
          >
            <UIcon :name="section.icon" class="size-4" />
          </div>

          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2">
              <span
                class="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400"
              >
                {{ String(index + 1).padStart(2, "0") }}
              </span>

              <h4 class="text-sm font-bold text-slate-800 dark:text-white">
                {{ section.title }}
              </h4>
            </div>

            <p v-if="section.description" class="mt-1 text-[11px] text-slate-500">
              {{ section.description }}
            </p>
          </div>
        </div>

        <!-- SECTION FIELDS -->

        <div class="divide-y divide-slate-100 px-4 dark:divide-slate-800">
          <div
            v-for="field in section.fields"
            :key="field.label"
            class="grid grid-cols-1 gap-2 py-3 sm:grid-cols-[200px_minmax(0,1fr)] sm:items-center sm:gap-5"
          >
            <label class="text-xs font-medium text-slate-600 dark:text-slate-400">
              {{ field.label }}

              <span v-if="isEditing" class="text-rose-500">*</span>
            </label>

            <!-- EDIT MODE -->

            <UInput
              v-if="isEditing"
              v-model="field.value"
              color="neutral"
              size="md"
              class="w-full"
              :placeholder="`Masukkan ${field.label.toLowerCase()}`"
            />

            <!-- READ ONLY MODE -->

            <div v-else>
              <p
                class="break-words text-sm font-medium leading-relaxed"
                :class="
                  field.value
                    ? 'text-slate-800 dark:text-slate-200'
                    : 'italic text-slate-400'
                "
              >
                {{ field.value || "Belum diisi" }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- EMPTY STATE -->

      <div
        v-if="!formSections.length"
        class="rounded-xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700"
      >
        <UIcon name="i-lucide-file-search" class="mx-auto size-8 text-slate-400" />

        <p class="mt-2 text-xs text-slate-500">Belum ada data pengkajian.</p>
      </div>
    </section>

    <!-- ================================== -->
    <!-- FORM VALIDATION -->
    <!-- ================================== -->

    <div
      v-if="isEditing && missingFields > 0"
      class="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 dark:border-amber-900/50 dark:bg-amber-950/20"
    >
      <UIcon name="i-lucide-alert-circle" class="mt-0.5 size-4 shrink-0 text-amber-600" />

      <div>
        <p class="text-xs font-semibold text-amber-800 dark:text-amber-300">
          Data Belum Lengkap
        </p>

        <p class="mt-1 text-[11px] text-amber-700 dark:text-amber-400">
          Masih ada {{ missingFields }} data yang belum diisi. Lengkapi seluruh input
          sebelum menyelesaikan asesmen.
        </p>
      </div>
    </div>

    <!-- ================================== -->
    <!-- FOOTER INFORMATION -->
    <!-- ================================== -->

    <div
      class="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 dark:border-slate-800"
    >
      <div>
        <p class="text-[11px] text-slate-400">Kode Asesmen</p>

        <p class="mt-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
          {{ assessment.code }}
        </p>
      </div>

      <span class="text-[11px] text-slate-400">
        {{
          assessment.status === "Selesai"
            ? "Data telah difinalisasi"
            : "Data belum difinalisasi"
        }}
      </span>
    </div>
  </div>
</template>

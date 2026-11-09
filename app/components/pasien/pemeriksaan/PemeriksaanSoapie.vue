<script setup lang="ts">
import { reactive, ref, watch } from "vue";

type FormPayload = Record<string, string>;

const emit = defineEmits<{
  (e: "change"): void;
  (e: "save-draft", payload: FormPayload): void;
  (e: "save", payload: FormPayload): void;
}>();

const form = reactive({
  subjektif: "Pasien mengeluhkan penglihatan kabur pada mata kanan.",
  objektif: "Kesadaran compos mentis. Pemeriksaan awal dalam batas pemantauan.",
  assessment: "Perlu evaluasi lanjutan oleh dokter spesialis mata.",
  planning: "Melakukan pemeriksaan lanjutan sesuai indikasi klinis.",
  intervention: "Dilakukan pemeriksaan awal dan observasi kondisi pasien.",
  evaluation: "Hasil tindakan awal akan dievaluasi setelah pemeriksaan lanjutan.",
});

const errorMessage = ref("");

const fields: {
  key: keyof typeof form;
  code: string;
  label: string;
  description: string;
  icon: string;
  color: keyof typeof colorClasses;
}[] = [
  {
    key: "subjektif",
    code: "S",
    label: "Subjective",
    description: "Keluhan dan informasi yang disampaikan pasien.",
    icon: "i-lucide-message-circle",
    color: "blue",
  },
  {
    key: "objektif",
    code: "O",
    label: "Objective",
    description: "Hasil pemeriksaan fisik dan data objektif.",
    icon: "i-lucide-activity",
    color: "emerald",
  },
  {
    key: "assessment",
    code: "A",
    label: "Assessment",
    description: "Analisis dan kesimpulan klinis.",
    icon: "i-lucide-clipboard-check",
    color: "violet",
  },
  {
    key: "planning",
    code: "P",
    label: "Planning",
    description: "Rencana tindakan dan intervensi.",
    icon: "i-lucide-list-checks",
    color: "amber",
  },
  {
    key: "intervention",
    code: "I",
    label: "Intervention",
    description: "Tindakan yang telah dilakukan kepada pasien.",
    icon: "i-lucide-syringe",
    color: "cyan",
  },
  {
    key: "evaluation",
    code: "E",
    label: "Evaluation",
    description: "Evaluasi hasil tindakan dan respons pasien.",
    icon: "i-lucide-chart-no-axes-combined",
    color: "pink",
  },
];

const colorClasses = {
  blue: {
    header: "bg-blue-50/70 dark:bg-blue-500/5",
    icon: "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  },
  emerald: {
    header: "bg-emerald-50/70 dark:bg-emerald-500/5",
    icon: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  },
  violet: {
    header: "bg-violet-50/70 dark:bg-violet-500/5",
    icon: "bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
  },
  amber: {
    header: "bg-amber-50/70 dark:bg-amber-500/5",
    icon: "bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  },
  cyan: {
    header: "bg-cyan-50/70 dark:bg-cyan-500/5",
    icon: "bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400",
  },
  pink: {
    header: "bg-pink-50/70 dark:bg-pink-500/5",
    icon: "bg-pink-100 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400",
  },
} as const;

watch(
  form,
  () => {
    errorMessage.value = "";
    emit("change");
  },
  { deep: true }
);

const getPayload = (): FormPayload => ({
  ...form,
});

const handleDraft = () => {
  emit("save-draft", getPayload());
};

const handleSave = () => {
  const isIncomplete = fields.some((field) => !form[field.key].trim());

  if (isIncomplete) {
    errorMessage.value = "Mohon lengkapi seluruh bagian pemeriksaan SOAPIE.";
    return;
  }

  emit("save", getPayload());
};
</script>

<template>
  <form class="space-y-5" @submit.prevent="handleSave">
    <!-- HEADER -->
    <div>
      <div class="flex items-center gap-2">
        <h3 class="text-base font-bold text-slate-900 dark:text-white">
          Pemeriksaan SOAPIE
        </h3>

        <UBadge color="info" variant="subtle">SOAPIE</UBadge>
      </div>

      <p class="mt-1 text-xs text-slate-500">
        Dokumentasi perkembangan pasien meliputi pengkajian, tindakan, dan evaluasi.
      </p>
    </div>

    <!-- INFORMATION -->
    <div
      class="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-3 dark:border-blue-500/20 dark:bg-blue-500/5"
    >
      <UIcon
        name="i-lucide-info"
        class="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400"
      />

      <p class="text-xs leading-5 text-blue-700 dark:text-blue-300">
        Lengkapi setiap tahapan SOAPIE secara berurutan untuk mendokumentasikan proses
        pemeriksaan dan perkembangan pasien.
      </p>
    </div>

    <!-- SOAPIE FIELDS -->
    <div class="grid gap-4 lg:grid-cols-2">
      <section
        v-for="field in fields"
        :key="field.key"
        class="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
      >
        <div
          class="flex items-center gap-3 border-b border-slate-100 px-4 py-3 dark:border-slate-800"
          :class="colorClasses[field.color].header"
        >
          <div
            class="flex size-9 items-center justify-center rounded-xl"
            :class="colorClasses[field.color].icon"
          >
            <UIcon :name="field.icon" class="size-5" />
          </div>

          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2">
              <span
                class="flex size-5 items-center justify-center rounded-md bg-white text-[10px] font-bold text-slate-700 dark:bg-slate-800 dark:text-white"
              >
                {{ field.code }}
              </span>

              <h4 class="text-sm font-bold text-slate-800 dark:text-white">
                {{ field.label }}
              </h4>
            </div>

            <p class="mt-1 text-[10px] text-slate-500">
              {{ field.description }}
            </p>
          </div>
        </div>

        <div class="p-4">
          <textarea
            v-model="form[field.key]"
            rows="5"
            required
            :placeholder="`Tuliskan ${field.label.toLowerCase()} pasien...`"
            class="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-5 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-800"
          />
        </div>
      </section>
    </div>

    <!-- ERROR -->
    <div
      v-if="errorMessage"
      class="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600 dark:border-red-500/20 dark:bg-red-500/5"
    >
      <UIcon name="i-lucide-alert-circle" class="size-4 shrink-0" />
      {{ errorMessage }}
    </div>

    <!-- ACTION -->
    <div class="flex flex-col-reverse justify-end gap-2 sm:flex-row">
      <UButton
        type="button"
        color="neutral"
        variant="outline"
        icon="i-lucide-file-pen-line"
        @click="handleDraft"
      >
        Simpan Draft
      </UButton>

      <UButton type="submit" color="primary" icon="i-lucide-save">
        Simpan Pemeriksaan
      </UButton>
    </div>
  </form>
</template>

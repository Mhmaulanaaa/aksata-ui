<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";

type FormPayload = Record<string, string>;

const emit = defineEmits<{
  (e: "change"): void;
  (e: "save-draft", payload: FormPayload): void;
  (e: "save", payload: FormPayload): void;
}>();

const form = reactive({
  berat_badan: "60",
  tinggi_badan: "165",

  assessment_antropometri: "Berat badan 60 kg dan tinggi badan 165 cm.",
  assessment_biokimia: "Belum terdapat data pemeriksaan laboratorium.",
  assessment_klinis: "Kondisi klinis pasien perlu dikaji lebih lanjut.",
  assessment_dietary: "Riwayat asupan makanan perlu dikaji lebih lanjut.",

  diagnosis: "Asupan energi perlu dievaluasi berdasarkan kebutuhan gizi pasien.",
  intervention: "Pemberian edukasi gizi sesuai kebutuhan dan kondisi pasien.",
  monitoring: "Pemantauan asupan makanan dan perubahan berat badan pasien.",
  evaluation: "Evaluasi dilakukan berdasarkan hasil pemantauan asupan dan status gizi.",
});

const errorMessage = ref("");

const imt = computed(() => {
  const berat = Number(form.berat_badan);
  const tinggi = Number(form.tinggi_badan) / 100;

  if (!berat || !tinggi || berat <= 0 || tinggi <= 0) {
    return "-";
  }

  return (berat / (tinggi * tinggi)).toFixed(1);
});

const fields: {
  key: keyof typeof form;
  code: string;
  label: string;
  description: string;
  icon: string;
  headerClass: string;
  iconClass: string;
}[] = [
  {
    key: "assessment_antropometri",
    code: "A",
    label: "Antropometri",
    description: "Pengukuran berat badan, tinggi badan, dan status gizi.",
    icon: "i-lucide-ruler",
    headerClass: "bg-blue-50/70 dark:bg-blue-500/5",
    iconClass: "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  },
  {
    key: "assessment_biokimia",
    code: "A",
    label: "Biokimia",
    description: "Data laboratorium dan pemeriksaan biokimia.",
    icon: "i-lucide-test-tube",
    headerClass: "bg-violet-50/70 dark:bg-violet-500/5",
    iconClass: "bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
  },
  {
    key: "assessment_klinis",
    code: "A",
    label: "Klinis",
    description: "Kondisi fisik dan riwayat klinis pasien.",
    icon: "i-lucide-stethoscope",
    headerClass: "bg-emerald-50/70 dark:bg-emerald-500/5",
    iconClass:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  },
  {
    key: "assessment_dietary",
    code: "A",
    label: "Dietary History",
    description: "Riwayat asupan dan pola makan pasien.",
    icon: "i-lucide-utensils",
    headerClass: "bg-amber-50/70 dark:bg-amber-500/5",
    iconClass: "bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  },
  {
    key: "diagnosis",
    code: "D",
    label: "Nutrition Diagnosis",
    description: "Diagnosis masalah gizi berdasarkan hasil pengkajian.",
    icon: "i-lucide-clipboard-check",
    headerClass: "bg-violet-50/70 dark:bg-violet-500/5",
    iconClass: "bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
  },
  {
    key: "intervention",
    code: "I",
    label: "Nutrition Intervention",
    description: "Rencana intervensi dan tindakan gizi.",
    icon: "i-lucide-apple",
    headerClass: "bg-emerald-50/70 dark:bg-emerald-500/5",
    iconClass:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  },
  {
    key: "monitoring",
    code: "M",
    label: "Nutrition Monitoring",
    description: "Pemantauan perkembangan status gizi pasien.",
    icon: "i-lucide-chart-line",
    headerClass: "bg-cyan-50/70 dark:bg-cyan-500/5",
    iconClass: "bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400",
  },
  {
    key: "evaluation",
    code: "E",
    label: "Nutrition Evaluation",
    description: "Evaluasi hasil intervensi dan pencapaian tujuan.",
    icon: "i-lucide-clipboard-check",
    headerClass: "bg-pink-50/70 dark:bg-pink-500/5",
    iconClass: "bg-pink-100 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400",
  },
];

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
  berat_badan: String(form.berat_badan),
  tinggi_badan: String(form.tinggi_badan),
});

const handleDraft = () => {
  emit("save-draft", getPayload());
};

const handleSave = () => {
  const berat = Number(form.berat_badan);
  const tinggi = Number(form.tinggi_badan);

  // Validasi field teks
  const isIncomplete = fields.some((field) => {
    return !String(form[field.key] ?? "").trim();
  });

  // Validasi antropometri
  const isInvalidAnthropometry =
    !Number.isFinite(berat) ||
    !Number.isFinite(tinggi) ||
    berat <= 0 ||
    tinggi <= 0 ||
    imt.value === "-";

  if (isIncomplete || isInvalidAnthropometry) {
    errorMessage.value =
      "Mohon lengkapi seluruh data pengkajian dan asuhan gizi dengan benar.";
    return;
  }

  errorMessage.value = "";

  emit("save", getPayload());
};
</script>

<template>
  <form class="space-y-5" @submit.prevent="handleSave">
    <!-- HEADER -->
    <div>
      <div class="flex items-center gap-2">
        <h3 class="text-base font-bold text-slate-900 dark:text-white">
          Pemeriksaan ADIME
        </h3>

        <UBadge color="primary" variant="subtle">ADIME</UBadge>
      </div>

      <p class="mt-1 text-xs text-slate-500">
        Dokumentasi proses asuhan gizi meliputi pengkajian, diagnosis, intervensi,
        monitoring, dan evaluasi.
      </p>
    </div>

    <!-- INFORMATION -->
    <div
      class="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-500/20 dark:bg-emerald-500/5"
    >
      <UIcon
        name="i-lucide-info"
        class="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400"
      />

      <p class="text-xs leading-5 text-emerald-700 dark:text-emerald-300">
        ADIME digunakan untuk mendokumentasikan proses asuhan gizi. Lengkapi setiap bagian
        sesuai hasil pengkajian dan kondisi pasien.
      </p>
    </div>

    <!-- ANTHROPOMETRY -->
    <section
      class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
    >
      <div class="mb-4 flex items-center gap-3">
        <div
          class="flex size-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
        >
          <UIcon name="i-lucide-ruler" class="size-5" />
        </div>

        <div>
          <h4 class="text-sm font-bold text-slate-800 dark:text-white">
            Pengukuran Antropometri
          </h4>
          <p class="text-[11px] text-slate-500">
            Data pengukuran dasar untuk pengkajian status gizi.
          </p>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-3">
        <div>
          <label class="mb-2 block text-xs font-semibold">
            Berat Badan <span class="text-red-500">*</span>
          </label>

          <UInput
            v-model="form.berat_badan"
            type="number"
            step="0.1"
            min="0.1"
            size="lg"
            placeholder="60"
          >
            <template #trailing>
              <span class="text-xs text-slate-400">kg</span>
            </template>
          </UInput>
        </div>

        <div>
          <label class="mb-2 block text-xs font-semibold">
            Tinggi Badan <span class="text-red-500">*</span>
          </label>

          <UInput
            v-model="form.tinggi_badan"
            type="number"
            step="0.1"
            min="1"
            size="lg"
            placeholder="165"
          >
            <template #trailing>
              <span class="text-xs text-slate-400">cm</span>
            </template>
          </UInput>
        </div>

        <div>
          <label class="mb-2 block text-xs font-semibold">
            Indeks Massa Tubuh (IMT)
          </label>

          <div
            class="flex h-10 items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-3 dark:border-emerald-500/20 dark:bg-emerald-500/5"
          >
            <span class="text-lg font-bold text-emerald-700 dark:text-emerald-400">
              {{ imt }}
            </span>

            <span class="text-[10px] text-slate-500">kg/m²</span>
          </div>
        </div>
      </div>

      <p class="mt-3 text-[10px] text-slate-400">
        * IMT merupakan hasil perhitungan otomatis dari data berat dan tinggi badan.
        Interpretasi status gizi harus mempertimbangkan karakteristik serta kondisi klinis
        pasien.
      </p>
    </section>

    <!-- ADIME FIELDS -->
    <div class="grid gap-4 lg:grid-cols-2">
      <section
        v-for="field in fields"
        :key="field.key"
        class="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
      >
        <div
          class="flex items-center gap-3 border-b border-slate-100 px-4 py-3 dark:border-slate-800"
          :class="field.headerClass"
        >
          <div
            class="flex size-9 items-center justify-center rounded-xl"
            :class="field.iconClass"
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
            rows="4"
            required
            :placeholder="`Tuliskan ${field.label.toLowerCase()}...`"
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

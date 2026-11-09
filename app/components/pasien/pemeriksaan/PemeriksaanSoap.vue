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
  riwayat_penyakit: "Tidak ada riwayat penyakit yang dicatat.",
  objektif: "Kesadaran compos mentis. Pemeriksaan awal dalam batas pemantauan.",
  diagnosis: "Perlu evaluasi lanjutan oleh dokter spesialis mata.",
  planning: "Dilakukan pemeriksaan lanjutan sesuai indikasi klinis.",

  tekanan_darah: "120/80",
  nadi: "80",
  suhu: "36.5",
  pernapasan: "20",
  spo2: "98",
});

const errorMessage = ref("");

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
  const requiredFields = [form.subjektif, form.objektif, form.diagnosis, form.planning];

  if (requiredFields.some((value) => !value.trim())) {
    errorMessage.value = "Mohon lengkapi seluruh bagian pemeriksaan SOAP.";
    return;
  }

  emit("save", getPayload());
};
</script>

<template>
  <form class="space-y-5" @submit.prevent="handleSave">
    <!-- INTRO -->
    <div>
      <div class="flex items-center gap-2">
        <h3 class="text-base font-bold text-slate-900 dark:text-white">
          Pemeriksaan SOAP
        </h3>

        <UBadge color="success" variant="subtle">SOAP</UBadge>
      </div>

      <p class="mt-1 text-xs text-slate-500">
        Dokumentasi pemeriksaan klinis berdasarkan Subjective, Objective, Assessment, dan
        Planning.
      </p>
    </div>

    <!-- SUBJECTIVE -->
    <section
      class="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
    >
      <div
        class="flex items-center gap-3 border-b border-slate-100 bg-blue-50/70 px-4 py-3 dark:border-slate-800 dark:bg-blue-500/5"
      >
        <div
          class="flex size-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
        >
          <UIcon name="i-lucide-message-circle" class="size-5" />
        </div>

        <div>
          <h4 class="text-sm font-bold text-slate-800 dark:text-white">Subjective (S)</h4>
          <p class="text-[11px] text-slate-500">
            Keluhan dan informasi yang disampaikan pasien.
          </p>
        </div>
      </div>

      <div class="space-y-4 p-4">
        <div>
          <label class="mb-2 block text-xs font-semibold">
            Keluhan Utama <span class="text-red-500">*</span>
          </label>

          <textarea
            v-model="form.subjektif"
            rows="3"
            required
            placeholder="Tuliskan keluhan utama pasien..."
            class="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-5 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-800"
          />
        </div>

        <div>
          <label class="mb-2 block text-xs font-semibold"> Riwayat Penyakit </label>

          <textarea
            v-model="form.riwayat_penyakit"
            rows="2"
            placeholder="Riwayat penyakit pasien..."
            class="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-5 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-800"
          />
        </div>
      </div>
    </section>

    <!-- OBJECTIVE -->
    <section
      class="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
    >
      <div
        class="flex items-center gap-3 border-b border-slate-100 bg-emerald-50/70 px-4 py-3 dark:border-slate-800 dark:bg-emerald-500/5"
      >
        <div
          class="flex size-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
        >
          <UIcon name="i-lucide-activity" class="size-5" />
        </div>

        <div>
          <h4 class="text-sm font-bold text-slate-800 dark:text-white">Objective (O)</h4>
          <p class="text-[11px] text-slate-500">
            Hasil pemeriksaan fisik dan tanda vital pasien.
          </p>
        </div>
      </div>

      <div class="space-y-4 p-4">
        <div>
          <label class="mb-2 block text-xs font-semibold"> Tanda Vital </label>

          <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            <div>
              <label class="mb-1 block text-[11px] text-slate-500"> Tekanan Darah </label>
              <UInput v-model="form.tekanan_darah" size="lg" placeholder="120/80" />
              <span class="mt-1 block text-[10px] text-slate-400">mmHg</span>
            </div>

            <div>
              <label class="mb-1 block text-[11px] text-slate-500"> Nadi </label>
              <UInput v-model="form.nadi" size="lg" placeholder="80" />
              <span class="mt-1 block text-[10px] text-slate-400">x/menit</span>
            </div>

            <div>
              <label class="mb-1 block text-[11px] text-slate-500"> Suhu </label>
              <UInput v-model="form.suhu" size="lg" placeholder="36.5" />
              <span class="mt-1 block text-[10px] text-slate-400">°C</span>
            </div>

            <div>
              <label class="mb-1 block text-[11px] text-slate-500"> Pernapasan </label>
              <UInput v-model="form.pernapasan" size="lg" placeholder="20" />
              <span class="mt-1 block text-[10px] text-slate-400">x/menit</span>
            </div>

            <div>
              <label class="mb-1 block text-[11px] text-slate-500"> SpO2 </label>
              <UInput v-model="form.spo2" size="lg" placeholder="98" />
              <span class="mt-1 block text-[10px] text-slate-400">%</span>
            </div>
          </div>
        </div>

        <div>
          <label class="mb-2 block text-xs font-semibold">
            Hasil Pemeriksaan Objektif
            <span class="text-red-500">*</span>
          </label>

          <textarea
            v-model="form.objektif"
            rows="3"
            required
            placeholder="Tuliskan hasil pemeriksaan fisik..."
            class="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-5 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-800"
          />
        </div>
      </div>
    </section>

    <!-- ASSESSMENT -->
    <section
      class="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
    >
      <div
        class="flex items-center gap-3 border-b border-slate-100 bg-violet-50/70 px-4 py-3 dark:border-slate-800 dark:bg-violet-500/5"
      >
        <div
          class="flex size-9 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400"
        >
          <UIcon name="i-lucide-clipboard-check" class="size-5" />
        </div>

        <div>
          <h4 class="text-sm font-bold text-slate-800 dark:text-white">Assessment (A)</h4>
          <p class="text-[11px] text-slate-500">
            Diagnosis dan kesimpulan berdasarkan hasil pemeriksaan.
          </p>
        </div>
      </div>

      <div class="p-4">
        <label class="mb-2 block text-xs font-semibold">
          Diagnosis / Asesmen <span class="text-red-500">*</span>
        </label>

        <textarea
          v-model="form.diagnosis"
          rows="3"
          required
          placeholder="Tuliskan diagnosis atau asesmen..."
          class="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-5 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-800"
        />
      </div>
    </section>

    <!-- PLANNING -->
    <section
      class="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
    >
      <div
        class="flex items-center gap-3 border-b border-slate-100 bg-amber-50/70 px-4 py-3 dark:border-slate-800 dark:bg-amber-500/5"
      >
        <div
          class="flex size-9 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
        >
          <UIcon name="i-lucide-list-checks" class="size-5" />
        </div>

        <div>
          <h4 class="text-sm font-bold text-slate-800 dark:text-white">Planning (P)</h4>
          <p class="text-[11px] text-slate-500">
            Rencana terapi, tindakan, dan tindak lanjut.
          </p>
        </div>
      </div>

      <div class="p-4">
        <label class="mb-2 block text-xs font-semibold">
          Rencana Tindakan <span class="text-red-500">*</span>
        </label>

        <textarea
          v-model="form.planning"
          rows="3"
          required
          placeholder="Tuliskan rencana tindakan..."
          class="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-5 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-800"
        />
      </div>
    </section>

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

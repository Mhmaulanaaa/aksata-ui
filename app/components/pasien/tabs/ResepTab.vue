<script setup lang="ts">
import { computed, ref } from "vue";

defineProps<{
  patient?: unknown;
  patientId?: number;
}>();

const emit = defineEmits<{
  (e: "create-prescription"): void;
}>();

type PrescriptionStatus = "Menunggu" | "Diproses" | "Selesai";

interface Medicine {
  name: string;
  strength: string;
  form: string;
  dose: string;
  frequency: string;
  duration: string;
  route: string;
  instruction: string;
  quantity: number;
}

interface Prescription {
  number: string;
  date: string;
  time: string;
  doctor: string;
  unit: string;
  status: PrescriptionStatus;
  pharmacy: string;
  dispensedAt: string | null;
  medicines: Medicine[];
}

const expandedPrescription = ref<string | null>(null);

const prescriptions: Prescription[] = [
  {
    number: "RSP-20261105-001",
    date: "05 November 2026",
    time: "08:15",
    doctor: "dr. Spesialis Mata",
    unit: "Poli Mata",
    status: "Menunggu",
    pharmacy: "Instalasi Farmasi Rawat Jalan",
    dispensedAt: null,
    medicines: [
      {
        name: "Contoh Obat Tetes Mata",
        strength: "0,5%",
        form: "Tetes mata",
        dose: "1 tetes",
        frequency: "Sesuai instruksi dokter",
        duration: "Sesuai resep",
        route: "Mata",
        instruction: "Gunakan sesuai etiket dan instruksi dokter.",
        quantity: 1,
      },
      {
        name: "Contoh Obat Tablet",
        strength: "500 mg",
        form: "Tablet",
        dose: "1 tablet",
        frequency: "Sesuai instruksi dokter",
        duration: "Sesuai resep",
        route: "Oral",
        instruction: "Gunakan sesuai etiket dan instruksi dokter.",
        quantity: 10,
      },
    ],
  },
  {
    number: "RSP-20261102-004",
    date: "02 November 2026",
    time: "09:45",
    doctor: "dr. Spesialis Mata",
    unit: "Poli Mata",
    status: "Selesai",
    pharmacy: "Instalasi Farmasi Rawat Jalan",
    dispensedAt: "02 November 2026 · 10:30 WIB",
    medicines: [
      {
        name: "Contoh Obat Tetes Mata A",
        strength: "0,5%",
        form: "Tetes mata",
        dose: "1 tetes",
        frequency: "Sesuai instruksi dokter",
        duration: "Sesuai resep",
        route: "Mata",
        instruction: "Gunakan sesuai etiket dan instruksi dokter.",
        quantity: 1,
      },
      {
        name: "Contoh Obat Tablet B",
        strength: "10 mg",
        form: "Tablet",
        dose: "1 tablet",
        frequency: "Sesuai instruksi dokter",
        duration: "Sesuai resep",
        route: "Oral",
        instruction: "Gunakan sesuai etiket dan instruksi dokter.",
        quantity: 10,
      },
      {
        name: "Contoh Obat Tablet C",
        strength: "500 mg",
        form: "Tablet",
        dose: "1 tablet",
        frequency: "Sesuai instruksi dokter",
        duration: "Sesuai resep",
        route: "Oral",
        instruction: "Gunakan sesuai etiket dan instruksi dokter.",
        quantity: 10,
      },
    ],
  },
];

const totalPrescriptions = computed(() => prescriptions.length);

const completedPrescriptions = computed(
  () => prescriptions.filter((item) => item.status === "Selesai").length
);

const pendingPrescriptions = computed(
  () => prescriptions.filter((item) => item.status === "Menunggu").length
);

const totalMedicines = computed(() =>
  prescriptions.reduce((total, item) => total + item.medicines.length, 0)
);

const toggleDetail = (number: string) => {
  expandedPrescription.value = expandedPrescription.value === number ? null : number;
};

const getStatusColor = (status: PrescriptionStatus) => {
  switch (status) {
    case "Selesai":
      return "success";
    case "Diproses":
      return "info";
    default:
      return "warning";
  }
};

const getStatusIcon = (status: PrescriptionStatus) => {
  switch (status) {
    case "Selesai":
      return "i-lucide-circle-check";
    case "Diproses":
      return "i-lucide-loader-circle";
    default:
      return "i-lucide-clock";
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
          <UIcon name="i-lucide-pill" class="size-5" />
        </div>

        <div>
          <h2 class="text-base font-bold text-slate-900 dark:text-white">
            Resep dan Obat
          </h2>
          <p class="mt-1 text-xs text-slate-500">
            Informasi resep dan riwayat pemberian obat pasien.
          </p>
        </div>
      </div>

      <UButton
        color="primary"
        icon="i-lucide-plus"
        size="sm"
        @click="emit('create-prescription')"
      >
        Buat Resep
      </UButton>
    </div>

    <!-- SUMMARY -->
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <div
        class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs font-medium text-slate-500"> Total Resep </span>
          <UIcon name="i-lucide-file-text" class="size-4 text-slate-400" />
        </div>

        <p class="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
          {{ totalPrescriptions }}
        </p>
        <p class="mt-1 text-[10px] text-slate-400">
          {{ totalMedicines }} item obat tercatat
        </p>
      </div>

      <div
        class="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/5"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs font-medium text-emerald-700 dark:text-emerald-400">
            Resep Selesai
          </span>
          <UIcon name="i-lucide-circle-check" class="size-4 text-emerald-500" />
        </div>

        <p class="mt-2 text-2xl font-bold text-emerald-700 dark:text-emerald-400">
          {{ completedPrescriptions }}
        </p>
        <p class="mt-1 text-[10px] text-emerald-600/70 dark:text-emerald-400/70">
          Obat telah diserahkan
        </p>
      </div>

      <div
        class="rounded-xl border border-amber-200 bg-amber-50/60 p-4 dark:border-amber-500/20 dark:bg-amber-500/5"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs font-medium text-amber-700 dark:text-amber-400">
            Menunggu
          </span>
          <UIcon name="i-lucide-clock" class="size-4 text-amber-500" />
        </div>

        <p class="mt-2 text-2xl font-bold text-amber-700 dark:text-amber-400">
          {{ pendingPrescriptions }}
        </p>
        <p class="mt-1 text-[10px] text-amber-600/70 dark:text-amber-400/70">
          Menunggu pelayanan farmasi
        </p>
      </div>
    </div>

    <!-- PRESCRIPTION LIST HEADER -->
    <div>
      <h3 class="text-sm font-bold text-slate-800 dark:text-white">Daftar Resep</h3>
      <p class="mt-1 text-[11px] text-slate-500">
        Pilih resep untuk melihat rincian obat dan aturan penggunaannya.
      </p>
    </div>

    <!-- PRESCRIPTION LIST -->
    <div v-if="prescriptions.length" class="space-y-4">
      <article
        v-for="r in prescriptions"
        :key="r.number"
        class="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
      >
        <!-- PRESCRIPTION HEADER -->
        <div class="p-4 sm:p-5">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div class="flex min-w-0 items-start gap-3">
              <div
                class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
              >
                <UIcon name="i-lucide-pill" class="size-5" />
              </div>

              <div class="min-w-0">
                <p class="break-all text-sm font-bold text-slate-900 dark:text-white">
                  {{ r.number }}
                </p>

                <div class="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span class="flex items-center gap-1 text-[11px] text-slate-500">
                    <UIcon name="i-lucide-calendar" class="size-3.5" />
                    {{ r.date }}
                  </span>

                  <span class="flex items-center gap-1 text-[11px] text-slate-500">
                    <UIcon name="i-lucide-clock" class="size-3.5" />
                    {{ r.time }} WIB
                  </span>
                </div>
              </div>
            </div>

            <UBadge :color="getStatusColor(r.status)" variant="subtle" size="sm">
              <UIcon :name="getStatusIcon(r.status)" class="mr-1 size-3" />
              {{ r.status }}
            </UBadge>
          </div>

          <!-- PRESCRIPTION INFORMATION -->
          <div
            class="mt-4 grid gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60 sm:grid-cols-3"
          >
            <div>
              <p class="text-[10px] text-slate-400">Dokter Pemeriksa</p>
              <p class="mt-1 text-xs font-semibold text-slate-700 dark:text-slate-200">
                {{ r.doctor }}
              </p>
            </div>

            <div>
              <p class="text-[10px] text-slate-400">Unit Pelayanan</p>
              <p class="mt-1 text-xs font-semibold text-slate-700 dark:text-slate-200">
                {{ r.unit }}
              </p>
            </div>

            <div>
              <p class="text-[10px] text-slate-400">Jumlah Obat</p>
              <p class="mt-1 text-xs font-semibold text-slate-700 dark:text-slate-200">
                {{ r.medicines.length }} item obat
              </p>
            </div>
          </div>

          <!-- PHARMACY STATUS -->
          <div class="mt-3 flex items-start gap-2">
            <UIcon
              name="i-lucide-hospital"
              class="mt-0.5 size-4 shrink-0 text-slate-400"
            />

            <div class="min-w-0">
              <p class="text-[11px] font-medium text-slate-700 dark:text-slate-300">
                {{ r.pharmacy }}
              </p>

              <p class="mt-1 text-[10px] text-slate-500">
                <template v-if="r.dispensedAt">
                  Obat diserahkan pada {{ r.dispensedAt }}
                </template>
                <template v-else>
                  Menunggu proses pelayanan dan penyerahan obat.
                </template>
              </p>
            </div>
          </div>

          <!-- DETAIL BUTTON -->
          <div class="mt-4 flex justify-end">
            <UButton
              color="neutral"
              variant="outline"
              size="sm"
              :trailing-icon="
                expandedPrescription === r.number
                  ? 'i-lucide-chevron-up'
                  : 'i-lucide-chevron-down'
              "
              @click="toggleDetail(r.number)"
            >
              {{ expandedPrescription === r.number ? "Tutup Detail" : "Detail Resep" }}
            </UButton>
          </div>
        </div>

        <!-- MEDICINE DETAILS -->
        <div
          v-if="expandedPrescription === r.number"
          class="border-t border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/40 sm:p-5"
        >
          <div class="mb-4 flex items-center justify-between gap-2">
            <div>
              <h4 class="text-sm font-bold text-slate-800 dark:text-white">
                Rincian Obat
              </h4>
              <p class="mt-1 text-[11px] text-slate-500">
                Informasi obat berdasarkan resep yang diterbitkan.
              </p>
            </div>

            <UBadge color="neutral" variant="subtle">
              {{ r.medicines.length }} Item
            </UBadge>
          </div>

          <div class="space-y-3">
            <div
              v-for="(medicine, index) in r.medicines"
              :key="`${r.number}-${index}`"
              class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
            >
              <!-- MEDICINE NAME -->
              <div class="flex items-start gap-3">
                <div
                  class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                >
                  <UIcon name="i-lucide-pill" class="size-4" />
                </div>

                <div class="min-w-0 flex-1">
                  <p class="text-xs font-bold text-slate-800 dark:text-white">
                    {{ medicine.name }}
                  </p>

                  <p class="mt-1 text-[10px] text-slate-500">
                    {{ medicine.strength }} · {{ medicine.form }}
                  </p>
                </div>

                <UBadge color="neutral" variant="subtle" size="xs">
                  {{ medicine.quantity }} unit
                </UBadge>
              </div>

              <!-- DOSAGE INFORMATION -->
              <div class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div>
                  <p class="text-[10px] text-slate-400">Dosis</p>
                  <p
                    class="mt-1 text-xs font-semibold text-slate-700 dark:text-slate-200"
                  >
                    {{ medicine.dose }}
                  </p>
                </div>

                <div>
                  <p class="text-[10px] text-slate-400">Frekuensi</p>
                  <p
                    class="mt-1 text-xs font-semibold text-slate-700 dark:text-slate-200"
                  >
                    {{ medicine.frequency }}
                  </p>
                </div>

                <div>
                  <p class="text-[10px] text-slate-400">Durasi</p>
                  <p
                    class="mt-1 text-xs font-semibold text-slate-700 dark:text-slate-200"
                  >
                    {{ medicine.duration }}
                  </p>
                </div>

                <div>
                  <p class="text-[10px] text-slate-400">Rute Pemberian</p>
                  <p
                    class="mt-1 text-xs font-semibold text-slate-700 dark:text-slate-200"
                  >
                    {{ medicine.route }}
                  </p>
                </div>
              </div>

              <!-- INSTRUCTION -->
              <div
                class="mt-3 flex items-start gap-2 rounded-lg bg-blue-50 p-3 dark:bg-blue-500/5"
              >
                <UIcon
                  name="i-lucide-info"
                  class="mt-0.5 size-3.5 shrink-0 text-blue-500"
                />

                <div>
                  <p class="text-[10px] font-semibold text-blue-700 dark:text-blue-400">
                    Aturan Pakai
                  </p>
                  <p
                    class="mt-1 text-[11px] leading-5 text-blue-700/80 dark:text-blue-300/80"
                  >
                    {{ medicine.instruction }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- FOOTER NOTE -->
          <p class="mt-4 flex items-start gap-2 text-[10px] leading-5 text-slate-400">
            <UIcon name="i-lucide-shield-check" class="mt-0.5 size-3.5 shrink-0" />
            Informasi penggunaan obat harus mengacu pada resep resmi dan etiket yang
            diterbitkan oleh dokter serta instalasi farmasi.
          </p>
        </div>
      </article>
    </div>

    <!-- EMPTY STATE -->
    <div
      v-else
      class="rounded-2xl border border-dashed border-slate-300 py-12 text-center dark:border-slate-700"
    >
      <UIcon name="i-lucide-pill" class="mx-auto size-9 text-slate-300" />

      <p class="mt-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
        Belum ada resep obat
      </p>

      <p class="mt-1 text-xs text-slate-400">
        Resep yang diterbitkan untuk pasien akan ditampilkan di sini.
      </p>
    </div>
  </div>
</template>

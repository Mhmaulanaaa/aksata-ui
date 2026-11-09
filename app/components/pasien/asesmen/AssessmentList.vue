<script setup lang="ts">
import { computed } from "vue";

type AssessmentStatus = "Selesai" | "Draft" | "Belum Diisi";

type Assessment = {
  id: number;
  code: string;
  title: string;
  description: string;
  date: string;
  author: string;
  status: AssessmentStatus;
  icon: string;
};

const props = defineProps<{
  assessments: Assessment[];
}>();

const emit = defineEmits<{
  select: [id: number];
}>();

// Statistik
const total = computed(() => props.assessments.length);

const completed = computed(
  () => props.assessments.filter((item) => item.status === "Selesai").length
);

const drafts = computed(
  () => props.assessments.filter((item) => item.status === "Draft").length
);

const pending = computed(
  () => props.assessments.filter((item) => item.status === "Belum Diisi").length
);

// Konfigurasi status
function getStatusColor(status: AssessmentStatus) {
  switch (status) {
    case "Selesai":
      return "success";
    case "Draft":
      return "warning";
    default:
      return "neutral";
  }
}

function getActionLabel(status: AssessmentStatus) {
  switch (status) {
    case "Selesai":
      return "Lihat hasil";
    case "Draft":
      return "Lanjutkan pengisian";
    default:
      return "Mulai pengisian";
  }
}

function getActionIcon(status: AssessmentStatus) {
  switch (status) {
    case "Selesai":
      return "i-lucide-eye";
    case "Draft":
      return "i-lucide-pencil";
    default:
      return "i-lucide-file-plus";
  }
}
</script>

<template>
  <div class="space-y-5">
    <!-- HEADER -->
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <div
          class="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
        >
          <UIcon name="i-lucide-clipboard-check" class="size-5" />
        </div>
        <div>
          <h2 class="text-base font-bold text-slate-800 dark:text-white">
            Asesmen & Pengkajian
          </h2>

          <p class="mt-1 text-xs text-slate-500">
            Riwayat pemeriksaan dan pengkajian pasien.
          </p>
        </div>
      </div>

      <UBadge color="neutral" variant="subtle"> {{ total }} Asesmen </UBadge>
    </div>

    <!-- STATISTIK -->
    <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <div
        class="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs text-slate-500">Total</span>
          <UIcon name="i-lucide-clipboard-list" class="size-4 text-slate-400" />
        </div>

        <p class="mt-2 text-2xl font-bold text-slate-800 dark:text-white">
          {{ total }}
        </p>
        <p class="mt-1 text-[10px] text-slate-400">Seluruh asesmen</p>
      </div>

      <div
        class="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3 dark:border-emerald-900/50 dark:bg-emerald-950/20"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs text-emerald-700 dark:text-emerald-400"> Selesai </span>
          <UIcon name="i-lucide-check-circle" class="size-4 text-emerald-600" />
        </div>

        <p class="mt-2 text-2xl font-bold text-emerald-700 dark:text-emerald-400">
          {{ completed }}
        </p>
        <p class="mt-1 text-[10px] text-emerald-600/70">Sudah diselesaikan</p>
      </div>

      <div
        class="rounded-xl border border-amber-200 bg-amber-50/50 p-3 dark:border-amber-900/50 dark:bg-amber-950/20"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs text-amber-700 dark:text-amber-400"> Draft </span>
          <UIcon name="i-lucide-clock-3" class="size-4 text-amber-600" />
        </div>

        <p class="mt-2 text-2xl font-bold text-amber-700 dark:text-amber-400">
          {{ drafts }}
        </p>
        <p class="mt-1 text-[10px] text-amber-600/70">Belum selesai</p>
      </div>

      <div
        class="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs text-slate-500">Belum Diisi</span>
          <UIcon name="i-lucide-file-plus" class="size-4 text-slate-400" />
        </div>

        <p class="mt-2 text-2xl font-bold text-slate-700 dark:text-slate-200">
          {{ pending }}
        </p>
        <p class="mt-1 text-[10px] text-slate-400">Menunggu pengisian</p>
      </div>
    </div>

    <!-- DAFTAR ASESMEN -->
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-sm font-bold text-slate-800 dark:text-white">Daftar Asesmen</h3>

          <p class="mt-1 text-[11px] text-slate-500">
            Pilih asesmen untuk melihat atau mengisi data.
          </p>
        </div>

        <span class="text-[11px] text-slate-400"> {{ total }} data </span>
      </div>

      <div v-if="assessments.length" class="space-y-3">
        <button
          v-for="item in assessments"
          :key="item.id"
          type="button"
          class="group w-full rounded-xl border border-slate-200 bg-white p-4 text-left transition-all hover:border-emerald-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-800"
          @click="emit('select', item.id)"
        >
          <div class="flex items-start gap-3">
            <!-- Icon -->
            <div
              class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:group-hover:bg-emerald-900/50"
            >
              <UIcon :name="item.icon" class="size-5" />
            </div>

            <!-- Informasi -->
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-2">
                <h4 class="text-sm font-bold text-slate-800 dark:text-white">
                  {{ item.title }}
                </h4>

                <UBadge :color="getStatusColor(item.status)" variant="subtle" size="xs">
                  {{ item.status }}
                </UBadge>
              </div>

              <p class="mt-1 text-xs leading-relaxed text-slate-500">
                {{ item.description }}
              </p>

              <div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span class="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <UIcon name="i-lucide-calendar" class="size-3.5" />
                  {{ item.date }}
                </span>

                <span class="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <UIcon name="i-lucide-user-round" class="size-3.5" />
                  {{ item.author }}
                </span>
              </div>

              <!-- Aksi -->
              <div
                class="mt-3 flex items-center gap-1.5 text-xs font-semibold"
                :class="
                  item.status === 'Selesai'
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : item.status === 'Draft'
                    ? 'text-amber-600 dark:text-amber-400'
                    : 'text-slate-500 dark:text-slate-400'
                "
              >
                <UIcon :name="getActionIcon(item.status)" class="size-3.5" />
                {{ getActionLabel(item.status) }}
              </div>
            </div>

            <!-- Chevron -->
            <UIcon
              name="i-lucide-chevron-right"
              class="mt-3 size-5 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-emerald-600"
            />
          </div>
        </button>
      </div>

      <!-- EMPTY STATE -->
      <div
        v-else
        class="rounded-xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700"
      >
        <UIcon name="i-lucide-clipboard-list" class="mx-auto size-10 text-slate-400" />

        <h4 class="mt-3 text-sm font-semibold text-slate-700 dark:text-white">
          Belum Ada Asesmen
        </h4>

        <p class="mt-1 text-xs text-slate-500">
          Belum terdapat data asesmen untuk pasien ini.
        </p>
      </div>
    </div>
  </div>
</template>

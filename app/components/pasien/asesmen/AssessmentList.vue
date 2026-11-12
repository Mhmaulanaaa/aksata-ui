<script setup lang="ts">
type AssessmentStatus = "Selesai" | "Draft" | "Belum Diisi";

interface AssessmentListItem {
  id: number;
  code: string;
  title: string;
  description: string;
  icon: string;
  profession: string;
  status: AssessmentStatus;
  date: string;
  author: string;
  transactionId: number | null;
}

defineProps<{
  assessments: AssessmentListItem[];
}>();

const emit = defineEmits<{
  (e: "select", id: number): void;
  (e: "create", id: number): void;
}>();

const search = defineModel<string>("search", {
  default: "",
});

function statusColor(status: AssessmentStatus) {
  if (status === "Selesai") return "success";
  if (status === "Draft") return "warning";
  return "neutral";
}
</script>

<template>
  <div class="space-y-5">
    <!-- Header -->
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-base font-bold text-slate-800 dark:text-white">
          Daftar Asesmen Pasien
        </h2>
        <p class="mt-1 text-xs text-slate-500">
          Pilih jenis asesmen untuk melihat atau memulai pengisian formulir.
        </p>
      </div>

      <UBadge color="primary" variant="subtle">
        {{ assessments.length }} jenis asesmen
      </UBadge>
    </div>

    <!-- Search -->
    <UInput
      v-model="search"
      icon="i-lucide-search"
      placeholder="Cari nama atau kode asesmen..."
      size="lg"
      class="w-full"
    />

    <!-- List -->
    <div v-if="assessments.length" class="space-y-3">
      <div
        v-for="item in assessments"
        :key="item.id"
        class="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-emerald-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-700"
      >
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
          <!-- Icon -->
          <div
            class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
          >
            <UIcon :name="item.icon" class="size-5" />
          </div>

          <!-- Information -->
          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-center gap-2">
              <span
                class="text-[10px] font-semibold tracking-wide text-emerald-700 dark:text-emerald-400"
              >
                {{ item.code }}
              </span>

              <UBadge :color="statusColor(item.status)" variant="subtle" size="xs">
                {{ item.status }}
              </UBadge>

              <UBadge color="neutral" variant="outline" size="xs">
                {{ item.profession }}
              </UBadge>
            </div>

            <h3 class="mt-1 text-sm font-bold text-slate-800 dark:text-white">
              {{ item.title }}
            </h3>

            <p class="mt-1 text-xs leading-relaxed text-slate-500">
              {{ item.description }}
            </p>

            <div
              class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400"
            >
              <span class="flex items-center gap-1">
                <UIcon name="i-lucide-calendar-days" class="size-3.5" />
                {{ item.date }}
              </span>

              <span class="flex items-center gap-1">
                <UIcon name="i-lucide-user-round" class="size-3.5" />
                {{ item.author }}
              </span>
            </div>
          </div>

          <!-- Action -->

          <div class="flex shrink-0 flex-wrap gap-2">
            <!-- Lihat transaksi terakhir -->
            <UButton
              v-if="item.transactionId !== null"
              color="neutral"
              variant="outline"
              size="sm"
              icon="i-lucide-eye"
              @click="emit('select', item.id)"
            >
              Lihat Terakhir
            </UButton>

            <!-- Mulai pengisian atau pengisian baru -->
            <UButton
              color="primary"
              size="sm"
              :icon="item.transactionId !== null ? 'i-lucide-plus' : 'i-lucide-play'"
              @click="emit('create', item.id)"
            >
              {{ item.transactionId !== null ? "Pengisian Baru" : "Mulai Asesmen" }}
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty -->
    <div
      v-else
      class="rounded-xl border border-dashed border-slate-300 px-4 py-12 text-center dark:border-slate-700"
    >
      <UIcon name="i-lucide-search-x" class="mx-auto size-9 text-slate-400" />
      <p class="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
        Asesmen tidak ditemukan
      </p>
      <p class="mt-1 text-xs text-slate-500">
        Coba gunakan kata kunci pencarian lainnya.
      </p>
    </div>
  </div>
</template>

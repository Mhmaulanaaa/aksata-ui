<script setup lang="ts">
defineProps<{ patient?: unknown; patientId?: number }>();
import { computed, ref } from "vue";
const filter = ref("Semua");
const items = [
  {
    title: "Asesmen Awal Keperawatan",
    date: "05 Nov 2026, 07:20",
    author: "Perawat Poliklinik",
    status: "Selesai",
  },
  {
    title: "Skrining Risiko Jatuh",
    date: "05 Nov 2026, 07:25",
    author: "Perawat Poliklinik",
    status: "Selesai",
  },
  {
    title: "Skrining Nyeri",
    date: "05 Nov 2026, 07:28",
    author: "Perawat Poliklinik",
    status: "Draft",
  },
];
const filtered = computed(() =>
  items.filter((x) => filter.value === "Semua" || x.status === filter.value)
);
</script>
<template>
  <div class="space-y-5">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 class="text-base font-bold">Asesmen Pasien</h2>
        <p class="mt-1 text-xs text-slate-500">Daftar asesmen dan skrining pasien.</p>
      </div>
      <UButton color="primary" icon="i-lucide-plus" size="sm">Tambah Asesmen</UButton>
    </div>
    <div class="flex gap-2">
      <button
        v-for="f in ['Semua', 'Selesai', 'Draft']"
        :key="f"
        class="rounded-lg px-3 py-2 text-xs font-semibold"
        :class="
          filter === f
            ? 'bg-emerald-600 text-white'
            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
        "
        @click="filter = f"
      >
        {{ f }}
      </button>
    </div>
    <div
      class="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
    >
      <div
        v-for="item in filtered"
        :key="item.title"
        class="flex flex-col gap-3 border-b border-slate-100 p-4 last:border-0 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="flex items-start gap-3">
          <UIcon name="i-lucide-clipboard-check" class="mt-1 h-5 w-5 text-violet-500" />
          <div>
            <p class="text-sm font-semibold">{{ item.title }}</p>
            <p class="mt-1 text-[11px] text-slate-500">
              {{ item.author }} · {{ item.date }}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <UBadge
            :color="item.status === 'Selesai' ? 'success' : 'warning'"
            variant="subtle"
            >{{ item.status }}</UBadge
          ><UButton color="neutral" variant="outline" size="xs" icon="i-lucide-eye"
            >Lihat</UButton
          >
        </div>
      </div>
      <p v-if="!filtered.length" class="p-8 text-center text-xs text-slate-400">
        Tidak ada asesmen.
      </p>
    </div>
  </div>
</template>

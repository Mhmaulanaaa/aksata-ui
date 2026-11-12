<script setup lang="ts">
type AssessmentStatus = "Selesai" | "Draft" | "Belum Diisi";

type Assessment = {
  id: number;
  code: string;
  title: string;
  date: string;
  author: string;
  status: AssessmentStatus;
};

defineProps<{
  assessments: Assessment[];
}>();

const emit = defineEmits<{
  select: [id: number];
}>();

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
</script>

<template>
  <div class="space-y-3">
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-sm font-bold text-slate-800 dark:text-white">Riwayat Asesmen</h3>
        <p class="mt-1 text-xs text-slate-500">Riwayat pengisian asesmen pasien.</p>
      </div>

      <UBadge color="neutral" variant="subtle"> {{ assessments.length }} Data </UBadge>
    </div>

    <div
      v-if="assessments.length"
      class="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800"
    >
      <button
        v-for="item in assessments"
        :key="item.id"
        type="button"
        class="flex w-full items-center gap-3 border-b border-slate-100 bg-white p-4 text-left last:border-b-0 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/50"
        @click="emit('select', item.id)"
      >
        <div
          class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800"
        >
          <UIcon name="i-lucide-file-text" class="size-5" />
        </div>

        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-semibold text-slate-800 dark:text-white">
            {{ item.title }}
          </p>

          <div class="mt-1 flex flex-wrap gap-x-3 text-[11px] text-slate-400">
            <span>{{ item.date }}</span>
            <span>{{ item.author }}</span>
          </div>
        </div>

        <UBadge :color="getStatusColor(item.status)" variant="subtle" size="xs">
          {{ item.status }}
        </UBadge>

        <UIcon name="i-lucide-chevron-right" class="size-4 shrink-0 text-slate-400" />
      </button>
    </div>

    <div
      v-else
      class="rounded-xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700"
    >
      <UIcon name="i-lucide-clipboard-list" class="mx-auto size-8 text-slate-400" />
      <p class="mt-2 text-sm font-semibold text-slate-700 dark:text-white">
        Belum Ada Riwayat Asesmen
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
type Category = {
  id: string;
  title: string;
  description: string;
  icon: string;
  count: number;
};

defineProps<{
  categories: Category[];
}>();

const emit = defineEmits<{
  select: [id: string];
}>();
</script>

<template>
  <div class="space-y-3">
    <div>
      <h3 class="text-sm font-bold text-slate-800 dark:text-white">
        Pilih Jenis Asesmen
      </h3>
      <p class="mt-1 text-xs text-slate-500">
        Pilih kategori asesmen sesuai kebutuhan pemeriksaan.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <button
        v-for="item in categories"
        :key="item.id"
        type="button"
        class="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-emerald-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900"
        @click="emit('select', item.id)"
      >
        <div
          class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
        >
          <UIcon :name="item.icon" class="size-5" />
        </div>

        <div class="min-w-0 flex-1">
          <p class="text-sm font-bold text-slate-800 dark:text-white">
            {{ item.title }}
          </p>
          <p class="mt-1 text-xs text-slate-500">
            {{ item.description }}
          </p>
          <p class="mt-2 text-[11px] font-semibold text-emerald-600">
            {{ item.count }} Jenis Asesmen
          </p>
        </div>

        <UIcon name="i-lucide-chevron-right" class="size-5 shrink-0 text-slate-400" />
      </button>
    </div>
  </div>
</template>

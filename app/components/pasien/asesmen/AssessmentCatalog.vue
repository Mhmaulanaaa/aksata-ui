<script setup lang="ts">
type CatalogItem = {
  id: number;
  code: string;
  title: string;
  description: string;
  icon: string;
};

defineProps<{
  categoryTitle: string;
  items: CatalogItem[];
}>();

const emit = defineEmits<{
  back: [];
  select: [id: number];
}>();
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center gap-3">
      <UButton
        icon="i-lucide-arrow-left"
        color="neutral"
        variant="soft"
        size="sm"
        @click="emit('back')"
      />

      <div>
        <h3 class="text-sm font-bold text-slate-800 dark:text-white">
          {{ categoryTitle }}
        </h3>
        <p class="mt-1 text-xs text-slate-500">
          Pilih asesmen untuk melihat atau memulai pengisian.
        </p>
      </div>
    </div>

    <div v-if="items.length" class="space-y-2">
      <button
        v-for="item in items"
        :key="item.id"
        type="button"
        class="group flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-emerald-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900"
        @click="emit('select', item.id)"
      >
        <div
          class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
        >
          <UIcon :name="item.icon" class="size-5" />
        </div>

        <div class="min-w-0 flex-1">
          <div class="flex flex-wrap items-center gap-2">
            <p class="text-sm font-semibold text-slate-800 dark:text-white">
              {{ item.title }}
            </p>
            <UBadge color="neutral" variant="subtle" size="xs">
              {{ item.code }}
            </UBadge>
          </div>

          <p class="mt-1 text-xs text-slate-500">
            {{ item.description }}
          </p>
        </div>

        <UIcon name="i-lucide-chevron-right" class="size-5 shrink-0 text-slate-400" />
      </button>
    </div>

    <div
      v-else
      class="rounded-xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700"
    >
      <UIcon name="i-lucide-clipboard-list" class="mx-auto size-8 text-slate-400" />
      <p class="mt-2 text-sm font-semibold text-slate-700 dark:text-white">
        Belum Ada Jenis Asesmen
      </p>
      <p class="mt-1 text-xs text-slate-500">
        Belum tersedia asesmen untuk kategori ini.
      </p>
    </div>
  </div>
</template>

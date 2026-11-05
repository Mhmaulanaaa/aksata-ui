<script setup lang="ts">
import type { PatientTab } from "~/types/pasien";
defineProps<{ modelValue: string; tabs: PatientTab[] }>();
const emit = defineEmits<{ (e: "update:modelValue", value: string): void }>();
</script>
<template>
  <nav
    aria-label="Navigasi detail pasien"
    class="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900"
  >
    <div class="flex min-w-max gap-1">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        type="button"
        :aria-current="modelValue === tab.value ? 'page' : undefined"
        :class="[
          'inline-flex min-h-10 items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors',
          modelValue === tab.value
            ? 'bg-emerald-600 text-white shadow-sm'
            : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800',
        ]"
        @click="emit('update:modelValue', tab.value)"
      >
        <UIcon :name="tab.icon" class="h-4 w-4" />{{ tab.label }}
      </button>
    </div>
  </nav>
</template>

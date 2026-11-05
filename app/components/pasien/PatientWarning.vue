<script setup lang="ts">
defineProps<{ message: string; title?: string }>();
</script>
<template>
  <div
    v-if="message"
    role="alert"
    class="flex gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/30"
  >
    <span
      class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600"
      ><UIcon name="i-lucide-alert-triangle" class="h-5 w-5"
    /></span>
    <div>
      <p class="text-sm font-bold text-amber-900 dark:text-amber-200">
        {{ title || "Perhatian!" }}
      </p>
      <p class="mt-1 text-xs leading-5 text-amber-800 dark:text-amber-300">
        {{ message }}
      </p>
    </div>
  </div>
</template>

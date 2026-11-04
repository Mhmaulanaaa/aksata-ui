<script setup lang="ts">
interface Option {
  label: string;
  value: string | number;
}

const model = defineModel<(string | number)[]>({
  default: () => [],
});

withDefaults(
  defineProps<{
    label?: string;
    options: Option[];
    placeholder?: string;
    searchable?: boolean;
    disabled?: boolean;
    loading?: boolean;
  }>(),
  {
    placeholder: "Pilih data",
    searchable: true,
    disabled: false,
    loading: false,
  }
);
</script>

<template>
  <div class="space-y-2">
    <label v-if="label" class="text-sm font-medium text-gray-700 dark:text-gray-200">
      {{ label }}
    </label>

    <USelectMenu
      v-model="model"
      :items="options"
      value-key="value"
      label-key="label"
      multiple
      :searchable="searchable"
      :disabled="disabled"
      :loading="loading"
      :placeholder="placeholder"
      class="w-full px-3 py-3 rounded-xl text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
    />
  </div>
</template>

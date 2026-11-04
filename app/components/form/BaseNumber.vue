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
    items: Option[];
    placeholder?: string;
    disabled?: boolean;
    searchable?: boolean;
    loading?: boolean;
  }>(),
  {
    placeholder: "Pilih data",
    disabled: false,
    searchable: true,
    loading: false,
  }
);
</script>

<template>
  <USelectMenu
    v-model="model"
    :items="items"
    multiple
    value-key="value"
    label-key="label"
    :searchable="searchable"
    :loading="loading"
    :disabled="disabled"
    :placeholder="placeholder"
    class="w-full"
  />
</template>

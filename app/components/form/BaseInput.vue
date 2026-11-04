<script setup lang="ts">
const props = defineProps<{
  modelValue: string | number | null;
  label?: string;
  placeholder?: string;
  readonly?: boolean;
  disabled?: boolean;
  error?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <div>
    <label v-if="label" class="text-sm text-gray-600 dark:text-gray-300">
      {{ label }}
    </label>

    <input
      :value="modelValue"
      @input="onInput"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      :class="[
        'w-full mt-1 px-3 py-2 rounded-xl text-sm outline-none',
        error
          ? 'border border-red-500 focus:ring-2 focus:ring-red-500'
          : 'border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-green-500',
      ]"
    />

    <p v-if="error" class="mt-1 text-xs text-red-500">
      {{ error }}
    </p>
  </div>
</template>

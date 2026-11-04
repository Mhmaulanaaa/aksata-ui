<script setup lang="ts">
import { reactive, watch, computed } from "vue";
import BaseInput from "~/components/form/BaseInput.vue";

const modalSize = computed(() => {
  switch (props.size) {
    case "sm":
      return "max-w-sm";
    case "lg":
      return "max-w-2xl";
    case "xl":
      return "max-w-4xl";
    default:
      return "max-w-md"; // md
  }
});

const props = defineProps<{
  modelValue: boolean;
  isEdit: boolean;
  size?: "sm" | "md" | "lg" | "xl";

  form: any;
  errors: any;

  parentOptions: {
    label: string;
    value: number;
  }[];

  orderMessage: string;
  orderAvailable: boolean | null;
}>();

const emit = defineEmits(["update:modelValue", "save"]);

function close() {
  emit("update:modelValue", false);
}

function submit() {
  emit("save");
}
</script>

<template>
  <Transition name="modal-fade">
    <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- BACKDROP -->
      <div class="absolute inset-0 bg-black/50" @click="close"></div>

      <!-- MODAL -->
      <div
        :class="[
          'relative z-10 w-full bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden',
          modalSize,
        ]"
      >
        <!-- HEADER -->
        <div
          class="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700"
        >
          <!-- LEFT -->
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-100 text-emerald-600"
            >
              <UIcon
                :name="isEdit ? 'i-heroicons-pencil-square' : 'i-heroicons-plus'"
                class="w-5 h-5"
              />
            </div>

            <div>
              <h2 class="text-sm font-semibold text-slate-800 dark:text-white">
                {{ isEdit ? "Edit Submenu" : "Tambah Submenu" }}
              </h2>
              <p class="text-xs text-slate-500">
                {{ isEdit ? "Perbarui data submenu" : "Tambahkan submenu baru" }}
              </p>
            </div>
          </div>

          <!-- CLOSE BUTTON -->
          <button
            @click="close"
            class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          >
            <UIcon name="i-heroicons-x-mark" class="w-5 h-5 text-slate-500" />
          </button>
        </div>
        <div class="p-6 m-1 gap-2">
          <div>
            <label class="text-sm">Menu Parent</label>
            <USelectMenu
              v-model="props.form.menu_parent"
              :items="props.parentOptions"
              value-key="value"
              label-key="label"
              placeholder="Pilih Menu"
              class="w-48 w-full px-3 py-3 rounded-xl text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
            />
            <p v-if="errors.menu_parent" class="mt-1 text-xs text-red-500">
              {{ errors.menu_parent }}
            </p>
          </div>
          <div>
            <label class="text-sm">Nama Submenu</label>
            <BaseInput
              v-model="props.form.menu_nama"
              placeholder="Nama Submenu"
              :error="props.errors.menu_nama"
            />
          </div>
          <div>
            <label class="text-sm">Path Url</label>
            <BaseInput
              v-model="props.form.router"
              placeholder="/master/submenu"
              :error="props.errors.router"
            />
          </div>
          <div>
            <label class="text-sm">Folder Path</label>
            <BaseInput
              v-model="props.form.path"
              placeholder="/pages/master/submenu"
              :error="props.errors.path"
            />
          </div>
          <div>
            <label class="text-sm">Urutan</label>

            <BaseInput
              v-model="props.form.menu_urutan"
              type="number"
              placeholder="Urutan"
              :error="props.errors.menu_urutan"
            />
            <p
              v-if="props.orderMessage"
              class="mt-1 text-xs"
              :class="props.orderAvailable ? 'text-green-600' : 'text-red-600'"
            >
              {{ props.orderMessage }}
            </p>
          </div>
          <div v-if="isEdit">
            <label class="text-sm">Status</label>
            <USelectMenu
              v-model="props.form.is_aktif"
              :items="[
                { label: 'Aktif', value: true },
                { label: 'Tidak Aktif', value: false },
              ]"
              value-key="value"
              label-key="label"
              placeholder="Pilih Status"
              class="w-48 w-full px-3 py-3 rounded-xl text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
            />
          </div>
        </div>

        <!-- FOOTER -->
        <div
          class="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50"
        >
          <button
            @click="close"
            class="px-4 py-2 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          >
            Tutup
          </button>

          <button
            @click="submit"
            class="px-5 py-2 text-sm font-medium bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition shadow-sm"
          >
            {{ isEdit ? "Update" : "Simpan" }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>

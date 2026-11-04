<script setup lang="ts">
import BaseModalMasterMenu from "~/components/base/master/BaseModalMasterMenu.vue";
import BaseStatCard from "~/components/form/BaseStatCard.vue";
import BaseTable from "~/components/form/BaseTable.vue";

import { useMenuPage } from "~/composables/master/menu/useMenuPage";

useHead({
  title: "Admin Master Menu",
});
definePageMeta({
  breadcrumb: [{ label: "Master", to: "/master" }, { label: "Master Menu" }],
});

const {
  loading,

  filter,

  showModal,

  isEdit,

  menus,

  statistics,

  form,

  orderAvailable,

  orderMessage,

  columns,

  openCreate,

  openEdit,

  handleSave,

  deleteMenu,

  handleSearch,

  handleReset,

  loadMenus,

  loadStats,

  selectedMenu,

  menuOptions,

  total,

  page,

  pageSize,

  changePage,

  errors,

  selectedStatus,
} = useMenuPage();

onMounted(async () => {
  loadMenus();
  await loadStats();
});
</script>
<template>
  <!-- Start Section -->
  <div class="mb-4">
    <h1 class="text-xl font-semibold text-gray-800 dark:text-white mb-1">Master Menu</h1>
    <AppBreadcrumb />
  </div>
  <div class="grid grid-cols-3 gap-4 mb-6">
    <BaseStatCard
      title="Total Menu"
      :value="statistics.total_menu"
      color="from-blue-500 to-blue-600"
      iconColor="text-blue-200"
      textColor="text-blue-100"
    />

    <BaseStatCard
      title="Total Menu Aktif"
      :value="statistics.total_aktif"
      color="from-green-500 to-green-600"
      iconColor="text-white-200"
      textColor="text-white-100"
    />

    <BaseStatCard
      title="Total Menu Tidak Aktif"
      :value="statistics.total_tidak_aktif"
      color="from-red-500 to-red-600"
      iconColor="text-white-200"
      textColor="text-white-100"
    />
  </div>
  <!-- End Start Section -->
  <!-- TOP ACTION SEARCH -->
  <div
    class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-5"
  >
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
      <!-- SEARCH -->
      <div class="w-full group flex items-center sm:w-full group gap-5">
        <div class="flex-1">
          <USelectMenu
            v-model="selectedMenu"
            :items="menuOptions"
            value-key="value"
            label-key="label"
            searchable
            placeholder="Cari Menu..."
            class="w-full px-3 py-3 rounded-xl text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
          />
        </div>
        <div class="flex-1">
          <USelectMenu
            label="Pilih Status"
            placeholder="Pilih Status"
            v-model="selectedStatus"
            :items="[
              { label: 'Semua', value: undefined },
              { label: 'Aktif', value: true },
              { label: 'Tidak Aktif', value: false },
            ]"
            class="w-full px-3 py-3 rounded-xl text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
          />
        </div>
      </div>
    </div>
    <div class="flex items-center gap-2 mt-5">
      <button
        @click="handleSearch"
        class="bg-emerald-500 dark:bg-emerald-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-600 dark:hover:bg-emerald-700 transition flex items-center gap-2 shadow-sm"
      >
        <UIcon name="i-heroicons-magnifying-glass" class="w-5 h-5 text-white" />
        Cari
      </button>

      <button
        @click="handleReset"
        class="bg-red-500 dark:bg-red-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-red-600 dark:hover:bg-red-700 transition flex items-center gap-2 shadow-sm"
      >
        <UIcon name="i-heroicons-arrow-path" class="w-5 h-5 text-white" />
        Muat Ulang
      </button>
    </div>
    <!-- END SEARCH -->
  </div>
  <!-- END TOP ACTION SEARCH -->
  <!-- BASE TABLE + MODAL -->
  <div
    class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
  >
    <!-- Add BUTTON -->
    <div class="flex justify-end mb-4">
      <button
        @click="openCreate"
        class="bg-emerald-500 dark:bg-emerald-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-600 dark:hover:bg-emerald-700 transition flex items-center gap-2 shadow-sm"
      >
        <UIcon name="i-heroicons-plus-circle" class="w-5 h-5 text-white" />
        Tambah
      </button>
    </div>
    <!-- TABLE -->
    <BaseTable
      ref="tableRef"
      :data="menus"
      :columns="columns"
      mode="pagination"
      :page="page"
      :page-size="pageSize"
      :total="total"
      @update:page="changePage"
    >
      <!-- NO -->
      <template #no-cell="{ row }">
        <span class="text-xs text-center">
          {{ row.index + 1 }}
        </span>
      </template>

      <!-- NAMA MENU -->
      <template #menu_nama-cell="{ row }">
        {{ row.original.menu_nama }}
      </template>

      <!-- PATH URL -->
      <template #menu_icon_kecil-cell="{ row }">
        <div class="flex items-center gap-2">
          <UIcon :name="row.original.menu_icon_kecil" class="w-5 h-5" />

          {{ row.original.menu_icon_kecil }}
        </div>
      </template>

      <template #menu_url-cell="{ row }">
        {{ row.original.path }}
      </template>

      <template #folder_path-cell="{ row }">
        {{ row.original.path }}
      </template>

      <template #menu_urutan-cell="{ row }">
        {{ row.original.menu_urutan }}
      </template>

      <!-- KATEGORI -->
      <template #is_aktif-cell="{ row }">
        <span
          :class="[
            'px-2 py-1 rounded-full text-xs',
            row.original.is_aktif
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700',
          ]"
        >
          {{ row.original.is_aktif ? "Aktif" : "Tidak Aktif" }}
        </span>
      </template>

      <!-- AKSI -->
      <template #actions-cell="{ row }">
        <div class="flex gap-2">
          <button
            @click="openEdit(Number(row.original.menu_id))"
            class="p-2 bg-amber-400 dark:bg-amber-500 text-white rounded-lg hover:bg-amber-500 transition"
          >
            <UIcon name="i-heroicons-pencil-square" class="w-4 h-4" />
          </button>

          <button
            @click="deleteMenu(row.original.menu_id)"
            class="p-2 bg-rose-500 dark:bg-rose-600 text-white rounded-lg hover:bg-rose-600 transition"
          >
            <UIcon name="i-heroicons-trash" class="w-4 h-4" />
          </button>
        </div>
      </template>
    </BaseTable>
    <!-- End Table -->
    <div>
      <BaseModalMasterMenu
        :model-value="showModal"
        @update:modelValue="showModal = $event"
        :errors="errors"
        :is-edit="isEdit"
        :form="form"
        :order-message="orderMessage"
        :order-available="orderAvailable ?? undefined"
        @save="handleSave"
      />
    </div>
  </div>
  <!-- END BASE TABLE + MODAL -->
</template>

<style scoped>
.loading-fade-enter-active,
.loading-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.loading-fade-enter-from,
.loading-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px) scale(0.95);
}
</style>

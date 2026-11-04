<script setup lang="ts">
import BaseStatCard from "~/components/form/BaseStatCard.vue";
import BaseSearch from "~/components/form/BaseSearch.vue";
import BaseTable from "~/components/form/BaseTable.vue";
import BaseModalMasterSubMenu from "~/components/base/master/BaseModalMasterSubMenu.vue";

import { useSubMenuPage } from "~/composables/master/submenu/useSubMenuPage";

useHead({
  title: "Admin Master Submenu",
});

definePageMeta({
  breadcrumb: [
    {
      label: "Master",
      to: "/master",
    },
    {
      label: "Master Submenu",
    },
  ],
});

const {
  loading,

  filter,

  showModal,

  isEdit,

  submenus,

  statistics,

  form,

  columns,

  parentOptions,

  selectedParent,

  selectedStatus,

  orderAvailable,

  orderMessage,

  openCreate,

  openEdit,

  handleSave,

  deleteSubmenu,

  handleSearch,

  submenuOptions,

  selectedSubmenu,

  handleReset,

  total,

  page,

  pageSize,

  changePage,

  errors,
} = useSubMenuPage();
</script>
<template>
  <!-- Start Section -->
  <div class="mb-4">
    <h1 class="text-xl font-semibold text-gray-800 dark:text-white mb-1">
      Master Submenu
    </h1>
    <AppBreadcrumb />
  </div>
  <div class="grid grid-cols-3 gap-4 mb-6">
    <BaseStatCard
      title="Total Submenu"
      :value="statistics.total_submenu"
      color="from-blue-500 to-blue-600"
      iconColor="text-blue-200"
      textColor="text-blue-100"
    />

    <BaseStatCard
      title="Total Submenu Aktif"
      :value="statistics.total_aktif"
      color="from-green-500 to-green-600"
      iconColor="text-white-200"
      textColor="text-white-100"
    />

    <BaseStatCard
      title="Total Submenu Tidak Aktif"
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
            v-model="selectedParent"
            :items="parentOptions"
            placeholder="Pilih Menu"
            class="w-full px-3 py-3 rounded-xl text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
          />
        </div>
        <div class="flex-1">
          <USelectMenu
            v-model="selectedSubmenu"
            :items="submenuOptions"
            option-attribute="label"
            searchable
            placeholder="Pilih Submenu"
            class="w-full px-3 py-3 rounded-xl text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
          />
        </div>
        <div class="flex-1">
          <USelectMenu
            v-model="selectedStatus"
            :items="[
              { label: 'Semua', value: undefined },
              {
                label: 'Aktif',
                value: true,
              },
              {
                label: 'Tidak Aktif',
                value: false,
              },
            ]"
            placeholder="Pilih Status"
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
      :data="submenus"
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
      <template #nama_menu-cell="{ row }">
        <span class="text-xs font-medium text-gray-700 dark:text-slate-200">
          {{ row.original.menu_nama }}
        </span>
      </template>

      <!-- PATH URL -->
      <template #parent_nama-cell="{ row }">
        <span class="text-xs">
          {{ row.original.parent_nama }}
        </span>
      </template>

      <template #menu_nama-cell="{ row }">
        <span class="text-xs">
          {{ row.original.menu_nama }}
        </span>
      </template>

      <template #router-cell="{ row }">
        <span class="text-xs">
          {{ row.original.router }}
        </span>
      </template>

      <template #path-cell="{ row }">
        <span class="text-xs">
          {{ row.original.path }}
        </span>
      </template>

      <template #menu_urutan-cell="{ row }">
        <span class="text-xs">
          {{ row.original.menu_urutan }}
        </span>
      </template>

      <!-- STATUS -->
      <template #is_aktif-cell="{ row }">
        <span
          :class="[
            'px-2.5 py-1 text-xs font-medium rounded-full',
            row.original.is_aktif
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30'
              : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30',
          ]"
        >
          {{ row.original.is_aktif ? "Aktif" : "Tidak Aktif" }}
        </span>
      </template>

      <!-- AKSI -->
      <template #actions-cell="{ row }">
        <div class="gap-2 flex text-center" @click.stop>
          <button
            @click="openEdit(row.original.menu_id)"
            class="p-2 bg-amber-400 dark:bg-amber-500 text-white rounded-lg hover:bg-amber-500 transition"
          >
            <UIcon name="i-heroicons-pencil-square" class="w-4 h-4" />
          </button>

          <!-- DELETE -->
          <button
            @click="deleteSubmenu(row.original.menu_id)"
            class="p-2 bg-rose-500 dark:bg-rose-600 text-white rounded-lg hover:bg-rose-600 transition"
          >
            <UIcon name="i-heroicons-trash" class="w-4 h-4" />
          </button>
        </div>
      </template>
    </BaseTable>
    <!-- End Table -->
    <div>
      <BaseModalMasterSubMenu
        :model-value="showModal"
        @update:modelValue="showModal = $event"
        :is-edit="isEdit"
        :errors="errors"
        :form="form"
        :parent-options="parentOptions"
        :order-message="orderMessage"
        :order-available="orderAvailable"
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

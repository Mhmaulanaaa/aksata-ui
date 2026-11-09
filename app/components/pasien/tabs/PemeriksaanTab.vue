<script setup lang="ts">
import { reactive, ref } from "vue";

import PemeriksaanSoap from "~/components/pasien/pemeriksaan/PemeriksaanSoap.vue";
import PemeriksaanSoapie from "~/components/pasien/pemeriksaan/PemeriksaanSoapie.vue";
import PemeriksaanAdime from "~/components/pasien/pemeriksaan/PemeriksaanAdime.vue";

defineProps<{
  patient?: unknown;
  patientId?: number;
}>();

type TabKey = "SOAP" | "SOAPIE" | "ADIME";

type Status =
  | "Belum tersimpan"
  | "Perubahan belum disimpan"
  | "Draft tersimpan"
  | "Tersimpan";

type FormPayload = Record<string, string>;

const activeTab = ref<TabKey>("SOAP");

const tabs: {
  key: TabKey;
  label: string;
  icon: string;
}[] = [
  {
    key: "SOAP",
    label: "SOAP",
    icon: "i-lucide-clipboard-list",
  },
  {
    key: "SOAPIE",
    label: "SOAPIE",
    icon: "i-lucide-notebook-pen",
  },
  {
    key: "ADIME",
    label: "ADIME",
    icon: "i-lucide-apple",
  },
];

const statuses = reactive<Record<TabKey, Status>>({
  SOAP: "Belum tersimpan",
  SOAPIE: "Belum tersimpan",
  ADIME: "Belum tersimpan",
});

const drafts = reactive<Record<TabKey, FormPayload | null>>({
  SOAP: null,
  SOAPIE: null,
  ADIME: null,
});

const savedRecords = reactive<Record<TabKey, FormPayload | null>>({
  SOAP: null,
  SOAPIE: null,
  ADIME: null,
});

const getStatusColor = (status: Status) => {
  switch (status) {
    case "Tersimpan":
      return "success";
    case "Draft tersimpan":
      return "info";
    case "Perubahan belum disimpan":
      return "warning";
    default:
      return "neutral";
  }
};

const getStatusLabel = (status: Status) => {
  switch (status) {
    case "Tersimpan":
      return "Tersimpan";
    case "Draft tersimpan":
      return "Draft";
    case "Perubahan belum disimpan":
      return "Belum disimpan";
    default:
      return "Belum ada data";
  }
};

const markChanged = (tab: TabKey) => {
  statuses[tab] = "Perubahan belum disimpan";
};

const saveDraft = (tab: TabKey, payload: FormPayload) => {
  drafts[tab] = { ...payload };
  statuses[tab] = "Draft tersimpan";

  console.log(`[DUMMY] Draft ${tab} berhasil disimpan:`, drafts[tab]);
};

const saveExamination = (tab: TabKey, payload: FormPayload) => {
  savedRecords[tab] = { ...payload };
  drafts[tab] = null;
  statuses[tab] = "Tersimpan";

  console.log(`[DUMMY] Pemeriksaan ${tab} berhasil disimpan:`, savedRecords[tab]);
};
</script>

<template>
  <div class="space-y-5">
    <!-- HEADER -->
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <div
          class="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
        >
          <UIcon name="i-lucide-stethoscope" class="size-5" />
        </div>
        <div>
          <h2 class="text-base font-bold text-slate-900 dark:text-white">Pemeriksaan</h2>
          <p class="text-xs text-slate-500">Dokumentasi pemeriksaan pasien.</p>
        </div>
      </div>

      <UBadge color="neutral" variant="subtle"> Mode Dummy </UBadge>
    </div>

    <!-- SIMPLE TABS -->
    <div class="border-b border-slate-200 dark:border-slate-800">
      <div class="flex gap-5 overflow-x-auto">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          type="button"
          @click="activeTab = tab.key"
          class="relative flex shrink-0 items-center gap-2 border-b-2 px-1 pb-3 pt-2 text-sm font-semibold transition-colors"
          :class="
            activeTab === tab.key
              ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          "
        >
          <UIcon :name="tab.icon" class="size-4" />

          <span>{{ tab.label }}</span>

          <span
            v-if="statuses[tab.key] === 'Tersimpan'"
            class="size-1.5 rounded-full bg-emerald-500"
          />
          <span
            v-else-if="statuses[tab.key] === 'Draft tersimpan'"
            class="size-1.5 rounded-full bg-blue-500"
          />
          <span
            v-else-if="statuses[tab.key] === 'Perubahan belum disimpan'"
            class="size-1.5 rounded-full bg-amber-500"
          />
        </button>
      </div>
    </div>

    <!-- ACTIVE TAB STATUS -->
    <div class="flex items-center justify-between gap-3">
      <div class="flex items-center gap-2">
        <span class="text-xs text-slate-500"> Status {{ activeTab }}: </span>

        <UBadge :color="getStatusColor(statuses[activeTab])" variant="subtle" size="sm">
          {{ getStatusLabel(statuses[activeTab]) }}
        </UBadge>
      </div>

      <span class="text-[10px] text-slate-400"> {{ activeTab }} / 3 </span>
    </div>

    <!-- TAB CONTENT -->
    <div>
      <div v-show="activeTab === 'SOAP'">
        <PemeriksaanSoap
          @change="markChanged('SOAP')"
          @save-draft="saveDraft('SOAP', $event)"
          @save="saveExamination('SOAP', $event)"
        />
      </div>

      <div v-show="activeTab === 'SOAPIE'">
        <PemeriksaanSoapie
          @change="markChanged('SOAPIE')"
          @save-draft="saveDraft('SOAPIE', $event)"
          @save="saveExamination('SOAPIE', $event)"
        />
      </div>

      <div v-show="activeTab === 'ADIME'">
        <PemeriksaanAdime
          @change="markChanged('ADIME')"
          @save-draft="saveDraft('ADIME', $event)"
          @save="saveExamination('ADIME', $event)"
        />
      </div>
    </div>
  </div>
</template>

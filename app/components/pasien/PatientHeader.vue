<script setup lang="ts">
import type { PatientDetail } from "~/types/pasien";

defineProps<{
  patient: PatientDetail;
}>();

const emit = defineEmits<{
  (e: "open-information"): void;
  (e: "open-history"): void;
}>();
</script>

<template>
  <section
    class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
  >
    <div class="p-4 sm:px-5 sm:py-4">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <!-- Identitas Pasien -->
        <div class="flex min-w-0 items-center gap-3">
          <div
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
          >
            <UIcon name="i-lucide-user-round" class="h-6 w-6" />
          </div>

          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-center gap-2">
              <h1 class="text-sm font-bold text-slate-900 dark:text-white sm:text-base">
                {{ patient.nama }}
              </h1>

              <UIcon
                :name="
                  patient.jenisKelamin === 'Perempuan'
                    ? 'i-lucide-venus'
                    : 'i-lucide-mars'
                "
                :class="
                  patient.jenisKelamin === 'Perempuan'
                    ? 'h-4 w-4 text-pink-500'
                    : 'h-4 w-4 text-sky-500'
                "
              />

              <UBadge color="primary" variant="subtle" size="sm">
                {{ patient.pelayanan }}
              </UBadge>
            </div>

            <div
              class="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400"
            >
              <span>
                RM:
                <strong class="text-slate-700 dark:text-slate-200">
                  {{ patient.noRm }}
                </strong>
              </span>

              <span>
                {{ patient.usia }}
              </span>

              <span>
                Reg:
                <strong class="text-slate-700 dark:text-slate-200">
                  {{ patient.noRegistrasi }}
                </strong>
              </span>
            </div>

            <div
              class="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400"
            >
              <span>
                {{ patient.poli }}
              </span>

              <span class="text-slate-300 dark:text-slate-700">•</span>

              <span>
                {{ patient.divisi }}
              </span>

              <span class="text-slate-300 dark:text-slate-700">•</span>

              <span class="font-medium text-emerald-700 dark:text-emerald-400">
                {{ patient.dpjp }}
              </span>
            </div>
          </div>
        </div>

        <!-- Aksi dan Status -->
        <div class="flex flex-wrap items-center gap-2 lg:justify-end">
          <UBadge
            :color="
              patient.status === 'Sudah Diperiksa'
                ? 'success'
                : patient.status === 'Konsultasi'
                ? 'info'
                : 'warning'
            "
            variant="subtle"
          >
            {{ patient.status }}
          </UBadge>

          <UBadge :color="patient.checkedIn ? 'success' : 'neutral'" variant="subtle">
            <UIcon
              :name="patient.checkedIn ? 'i-lucide-check-circle' : 'i-lucide-clock'"
              class="mr-1 h-3 w-3"
            />
            {{ patient.checkedIn ? "Check In" : "Belum Check In" }}
          </UBadge>

          <div class="mx-1 hidden h-6 w-px bg-slate-200 dark:bg-slate-700 sm:block" />

          <div class="flex items-center gap-2">
            <UButton
              color="neutral"
              variant="ghost"
              size="sm"
              icon="i-lucide-user-round"
              aria-label="Informasi Pasien"
              @click="emit('open-information')"
            />

            <UButton
              color="neutral"
              variant="ghost"
              size="sm"
              icon="i-lucide-history"
              aria-label="Riwayat Pelayanan"
              @click="emit('open-history')"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Informasi Registrasi -->
    <div
      class="grid grid-cols-2 gap-2 border-t border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/30 sm:grid-cols-4 sm:gap-3 sm:px-5 sm:py-3"
    >
      <!-- Tanggal Registrasi -->
      <div
        class="flex min-w-0 items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white px-3 py-2.5 dark:border-slate-700 dark:bg-slate-900/70"
      >
        <div
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
        >
          <UIcon name="i-lucide-calendar-clock" class="h-4 w-4" />
        </div>
        <div class="min-w-0">
          <p class="text-[10px] font-medium uppercase tracking-wide text-slate-400">
            Registrasi
          </p>
          <p
            class="mt-0.5 truncate text-xs font-semibold text-slate-800 dark:text-slate-100"
          >
            {{ patient.tanggalRegistrasi }}
          </p>
        </div>
      </div>

      <!-- Instalasi -->
      <div
        class="flex min-w-0 items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white px-3 py-2.5 dark:border-slate-700 dark:bg-slate-900/70"
      >
        <div
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400"
        >
          <UIcon name="i-lucide-hospital" class="h-4 w-4" />
        </div>
        <div class="min-w-0">
          <p class="text-[10px] font-medium uppercase tracking-wide text-slate-400">
            Instalasi
          </p>
          <p
            class="mt-0.5 truncate text-xs font-semibold text-slate-800 dark:text-slate-100"
          >
            {{ patient.instalasi }}
          </p>
        </div>
      </div>

      <!-- Antrean -->
      <div
        class="flex min-w-0 items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white px-3 py-2.5 dark:border-slate-700 dark:bg-slate-900/70"
      >
        <div
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
        >
          <UIcon name="i-lucide-ticket" class="h-4 w-4" />
        </div>
        <div class="min-w-0">
          <p class="text-[10px] font-medium uppercase tracking-wide text-slate-400">
            Nomor Antrean
          </p>
          <p class="mt-0.5 truncate text-xs font-bold text-slate-800 dark:text-slate-100">
            {{ patient.antrian }}
          </p>
        </div>
      </div>

      <!-- Tanggal Lahir -->
      <div
        class="flex min-w-0 items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white px-3 py-2.5 dark:border-slate-700 dark:bg-slate-900/70"
      >
        <div
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400"
        >
          <UIcon name="i-lucide-cake" class="h-4 w-4" />
        </div>
        <div class="min-w-0">
          <p class="text-[10px] font-medium uppercase tracking-wide text-slate-400">
            Tanggal Lahir
          </p>
          <p
            class="mt-0.5 truncate text-xs font-semibold text-slate-800 dark:text-slate-100"
          >
            {{ patient.tanggalLahir }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { toastSuccess, toastError } from "~/utils/toast";

const { asset } = useAsset();

const formData = reactive({
  username: "",
  password: "",
});

const showPassword = ref(false);
const loading = ref(false);

const demoLogin = useCookie<boolean | null>("demo_login", {
  sameSite: "lax",
  path: "/",
});

const handleLogin = async () => {
  if (!formData.username.trim()) {
    toastError("Username wajib diisi");
    return;
  }

  if (!formData.password.trim()) {
    toastError("Password wajib diisi");
    return;
  }

  loading.value = true;

  try {
    // Simulasi login sementara tanpa backend
    await new Promise((resolve) => setTimeout(resolve, 800));

    demoLogin.value = true;

    toastSuccess("Login berhasil! Selamat datang.");

    await navigateTo("/dashboard");
  } catch {
    toastError("Terjadi kesalahan saat login");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <main
    class="min-h-screen min-h-[100dvh] w-full bg-white dark:bg-[#0b1220] lg:grid lg:grid-cols-[1.1fr_0.9fr]"
  >
    <!-- LEFT: BRAND & SYSTEM INTRODUCTION -->
    <section
      class="relative hidden min-h-screen flex-col justify-between overflow-hidden border-r border-slate-100 bg-[#f8fafc] px-12 py-10 dark:border-slate-800 dark:bg-[#101a2a] lg:flex xl:px-20 xl:py-12"
    >
      <!-- Background Decoration -->
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          class="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full border border-emerald-200/50 dark:border-emerald-500/10"
        />
        <div
          class="absolute -right-20 -top-20 h-[360px] w-[360px] rounded-full border border-emerald-200/50 dark:border-emerald-500/10"
        />
        <div
          class="absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-emerald-100/50 blur-3xl dark:bg-emerald-500/5"
        />
      </div>

      <!-- Brand -->
      <div class="relative z-10 flex items-center gap-4">
        <img
          :src="asset('logo.png')"
          alt="Logo RSUD Dr. Soetomo"
          class="h-14 w-14 object-contain"
        />

        <div>
          <h1 class="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            RSUD Dr. Soetomo
          </h1>
          <p class="mt-0.5 text-xs tracking-wide text-slate-500 dark:text-slate-400">
            Surabaya, Jawa Timur
          </p>
        </div>
      </div>

      <!-- Main Content -->
      <div class="relative z-10 max-w-2xl py-12">
        <div
          class="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3.5 py-2 dark:border-emerald-500/20 dark:bg-emerald-500/5"
        >
          <span class="h-2 w-2 rounded-full bg-emerald-500" />
          <span
            class="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400"
          >
            Healthcare Information System
          </span>
        </div>

        <h2
          class="max-w-xl text-4xl font-semibold leading-[1.2] tracking-tight text-emerald-600 dark:text-emerald-400 xl:text-5xl"
        >
          AKSATA
        </h2>

        <p class="mt-6 max-w-lg text-base leading-8 text-slate-500 dark:text-slate-400">
          “AKSATA merupakan nama dari eRM RSDS yang baru. Kata ini berasal dari bahasa
          Sansekerta yang memiliki makna tidak pernah putus atau lanjut terus dalam
          berkarya maupun berinovasi"
        </p>

        <!-- EMR Preview -->
        <div
          class="mt-12 max-w-lg rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_16px_50px_-30px_rgba(15,23,42,0.2)] dark:border-slate-700 dark:bg-slate-900"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-500/10"
              >
                <UIcon
                  name="i-lucide-clipboard-plus"
                  class="h-5 w-5 text-emerald-600 dark:text-emerald-400"
                />
              </div>

              <div>
                <p class="text-sm font-semibold text-slate-800 dark:text-white">
                  eRM RSUD Dr. Soetomo
                </p>
                <p class="mt-0.5 text-xs text-slate-400">
                  Integrated Medical Information
                </p>
              </div>
            </div>

            <UIcon name="i-lucide-shield-check" class="h-5 w-5 text-emerald-500" />
          </div>

          <div class="my-5 border-t border-slate-100 dark:border-slate-800" />

          <div class="grid grid-cols-2 gap-3">
            <div class="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70">
              <UIcon
                name="i-lucide-user-round"
                class="mb-3 h-5 w-5 text-slate-500 dark:text-slate-400"
              />
              <p class="text-xs text-slate-400">Informasi Pasien</p>
              <p class="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                Data Terstruktur
              </p>
            </div>

            <div class="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70">
              <UIcon
                name="i-lucide-file-text"
                class="mb-3 h-5 w-5 text-slate-500 dark:text-slate-400"
              />
              <p class="text-xs text-slate-400">Rekam Medis</p>
              <p class="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                Dokumentasi Digital
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div
        class="relative z-10 flex items-center justify-between gap-4 text-xs text-slate-400 dark:text-slate-500"
      >
        <span>© 2026 RSUD Dr. Soetomo</span>
        <span>Aksata</span>
      </div>
    </section>

    <!-- RIGHT: LOGIN FORM -->
    <section
      class="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden bg-[#f8fafc] px-12 py-10 dark:border-slate-800 dark:bg-[#101a2a] sm:px-12 lg:px-14 xl:px-24"
    >
      <!-- Subtle Background -->
      <div
        class="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-emerald-100/40 blur-3xl dark:bg-emerald-500/5"
      />

      <div class="relative z-10 mx-auto w-full max-w-md">
        <!-- Mobile Brand -->
        <div class="mb-14 flex items-center gap-3 lg:hidden">
          <img
            :src="asset('logo.png')"
            alt="Logo RSUD Dr. Soetomo"
            class="h-12 w-12 object-contain"
          />

          <div>
            <h1 class="text-base font-bold text-slate-900 dark:text-white">
              RSUD Dr. Soetomo
            </h1>
            <p class="text-xs text-slate-500 dark:text-slate-400">
              Electronic Medical Record
            </p>
          </div>
        </div>

        <!-- Heading -->
        <div class="mb-9">
          <div
            class="mb-7 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-500/10"
          >
            <UIcon
              name="i-lucide-heart-pulse"
              class="h-6 w-6 text-emerald-600 dark:text-emerald-400"
            />
          </div>

          <p
            class="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400"
          >
            Electronic Medical Record
          </p>

          <h2
            class="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl"
          >
            Selamat Datang
          </h2>

          <p class="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
            Masuk menggunakan akun Anda untuk mengakses sistem pencatatan rekam medis
            rumah sakit.
          </p>
        </div>

        <!-- Login Form -->
        <UForm :state="formData" class="space-y-5" @submit="handleLogin">
          <UFormField label="Username" name="username" required>
            <UInput
              v-model="formData.username"
              placeholder="Masukkan username"
              icon="i-lucide-user-round"
              size="xl"
              class="w-full"
              autocomplete="username"
            />
          </UFormField>

          <UFormField label="Password" name="password" required>
            <div class="relative">
              <UInput
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Masukkan password"
                icon="i-lucide-lock-keyhole"
                size="xl"
                class="w-full"
                autocomplete="current-password"
                :ui="{ base: 'pr-12' }"
              />

              <button
                type="button"
                aria-label="Tampilkan atau sembunyikan password"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                @click="showPassword = !showPassword"
              >
                <UIcon
                  :name="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  class="h-5 w-5"
                />
              </button>
            </div>
          </UFormField>

          <UButton
            type="submit"
            color="primary"
            size="xl"
            block
            class="mt-3 font-semibold"
            :loading="loading"
            :disabled="loading"
          >
            Masuk ke Sistem
            <UIcon v-if="!loading" name="i-lucide-arrow-right" class="ml-1 h-5 w-5" />
          </UButton>
        </UForm>

        <!-- Security Notice -->
        <div
          class="mt-8 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/60"
        >
          <UIcon
            name="i-lucide-shield-check"
            class="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400"
          />

          <div>
            <p class="text-xs font-semibold text-slate-700 dark:text-slate-200">
              Keamanan Informasi
            </p>
            <p class="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
              Gunakan akun Anda secara bertanggung jawab. Jangan membagikan informasi
              login kepada pihak lain.
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div class="mt-12 border-t border-slate-100 pt-6 dark:border-slate-800">
          <div
            class="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 dark:text-slate-500"
          >
            <span>© 2026 RSUD Dr. Soetomo</span>

            <span class="flex items-center gap-1.5">
              <UIcon name="i-lucide-hospital" class="h-4 w-4" />
              Surabaya, Indonesia
            </span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

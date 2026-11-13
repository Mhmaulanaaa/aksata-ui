<script setup lang="ts">
import { computed, ref } from "vue";
import { onClickOutside, useWindowSize, useDark, useToggle } from "@vueuse/core";

const route = useRoute();

const searchQuery = ref("");
const showNotifications = ref(false);
const showProfile = ref(false);
const showMobileSearch = ref(false);

const isMobileOpen = useState<boolean>("sidebarMobileOpen", () => false);

const { width } = useWindowSize();

const isMobile = computed(() => width.value < 1024);

const isDark = useDark();
const toggleDark = useToggle(isDark);

// Judul halaman
const pageTitle = computed(() => {
  return String(route.meta.title || "Dashboard");
});

// Notifikasi sementara
const notifications = [
  {
    id: 1,
    title: "Selamat datang di EMR",
    description: "Sistem Electronic Medical Record siap digunakan.",
    time: "Baru saja",
    unread: true,
    icon: "fas fa-hospital",
  },
  {
    id: 2,
    title: "Informasi sistem",
    description: "Pastikan data pelayanan pasien selalu diperbarui.",
    time: "1 jam lalu",
    unread: true,
    icon: "fas fa-info-circle",
  },
  {
    id: 3,
    title: "Pembaruan sistem",
    description: "Sistem berjalan dengan normal.",
    time: "Kemarin",
    unread: false,
    icon: "fas fa-check-circle",
  },
];

const unreadCount = computed(() => notifications.filter((item) => item.unread).length);

const notifDropdownRef = ref<HTMLElement | null>(null);
const profileDropdownRef = ref<HTMLElement | null>(null);

onClickOutside(notifDropdownRef, () => {
  showNotifications.value = false;
});

onClickOutside(profileDropdownRef, () => {
  showProfile.value = false;
});

function toggleNotifications() {
  showNotifications.value = !showNotifications.value;
  showProfile.value = false;
}

function toggleProfile() {
  showProfile.value = !showProfile.value;
  showNotifications.value = false;
}

function toggleMobileSidebar() {
  isMobileOpen.value = !isMobileOpen.value;
}

function toggleMobileSearch() {
  showMobileSearch.value = !showMobileSearch.value;
  showNotifications.value = false;
  showProfile.value = false;
}

function handleSearch() {
  const keyword = searchQuery.value.trim();

  if (!keyword) return;

  // TODO: Integrasikan dengan fitur pencarian global EMR.
  console.log("Search:", keyword);
}

function handleLogout() {
  showProfile.value = false;

  // Sesuaikan dengan fungsi logout yang sudah tersedia di useAuth.
  navigateTo("/login");
}
</script>

<template>
  <header
    class="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-xl transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950/95"
  >
    <div class="flex h-[72px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
      <!-- LEFT SECTION -->
      <div class="flex min-w-0 items-center gap-3 lg:gap-5">
        <!-- Mobile Sidebar -->
        <button
          type="button"
          aria-label="Buka navigasi"
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-emerald-800 dark:hover:bg-emerald-900/20 lg:hidden"
          @click="toggleMobileSidebar"
        >
          <i class="fas fa-bars text-base" />
        </button>

        <!-- Mobile Brand -->
        <div class="flex items-center gap-2.5 lg:hidden">
          <div
            class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20"
          >
            <i class="fas fa-heartbeat text-base" />
          </div>

          <div class="leading-tight">
            <p
              class="text-sm font-extrabold tracking-tight text-slate-800 dark:text-white"
            >
              AKSATA
              <span class="text-emerald-600 dark:text-emerald-400">eRM</span>
            </p>
            <p class="text-[9px] font-medium tracking-wider text-slate-400">
              RSUD DR. SOETOMO
            </p>
          </div>
        </div>

        <!-- Desktop Page Information -->
        <div class="hidden min-w-0 items-center gap-3 lg:flex">
          <!-- Vertical Green Line -->

          <!-- Page Information -->
          <div class="min-w-0">
            <p class="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
              <span class="font-semibold text-emerald-600 dark:text-emerald-400">
                AKSATA eRM
              </span>

              <span class="mx-1.5 text-slate-300 dark:text-slate-700">/</span>

              RSUD Dr. Soetomo Surabaya
            </p>
          </div>
        </div>
      </div>

      <!-- RIGHT SECTION -->
      <div class="flex shrink-0 items-center gap-2 sm:gap-3">
        <!-- Mobile Search Button -->
        <button
          type="button"
          aria-label="Cari"
          class="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-emerald-600 dark:text-slate-400 dark:hover:bg-slate-800 md:hidden"
          @click="toggleMobileSearch"
        >
          <i class="fas fa-search text-base" />
        </button>

        <!-- Bed Monitoring -->
        <NuxtLink
          to="/dashboard/bed-monitoring"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Bed Monitoring"
          title="Bed Monitoring"
          class="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-all hover:bg-slate-100 hover:text-emerald-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-emerald-400"
        >
          <i class="fas fa-bed text-base" />
        </NuxtLink>

        <!-- Dark Mode -->
        <button
          type="button"
          :aria-label="isDark ? 'Aktifkan light mode' : 'Aktifkan dark mode'"
          class="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-all hover:bg-slate-100 hover:text-emerald-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-emerald-400"
          @click="toggleDark()"
        >
          <i
            :class="isDark ? 'fas fa-sun text-amber-400' : 'fas fa-moon'"
            class="text-base"
          />
        </button>

        <!-- Notifications -->
        <div ref="notifDropdownRef" class="relative">
          <button
            type="button"
            aria-label="Notifikasi"
            class="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-all hover:bg-slate-100 hover:text-emerald-600 dark:text-slate-400 dark:hover:bg-slate-800"
            @click="toggleNotifications"
          >
            <i class="far fa-bell text-lg" />

            <span
              v-if="unreadCount"
              class="absolute right-1.5 top-1.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full border-2 border-white bg-rose-500 px-1 text-[9px] font-bold text-white dark:border-slate-950"
            >
              {{ unreadCount }}
            </span>
          </button>

          <!-- Notification Dropdown -->
          <Transition name="dropdown">
            <div
              v-if="showNotifications"
              class="absolute right-0 top-14 z-50 w-[min(340px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900"
            >
              <div
                class="flex items-center justify-between border-b border-slate-100 px-4 py-4 dark:border-slate-800"
              >
                <div>
                  <h3 class="text-sm font-bold text-slate-800 dark:text-white">
                    Notifikasi
                  </h3>
                  <p class="mt-0.5 text-[11px] text-slate-400">
                    {{ unreadCount }} notifikasi belum dibaca
                  </p>
                </div>

                <span
                  class="rounded-lg bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
                >
                  Terbaru
                </span>
              </div>

              <div class="max-h-[320px] overflow-y-auto">
                <div
                  v-for="notification in notifications"
                  :key="notification.id"
                  class="flex gap-3 border-b border-slate-50 px-4 py-3.5 transition-colors hover:bg-slate-50 dark:border-slate-800/70 dark:hover:bg-slate-800/50"
                >
                  <div
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
                  >
                    <i :class="notification.icon" class="text-sm" />
                  </div>

                  <div class="min-w-0 flex-1">
                    <div class="flex items-start justify-between gap-2">
                      <p class="text-xs font-bold text-slate-700 dark:text-slate-200">
                        {{ notification.title }}
                      </p>

                      <span
                        v-if="notification.unread"
                        class="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500"
                      />
                    </div>

                    <p
                      class="mt-1 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400"
                    >
                      {{ notification.description }}
                    </p>

                    <p class="mt-2 text-[10px] text-slate-400">
                      {{ notification.time }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="border-t border-slate-100 p-3 dark:border-slate-800">
                <button
                  type="button"
                  class="w-full rounded-xl py-2 text-xs font-semibold text-emerald-600 transition-colors hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/20"
                >
                  Lihat semua notifikasi
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Divider -->
        <div class="hidden h-8 w-px bg-slate-200 dark:bg-slate-700 sm:block" />

        <!-- Profile -->
        <div ref="profileDropdownRef" class="relative">
          <button
            type="button"
            class="flex items-center gap-2 rounded-xl p-1.5 transition-all hover:bg-slate-100 dark:hover:bg-slate-800 sm:gap-3 sm:pr-2"
            @click="toggleProfile"
          >
            <div
              class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-sm font-bold text-white shadow-md shadow-emerald-500/20"
            >
              IT
            </div>

            <div class="hidden text-left sm:block">
              <p
                class="max-w-[120px] truncate text-xs font-bold text-slate-800 dark:text-white"
              >
                IT Support
              </p>
              <p class="mt-0.5 text-[10px] text-slate-400">Administrator</p>
            </div>

            <i
              class="fas fa-chevron-down hidden text-[10px] text-slate-400 transition-transform sm:block"
              :class="{ 'rotate-180': showProfile }"
            />
          </button>

          <!-- Profile Dropdown -->
          <Transition name="dropdown">
            <div
              v-if="showProfile"
              class="absolute right-0 top-14 z-50 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900"
            >
              <div
                class="border-b border-slate-100 bg-slate-50/80 px-4 py-4 dark:border-slate-800 dark:bg-slate-800/40"
              >
                <p class="text-sm font-bold text-slate-800 dark:text-white">IT Support</p>
                <p class="mt-1 text-[11px] text-slate-400">Administrator</p>
              </div>

              <div class="p-2">
                <NuxtLink
                  to="/dashboard/pengaturan/akun"
                  class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700 dark:text-slate-300 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400"
                  @click="showProfile = false"
                >
                  <i class="fas fa-user-circle w-4 text-center" />
                  Profil
                </NuxtLink>

                <NuxtLink
                  to="/dashboard/pengaturan"
                  class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700 dark:text-slate-300 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400"
                  @click="showProfile = false"
                >
                  <i class="fas fa-cog w-4 text-center" />
                  Pengaturan
                </NuxtLink>

                <div class="my-2 border-t border-slate-100 dark:border-slate-800" />

                <button
                  type="button"
                  class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-rose-500 transition-colors hover:bg-rose-50 dark:hover:bg-rose-900/20"
                  @click="handleLogout"
                >
                  <i class="fas fa-sign-out-alt w-4 text-center" />
                  Keluar
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>

    <!-- MOBILE SEARCH -->
    <Transition name="slide">
      <div
        v-if="showMobileSearch"
        class="border-t border-slate-100 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950 md:hidden"
      >
        <form class="relative" @submit.prevent="handleSearch">
          <i
            class="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400"
          />

          <input
            v-model="searchQuery"
            type="search"
            placeholder="Cari menu atau informasi..."
            autofocus
            class="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-12 text-sm text-slate-700 outline-none transition-all focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          />

          <button
            type="button"
            aria-label="Tutup pencarian"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500"
            @click="showMobileSearch = false"
          >
            <i class="fas fa-times" />
          </button>
        </form>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

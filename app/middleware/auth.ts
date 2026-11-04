export default defineNuxtRouteMiddleware((to) => {
    const token = import.meta.client
        ? localStorage.getItem("token")
        : null;

    const demoLogin = useCookie<boolean | null>("demo_login");

    // Cek status login dummy
    const isLoggedIn = !!token || demoLogin.value === true;

    // Belum login, arahkan ke login
    if (!isLoggedIn && to.path !== "/login") {
        return navigateTo("/login");
    }

    // Sudah login, jangan kembali ke halaman login
    if (isLoggedIn && to.path === "/login") {
        return navigateTo("/dashboard");
    }
});
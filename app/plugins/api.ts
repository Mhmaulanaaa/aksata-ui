export default defineNuxtPlugin(() => {
    const api = $fetch.create({
        baseURL: "x/api",

        onRequest({ options }) {
            if (!import.meta.client) return;

            const headers = new Headers(options.headers);

            const token = localStorage.getItem("access_token");
            const user = localStorage.getItem("user");

            if (token) {
                headers.set("X-Rusa-Token", btoa(token));
            }

            if (user) {
                const authUser = JSON.parse(user);

                headers.set(
                    "X-Rusa-Loginid",
                    authUser.loginpemakai_id.toString()
                );
            }

            options.headers = headers;
        },

        async onResponseError({ response }) {
            if (
                response.status === 401 ||
                response.status === 403
            ) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("user");
                localStorage.removeItem("roles");

                await navigateTo("/login");
            }
        },
    });

    return {
        provide: {
            api,
        },
    };
});
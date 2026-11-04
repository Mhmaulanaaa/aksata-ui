let api: ReturnType<typeof $fetch.create>;

export const useApi = () => {
    if (api) return api;

    const config = useRuntimeConfig();

    api = $fetch.create({
        baseURL: config.public.apiBase,

        onRequest({ options }) {
            if (!import.meta.client) return;

            const headers = new Headers(options.headers);

            const token = localStorage.getItem("access_token");
            const user = localStorage.getItem("user");

            headers.set("X-Rusa-Token", (token || ""));

            if (user) {
                const login = JSON.parse(user);

                headers.set(
                    "X-Rusa-Loginid",
                    login.loginpemakai_id.toString()
                );
            }

            options.headers = headers;
        },

        onResponseError({ response }) {

            if (response.status === 401 ||
                response.status === 403) {

                localStorage.clear();

                navigateTo("/login");
            }

        }

    });

    return api;
};
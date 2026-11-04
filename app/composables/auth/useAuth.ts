import type { User } from "~/types";

interface LoginResponse {
    metadata: {
        code: number;
        message: string;
    };
    response: {
        loginpemakai_id: number;
        pegawai_id: number;
        nama_pemakai: string;
        nama_pegawai: string;
        gelardepan?: string;
        gelarbelakang_nama?: string;
    };
}

interface RoleResponse {
    metadata: {
        code: number;
        message: string;
    };
    response: {
        token: string;
        roles: any[];
    };
}

export const useAuth = () => {
    const api = useApi();

    const loading = useState("auth-loading", () => false);

    const user = useState<User | null>("auth-user", () => null);

    const accessToken = useState<string | null>(
        "access-token",
        () => import.meta.client ? localStorage.getItem("access_token") : null
    );

    const roles = useState<any[]>(
        "auth-roles",
        () => []
    );

    const setToken = (token: string) => {
        accessToken.value = token;

        if (import.meta.client) {
            localStorage.setItem("access_token", token);
        }
    };

    const login = async (form: {
        username: string;
        password: string;
    }) => {
        loading.value = true;

        try {
            /**
             * STEP 1
             * Login
             */
            const loginRes = await api<LoginResponse>(
                "/authentication/login",
                {
                    method: "POST",
                    body: form,
                }
            );

            if (loginRes.metadata.code !== 200) {
                throw createError({
                    statusCode: loginRes.metadata.code,
                    statusMessage: loginRes.metadata.message,
                });
            }

            /**
             * Simpan user terlebih dahulu
             * agar X-Rusa-Loginid dapat dikirim
             * pada request berikutnya
             */
            user.value = loginRes.response as User;

            if (import.meta.client) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(loginRes.response)
                );
            }

            /**
             * STEP 2
             * Ambil role + JWT
             */
            const roleRes = await api<RoleResponse>(
                "/authorization/get-roles",
                {
                    method: "POST",
                    body: {
                        loginpemakai_id: loginRes.response.loginpemakai_id,
                        username: form.username,
                        password: form.password,
                    },
                }
            );

            if (roleRes.metadata.code !== 200) {
                throw createError({
                    statusCode: roleRes.metadata.code,
                    statusMessage: roleRes.metadata.message,
                });
            }

            /**
             * Simpan token
             */
            setToken(roleRes.response.token);

            /**
             * Simpan role
             */
            roles.value = roleRes.response.roles;

            /**
             * Update user dengan role
             */
            user.value = {
                ...loginRes.response,
                roles: roleRes.response.roles,
            } as User;

            if (import.meta.client) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(user.value)
                );

                localStorage.setItem(
                    "roles",
                    JSON.stringify(roleRes.response.roles)
                );
            }

            await navigateTo("/dashboard");
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            loading.value = false;
        }
    };

    const restore = () => {
        if (!import.meta.client) return;

        const token = localStorage.getItem("access_token");
        const userStorage = localStorage.getItem("user");
        const roleStorage = localStorage.getItem("roles");

        accessToken.value = token;

        user.value = userStorage
            ? JSON.parse(userStorage)
            : null;

        roles.value = roleStorage
            ? JSON.parse(roleStorage)
            : [];
    };

    const logout = async () => {
        accessToken.value = null;
        user.value = null;
        roles.value = [];

        if (import.meta.client) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("user");
            localStorage.removeItem("roles");
        }

        await navigateTo("/login");
    };

    return {
        loading,

        user,
        roles,
        accessToken,

        login,
        logout,
        restore,
    };
};
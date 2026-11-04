import { useApi } from "~/composables/useApi";

export interface HakAkses {
    role_id: number;
    nama_role: string;
    is_aktiv: boolean;

    menu_ids?: number[];
    submenu_ids?: number[];
    akses: string[];
}

export interface CountResponse {
    total: number;
    aktif: number;
    tidak_aktif: number;
}

export interface SelectOption {
    label: string;
    value: number;
}

interface Pagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}


interface ApiResponse<T> {
    response: T;
    pagination: Pagination;
}

export const useHakAkses = () => {
    const api = useApi();

    const getList = (params?: Record<string, any>) =>
        api<ApiResponse<HakAkses[]>>(
            "/dashboard/master/hak-akses",
            {
                method: "GET",
                params,
            }
        );

    const submenuByMenu = (menu_ids: number[]) =>
        api<ApiResponse<SelectOption[]>>(
            "/dashboard/master/hak-akses/submenu",
            {
                method: "POST",
                body: {
                    menu_ids
                }
            }
        );

    const getDetail = (id: number) =>
        api<ApiResponse<HakAkses>>(
            `/dashboard/master/hak-akses/${id}`
        );

    const create = (body: Partial<HakAkses>) =>
        api<ApiResponse<HakAkses>>(
            "/dashboard/master/hak-akses",
            {
                method: "POST",
                body,
            }
        );

    const update = (
        id: number,
        body: Partial<HakAkses>
    ) =>
        api<ApiResponse<null>>(
            `/dashboard/master/hak-akses/${id}`,
            {
                method: "PUT",
                body,
            }
        );

    const remove = (id: number) =>
        api<ApiResponse<null>>(
            `/dashboard/master/hak-akses/${id}`,
            {
                method: "DELETE",
            }
        );

    const count = () =>
        api<ApiResponse<CountResponse>>(
            "/dashboard/master/hak-akses/count",
            {
                method: "GET",
            }
        );

    const select = () =>
        api<ApiResponse<SelectOption[]>>(
            "/dashboard/master/hak-akses/select",
            {
                method: "GET",
            }
        );

    return {
        getList,
        getDetail,
        create,
        update,
        remove,
        count,
        select,
        submenuByMenu,
    };
};
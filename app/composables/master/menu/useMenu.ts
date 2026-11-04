import { useApi } from "~/composables/useApi";
import type { MenuForm } from "./useMenuForm";

export interface Menu {
    menu_id: number;
    menu_nama: string;
    menu_icon_kecil: string;
    router: string;
    path: string;
    menu_urutan: number;
    is_aktif: boolean;
}

export interface MenuStats {
    total_menu: number;
    total_aktif: number;
    total_tidak_aktif: number;
}

export interface Pagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface MenuListResponse {
    response: Menu[];
    metadata: {
        pagination: Pagination;
    };
}

export interface ParentMenuOption {
    value: number;
    label: string;
}


export const useMenu = () => {
    const api = useApi();

    const endpoint = "/dashboard/master/menu";

    const getAll = async (
        params?: {
            page?: number;
            limit?: number;
            search?: string;
            is_aktif?: boolean;
        }
    ): Promise<MenuListResponse> => {

        return await api<MenuListResponse>(endpoint, {
            query: params,
        });

    };

    const getData = async (id: number): Promise<Menu> => {
        const res = await api<{ response: Menu }>(
            `${endpoint}/${id}`
        );

        return res.response;
    };

    const create = async (data: MenuForm) => {
        return await api(endpoint, {
            method: "POST",
            body: data,
        });
    };

    const update = async (
        id: number,
        data: MenuForm
    ) => {
        return await api(`${endpoint}/${id}`, {
            method: "PUT",
            body: data,
        });
    };

    const remove = async (id: number) => {
        return await api(`${endpoint}/${id}`, {
            method: "DELETE",
        });
    };

    const stats = async (): Promise<MenuStats> => {
        const res = await api<{ response: MenuStats }>(
            `${endpoint}/stats`
        );

        return res.response;
    };

    const checkOrder = async (
        urutan: number,
        ignore?: number
    ): Promise<{
        available: boolean;
        same_data: boolean;
    }> => {

        const res = await api<{
            response: {
                available: boolean;
                same_data: boolean;
            };
        }>(
            `${endpoint}/check-order/${urutan}`,
            {
                method: "GET",
                params: {
                    ignore,
                },
            }
        );
        return res.response;
    };

    const getParentMenu = async (): Promise<ParentMenuOption[]> => {
        const res = await api<{
            response: ParentMenuOption[];
        }>("/dashboard/master/menu/select-parent");

        return res.response;
    };

    return {
        getAll,
        getData,
        create,
        update,
        remove,
        stats,
        checkOrder,
        getParentMenu,
    };
};
import { useApi } from "~/composables/useApi";
import type { SubmenuForm } from "./useSubMenuForm";

export interface Submenu {
    menu_id: number;

    menu_parent: number;

    parent_nama?: string;

    menu_nama: string;

    router: string;

    path: string;

    menu_urutan: number;

    is_aktif: boolean;
}

export interface Pagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface SubmenuListResponse {
    response: Submenu[];
    metadata: {
        pagination: Pagination;
    };
}
export interface SelectOption {
    label: string;
    value: number;
}

export interface ParentMenuOption {
    value: number;
    label: string;
}

export interface SubmenuStats {
    total_submenu: number;
    total_aktif: number;
    total_tidak_aktif: number;
}

export const useSubmenu = () => {
    const api = useApi();

    const endpoint = "/dashboard/master/submenu";

    /*
    |--------------------------------------------------------------------------
    | GET ALL
    |--------------------------------------------------------------------------
    */

    const getAll = async (params?: {
        page?: number;
        limit?: number;
        search?: string;
        menu_parent?: number;
        menu_id?: number;
        is_aktif?: boolean;
    }): Promise<SubmenuListResponse> => {

        return await api<SubmenuListResponse>(endpoint, {
            query: params,
        });

    };

    /*
    |--------------------------------------------------------------------------
    | DETAIL
    |--------------------------------------------------------------------------
    */

    const getData = async (
        id: number
    ): Promise<Submenu> => {

        const res = await api<{
            response: Submenu;
        }>(`${endpoint}/${id}`);

        return res.response;
    };

    /*
    |--------------------------------------------------------------------------
    | CREATE
    |--------------------------------------------------------------------------
    */

    const create = async (
        data: SubmenuForm
    ) => {

        return await api(endpoint, {
            method: "POST",
            body: data,
        });

    };

    /*
    |--------------------------------------------------------------------------
    | UPDATE
    |--------------------------------------------------------------------------
    */

    const update = async (
        id: number,
        data: SubmenuForm
    ) => {

        return await api(`${endpoint}/${id}`, {
            method: "PUT",
            body: data,
        });

    };

    /*
    |--------------------------------------------------------------------------
    | DELETE
    |--------------------------------------------------------------------------
    */

    const remove = async (
        id: number
    ) => {

        return await api(`${endpoint}/${id}`, {
            method: "DELETE",
        });

    };

    /*
    |--------------------------------------------------------------------------
    | STATISTICS
    |--------------------------------------------------------------------------
    */

    const stats = async (): Promise<SubmenuStats> => {

        const res = await api<{
            response: SubmenuStats;
        }>(`${endpoint}/stats`);

        return res.response;

    };

    /*
    |--------------------------------------------------------------------------
    | PARENT MENU
    |--------------------------------------------------------------------------
    */

    const getParentMenu = async (): Promise<ParentMenuOption[]> => {
        const res = await api<{
            response: ParentMenuOption[];
        }>(`${endpoint}/parent-menu`);

        return res.response;
    };

    // Select Sub Menu

    const selectSubmenu = async (): Promise<SelectOption[]> => {
        const res = await api<{
            response: SelectOption[];
        }>(`${endpoint}/select`);

        return res.response;
    };
    /*
    |--------------------------------------------------------------------------
    | CHECK ORDER
    |--------------------------------------------------------------------------
    */

    const checkOrder = async (
        parent: number,
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
            `${endpoint}/check-order/${parent}/${urutan}`,
            {
                query: {
                    ignore,
                },
            }
        );

        return res.response;
    };

    return {

        getAll,

        getData,

        create,

        update,

        remove,

        stats,

        getParentMenu,

        selectSubmenu,

        checkOrder,

    };
};
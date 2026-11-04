import { reactive } from "vue";

export interface HakAksesForm {
    role_id?: number;

    nama_role: string;

    menu_ids: number[];

    submenu_ids: number[];

    is_aktiv: boolean;
}

export const useHakAksesForm = () => {

    const form = reactive<HakAksesForm>({
        role_id: undefined,

        nama_role: "",

        menu_ids: [],

        submenu_ids: [],

        is_aktiv: true,
    });

    const errors = reactive({
        nama_role: "",
        menu_ids: "",
        submenu_ids: "",
    });

    const validate = () => {

        errors.nama_role = "";
        errors.menu_ids = "";
        errors.submenu_ids = "";

        let valid = true;

        if (!form.nama_role.trim()) {

            errors.nama_role = "Nama hak akses wajib diisi";

            valid = false;
        }

        if (!form.menu_ids.length) {

            errors.menu_ids = "Minimal pilih satu menu";

            valid = false;
        }

        if (!form.submenu_ids.length) {

            errors.submenu_ids = "Minimal pilih satu submenu";

            valid = false;
        }

        return valid;
    };

    const resetForm = () => {

        form.role_id = undefined;

        form.nama_role = "";

        form.menu_ids = [];

        form.submenu_ids = [];

        form.is_aktiv = true;

        errors.nama_role = "";

        errors.menu_ids = "";

        errors.submenu_ids = "";
    };

    const setForm = (data: Partial<HakAksesForm>) => {

        form.role_id = data.role_id;

        form.nama_role = data.nama_role ?? "";

        form.menu_ids = [...(data.menu_ids ?? [])];

        form.submenu_ids = [...(data.submenu_ids ?? [])];

        form.is_aktiv = data.is_aktiv ?? true;
    };

    return {

        form,

        errors,

        validate,

        resetForm,

        setForm,
    };
};
import { reactive, ref } from "vue";

export interface SubmenuForm {
    menu_id?: number;

    menu_parent: number | null;

    menu_nama: string;

    router: string;

    path: string;

    menu_urutan: number | null;

    is_aktif: boolean;
}

export const useSubmenuForm = () => {

    const loading = ref(false);

    const orderAvailable = ref<boolean | null>(null);

    const orderMessage = ref("");

    const form = reactive<SubmenuForm>({

        menu_id: undefined,

        menu_parent: null,

        menu_nama: "",

        router: "",

        path: "",

        menu_urutan: null,

        is_aktif: true,

    });

    const errors = reactive({
        menu_parent: "",
        menu_nama: "",
        router: "",
        path: "",
        menu_urutan: "",
    });

    const validate = () => {

        errors.menu_parent = "";
        errors.menu_nama = "";
        errors.router = "";
        errors.path = "";
        errors.menu_urutan = "";

        let valid = true;

        if (!form.menu_parent) {
            errors.menu_parent = "Parent Menu wajib dipilih";
            valid = false;
        }

        if (!form.menu_nama?.trim()) {
            errors.menu_nama = "Nama Submenu wajib diisi";
            valid = false;
        }

        if (!form.router?.trim()) {
            errors.router = "URL Path wajib diisi";
            valid = false;
        }

        if (!form.path?.trim()) {
            errors.path = "Folder Path wajib diisi";
            valid = false;
        }

        const urutan = Number(form.menu_urutan);

        if (!form.menu_urutan || urutan <= 0) {
            errors.menu_urutan = "Urutan wajib diisi";
            valid = false;
        }

        return valid;
    };
    /*
    |--------------------------------------------------------------------------
    | RESET FORM
    |--------------------------------------------------------------------------
    */

    function resetForm() {

        form.menu_id = undefined;

        form.menu_parent = null;

        form.menu_nama = "";

        form.router = "";

        form.path = "";

        form.menu_urutan = null;

        form.is_aktif = true;

        orderAvailable.value = null;

        orderMessage.value = "";

    }

    /*
    |--------------------------------------------------------------------------
    | SET FORM
    |--------------------------------------------------------------------------
    */

    function setForm(data: Partial<SubmenuForm>) {

        form.menu_id = data.menu_id;

        form.menu_parent = data.menu_parent ?? null;

        form.menu_nama = data.menu_nama ?? "";

        form.router = data.router ?? "";

        form.path = data.path ?? "";

        form.menu_urutan = data.menu_urutan ?? null;

        form.is_aktif = data.is_aktif ?? true;

    }

    /*
    |--------------------------------------------------------------------------
    | ORDER VALIDATION
    |--------------------------------------------------------------------------
    */

    function setOrderAvailable(
        available: boolean,
        urutan: number | null
    ) {

        orderAvailable.value = available;

        if (urutan === null) {

            orderMessage.value = "";

            return;

        }

        orderMessage.value = available
            ? `✓ Urutan ${urutan} tersedia`
            : `✕ Urutan ${urutan} sudah digunakan`;

    }

    return {

        loading,

        form,

        orderAvailable,

        orderMessage,

        resetForm,

        setForm,

        setOrderAvailable,

        errors,

        validate,
    };

};
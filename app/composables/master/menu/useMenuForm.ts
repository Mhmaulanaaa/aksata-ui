import { reactive, ref } from "vue";

export interface MenuForm {
    menu_id?: number;
    menu_nama: string;
    menu_icon_kecil: string;
    router: string;
    path: string;
    menu_urutan: number | null;
    is_aktif: boolean;
}

export const useMenuForm = () => {
    const loading = ref(false);

    const orderAvailable = ref<boolean | null>(null);

    const orderMessage = ref("");

    const form = reactive<MenuForm>({
        menu_id: undefined,
        menu_nama: "",
        menu_icon_kecil: "",
        router: "",
        path: "",
        menu_urutan: null,
        is_aktif: true,
    });

    const errors = reactive({
        menu_nama: "",
        router: "",
        path: "",
        menu_icon_kecil: "",
        menu_urutan: "",
    });


    const validate = () => {
        errors.menu_nama = "";
        errors.router = "";
        errors.path = "";
        errors.menu_icon_kecil = "";
        errors.menu_urutan = "";

        let valid = true;

        if (!form.menu_nama?.trim()) {
            errors.menu_nama = "Nama Menu wajib diisi";
            valid = false;
        }

        if (!form.menu_icon_kecil?.trim()) {
            errors.menu_icon_kecil = "Icon wajib diisi";
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


    function resetForm() {
        form.menu_id = undefined;

        form.menu_nama = "";
        form.menu_icon_kecil = "";
        form.router = "";
        form.path = "";
        form.menu_urutan = null;

        form.is_aktif = true;

        orderAvailable.value = null;
        orderMessage.value = "";
    }

    function setForm(data: Partial<MenuForm>) {
        form.menu_id = data.menu_id;

        form.menu_nama = data.menu_nama ?? "";
        form.menu_icon_kecil = data.menu_icon_kecil ?? "";
        form.router = data.router ?? "";
        form.path = data.path ?? "";
        form.menu_urutan = data.menu_urutan ?? null;

        form.is_aktif = data.is_aktif ?? true;
    }

    function setOrderAvailable(available: boolean, urutan: number | null) {
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
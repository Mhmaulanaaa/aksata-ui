import {
    ref,
    reactive,
    computed,
    onMounted,
    watch,
} from "vue";
import { toastSuccess, toastError } from "~/utils/toast";
import { confirmAction } from "~/utils/swal";

import { useSubmenu, type ParentMenuOption, type SelectOption, type Submenu } from "./useSubMenu";
import { useSubmenuForm } from "./useSubMenuForm";
import { useSidebar } from "~/composables/sidebar/useSidebar";

export const useSubMenuPage = () => {

    const {
        getAll,
        getData,
        create,
        update,
        remove,
        stats,
        checkOrder,
        getParentMenu,
        selectSubmenu,
    } = useSubmenu();

    const {
        form,
        resetForm,
        setForm,
        orderAvailable,
        orderMessage,
        setOrderAvailable,
        errors,
        validate,
    } = useSubmenuForm();

    const { loadSidebar } = useSidebar();

    const loading = ref(false);


    const showModal = ref(false);

    const isEdit = ref(false);

    const selectedId = ref<number | null>(null);


    /*
    |--------------------------------------------------------------------------
    | DATA
    |--------------------------------------------------------------------------
    */

    const submenus = ref<Submenu[]>([]);

    const parentMenus = ref<ParentMenuOption[]>([]);

    /*
    |--------------------------------------------------------------------------
    | FILTER
    |--------------------------------------------------------------------------
    */

    const filter = reactive({

        search: "",

        menu_parent: undefined as number | undefined,

        menu_id: undefined as number | undefined,

        is_aktif: undefined as boolean | undefined,

    });

    /*
    |--------------------------------------------------------------------------
    | SELECT FILTER
    |--------------------------------------------------------------------------
    */

    const selectedParent = ref<{
        label: string;
        value: number;
    }>();

    const selectedSubmenu = ref<SelectOption>();

    const submenuOptions = ref<SelectOption[]>([]);

    const loadSubmenuOptions = async () => {
        submenuOptions.value = await selectSubmenu();
    };

    const selectedStatus = ref<{
        label: string;
        value: boolean;
    }>();

    const parentOptions = computed(() =>
        parentMenus.value.map(item => ({
            label: item.label,
            value: item.value,
        }))
    );

    /*
    |--------------------------------------------------------------------------
    | STATISTIC
    |--------------------------------------------------------------------------
    */

    const statistics = ref({

        total_submenu: 0,

        total_aktif: 0,

        total_tidak_aktif: 0,

    });

    /*
    |--------------------------------------------------------------------------
    | LOAD SUBMENU
    |--------------------------------------------------------------------------
    */

    const total = ref(0);
    const page = ref(1);
    const pageSize = ref(10);

    const changePage = async (newPage: number) => {

        page.value = newPage;

        await loadSubmenus();

    };

    const loadSubmenus = async () => {

        loading.value = true;

        try {
            const res = await getAll({
                page: page.value,
                limit: pageSize.value,
                search: filter.search || undefined,
                menu_parent: filter.menu_parent,
                menu_id: filter.menu_id,
                is_aktif: filter.is_aktif,
            });

            submenus.value = res.response;
            total.value = res.metadata.pagination.total;

            await loadStats();

        } finally {

            loading.value = false;

        }

    };

    /*
    |--------------------------------------------------------------------------
    | LOAD PARENT MENU
    |--------------------------------------------------------------------------
    */

    const loadParentMenus = async () => {

        parentMenus.value = await getParentMenu();

    };

    /*
    |--------------------------------------------------------------------------
    | LOAD STATISTIC
    |--------------------------------------------------------------------------
    */

    const loadStats = async () => {

        statistics.value = await stats();

    };

    /*
    |--------------------------------------------------------------------------
    | CREATE
    |--------------------------------------------------------------------------
    */

    const openCreate = async () => {

        resetForm();

        selectedId.value = null;

        isEdit.value = false;

        showModal.value = true;

        if (!parentMenus.value.length) {

            await loadParentMenus();

        }

    };

    /*
    |--------------------------------------------------------------------------
    | EDIT
    |--------------------------------------------------------------------------
    */

    const openEdit = async (id: number) => {

        loading.value = true;

        try {

            if (!parentMenus.value.length) {

                await loadParentMenus();

            }

            const data = await getData(id);

            resetForm();

            setForm(data);

            selectedId.value = id;

            isEdit.value = true;

            showModal.value = true;

        } finally {

            loading.value = false;

        }

    };

    /*
    |--------------------------------------------------------------------------
    | SEARCH
    |--------------------------------------------------------------------------
    */

    const handleSearch = async () => {

        filter.menu_parent = selectedParent.value?.value;

        filter.menu_id = selectedSubmenu.value?.value;

        filter.is_aktif = selectedStatus.value?.value;

        await loadSubmenus();

    };

    /*
    |--------------------------------------------------------------------------
    | RESET
    |--------------------------------------------------------------------------
    */

    const handleReset = async () => {

        filter.search = "";

        filter.menu_parent = undefined;

        filter.menu_id = undefined;

        filter.is_aktif = undefined;

        selectedParent.value = undefined;

        selectedSubmenu.value = undefined;

        selectedStatus.value = undefined;

        await Promise.all([
            loadSubmenus(),
            loadStats(),
        ]);

    };

    /*
    |--------------------------------------------------------------------------
    | SAVE
    |--------------------------------------------------------------------------
    */

    const handleSave = async () => {

        try {

            if (!validate()) {
                return;
            }

            if (!form.menu_parent) {

                toastError("Menu induk wajib dipilih.");

                return;

            }

            if (orderAvailable.value == false) {

                toastError("Urutan submenu sudah digunakan.");

                return;

            }

            if (isEdit.value && selectedId.value) {

                await update(selectedId.value, form);

                toastSuccess("Submenu berhasil diperbarui.");

            } else {

                await create(form);

                toastSuccess("Submenu berhasil ditambahkan.");

            }

            showModal.value = false;

            await Promise.all([

                loadSubmenus(),

                loadStats(),

                loadSidebar(),

            ]);

        } catch (err: any) {

            toastError(err?.message ?? "Terjadi kesalahan.");

        }

    };

    /*
    |--------------------------------------------------------------------------
    | DELETE
    |--------------------------------------------------------------------------
    */

    const deleteSubmenu = async (id: number) => {

        const result = await confirmAction(
            "Apakah Anda yakin ingin menghapus submenu ini?"
        );

        if (!result.isConfirmed) return;

        try {

            await remove(id);

            toastSuccess("Submenu berhasil dihapus.");

            await Promise.all([

                loadSubmenus(),

                loadStats(),

                loadSidebar(),

            ]);

        } catch (err: any) {

            toastError(err?.message ?? "Terjadi kesalahan.");

        }

    };

    /*
    |--------------------------------------------------------------------------
    | CHECK ORDER
    |--------------------------------------------------------------------------
    */

    watch(
        () => [form.menu_parent, form.menu_urutan],

        async ([parent, urutan]) => {

            if (!parent || urutan == null || urutan <= 0) {
                orderAvailable.value = null;
                orderMessage.value = "";
                return;
            }

            const result = await checkOrder(
                parent,
                urutan,
                form.menu_id
            );

            orderAvailable.value = result.available;

            if (result.same_data) {
                orderMessage.value =
                    `✓  Urutan ${urutan} digunakan pada submenu ini`;
            } else if (result.available) {
                orderMessage.value =
                    `✓ Urutan ${urutan} tersedia`;
            } else {
                orderMessage.value =
                    `✕ Urutan ${urutan} sudah digunakan`;
            }
        }
    );

    /*
    |--------------------------------------------------------------------------
    | TABLE
    |--------------------------------------------------------------------------
    */

    const columns = [

        {
            accessorKey: "no",
            header: "No",
        },

        {
            accessorKey: "parent_nama",
            header: "Menu",
        },

        {
            accessorKey: "menu_nama",
            header: "Nama Submenu",
        },

        {
            accessorKey: "router",
            header: "URL Path",
        },

        {
            accessorKey: "path",
            header: "Folder Path",
        },

        {
            accessorKey: "menu_urutan",
            header: "Urutan",
        },

        {
            accessorKey: "is_aktif",
            header: "Status",
        },

        {
            accessorKey: "actions",
            header: "Aksi",
        },

    ];

    /*
    |--------------------------------------------------------------------------
    | INIT
    |--------------------------------------------------------------------------
    */

    onMounted(async () => {

        await Promise.all([

            loadSubmenus(),

            loadParentMenus(),

            loadSubmenuOptions(),

            loadStats(),

        ]);

    });

    return {

        loading,

        showModal,

        isEdit,

        form,

        filter,

        columns,

        statistics,

        submenus,

        parentMenus,

        parentOptions,

        selectedParent,

        orderAvailable,

        orderMessage,

        openCreate,

        openEdit,

        handleSave,

        deleteSubmenu,

        handleSearch,

        handleReset,

        loadSubmenus,

        loadParentMenus,

        loadStats,

        selectedStatus,

        submenuOptions,

        selectedSubmenu,

        total,

        page,

        pageSize,

        changePage,

        errors,

    };

};
import { ref, reactive, computed, onMounted, watch } from "vue";
import { toastSuccess, toastError } from "~/utils/toast";
import { confirmAction } from "~/utils/swal";

import { useMenu } from "./useMenu";
import { useMenuForm } from "./useMenuForm";

export const useMenuPage = () => {
    const {
        getAll,
        getData,
        create,
        update,
        remove,
        stats,
        checkOrder,
    } = useMenu();

    const {
        form,
        resetForm,
        setForm,
        orderAvailable,
        orderMessage,
        setOrderAvailable,
        errors,
        validate,
    } = useMenuForm();

    const loading = ref(false);

    const showModal = ref(false);

    const isEdit = ref(false);

    const selectedId = ref<number | null>(null);

    const selectedMenu = ref<number | undefined>();


    const selectedStatus = ref<{
        label: string;
        value: boolean;
    }>();

    const menuOptions = computed(() =>
        menus.value.map(item => ({
            label: item.menu_nama,
            value: item.menu_id,
        }))
    );

    const menus = ref<any[]>([]);

    const statistics = ref({
        total_menu: 0,
        total_aktif: 0,
        total_tidak_aktif: 0,
    });

    const handleSearch = async () => {

        if (selectedMenu.value) {

            const menu = menus.value.find(
                x => x.menu_id === selectedMenu.value
            );

            filter.search = menu?.menu_nama ?? "";


        }
        filter.is_aktif = selectedStatus.value?.value;


        await loadMenus();

    };

    const handleReset = async () => {
        // Reset nilai yang dikirim ke backend
        filter.search = "";


        // Reset USelectMenu
        selectedMenu.value = undefined;
        selectedStatus.value = undefined;


        await Promise.all([
            loadMenus(),
            loadStats(),
        ]);
    };
    /*
    |--------------------------------------------------------------------------
    | LOAD MENU
    |--------------------------------------------------------------------------
    */

    const total = ref(0);
    const page = ref(1);
    const pageSize = ref(10);

    const changePage = async (newPage: number) => {

        page.value = newPage;

        await loadMenus();

    };

    const loadMenus = async () => {

        loading.value = true;

        try {

            const res = await getAll({

                page: page.value,

                limit: pageSize.value,

                search: filter.search || undefined,

                is_aktif: filter.is_aktif,

            });

            menus.value = res.response;

            total.value = res.metadata.pagination.total;

            await loadStats();

        } finally {

            loading.value = false;

        }

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

    const openCreate = () => {
        resetForm();

        selectedId.value = null;

        isEdit.value = false;
        showModal.value = true;
    };

    /*
    |--------------------------------------------------------------------------
    | EDIT
    |--------------------------------------------------------------------------
    */

    const openEdit = async (id: number) => {
        loading.value = true;

        try {
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
    | SAVE
    |--------------------------------------------------------------------------
    */


    const handleSave = async () => {
        try {

            if (!validate()) {
                return;
            }

            if (
                orderAvailable.value === false
            ) {
                toastError("Urutan menu sudah digunakan.");
                return;
            }

            if (isEdit.value && selectedId.value) {

                await update(selectedId.value, form);

                toastSuccess("Menu berhasil diperbarui.");

            } else {

                await create(form);

                toastSuccess("Menu berhasil ditambahkan.");

            }

            showModal.value = false;

            await Promise.all([
                loadMenus(),
                loadStats(),
            ]);

        } catch (err: any) {

            toastError(err?.message ?? "Terjadi kesalahan");

        }
    };

    /*
    |--------------------------------------------------------------------------
    | DELETE
    |--------------------------------------------------------------------------
    */

    const deleteMenu = async (id: number) => {

        const result = await confirmAction(
            "Apakah Anda yakin ingin menghapus menu ini?"
        );

        if (!result.isConfirmed) return;

        try {

            await remove(id);

            toastSuccess("Menu berhasil dihapus.");

            await Promise.all([
                loadMenus(),
                loadStats(),
            ]);

        } catch (err: any) {

            toastError(err?.message ?? "Terjadi kesalahan");

        }
    };

    /*
    |--------------------------------------------------------------------------
    | SEARCH
    |--------------------------------------------------------------------------
    */

    const filter = reactive({
        search: "",
        is_aktif: undefined as boolean | undefined,
    });

    /*
    |--------------------------------------------------------------------------
    | CHECK ORDER
    |--------------------------------------------------------------------------
    */

    watch(
        () => form.menu_urutan,
        async (value) => {

            if (value == null || value <= 0) {
                orderAvailable.value = null;
                orderMessage.value = "";
                return;
            }

            const result = await checkOrder(
                value,
                form.menu_id
            );

            orderAvailable.value = result.available;

            if (result.same_data) {
                orderMessage.value =
                    `✓ Urutan ${value} sedang digunakan pada data ini`;
            } else if (result.available) {
                orderMessage.value =
                    `✓ Urutan ${value} tersedia`;
            } else {
                orderMessage.value =
                    `✕ Urutan ${value} sudah digunakan`;
            }
        }
    );

    /*
    |--------------------------------------------------------------------------
    | Table
    |--------------------------------------------------------------------------
    */

    const columns = [
        {
            accessorKey: "no",
            header: "No",
        },
        {
            accessorKey: "menu_nama",
            header: "Nama Menu",
        },
        {
            accessorKey: "menu_icon_kecil",
            header: "Icon Kecil",
        },
        {
            accessorKey: "menu_url",
            header: "URL Path",
        },
        {
            accessorKey: "folder_path",
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
            loadMenus(),
            loadStats(),
        ]);

    });

    return {
        loading,

        filter,

        showModal,

        isEdit,

        menus,

        statistics,

        form,

        orderAvailable,

        orderMessage,

        columns,

        openCreate,

        openEdit,

        handleSave,

        deleteMenu,

        handleSearch,

        handleReset,

        loadMenus,

        loadStats,

        selectedMenu,

        menuOptions,

        total,

        page,

        pageSize,

        changePage,

        selectedStatus,

        errors,
    };
};
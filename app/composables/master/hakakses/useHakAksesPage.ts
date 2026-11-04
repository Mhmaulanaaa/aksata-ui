import { ref, reactive, onMounted } from "vue";
import { toastSuccess, toastError } from "~/utils/toast";
import { confirmAction } from "~/utils/swal";
import {
    useHakAkses,
    type HakAkses,
    type SelectOption,
} from "./useHakAkses";
import { useMenu } from "../menu/useMenu";
import { useHakAksesForm } from "./useHakAksesForm";

export const useHakAksesPage = () => {
    const {
        getList,
        getDetail,
        create,
        update,
        remove,
        count,
        select,
        submenuByMenu,
    } = useHakAkses();


    const {
        form,

        errors,

        validate,

        resetForm,

        setForm,
    } = useHakAksesForm();
    /* =====================
       STATE
    ===================== */

    const loading = ref(false);

    const showModal = ref(false);

    const isEdit = ref(false);

    const dataTable = ref<HakAkses[]>([]);

    const selectedData = ref<HakAkses | null>(null);

    const roleOptions = ref<SelectOption[]>([]);

    const menuOptions = ref<SelectOption[]>([]);

    const submenuOptions = ref<SelectOption[]>([]);

    const loadingEdit = ref(false);


    const { getParentMenu } = useMenu();

    const loadMenu = async () => {
        menuOptions.value = await getParentMenu();
    };

    const loadSubmenu = async (menuIds: number[]) => {
        if (!menuIds.length) {
            submenuOptions.value = [];
            return;
        }

        const { response } = await submenuByMenu(menuIds);

        const map = new Map<number, SelectOption>();

        [...submenuOptions.value, ...response].forEach(item => {
            map.set(item.value, item);
        });

        submenuOptions.value = [...map.values()];
    };

    const statistik = reactive({
        total: 0,
        aktif: 0,
        tidak_aktif: 0,
    });

    /* =====================
       FILTER
    ===================== */

    const filter = reactive({
        role_id: undefined as number | undefined,
        is_aktiv: undefined as boolean | undefined,
    });

    /* =====================
       LOAD TABLE
    ===================== */
    const total = ref(0);
    const page = ref(1);
    const pageSize = ref(10);

    const changePage = async (newPage: number) => {

        page.value = newPage;

        await loadData();

    };

    const loadData = async () => {
        loading.value = true;

        try {
            const res = await getList({
                role_id: filter.role_id,
                is_aktiv: filter.is_aktiv,

                page: page.value,
                limit: pageSize.value,
            });

            dataTable.value = res.response;
            total.value = res.pagination.total;

            await loadCount();
        } finally {
            loading.value = false;
        }
    };

    /* =====================
       LOAD COUNT
    ===================== */

    const loadCount = async () => {
        try {
            const { response } = await count();

            statistik.total = response.total;
            statistik.aktif = response.aktif;
            statistik.tidak_aktif = response.tidak_aktif;
        } catch (err) {
            console.error("Load count gagal", err);
        }
    };

    /* =====================
       LOAD SELECT
    ===================== */

    const loadSelect = async () => {
        try {
            const { response } = await select();

            roleOptions.value = response;
        } catch (err) {
            console.error("Load select gagal", err);
        }
    };

    /* =====================
       CREATE
    ===================== */

    const openCreate = () => {

        resetForm();

        submenuOptions.value = [];

        selectedData.value = null;

        isEdit.value = false;

        showModal.value = true;
    };

    /* =====================
       EDIT
    ===================== */

    const openEdit = async (id: number) => {
        try {
            loadingEdit.value = true;

            const { response } = await getDetail(id);

            resetForm();

            setForm(response);

            await loadSubmenu(response.menu_ids ?? []);

            selectedData.value = response;

            isEdit.value = true;
            showModal.value = true;
        } catch {
            toastError("Gagal mengambil detail data");
        } finally {
            loadingEdit.value = false;
        }
    };

    /* =====================
       SAVE
    ===================== */

    const handleSave = async () => {

        if (!validate()) return;

        try {

            if (isEdit.value && form.role_id) {

                await update(form.role_id, form);

                toastSuccess("Data berhasil diperbarui");

            } else {

                console.log("CREATE", form);

                await create(form);

                toastSuccess("Data berhasil ditambahkan");

            }

            showModal.value = false;

            await Promise.all([
                loadData(),
                loadCount(),
                loadSelect(),
            ]);

        } catch (err: any) {

            toastError(
                err?.response?._data?.metadata?.message ??
                "Gagal menyimpan data"
            );
        }
    };

    /* =====================
       DELETE
    ===================== */

    const deleteData = async (id: number) => {
        const result = await confirmAction(
            "Apakah Anda yakin ingin menghapus data ini?"
        );

        if (!result.isConfirmed) return;

        try {
            await remove(id);

            toastSuccess("Data berhasil dihapus");

            await Promise.all([
                loadData(),
                loadCount(),
                loadSelect(),
            ]);
        } catch (err) {
            console.error(err);
            toastError("Gagal menghapus data");
        }
    };

    /* =====================
       SEARCH
    ===================== */

    const handleSearch = async () => {
        await loadData();
        await loadCount();
        await loadSelect();
    };

    const handleReset = async () => {

        filter.role_id = undefined;
        filter.is_aktiv = undefined;

        await loadData();
        await loadSelect();
    };

    // Watch

    watch(
        () => [...form.menu_ids],
        async (menus, oldMenus) => {

            await loadSubmenu(menus);

            // hanya saat user mengganti menu
            if (oldMenus) {

                form.submenu_ids =
                    form.submenu_ids.filter(id =>
                        submenuOptions.value.some(x => x.value === id)
                    );

            }

        }
    );
    /* =====================
       INIT
    ===================== */

    onMounted(async () => {
        await Promise.all([
            loadData(),
            loadCount(),
            loadSelect(),
            loadMenu(),
        ]);
    });

    return {
        loading,
        showModal,
        isEdit,
        dataTable,
        selectedData,
        statistik,
        filter,
        total,
        page,
        pageSize,
        changePage,
        openCreate,
        openEdit,
        handleSave,
        deleteData,
        handleSearch,
        handleReset,
        loadData,
        loadCount,
        loadSelect,
        roleOptions,
        menuOptions,
        submenuOptions,
        loadSubmenu,
        form,
        errors,
        validate,
    };
};
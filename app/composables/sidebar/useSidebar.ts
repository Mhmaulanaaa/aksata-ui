import type { SidebarMenu } from "~/composables/sidebar/useMenuSidebar";
import { useMenuSidebar } from "~/composables/sidebar/useMenuSidebar";

export const useSidebar = () => {
    const menus = useState<SidebarMenu[]>("sidebar-menu", () => []);

    const loading = ref(false);

    const loadSidebar = async () => {
        loading.value = true;

        try {
            menus.value = await useMenuSidebar().getSidebar();
        } finally {
            loading.value = false;
        }
    };

    return {
        menus,
        loading,
        loadSidebar,
    };
};
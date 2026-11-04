export interface SidebarMenu {
    menu_id: number;
    menu_nama: string;
    icon?: string | null;
    router?: string | null;
    path?: string | null;
    menu_level: number;
    children?: SidebarMenu[];
}

// =====================================================
// MANUAL SIDEBAR MENU
// =====================================================

const sidebarMenus: SidebarMenu[] = [
    {
        menu_id: 1,
        menu_nama: "Dashboard",
        icon: "i-lucide-layout-dashboard",
        router: "/dashboard",
        menu_level: 1,
    },
    {
        menu_id: 2,
        menu_nama: "Pelayanan",
        icon: "i-lucide-stethoscope",
        menu_level: 1,
        children: [
            {
                menu_id: 21,
                menu_nama: "Pendaftaran Pasien",
                icon: "i-lucide-user-plus",
                router: "/dashboard/pelayanan/pendaftaran",
                menu_level: 2,
            },
            {
                menu_id: 22,
                menu_nama: "Rawat Jalan",
                icon: "i-lucide-activity",
                router: "/dashboard/pelayanan/rawat-jalan",
                menu_level: 2,
            },
            {
                menu_id: 23,
                menu_nama: "Rawat Inap",
                icon: "i-lucide-bed",
                router: "/dashboard/pelayanan/rawat-inap",
                menu_level: 2,
            },
            {
                menu_id: 24,
                menu_nama: "Instalasi Gawat Darurat",
                icon: "i-lucide-hospital",
                router: "/dashboard/pelayanan/igd",
                menu_level: 2,
            },
        ],
    },
    {
        menu_id: 3,
        menu_nama: "Rekam Medis",
        icon: "i-lucide-clipboard-list",
        menu_level: 1,
        children: [
            {
                menu_id: 31,
                menu_nama: "Data Rekam Medis",
                icon: "i-lucide-folder-heart",
                router: "/dashboard/rekam-medis",
                menu_level: 2,
            },
            {
                menu_id: 32,
                menu_nama: "Resume Medis",
                icon: "i-lucide-file-text",
                router: "/dashboard/rekam-medis/resume",
                menu_level: 2,
            },
            {
                menu_id: 33,
                menu_nama: "Catatan Perkembangan",
                icon: "i-lucide-notebook-pen",
                router: "/dashboard/rekam-medis/cppt",
                menu_level: 2,
            },
            {
                menu_id: 34,
                menu_nama: "Diagnosa & Tindakan",
                icon: "i-lucide-clipboard-check",
                router: "/dashboard/rekam-medis/diagnosa",
                menu_level: 2,
            },
        ],
    },
    {
        menu_id: 4,
        menu_nama: "Master Data",
        icon: "i-lucide-database",
        menu_level: 1,
        children: [
            {
                menu_id: 41,
                menu_nama: "Data Pasien",
                icon: "i-lucide-users",
                router: "/dashboard/master/pasien",
                menu_level: 2,
            },
            {
                menu_id: 42,
                menu_nama: "Data Dokter",
                icon: "i-lucide-user-round",
                router: "/dashboard/master/dokter",
                menu_level: 2,
            },
            {
                menu_id: 43,
                menu_nama: "Data Ruangan",
                icon: "i-lucide-hospital",
                router: "/dashboard/master/ruangan",
                menu_level: 2,
            },
        ],
    },
    {
        menu_id: 5,
        menu_nama: "Laporan",
        icon: "i-lucide-chart-no-axes-combined",
        menu_level: 1,
        children: [
            {
                menu_id: 51,
                menu_nama: "Laporan Pelayanan",
                icon: "i-lucide-chart-bar",
                router: "/dashboard/laporan/pelayanan",
                menu_level: 2,
            },
            {
                menu_id: 52,
                menu_nama: "Laporan Rekam Medis",
                icon: "i-lucide-file-chart-line",
                router: "/dashboard/laporan/rekam-medis",
                menu_level: 2,
            },
        ],
    },
    {
        menu_id: 6,
        menu_nama: "Pengaturan",
        icon: "i-lucide-settings",
        menu_level: 1,
        children: [
            {
                menu_id: 61,
                menu_nama: "Pengaturan Akun",
                icon: "i-lucide-user-cog",
                router: "/dashboard/pengaturan/akun",
                menu_level: 2,
            },
        ],
    },
];

// =====================================================
// SIDEBAR COMPOSABLE
// =====================================================

export const useMenuSidebar = () => {
    const getSidebar = async (): Promise<SidebarMenu[]> => {
        return sidebarMenus;
    };

    return {
        getSidebar,
    };
};
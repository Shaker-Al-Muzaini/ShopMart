import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {LayoutGrid ,Users,Briefcase,TagIcon,ShoppingBag,Package} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Product',
        href: '/admin/products',
        icon: Package,
    },

    {
        title: 'Categories',
        href: '/admin/categories',
        icon: TagIcon,
    },
    {
        title: 'Brands',
        href: '/admin/brands',
        icon: ShoppingBag,
    },
    {
        title: 'Admins',
        href: '/admin/admins',
        icon: Briefcase,
    },
    {
        title: 'Users',
        href: '/admin/users',
        icon: Users,
    }
];


export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset"  >
            <SidebarHeader >
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

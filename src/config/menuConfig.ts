/**
 * Menu Configuration
 *
 * This file defines all available menu items and their categories for the AppShell component.
 * Customize this file to match your application's navigation structure.
 */

import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  Settings,
  HelpCircle,
  User,
  ShoppingCart,
  BarChart3,
  Package,
  Inbox,
  FolderOpen,
  ListTodo,
  MessageSquare,
  Layers,
} from "lucide-react";
import type { AppShellMenuItem } from "@/components/AppShell";
import type { MenuPickerCategory } from "@/components/AppShell/MenuPickerDialog";

/**
 * All available menu items in the application
 * Each item should have:
 * - id: unique identifier
 * - to: navigation path/route
 * - icon: Lucide icon component
 * - label: display text
 * - category: for grouping in menu picker
 * - permission: optional function to check if user can see this menu
 */
export const getAllMenuItems = (): AppShellMenuItem[] => [
  // Overview
  {
    id: "dashboard",
    to: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    category: "overview",
    order: 15,
  },
  {
    id: "analytics",
    to: "/analytics",
    icon: BarChart3,
    label: "Analytics",
    category: "overview",
    order: 2,
  },
  {
    id: "reports",
    to: "/reports",
    icon: FileText,
    label: "Reports",
    category: "overview",
    order: 3,
  },

  // Content Management
  {
    id: "items",
    to: "/items",
    icon: Package,
    label: "Items",
    category: "content",
    order: 4,
  },
  {
    id: "projects",
    to: "/projects",
    icon: FolderOpen,
    label: "Projects",
    category: "content",
    order: 5,
  },
  {
    id: "tasks",
    to: "/tasks",
    icon: ListTodo,
    label: "Tasks",
    category: "content",
    order: 6,
  },
  {
    id: "calendar",
    to: "/calendar",
    icon: Calendar,
    label: "Calendar",
    category: "content",
    order: 7,
  },

  // Collaboration
  {
    id: "messages",
    to: "/messages",
    icon: MessageSquare,
    label: "Messages",
    category: "collaboration",
    order: 8,
  },
  {
    id: "team",
    to: "/team",
    icon: Users,
    label: "Team",
    category: "collaboration",
    order: 9,
  },

  // Commerce
  {
    id: "orders",
    to: "/orders",
    icon: ShoppingCart,
    label: "Orders",
    category: "commerce",
    order: 10,
  },
  {
    id: "inbox",
    to: "/inbox",
    icon: Inbox,
    label: "Inbox",
    category: "commerce",
    order: 11,
  },

  // System
  {
    id: "settings",
    to: "/settings",
    icon: Settings,
    label: "Settings",
    category: "system",
    order: 12,
  },
  {
    id: "integrations",
    to: "/integrations",
    icon: Layers,
    label: "Integrations",
    category: "system",
    order: 13,
  },

  // Support
  {
    id: "support",
    to: "/support",
    icon: HelpCircle,
    label: "Support",
    category: "support",
    order: 14,
  },

  // Account
  {
    id: "profile",
    to: "/account/profile",
    icon: User,
    label: "My Profile",
    category: "account",
    order: 15,
  },
];

/**
 * Menu categories for organizing items in the menu picker dialog
 */
export const menuCategories: MenuPickerCategory[] = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    id: "content",
    label: "Content Management",
    icon: FolderOpen,
  },
  {
    id: "collaboration",
    label: "Collaboration",
    icon: Users,
  },
  {
    id: "commerce",
    label: "Commerce",
    icon: ShoppingCart,
  },
  {
    id: "system",
    label: "System",
    icon: Settings,
  },
  {
    id: "support",
    label: "Support",
    icon: HelpCircle,
  },
  {
    id: "account",
    label: "My Account",
    icon: User,
  },
];

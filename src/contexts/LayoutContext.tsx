import React, { createContext, useContext, useState, ReactNode } from 'react';

export const AVAILABLE_MENUS = [
  'studio-management',
  'dashboard',
  'members',
  'memberships',
  'payments',
  'classes',
  'staff',
  'reports',
  'settings',
  'support',
] as const;

export type ActivePage = (typeof AVAILABLE_MENUS)[number];

interface LayoutContextType {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  selectedStudioScope: string | null | undefined; // Can be studioId or 'all'
  setSelectedStudioScope: (scope: string | null | undefined) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');
  const [selectedStudioScope, setSelectedStudioScope] = useState<string | null | undefined>(null); // Default to 'all'
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved ? JSON.parse(saved) : false;
  });

  return (
    <LayoutContext.Provider value={{ activePage, setActivePage, selectedStudioScope, setSelectedStudioScope, sidebarCollapsed, setSidebarCollapsed }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayoutContext must be used within a LayoutProvider');
  }
  return context;
};
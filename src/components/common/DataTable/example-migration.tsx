// Example: How to migrate MembersTable to use the new DataTable component
// This file demonstrates the migration pattern and can be used as a reference
// NOTE: This is an example file showing the pattern - it references columns from the actual module

import { memo, useState, useEffect, useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable, DataTableContext, PaginationConfig } from '@/components/common/DataTable';
import { MemberSnapshot } from '@/types/users';
import { useMembers } from '@/contexts/MembersContext';
import { useStudio } from '@/contexts/StudioContext';
import type { ActiveFilter } from '@/components/GenericToolbar';
import { buildUniversalSearchRequest } from '@/components/GenericToolbar';
// import { createMemberColumns } from './columns'; // Import from actual members module
import { StudiosAssignmentDialog } from '@/components/StudiosAssignmentDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

// This would be imported from your actual columns file
// For this example, we're showing the structure
const createMemberColumns = (_options: any): ColumnDef<MemberSnapshot>[] => {
  return [] as ColumnDef<MemberSnapshot>[];
};

interface MembersTableNewProps {
  searchTerm: string;
  activeFilters: ActiveFilter[];
  selectedStudioScope: string;
  visibleColumns: string[];
  onView: (member: MemberSnapshot) => void;
  onEdit: (member: MemberSnapshot) => void;
  onCheckIn: (memberId: string) => void;
  onTransfer?: (member: MemberSnapshot) => void;
  canEdit: boolean;
  canDelete: boolean;
  selectionMode?: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;
  membershipPlanMap?: Map<string, any>;
}

export const MembersTableNew = memo(function MembersTableNew({
  searchTerm,
  activeFilters,
  selectedStudioScope,
  visibleColumns,
  onView,
  onEdit,
  onCheckIn,
  onTransfer,
  canEdit,
  canDelete,
  selectionMode,
  membershipPlanMap,
  onSelectionChange,
}: MembersTableNewProps) {
  const { studios } = useStudio();
  const { members, loading, refreshMembers, updateMember, deleteMember } = useMembers();
  
  const [studiosDialogOpen, setStudiosDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberSnapshot | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<MemberSnapshot | null>(null);
  
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // Trigger API call when search or filters change
  useEffect(() => {
    if (!selectedStudioScope) return;

    const searchPayload = buildUniversalSearchRequest(
      activeFilters,
      searchTerm,
      ['firstName', 'lastName', 'email', 'phone']
    );
    const studioIdToFetch = selectedStudioScope === 'all' ? null : selectedStudioScope;

    refreshMembers(searchPayload, studioIdToFetch, pageIndex, pageSize);
  }, [searchTerm, activeFilters, selectedStudioScope, pageIndex, pageSize, refreshMembers]);

  // Context for DataTable (wraps all CRUD operations)
  const context: DataTableContext<MemberSnapshot> = useMemo(() => ({
    data: members,
    loading,
    refresh: async (_filters, page, size) => {
      const searchPayload = buildUniversalSearchRequest(
        activeFilters,
        searchTerm,
        ['firstName', 'lastName', 'email', 'phone']
      );
      const studioIdToFetch = selectedStudioScope === 'all' ? null : selectedStudioScope;
      await refreshMembers(searchPayload, studioIdToFetch, page ?? pageIndex, size ?? pageSize);
    },
    update: async (id: string, item: Partial<MemberSnapshot>) => {
      return await updateMember(id, item as any);
    },
    delete: async (id: string) => {
      await deleteMember(id);
    },
  }), [members, loading, activeFilters, searchTerm, selectedStudioScope, pageIndex, pageSize, refreshMembers, updateMember, deleteMember]);

  // Pagination configuration
  const paginationConfig: PaginationConfig = useMemo(() => ({
    pageIndex,
    pageSize,
    onPageChange: setPageIndex,
    onPageSizeChange: (newSize) => {
      setPageSize(newSize);
      setPageIndex(0);
    },
  }), [pageIndex, pageSize]);

  // Handler callbacks
  const handleOpenStudiosDialog = (member: MemberSnapshot) => {
    setSelectedMember(member);
    setStudiosDialogOpen(true);
  };

  const handleUpdateStudios = async (studioIds: string[]) => {
    if (selectedMember && canEdit) {
      try {
        await updateMember(selectedMember.id, {
          id: selectedMember.id,
          studioIds: studioIds,
        } as any);
        await context.refresh();
      } catch (error) {
        console.error('Failed to update studios:', error);
      }
    }
  };

  const handleDeleteMember = (member: MemberSnapshot) => {
    setMemberToDelete(member);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!memberToDelete) return;

    try {
      await deleteMember(memberToDelete.id);
      setDeleteDialogOpen(false);
      setMemberToDelete(null);
    } catch (error) {
      console.error('Failed to delete member:', error);
    }
  };

  // Column definitions with callbacks
  const columns = useMemo(() => 
    createMemberColumns({
      onView,
      onEdit,
      onDelete: handleDeleteMember,
      onCheckIn,
      onOpenStudios: handleOpenStudiosDialog,
      onTransfer,
      canEdit,
      canDelete,
      selectionMode,
      membershipPlanMap,
    }),
    [onView, onEdit, onCheckIn, onTransfer, canEdit, canDelete, selectionMode, membershipPlanMap]
  );

  // Filter columns based on visibleColumns prop
  const filteredColumns = useMemo(() => 
    columns.filter((column: any) => {
      if ('accessorKey' in column) {
        return visibleColumns.includes(column.accessorKey as string);
      }
      return true; // Always include action columns
    }),
    [columns, visibleColumns]
  );

  return (
    <>
      <DataTable
        data={members}
        columns={filteredColumns}
        context={context}
        loading={loading}
        pagination={paginationConfig}
        serverSidePagination={true}
        selection={{
          enabled: selectionMode ?? false,
          onSelectionChange,
          getRowId: (row) => row.id,
          enableSelectAll: true,
        }}
        emptyState={{
          title: 'No members found',
          description: 'Add your first member to get started.',
        }}
        loadingState={{
          message: 'Loading members...',
        }}
        showBorder={true}
        hoverEffect={true}
      />

      {/* Studio Assignment Dialog */}
      {selectedMember && (
        <StudiosAssignmentDialog
          open={studiosDialogOpen}
          onClose={() => setStudiosDialogOpen(false)}
          studios={studios}
          assignedStudioIds={selectedMember.studioIds}
          onUpdate={canEdit ? handleUpdateStudios : undefined}
          userName={`${selectedMember.firstName} ${selectedMember.lastName}`}
          readOnly={!canEdit}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {memberToDelete && (
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Member</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete {memberToDelete.firstName} {memberToDelete.lastName}?
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
});

/**
 * Key Benefits of Using DataTable:
 * 
 * 1. **Reusability**: Same component can be used for Members, Users, Staff, etc.
 * 2. **Less Boilerplate**: ~50% less code compared to custom table implementation
 * 3. **Standardization**: Consistent UX across all tables in the app
 * 4. **Maintainability**: Bug fixes and features added once benefit all tables
 * 5. **Flexibility**: Easy to customize with props and callbacks
 * 6. **Type Safety**: Full TypeScript support with generics
 * 7. **Context Integration**: Clean separation of data management and presentation
 * 8. **Server-Side Support**: Built-in support for backend pagination
 * 
 * Migration Steps:
 * 1. Wrap your context operations in DataTableContext interface
 * 2. Convert pagination state to PaginationConfig
 * 3. Pass columns and data to DataTable
 * 4. Keep custom dialogs outside DataTable (StudiosDialog, DeleteDialog, etc.)
 * 5. Test thoroughly and adjust as needed
 */

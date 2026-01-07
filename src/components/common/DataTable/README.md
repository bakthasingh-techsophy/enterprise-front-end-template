# DataTable Component

A highly reusable, framework-agnostic data table component built on TanStack Table with extensive customization options.

## Features

- ✅ **Fully Type-Safe** - Complete TypeScript support
- ✅ **Flexible Pagination** - Multiple variants and custom components
- ✅ **Row Selection** - Single or multi-select with callbacks
- ✅ **Sorting & Filtering** - Built-in support
- ✅ **Server-Side Operations** - Support for backend pagination
- ✅ **Loading & Empty States** - Customizable states
- ✅ **Context Integration** - Easy integration with React Context
- ✅ **Accessible** - ARIA support out of the box
- ✅ **Customizable** - Extensive styling and behavior options

## Basic Usage

```tsx
import { DataTable } from '@/components/common/DataTable';
import { ColumnDef } from '@tanstack/react-table';

interface User {
  id: string;
  name: string;
  email: string;
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
];

function MyTable() {
  const [data, setData] = useState<User[]>([]);
  
  return (
    <DataTable
      data={data}
      columns={columns}
      loading={false}
    />
  );
}
```

## With Pagination

```tsx
<DataTable
  data={users}
  columns={columns}
  pagination={{
    pageIndex: 0,
    pageSize: 10,
    totalPages: 5,
    canNextPage: true,
    onPageChange: (page) => setPageIndex(page),
    onPageSizeChange: (size) => setPageSize(size),
  }}
/>
```

## With Context Integration

```tsx
const context: DataTableContext<User> = {
  data: users,
  loading: isLoading,
  error: error,
  refresh: refreshUsers,
  create: createUser,
  update: updateUser,
  delete: deleteUser,
};

<DataTable
  data={users}
  columns={columns}
  context={context}
  pagination={paginationConfig}
/>
```

## With Row Selection

```tsx
<DataTable
  data={users}
  columns={columns}
  selection={{
    enabled: true,
    onSelectionChange: (selectedIds) => {
      console.log('Selected:', selectedIds);
    },
    getRowId: (row) => row.id,
    enableSelectAll: true,
  }}
/>
```

## Server-Side Pagination

```tsx
<DataTable
  data={users}
  columns={columns}
  serverSidePagination={true}
  pagination={{
    pageIndex: currentPage,
    pageSize: pageSize,
    totalPages: totalPages,
    canNextPage: currentPage < totalPages - 1,
    onPageChange: async (page) => {
      await fetchUsers(page, pageSize);
    },
    onPageSizeChange: async (size) => {
      await fetchUsers(0, size);
    },
  }}
/>
```

## Custom Empty State

```tsx
<DataTable
  data={users}
  columns={columns}
  emptyState={{
    title: 'No users found',
    description: 'Get started by adding your first user',
    icon: <UserIcon />,
    action: {
      label: 'Add User',
      onClick: () => setShowAddDialog(true),
    },
  }}
/>
```

## Custom Loading State

```tsx
<DataTable
  data={users}
  columns={columns}
  loading={isLoading}
  loadingState={{
    message: 'Fetching users...',
    // or custom render
    render: () => <CustomLoader />,
  }}
/>
```

## Styling Options

```tsx
<DataTable
  data={users}
  columns={columns}
  showBorder={true}
  stripedRows={true}
  hoverEffect={true}
  dense={true}
  className="my-custom-table"
/>
```

## With Custom Pagination Component

```tsx
function MyCustomPagination({ pageIndex, pageSize, onPageChange }: CustomPaginationProps) {
  return (
    <div className="custom-pagination">
      {/* Your custom pagination UI */}
    </div>
  );
}

<DataTable
  data={users}
  columns={columns}
  pagination={paginationConfig}
  customPaginationComponent={MyCustomPagination}
/>
```

## Using Ref for Imperative Actions

```tsx
function MyTable() {
  const tableRef = useRef<DataTableRef>(null);
  
  const handleRefresh = () => {
    tableRef.current?.refresh();
  };
  
  const handleClearSelection = () => {
    tableRef.current?.clearSelection();
  };
  
  return (
    <>
      <button onClick={handleRefresh}>Refresh</button>
      <button onClick={handleClearSelection}>Clear Selection</button>
      
      <DataTable
        ref={tableRef}
        data={users}
        columns={columns}
        context={context}
      />
    </>
  );
}
```

## Props API

### DataTableProps<TData, TFilters>

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `TData[]` | required | Array of data to display |
| `columns` | `ColumnDef<TData>[]` | required | TanStack Table column definitions |
| `context` | `DataTableContext<TData>` | - | Context for CRUD operations |
| `loading` | `boolean` | `false` | Loading state |
| `error` | `string \| null` | `null` | Error message |
| `pagination` | `PaginationConfig` | - | Pagination configuration |
| `paginationVariant` | `PaginationVariant` | `'default'` | Pagination style variant |
| `serverSidePagination` | `boolean` | `false` | Enable server-side pagination |
| `enableSorting` | `boolean` | `true` | Enable column sorting |
| `enableFiltering` | `boolean` | `true` | Enable column filtering |
| `enableColumnVisibility` | `boolean` | `true` | Enable column visibility toggle |
| `selection` | `SelectionConfig<TData>` | - | Row selection configuration |
| `emptyState` | `EmptyStateConfig` | - | Empty state customization |
| `loadingState` | `LoadingStateConfig` | - | Loading state customization |
| `className` | `string` | - | Additional CSS classes |
| `showBorder` | `boolean` | `true` | Show table border |
| `stripedRows` | `boolean` | `false` | Alternate row colors |
| `hoverEffect` | `boolean` | `true` | Row hover effect |
| `dense` | `boolean` | `false` | Compact row height |
| `onRowClick` | `(row: TData) => void` | - | Row click handler |
| `onRowDoubleClick` | `(row: TData) => void` | - | Row double-click handler |

## Migration Guide

### From MembersTable to DataTable

**Before:**
```tsx
<MembersTable
  searchTerm={searchTerm}
  activeFilters={filters}
  selectedStudioScope={studioId}
  visibleColumns={columns}
  onView={handleView}
  onEdit={handleEdit}
  canEdit={true}
  canDelete={true}
/>
```

**After:**
```tsx
<DataTable
  data={members}
  columns={memberColumns}
  context={membersContext}
  pagination={{
    pageIndex,
    pageSize,
    onPageChange: setPageIndex,
    onPageSizeChange: setPageSize,
  }}
  selection={{
    enabled: selectionMode,
    onSelectionChange: handleSelectionChange,
  }}
/>
```

## Best Practices

1. **Use Context Pattern** - Wrap your CRUD operations in a context for clean integration
2. **Memoize Columns** - Use `useMemo` for column definitions to avoid re-renders
3. **Server-Side for Large Data** - Enable `serverSidePagination` for datasets > 1000 items
4. **Type Safety** - Always provide generic types for full TypeScript support
5. **Accessibility** - Provide `ariaLabel` and `ariaDescription` for screen readers

## Examples

See the following files for real-world usage examples:
- `src/modules/members/MembersTable.tsx` - Basic usage
- `src/modules/people/AllUsersTable.tsx` - With selection
- `src/modules/staff/StaffTable.tsx` - With custom actions
- `src/modules/memberships/components/FeatureTable.tsx` - With inline editing

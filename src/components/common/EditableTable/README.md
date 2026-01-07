# EditableTable Component

A highly reusable, feature-rich table component with inline editing, add row, and delete functionality. Perfect for managing any tabular data with CRUD operations.

## Features

✅ **Inline Editing** - Edit rows directly in the table with Enter/Esc keyboard shortcuts  
✅ **Add New Rows** - Add mode with validation and keyboard support  
✅ **Delete Confirmation** - Built-in confirmation dialog  
✅ **Field Validation** - Required fields + custom validation functions  
✅ **Sortable Columns** - TanStack Table sorting support  
✅ **Pagination** - Integrated pagination component  
✅ **Custom Rendering** - Custom edit mode rendering per column  
✅ **Row Actions** - Custom action buttons per row  
✅ **TypeScript** - Full type safety  
✅ **Keyboard Shortcuts** - Enter to save, Esc to cancel  
✅ **Error Handling** - Field-level error display  

## Installation

```tsx
import { EditableTable, EditableColumn, RowAction } from '@/components/common/EditableTable';
```

## Basic Usage

```tsx
interface Feature {
  id: string;
  name: string;
  description: string;
}

function FeaturesPage() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const columns: EditableColumn<Feature>[] = [
    {
      key: 'name',
      label: 'Feature Name',
      required: true,
      placeholder: 'Enter name...',
      columnDef: {
        accessorKey: 'name',
        header: 'Name',
      },
    },
    {
      key: 'description',
      label: 'Description',
      columnDef: {
        accessorKey: 'description',
        header: 'Description',
      },
    },
  ];

  return (
    <div>
      <Button onClick={() => setIsAdding(true)}>Add Feature</Button>
      
      <EditableTable
        data={features}
        columns={columns}
        enableEdit
        enableDelete
        isAdding={isAdding}
        onUpdate={async (id, data) => {
          await api.updateFeature(id, data);
          // Refresh data
        }}
        onCreate={async (data) => {
          await api.createFeature(data);
          setIsAdding(false);
          // Refresh data
        }}
        onDelete={async (id) => {
          await api.deleteFeature(id);
          // Refresh data
        }}
        onCancelAdd={() => setIsAdding(false)}
      />
    </div>
  );
}
```

## API Reference

### EditableTableProps<TData>

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `TData[]` | **required** | Array of data items (must have `id` field) |
| `columns` | `EditableColumn<TData>[]` | **required** | Column configurations |
| `loading` | `boolean` | `false` | Show loading state |
| `emptyMessage` | `string` | `'No data found'` | Message when table is empty |
| `enableEdit` | `boolean` | `true` | Enable inline row editing |
| `enableDelete` | `boolean` | `true` | Enable row deletion |
| `enableAdd` | `boolean` | `true` | Enable add new row |
| `isAdding` | `boolean` | `false` | Is currently in "add mode" |
| `customActions` | `RowAction<TData>[]` | `[]` | Additional custom action buttons |
| `onUpdate` | `(id, data) => Promise<void>` | - | Update handler |
| `onCreate` | `(data) => Promise<void>` | - | Create handler |
| `onDelete` | `(id) => Promise<void>` | - | Delete handler |
| `onCancelAdd` | `() => void` | - | Cancel add mode handler |
| `deleteDialogTitle` | `string` | `'Delete Item'` | Delete confirmation title |
| `deleteDialogDescription` | `(row) => ReactNode` | - | Custom delete message |
| `pageIndex` | `number` | `0` | Current page index |
| `pageSize` | `number` | `10` | Page size |
| `totalPages` | `number` | - | Total pages (calculated if not provided) |
| `totalItems` | `number` | - | Total number of items (for display) |
| `onPageChange` | `(page) => void` | - | Page change handler |
| `onPageSizeChange` | `(size) => void` | - | Page size change handler |
| `pageSizeOptions` | `number[]` | `[5, 10, 25, 50, 100]` | Available page size options |
| `paginationVariant` | `'default' \| 'compact' \| 'simple' \| 'numbered' \| 'custom'` | `'default'` | Pagination style variant |
| `fixedPagination` | `boolean` | `false` | Fix pagination at bottom of viewport |
| `customPaginationComponent` | `React.ComponentType<any>` | - | Custom pagination component |
| `serverSidePagination` | `boolean` | `false` | Enable server-side pagination |
| `className` | `string` | - | Custom class for container |
| `rowClassName` | `string \| (row) => string` | - | Custom class for rows |
| `addRowClassName` | `string` | `'bg-muted/20'` | Add row background |

### EditableColumn<TData>

| Property | Type | Description |
|----------|------|-------------|
| `key` | `string` | Unique field identifier |
| `label` | `string` | Column display label |
| `columnDef` | `Omit<ColumnDef<TData>, 'id'>` | TanStack Table column definition |
| `required` | `boolean` | Is field required? |
| `placeholder` | `string` | Input placeholder text |
| `validate` | `(value, allData) => string \| undefined` | Custom validation function |
| `renderEdit` | `(value, onChange, onKeyDown, hasError) => ReactNode` | Custom edit mode renderer |

### RowAction<TData>

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique action identifier |
| `icon` | `React.ComponentType` | Icon component |
| `title` | `string` | Tooltip text |
| `onClick` | `(row) => void` | Click handler |
| `isVisible` | `(row) => boolean` | Conditional visibility |
| `className` | `string` | Custom button class |

## Advanced Examples

### With Sortable Columns

```tsx
import { ArrowUpDown } from 'lucide-react';

const columns: EditableColumn<Product>[] = [
  {
    key: 'name',
    label: 'Product Name',
    required: true,
    columnDef: {
      accessorKey: 'name',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
  },
  {
    key: 'price',
    label: 'Price',
    required: true,
    validate: (value) => {
      const num = parseFloat(value);
      if (isNaN(num) || num <= 0) {
        return 'Price must be a positive number';
      }
    },
    columnDef: {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => `$${row.original.price.toFixed(2)}`,
    },
  },
];
```

### With Custom Edit Rendering

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const columns: EditableColumn<Task>[] = [
  {
    key: 'status',
    label: 'Status',
    required: true,
    renderEdit: (value, onChange, onKeyDown, hasError) => (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={cn('h-8', hasError && 'border-red-500')}>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>
    ),
    columnDef: {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span className={cn(
          'px-2 py-1 rounded text-xs font-medium',
          row.original.status === 'completed' && 'bg-green-100 text-green-800',
          row.original.status === 'in-progress' && 'bg-blue-100 text-blue-800',
          row.original.status === 'pending' && 'bg-gray-100 text-gray-800',
        )}>
          {row.original.status}
        </span>
      ),
    },
  },
];
```

### With Custom Actions

```tsx
import { Copy, Eye } from 'lucide-react';

const customActions: RowAction<User>[] = [
  {
    id: 'view',
    icon: Eye,
    title: 'View Details',
    onClick: (user) => {
      navigate(`/users/${user.id}`);
    },
  },
  {
    id: 'duplicate',
    icon: Copy,
    title: 'Duplicate',
    onClick: async (user) => {
      await api.duplicateUser(user.id);
      refresh();
    },
    isVisible: (user) => user.role !== 'admin', // Hide for admins
  },
];

<EditableTable
  data={users}
  columns={columns}
  customActions={customActions}
  // ... other props
/>
```

### With Custom Delete Message

```tsx
<EditableTable
  data={users}
  columns={columns}
  deleteDialogTitle="Delete User"
  deleteDialogDescription={(user) => (
    <>
      Are you sure you want to delete{' '}
      <span className="font-semibold">{user.name}</span> (
      {user.email})? This will permanently remove their account and all
      associated data. This action cannot be undone.
    </>
  )}
  onDelete={async (id) => {
    await api.deleteUser(id);
  }}
/>
```

### With Pagination

```tsx
function UsersTable() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const { data, totalPages } = useUsers({ page: pageIndex, size: pageSize });

  return (
    <EditableTable
      data={data}
      columns={columns}
      pageIndex={pageIndex}
      pageSize={pageSize}
      totalPages={totalPages}
      onPageChange={setPageIndex}
      onPageSizeChange={setPageSize}
      // ... other props
    />
  );
}
```

### With Different Pagination Variants

```tsx
// Compact pagination (minimal UI)
<EditableTable
  data={data}
  columns={columns}
  paginationVariant="compact"
  pageIndex={pageIndex}
  pageSize={pageSize}
  onPageChange={setPageIndex}
  onPageSizeChange={setPageSize}
/>

// Simple pagination (just prev/next)
<EditableTable
  data={data}
  columns={columns}
  paginationVariant="simple"
  pageIndex={pageIndex}
  pageSize={pageSize}
  onPageChange={setPageIndex}
/>

// Numbered pagination (with page numbers)
<EditableTable
  data={data}
  columns={columns}
  paginationVariant="numbered"
  pageIndex={pageIndex}
  pageSize={pageSize}
  totalPages={20}
  onPageChange={setPageIndex}
/>
```

### With Fixed Pagination

```tsx
// Pagination fixed at bottom of viewport (great for long tables)
<EditableTable
  data={data}
  columns={columns}
  fixedPagination={true}
  pageIndex={pageIndex}
  pageSize={pageSize}
  onPageChange={setPageIndex}
  onPageSizeChange={setPageSize}
/>
```

### With Custom Pagination Component

```tsx
// Use your own custom pagination
const MyCustomPagination = ({ pageIndex, totalPages, onPageChange }) => (
  <div className="flex justify-between p-4">
    <button onClick={() => onPageChange(pageIndex - 1)}>Previous</button>
    <span>Page {pageIndex + 1} of {totalPages}</span>
    <button onClick={() => onPageChange(pageIndex + 1)}>Next</button>
  </div>
);

<EditableTable
  data={data}
  columns={columns}
  customPaginationComponent={MyCustomPagination}
  pageIndex={pageIndex}
  pageSize={pageSize}
  totalPages={totalPages}
  onPageChange={setPageIndex}
/>
```

### With Server-Side Pagination

```tsx
function ServerPaginatedTable() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  
  // Fetch from server with pagination params
  const { data, totalPages, totalItems } = useServerData({ 
    page: pageIndex, 
    size: pageSize 
  });

  return (
    <EditableTable
      data={data}
      columns={columns}
      serverSidePagination={true}
      pageIndex={pageIndex}
      pageSize={pageSize}
      totalPages={totalPages}
      totalItems={totalItems}
      onPageChange={setPageIndex}
      onPageSizeChange={setPageSize}
    />
  );
}
```

### With Custom Row Styling

```tsx
<EditableTable
  data={orders}
  columns={columns}
  rowClassName={(order) =>
    cn(
      order.isPaid && 'bg-green-50',
      order.isOverdue && 'bg-red-50',
      order.isPending && 'bg-yellow-50'
    )
  }
/>
```

## Validation

The component supports two types of validation:

### 1. Required Fields

```tsx
{
  key: 'email',
  label: 'Email',
  required: true, // Will show error if empty
  columnDef: { ... }
}
```

### 2. Custom Validation

```tsx
{
  key: 'email',
  label: 'Email',
  required: true,
  validate: (value, allData) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Invalid email format';
    }
  },
  columnDef: { ... }
}
```

## Keyboard Shortcuts

- **Enter** - Save current edit/add operation
- **Escape** - Cancel current edit/add operation

## Error Handling

The component automatically handles errors:

1. **Validation Errors** - Shows red border on invalid fields
2. **API Errors** - Catches promise rejections and logs to console
3. **Field-Level Errors** - Displays validation messages inline
4. **General Errors** - Can show general error messages

## TypeScript Support

Fully typed with generics:

```tsx
interface MyData {
  id: string;
  name: string;
  age: number;
}

const columns: EditableColumn<MyData>[] = [...];

<EditableTable<MyData>
  data={myData}
  columns={columns}
  // All props are type-checked
/>
```

## Real-World Example: FeatureTable

Here's how the original FeatureTable was refactored:

**Before (506 lines):**
```tsx
export function FeatureTable({ features, ... }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState(...);
  const [addData, setAddData] = useState(...);
  // 300+ lines of edit/add/delete logic
  // Manual keyboard handling
  // Manual validation
  // Complex state management
}
```

**After (77 lines - 85% reduction):**
```tsx
export function FeatureTable({ features, ... }) {
  const columns: EditableColumn<MembershipFeature>[] = [
    {
      key: 'name',
      label: 'Feature Name',
      required: true,
      columnDef: { ... }
    },
    {
      key: 'description',
      label: 'Description',
      columnDef: { ... }
    }
  ];

  return (
    <EditableTable
      data={features}
      columns={columns}
      onUpdate={onUpdate}
      onCreate={onCreate}
      onDelete={onDelete}
      // All functionality handled by generic component
    />
  );
}
```

## Benefits

✅ **DRY** - Write once, use everywhere  
✅ **Consistent** - Same behavior across all tables  
✅ **Maintainable** - One place to fix bugs  
✅ **Flexible** - Highly customizable via props  
✅ **Type Safe** - Full TypeScript support  
✅ **Accessible** - Keyboard navigation built-in  
✅ **Validated** - Built-in validation system  

## Migration Guide

### From Custom Table to EditableTable

1. **Extract column definitions:**
   ```tsx
   // Before: TanStack columns array
   const columns = useMemo<ColumnDef<T>[]>(() => [...], []);
   
   // After: EditableColumn array
   const columns: EditableColumn<T>[] = [
     {
       key: 'fieldName',
       label: 'Field Label',
       required: true,
       columnDef: { accessorKey: 'fieldName', header: 'Field Label' }
     }
   ];
   ```

2. **Remove state management:**
   ```tsx
   // Delete these (handled by EditableTable):
   const [editingId, setEditingId] = useState(...);
   const [editingData, setEditingData] = useState(...);
   const [addData, setAddData] = useState(...);
   const [errors, setErrors] = useState(...);
   ```

3. **Replace render with EditableTable:**
   ```tsx
   return (
     <EditableTable
       data={data}
       columns={columns}
       onUpdate={handleUpdate}
       onCreate={handleCreate}
       onDelete={handleDelete}
     />
   );
   ```

## Best Practices

1. **Use memoization** for column definitions:
   ```tsx
   const columns = useMemo<EditableColumn<T>[]>(() => [...], []);
   ```

2. **Handle API errors** in handlers:
   ```tsx
   onUpdate={async (id, data) => {
     try {
       await api.update(id, data);
       toast.success('Updated successfully');
     } catch (error) {
       toast.error('Failed to update');
       throw error; // Re-throw to let EditableTable handle UI
     }
   }}
   ```

3. **Validate complex fields**:
   ```tsx
   {
     key: 'startDate',
     validate: (value, allData) => {
       if (new Date(value) > new Date(allData.endDate)) {
         return 'Start date must be before end date';
       }
     }
   }
   ```

4. **Use custom rendering** for special inputs:
   ```tsx
   renderEdit: (value, onChange, onKeyDown, hasError) => (
     <DatePicker
       value={value}
       onChange={onChange}
       className={cn(hasError && 'border-red-500')}
     />
   )
   ```

## Support

For issues or questions, check:
- Implementation: `src/components/common/EditableTable/EditableTable.tsx`
- Example usage: `src/modules/memberships/components/FeatureTable.tsx`
- TypeScript types: See interface definitions in main file

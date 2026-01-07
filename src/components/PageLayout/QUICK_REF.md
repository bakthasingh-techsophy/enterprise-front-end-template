# PageLayout Component - Quick Reference

## Installation

```tsx
import { PageLayout, EmptyState } from '@/components/PageLayout';
```

## Basic Usage

```tsx
<PageLayout
  toolbar={<GenericToolbar {...toolbarProps} />}
>
  <YourContent />
</PageLayout>
```

## Common Patterns

### With Empty State

```tsx
<PageLayout
  toolbar={<Toolbar />}
  showEmptyState={!hasData}
  emptyState={
    <EmptyState
      title="No data available"
      description="Get started by adding items"
    />
  }
>
  <Content />
</PageLayout>
```

### With Fixed Pagination

```tsx
<PageLayout
  toolbar={<Toolbar />}
  bottomPadding="pb-20"  // Space for fixed pagination
>
  <Table />
</PageLayout>
```

### Without Scroll-to-Top

```tsx
<PageLayout
  toolbar={<Toolbar />}
  showScrollTop={false}
>
  <Content />
</PageLayout>
```

### Custom Scroll Threshold

```tsx
<PageLayout
  toolbar={<Toolbar />}
  scrollTopThreshold={300}  // Show button after 300px
  onScrollTop={() => console.log('Scrolled to top')}
>
  <Content />
</PageLayout>
```

### No Toolbar

```tsx
<PageLayout>
  <SimpleContent />
</PageLayout>
```

## Props Reference

### PageLayout

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `toolbar` | `ReactNode` | `undefined` | Toolbar component |
| `children` | `ReactNode` | **required** | Main content |
| `contentClassName` | `string` | `undefined` | Additional CSS classes |
| `showScrollTop` | `boolean` | `true` | Show scroll-to-top button |
| `scrollTopThreshold` | `number` | `400` | Scroll pixels to show button |
| `emptyState` | `ReactNode` | `undefined` | Empty state component |
| `showEmptyState` | `boolean` | `false` | Show empty state flag |
| `onScrollTop` | `() => void` | `undefined` | Scroll callback |
| `bottomPadding` | `string` | `'pb-20'` | Bottom padding class |

### EmptyState

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ReactNode` | `undefined` | Icon to display |
| `title` | `string` | **required** | Title text |
| `description` | `string` | `undefined` | Description text |
| `action` | `ReactNode` | `undefined` | Action button |
| `className` | `string` | `undefined` | Additional CSS classes |

## Real-World Examples

### Members Page

```tsx
export function Members() {
  const { selectedStudioScope } = useLayoutContext();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <PageLayout
        toolbar={
          <GenericToolbar
            showSearch={true}
            searchValue={searchTerm}
            onSearchChange={setSearchTerm}
            showFilters={true}
            // ... other props
          />
        }
        showEmptyState={!selectedStudioScope}
        emptyState={
          <EmptyState
            title="Please select a studio"
            description="You need to select a studio from the studio selector to view members."
          />
        }
      >
        <AllUsersProvider>
          <MembersProvider>
            <MembersTable />
          </MembersProvider>
        </AllUsersProvider>
      </PageLayout>

      {/* Modals outside PageLayout */}
      <AllUsersProvider>
        <CommonViewUserModal {...} />
      </AllUsersProvider>
    </>
  );
}
```

### Staff Page

```tsx
export function Staff() {
  return (
    <PageLayout
      toolbar={<GenericToolbar {...toolbarProps} />}
      showEmptyState={!selectedStudioScope}
      emptyState={
        <EmptyState
          title="Please select a studio"
          description="You need to select a studio from the studio selector to view staff."
        />
      }
    >
      <AllUsersProvider>
        <StaffProvider>
          <StaffTable />
        </StaffProvider>
      </AllUsersProvider>
    </PageLayout>
  );
}
```

### Reports Page (Future)

```tsx
export function Reports() {
  return (
    <PageLayout
      toolbar={
        <GenericToolbar
          showSearch={false}
          showFilters={true}
          showExport={true}
        />
      }
      showEmptyState={!hasReports}
      emptyState={
        <EmptyState
          icon={<BarChart3 className="h-12 w-12" />}
          title="No reports available"
          description="Generate your first report"
          action={<Button>Generate Report</Button>}
        />
      }
    >
      <ReportsView />
    </PageLayout>
  );
}
```

## Tips & Best Practices

### ✅ DO

- Use `EmptyState` for consistent empty states
- Set `bottomPadding="pb-20"` for fixed pagination
- Place modals outside `PageLayout`
- Use descriptive empty state messages
- Pass toolbar as prop, don't hardcode

### ❌ DON'T

- Don't hardcode empty states outside `EmptyState`
- Don't duplicate scroll-to-top logic
- Don't forget bottom padding for fixed elements
- Don't place modals inside `PageLayout` children

## Migration Pattern

```tsx
// Before
export function MyPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="bg-background pb-4 border-b">
        <Toolbar />
      </div>
      <div className="mt-4 pb-20">
        <Content />
      </div>
      {showScrollTop && <Button onClick={scrollToTop}>↑</Button>}
    </div>
  );
}

// After
export function MyPage() {
  return (
    <PageLayout
      toolbar={<Toolbar />}
      showEmptyState={!data}
      emptyState={<EmptyState title="No data" />}
    >
      <Content />
    </PageLayout>
  );
}
```

## Components Structure

```
src/components/PageLayout/
├── PageLayout.tsx      # Main layout component
├── EmptyState.tsx      # Empty state component
├── index.tsx          # Exports
└── README.md          # Full documentation
```

## Files to Check

- **Docs**: `src/components/PageLayout/README.md`
- **Migration**: `PAGE_LAYOUT_MIGRATION.md`
- **Examples**: `Members.tsx`, `Staff.tsx`, `AllUsers.tsx`

## Need Help?

1. Check `README.md` for comprehensive docs
2. Look at migrated examples (Members, Staff, AllUsers)
3. Review `PAGE_LAYOUT_MIGRATION.md` for before/after comparison

---

**Created**: December 21, 2025  
**Status**: ✅ Production Ready  
**Pages Using**: Members, Staff, AllUsers

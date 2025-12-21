import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface EmptyStateProps {
  /** Icon to display */
  icon?: ReactNode;
  /** Title text */
  title: string;
  /** Description text */
  description?: string;
  /** Action button or component */
  action?: ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * EmptyState - A reusable component for displaying empty states
 * 
 * @example
 * ```tsx
 * <EmptyState
 *   icon={<Building2 className="h-12 w-12 text-muted-foreground" />}
 *   title="No studio selected"
 *   description="Please select a studio from the studio selector"
 *   action={<Button onClick={openStudioSelector}>Select Studio</Button>}
 * />
 * ```
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center h-64 space-y-4',
      className
    )}>
      <div className="text-center space-y-4">
        {icon && (
          <div className="flex justify-center">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-lg font-medium text-muted-foreground">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-2">
              {description}
            </p>
          )}
        </div>
        {action && (
          <div className="pt-2">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}

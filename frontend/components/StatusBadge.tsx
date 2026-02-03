import { Status } from '@/lib/validation';

interface StatusBadgeProps {
    status: Status;
}

export function StatusBadge({ status }: StatusBadgeProps) {
    // Convert camelCase to spaced words and capitalize
    const formatStatus = (status: string) => {
        return status
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
    };

    return (
        <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
            {formatStatus(status)}
        </span>
    );
} 
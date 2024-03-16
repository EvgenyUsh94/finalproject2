export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("en-us",
        {
            year: "numeric",
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        })
}
export function stringToHexColor(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        // Generate a hash code from the string
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";
    for (let i = 0; i < 3; i++) {
        // Extract three 8-bit values for R, G, and B
        const value = (hash >> (i * 8)) & 0xff;
        color += value.toString(16).padStart(2, "0");
    }
    return color;
}

export function formatDateInput(date: Date): string {
    return `${date.getUTCFullYear()}-${("0" + (date.getUTCMonth() + 1)).slice(-2)}-${("0" + date.getUTCDate()).slice(-2)}`;
}

export function formatDate(date: Date): string {
    return `${("0" + (date.getUTCMonth() + 1)).slice(-2)}/${("0" + date.getUTCDate()).slice(-2)}/${date.getUTCFullYear()}`;
}
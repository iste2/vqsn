export function getTextBetween(text: string, startStr: string, endStr: string): string {
    const startIndex = text.indexOf(startStr);
    if (startIndex === -1) return '';

    const startFromIndex = startIndex + startStr.length;
    const endIndex = text.indexOf(endStr, startFromIndex);
    if (endIndex === -1) return '';

    return text.slice(startFromIndex, endIndex);
}
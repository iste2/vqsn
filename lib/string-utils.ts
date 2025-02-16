export function getTextBetween(text: string, startStr: string, endStr: string): string {
    const startIndex = text.indexOf(startStr);
    if (startIndex === -1) return '';

    const startFromIndex = startIndex + startStr.length;
    const endIndex = text.indexOf(endStr, startFromIndex);
    if (endIndex === -1) return '';

    return text.slice(startFromIndex, endIndex);
}

export function getAllSubstringsBetween(text: string, startPattern: RegExp, endPattern: RegExp): string[] {
    const results: string[] = [];
    let currentIndex = 0;

    while (currentIndex < text.length) {
        // Search for start pattern from current index
        const remainingText = text.slice(currentIndex);
        const startMatch = remainingText.match(startPattern);

        if (!startMatch) break;

        // Calculate absolute start index
        const startIndex = currentIndex + startMatch.index! + startMatch[0].length;

        // Search for end pattern after start match
        const textAfterStart = text.slice(startIndex);
        const endMatch = textAfterStart.match(endPattern);

        if (!endMatch) break;

        // Extract the substring and add to results
        const substring = textAfterStart.slice(0, endMatch.index);
        results.push(substring);

        // Update current index to continue search
        currentIndex = startIndex + endMatch.index! + endMatch[0].length;
    }

    return results;
}
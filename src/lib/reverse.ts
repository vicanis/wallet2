// sort list in reverse order
export default function SortReverse<T = any>(source: T[]): T[] {
    for (let i = 0; i < source.length / 2; i++) {
        const temp = source[i];
        source[i] = source[source.length - i - 1];
        source[source.length - i - 1] = temp;
    }

    return source;
}

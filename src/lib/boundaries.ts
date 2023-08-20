import dayjs from "./dayjs";

export default function GenerateDateBoundaries(count: number = 14): Date[] {
    const boundaries: Date[] = [];

    for (let i = count - 2; i >= -2; i--) {
        boundaries.push(dayjs().startOf("day").subtract(i, "day").toDate());
    }

    return boundaries;
}

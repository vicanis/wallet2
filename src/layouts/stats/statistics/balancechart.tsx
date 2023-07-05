import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import dayjs from "../../../lib/dayjs";
import { faker } from "@faker-js/faker";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
);

const options = {
    responsive: true,
};

const data: {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor?: string;
        backgroundColor?: string;
    }[];
} = {
    labels: [],
    datasets: [
        {
            label: "income",
            data: [],
            borderColor: "rgb(114, 184, 5)",
            backgroundColor: "rgba(114, 184, 5, 0.5)",
        },
        {
            label: "expense",
            data: [],
            borderColor: "rgb(232, 83, 56)",
            backgroundColor: "rgba(232, 83, 56, 0.5)",
        },
    ],
};

export default function BalanceChart() {
    const labels: string[] = [];

    let cursor = dayjs().startOf("year");

    for (let i = 0; i < 12; i++) {
        labels.push(cursor.format("MMM"));
        cursor = cursor.add(1, "month");
    }

    data.labels = labels;

    for (let i = 0; i < data.datasets.length; i++) {
        data.datasets[i].data = labels.map(() =>
            faker.number.float({ min: 0, max: 100000 })
        );
    }

    return (
        <div>
            <Line options={options} data={data} />
        </div>
    );
}

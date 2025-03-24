import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useMonthlyBarChart, format } from '../utils/actions'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);



export default function StackedBarChart({ expenses }) {

    const { monthlyExpenses, months } = useMonthlyBarChart(expenses)

    const data = {
        labels: months,
        datasets: [
            {
                label: 'Total Expense',
                data: monthlyExpenses,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            },

        ],
    };

    const options = {
        indexAxis: "y",
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Horizontal Stacked Bar Chart" },
            tooltip: {
                callbacks: {
                    label: (tooltip_value) => format(tooltip_value.raw, true)
                }
            }
        },
        scales: {
            x: {
                stacked: true,
                ticks: {
                    callback: (value) => format(value)
                }
            },
            y: { stacked: true }
        },

    };

    return <div
        style={{
            width: '100%',
            height: '50vh'
        }}
    >
        <Bar data={data} options={options} />
    </div>;
}

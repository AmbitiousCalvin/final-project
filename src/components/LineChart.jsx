import { Line } from "react-chartjs-2";
import { format } from "../utils/actions"
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from "chart.js";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const LineChart = ({ expenses }) => {
    const xLabel = new Date().toLocaleString('default', { month: 'long' });
    const title = `Monthly Report for ${new Date().toLocaleString("en-US", { month: "long" })}`
    const yLabel = `expenses`

    let labels = expenses.map(expense => expense.expenseDate)
    let data = expenses.map(expense => expense.amount)

    // Chart.js data configuration
    const chartData = {
        labels: labels, // X-axis labels
        datasets: [
            {
                label: title,         // The label for the line
                data: data,           // The data points for the line
                fill: false,           // Whether the area under the line should be filled
                borderColor: "#36A2EB", // Line color
                tension: 0.1,         // Line smoothness
                pointRadius: 5,       // Size of points on the line
                pointBackgroundColor: "#36A2EB", // Point color
                borderWidth: 2,       // Width of the line
            },
        ],
    };

    // Chart.js options configuration
    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: title, // Display the title of the chart
            },
            tooltip: {
                mode: "index",
                intersect: false,
                callbacks: {
                    label: (tooltip_value) => format(tooltip_value.raw, true)
                }
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: xLabel,
                },
            },
            y: {
                title: {
                    display: true,
                    text: yLabel,
                },
                ticks: {
                    beginAtZero: true,
                    callback: (value) => format(value)
                },
            },
        },
    };

    return (
        <div style={{ position: "relative", width: "100vw", height: "60vh", margin: "auto" }}>
            <div style={{ display: "flex", gap: "1rem" }}>
                <h3>{title}</h3>
            </div>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
};

export default LineChart;

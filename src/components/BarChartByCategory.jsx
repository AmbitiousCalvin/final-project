import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { format } from '../utils/actions'


import { useExpenseAcrossCategoriesByMonth } from '../utils/actions'
// Register necessary chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartByCategories = ({ expenses }) => {

    const current_month = new Date().getMonth() + 1;

    const { categories, dataSet } = useExpenseAcrossCategoriesByMonth(expenses, current_month)


    const data = {
        labels: categories,
        datasets: [
            {
                label: "Expense",
                data: dataSet, // Your data values here
                backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar color
                borderColor: "rgba(75, 192, 192, 1)", // Border color
                borderWidth: 1, // Border width
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    // This callback formats the tooltip as USD currency
                    label: (value) => format(value.raw / 100, true),
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Months", // X-axis title
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Amount", // Y-axis title
                },
                ticks: {
                    beginAtZero: true, // Start Y-axis at zero
                },
            },
        },
    };

    return (
        <div>
            <h2>Monthly Expenses</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChartByCategories;

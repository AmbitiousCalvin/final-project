import { Line } from "react-chartjs-2";
import  { format } from "../utils/actions"
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from "chart.js";
import {useState, useEffect} from 'react'
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);
import { getUserJoinDate } from '../utils/actions'

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]



const LineChart = ({ expenses, user }) => {
    // const current_month = new Date().getMonth() + 1
    const [userDate, setUserDate] = useState([])
    // const [selectedMonth, setSelectedMonth] = useState("")

    const current_month = 12

    const xLabel = new Date().toLocaleString('default', { month: 'long' });
    const title = `Monthly Report for ${new Date().toLocaleString("en-US", { month: "long" })}`
    const yLabel = `expenses`

    let labels = expenses.map(expense => expense.expenseDate)
    let data = expenses.map(expense => expense.amount)

    useEffect(() => {
        async function getDate(){
            let result = await getUserJoinDate(user.uid)
            console.log(result)
            setUserDate(result.split("/"))
            // console.log(getMonthRange(result))
        }

        getDate()
    }, [user])

    if (userDate.length === 0) return <h1>loading ...</h1>

    const dates = {
        month: Number(userDate[0]),
        day: Number(userDate[1]),
        year: Number(userDate[2]),
    }

    let monthsBetween = [dates.month]
    if (current_month - dates.month > 0) {
        let m = current_month - dates.month
        monthsBetween = Array.from({ length: m + 1 }, (_, i) => dates.month + i)
    }

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
            <div style={{display: "flex", gap: "1rem"}}>
                <h3>{title}</h3>
                <select>
                    {monthsBetween.map((month, i) => (
                        <option key={i} value={month}>{months[month - 1]}</option>
                    ))}
                </select>
            </div>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
};

export default LineChart;

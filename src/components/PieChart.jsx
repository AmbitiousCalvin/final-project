import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { format } from '../utils/actions'

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ totalBudget, spentAmount }) => {
    const isOverBudget = spentAmount > totalBudget
    const remainingBudget = parseFloat((totalBudget - spentAmount).toFixed(2));

    const data = {
        labels: ["Spent", "Remaining"],
        datasets: [
            {
                data: [spentAmount, remainingBudget],
                backgroundColor: [
                    isOverBudget ? "#FF0000" : "#FF6384",
                    "#36A2EB",
                ],
                hoverBackgroundColor: [
                    isOverBudget ? "#D50000" : "#FF4569",
                    "#2F88D8",
                ],
            },
        ],
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltip_value) => format(tooltip_value.raw, true)
                }
            },
            legend: {
                display: true, // Show labels in the legend
                position: "top"
            }
        }
    };

    return (
        <>
        <div style={{ position: "relative", width: "30vw", height: "30vw", margin: "auto" }}>
            <h3>Yearly Budget Overview</h3>
            <Pie data={data} options={options} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={infoBoxStyle}>
                    <strong>Total Budget:</strong> {format(totalBudget, true)}
                </div>
                <div style={infoBoxStyle}>
                    <strong>Spent:</strong> {format(spentAmount, true)}
                </div>
                <div style={infoBoxStyle}>
                    <strong>Remaining:</strong> {format(remainingBudget, true)}
                </div>

                {isOverBudget && (
                    <div style={{ ...infoBoxStyle, backgroundColor: "#FFD700", color: "#D80000" }}>
                        <strong>Warning:</strong> You've exceeded your budget!
                    </div>
                )}

            </div>
        </>
    );
};

const infoBoxStyle = {
    backgroundColor: "#f1f1f1",
    padding: "10px 20px",
    marginBottom: "10px",
    borderRadius: "5px",
    fontSize: "14px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

export default PieChart;

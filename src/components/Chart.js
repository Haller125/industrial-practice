import React, {useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    LogarithmicScale
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import ListForChart from "./ListForChart";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    LogarithmicScale
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Line Chart',
        },
    },
};

const Chart = ({ labels, datasets }) => {
    const [selectedDatasets, setSelectedDatasets] = useState([...datasets]);

    console.log(selectedDatasets);

    const handleToggle = (dataset) => {
        if (selectedDatasets.includes(dataset)) {
            setSelectedDatasets(selectedDatasets.filter((d) => d !== dataset));
        } else {
            setSelectedDatasets([...selectedDatasets, dataset]);
        }
    };

    const filteredDatasets = datasets.filter((dataset) =>
        selectedDatasets.includes(dataset)
    );

    return (
        <div>
            <ListForChart
                data={datasets}
                selectedDatasets={selectedDatasets}
                onToggle={handleToggle}
            />
            <Line options={options} data={{ labels, datasets: filteredDatasets }} />
        </div>
    );
};

export default Chart;
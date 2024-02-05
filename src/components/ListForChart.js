import React from 'react';
import {Form} from 'react-bootstrap';
import "./ListForChart.css"

const ListForChart = ({ data, selectedDatasets, onToggle }) => {
    return (
        <Form style={{ height: '300px', overflowY: 'scroll' }}> {/* Scrollable container */}
            {data.map((dataset) => (
                <Form.Check
                    key={dataset.label}
                    id={dataset.label}
                    label={dataset.label}
                    checked={selectedDatasets.includes(dataset)}
                    onChange={() => onToggle(dataset)}
                    style={{
                        display: 'block', // each item on a new line
                        marginBottom: '5px', // space between items
                    }}
                />
            ))}
        </Form>
    );
};

export default ListForChart;
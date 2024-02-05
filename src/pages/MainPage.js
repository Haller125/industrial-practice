import React, {useContext, useState} from 'react';
import {Context} from "../index";
import convertProxyArraysToArrays from "../utils/convertProxyArraysToArrays";
import exponentialSmoothing from "../utils/exponentialSmoothing";
import BlockLine from "../components/BlockLine";
import getRGBObjects from "../utils/getRGBObjects";
import Chart from "../components/Chart";
import "./MainPage.css"

const MainPage = () => {
    const {filesStore} = useContext(Context)

    const files = convertProxyArraysToArrays(filesStore.files);

    const [selectedColumnIndex, setSelectedColumnIndex] = useState(null);
    const [isColumnSelected, setIsColumnSelected] = useState(false);
    const [selectedColumn, setSelectedColumn] = useState(null);
    const [unitedColumns, setUnitedColumns] = useState([]);
    const [isForecastReady, setIsForecastReady] = useState(false);

    const handleColumnSelect = (index) => {
        setSelectedColumnIndex(index);
        setIsColumnSelected(true);
        setSelectedColumn(files[0][1][0][index]);
    };


    const handleExponentialSmoothing = () => {
        let unitedColumns = [];
        for (let i = 1; i < files[0][1].slice(1).length; i++) {
                let arr = []
                arr.push(files[0][1][i][0])
                for (let j = 0; j < files.length; j++) {
                    arr.push(files[j][1][i][selectedColumnIndex]);
                }
                unitedColumns.push(arr);
        }

        unitedColumns = unitedColumns.filter(subarr => {
            return subarr.every(element => {
                return !(element === undefined || element === null || element === "");
            });
        });

        for (let i = 0; i < unitedColumns.length; i++) {
            let arr = [];
            arr.push(unitedColumns[i][0]);
            arr.push(exponentialSmoothing(unitedColumns[i].slice(1)));
            unitedColumns[i].push(exponentialSmoothing(unitedColumns[i].slice(1)));
        }

        setUnitedColumns(unitedColumns);
        setIsForecastReady(true);
    };

    const getRow = () => {
        if (files && files.length > 0 && files[0][1] && files[0][1].length > 0) {
            return files[0][1][0];
        } else {
            return null; // or return a default value, throw an error, etc.
        }
    }

    const getLabels = () => {
        let arr = []
        for (const file of files) {
            arr.push(file[0])
        }
        arr.push('predict')
        return arr
    }


    const getDatasetWithForecast = () => {

        let rgbSet = getRGBObjects(unitedColumns.length)

        return unitedColumns.map((item, i) => ({
            label: item[0], data: item.slice(1), borderColor: `rgb(${rgbSet[i].r}, ${rgbSet[i].g}, ${rgbSet[i].b})`,
            backgroundColor: `rgb(${rgbSet[i].r}, ${rgbSet[i].g}, ${rgbSet[i].b}, 0.5)`
        }))
    }


    return (
        <div>
            {isColumnSelected && <h1 className={'selected-col'}>{selectedColumn}</h1>}
            {filesStore.isLoad && isColumnSelected && <div className="parent-container"><button className={'exp-button'} onClick={handleExponentialSmoothing}>Exponential smoothing</button></div>}
            {filesStore.isLoad && <BlockLine data={getRow()} selectedColumnIndex={selectedColumnIndex} onColumnSelect={handleColumnSelect}/>}
            {isForecastReady && <Chart datasets={getDatasetWithForecast()} labels={getLabels()} />}
        </div>
    );
};

export default MainPage;
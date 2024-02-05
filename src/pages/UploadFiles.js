import React, {useContext, useState} from 'react';
import {Context} from "../index";
import * as XLSX from "xlsx";
import { useNavigate } from 'react-router-dom';
import "./UploadFiles.css"


const UploadFiles = () => {
    const [files, setFiles] = useState([]);
    const {filesStore} = useContext(Context)
    const navigate = useNavigate();

    const handleDrop = (e) => {
        e.preventDefault();

        const newFiles = [];

        for (const file of e.dataTransfer.files) {
            if (file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                newFiles.push(file);
            }
        }


        for (const file of newFiles) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                setFiles((prevFiles) => [...prevFiles, [file.name, [...jsonData]]]);
            };

            reader.readAsArrayBuffer(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDelete = (fileToDelete) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToDelete));
    };

    const handleUpload = () => {
        filesStore.setFiles(files);
        filesStore.setIsLoad(true);
        navigate('/main');
    }

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{
                width: '100%',
                height: '100%',
                border: '2px dashed #007BFF',
                padding: '20px',
                borderRadius: '10px',
                backgroundColor: '#f8f9fa',
                textAlign: 'center',
                color: '#495057',
            }}
        >
            <p>Drop Excel files here (oldest first and documents should have different names) </p>
            <ul>
                {files.map((file) => (
                    <li key={file[0]}>
                        {file[0]}
                        <button onClick={() => handleDelete(file)}>X</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleUpload} >Upload</button>
        </div>
    );
};

export default UploadFiles;
import React from 'react';
import "./BlockLine.css"

const BlockLine = ({ data, selectedColumnIndex,  onColumnSelect }) => {
    return (
        <div className={'block-line'}>
            {data.map((item, index) => (
                <div
                    key={index}
                    style={{
                        backgroundColor: '#adb5bd', // Lighter gray
                        width: '120px',
                        height: '75px',
                        display: 'flex', // Flex to center content
                        justifyContent: 'center', // Center horizontally
                        alignItems: 'center', // Center vertically
                        cursor: 'pointer', // Pointer cursor on hover
                        borderRadius: '5px', // Rounded corners
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow
                        transition: 'transform 0.2s' // Smooth transition for hover effect
                    }}
                    onClick={() => onColumnSelect(index)}
                    className={selectedColumnIndex === index ? 'selected' : ''}
                >
                    {item}
                </div>
            ))}
        </div>
    );
};

export default BlockLine;
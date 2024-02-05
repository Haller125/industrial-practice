function getRgb(num) {
    const red = (num >> 16) & 255;
    const green = (num >> 8) & 255;
    const blue = num & 255;
    return { r: red, g: green, b: blue };
}


function getRandomRgbObjects(n) {
    const result = [];
    while (result.length < n) {
        const num = Math.floor(Math.random() * 16777216); // Generate a random number between 0 and 16777215 (inclusive)
        const rgb = getRgb(num); // Use the getRgb() function from my previous answer
        const isUnique = result.every(obj => {
            return obj.r !== rgb.r || obj.g !== rgb.g || obj.b !== rgb.b;
        });
        if (isUnique) {
            result.push(rgb);
        }
    }
    return result;
}

export default getRandomRgbObjects;
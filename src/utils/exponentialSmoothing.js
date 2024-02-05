function exponentialSmoothing(data, alpha = 1.7) {
    let emaData = []
    emaData[0] = data[0]
    for (let i = 1; i < data.length; i++) {
        let newPoint = (data[i] * alpha) + (emaData[i-1] * (1-alpha))
        emaData.push(newPoint)
    }
    let currentEma = [...emaData].pop()
    return +currentEma
}

export default exponentialSmoothing;
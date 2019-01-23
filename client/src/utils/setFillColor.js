// Based on two colors (high/low) create a gradient using HSL values and 
// seconds remaining to create a polygon's fillColor

export const setFillColor = (secondsRemaing, quizType) => {

    let secondsTotal;

    switch (quizType) {
        case ("north-america"):
            secondsTotal = 600
            break
        case ("south-america"):
            secondsTotal = 300
            break
        case ("europe"):
            secondsTotal = 480
            break
        case ("africa"):
            secondsTotal = 600
            break
        case ("asia"):
            secondsTotal = 600
            break
        case ("oceania"):
            secondsTotal = 480
            break
        default:
            secondsTotal = 900
    }

    var low = [0, 80, 60];
    var high = [90, 83, 50];

    var delta = secondsRemaing / secondsTotal

    var color = [];
    for (var i = 0; i < 3; i++) {
        color[i] = (high[i] - low[i]) * delta + low[i];
    }

    return { fillColor: 'hsl(' + color[0] + ',' + color[1] + '%,' + color[2] + '%)', }
}
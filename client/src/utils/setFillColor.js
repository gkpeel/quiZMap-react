export const setFillColor = (secondsRemaing) => {
    var low = [5, 69, 54];
    var high = [151, 83, 34];

    var delta = (secondsRemaing) / 900;

    var color = [];
    for (var i = 0; i < 3; i++) {
        color[i] = (high[i] - low[i]) * delta + low[i];
    }

    return { fillColor: 'hsl(' + color[0] + ',' + color[1] + '%,' + color[2] + '%)', }
}
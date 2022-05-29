function generateBarcode() {
    const characters = "!#$%&()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~"
    let barcode = ""
    for (let i = 0; i < 64; i++)
        barcode += characters[Math.floor(Math.random() * characters.length).toString()]
    return barcode
}

function dateDiff( date1, date2 ) {
    date1 = new Date(date1)
    date2 = new Date(date2)
    let delta = Math.abs((date1.getTime() - date2.getTime()))
    delta = parseInt(delta)
    const ratio = [1000, 60, 60, 24, 12, 365]
    let prev
    let index
    for (let i = 1; i < ratio.length; i++) {
        prev = delta
        delta /= ratio[i - 1]
        if (delta < 1) {
            index = i - 1
            break
        }
    }
    return { index: index, value: prev }
}

function deltaTime(start, end) {
    start = start.split(':')
    end = end.split(':')
    for (let i = 0; i < start.length; i++) {
        if (parseInt(start[i]) < 10)
            start[i] = '0' + start[i]
        if (parseInt(end[i]) < 10)
            end[i] = '0' + end[i]
    }
    const times = ["seconds", "minutes", "hours", "days", "months", "years"]
    let delta = dateDiff(`${start[5]}-${start[4]}-${start[3]} ${start[2]}:${start[1]}:${start[0]}`, `${end[5]}-${end[4]}-${end[3]} ${end[2]}:${end[1]}:${end[0]}`)
    let value = parseInt(delta.value)
    if (delta.index <= 0 || delta.index === undefined)
        delta.index = 1
    let word = times[delta.index - 1]
    if (value <= 1 && word !== undefined)
        word = word.slice(0, -1)
    return value.toString() + ' ' + word + " ago"
}

module.exports = {
    generateBarcode: generateBarcode,
    deltaTime: deltaTime
}
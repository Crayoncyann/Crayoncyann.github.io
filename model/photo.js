const  fs = require('fs')

const  join = require('path').join

const findSync = (startPath) => {
    let result = []
    function finder(path) {
        let files = fs.readdirSync(path)
        files.forEach((val, index) => {
            let fPath = join(path, val)
            let stats = fs.statSync(fPath)
            if (stats.isDirectory()) {
                finder(fPath)
            }
            if (stats.isFile()) {
                result.push(fPath)
            }
        })

    }
    finder(startPath)
    return result
}

let filePhoto = findSync('./static/photo/')

module.exports = filePhoto

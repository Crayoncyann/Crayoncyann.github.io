const fs = require('fs')

const join = require('path').join

const finder = (path) => {
    let result = []
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
    return result
}

var db = () => {
    let r = []
    let photos = finder('./static/photo/')
    for (var i = 0; i < photos.length; i++) {
        let p = photos[i]
        let info = fs.statSync(p).ctime
        let year = info.getFullYear()
        let month = info.getMonth() + 1
        let time = year + '.' + month
        photo = {
            url: p,
            created_time: time,
        }
        r.push(photo)
    }
    return r
}

var filePhoto = db()

module.exports = filePhoto

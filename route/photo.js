const photos = require('../model/photo')

const all = {
    path: '/api/photo/all',
    method: 'get',
    func: (request, response) => {
        var r = JSON.stringify(photos)
        response.send(r)
    }
}

var routes = [
    all,
]

module.exports.routes = routes

const comment = require('../model/comment')

const blog = require('../model/blog')

const sendHtml = (path, response) => {
    var fs = require('fs')
    var options = {
        encoding: 'utf-8'
    }
    path = 'template/' + path
    fs.readFile(path, options, (error, data) => {
        response.send(data)
    })
}

const index = {
    path: '/',
    method: 'get',
    func: (request, response) => {
        let path = 'index.html'
        sendHtml(path, response)
    }
}

const category = {
    path: '/blog/category',
    method: 'get',
    func: (request, response) => {
        let path = 'category.html'
        sendHtml(path, response)
    }
}

const publish = {
    path: '/blog/publish',
    method: 'get',
    func: (request, response) => {
        let path = 'publish.html'
        sendHtml(path, response)
    }
}

const article = {
    path: '/blog/:id',
    method: 'get',
    func: (request, response) => {
        let blog_id = request.params.id
        let path = 'article.html'
        let fs = require('fs')
        let options = {
            encoding: 'utf-8'
        }
        path = 'template/' + path
        fs.readFile(path, options, (error, data) => {
            data = data.replace('{{blog_id}}', blog_id)
            response.send(data)
        })
    }
}

const photo = {
    path: '/photo',
    method: 'get',
    func: (request, response) => {
        let path = 'photo.html'
        sendHtml(path, response)
    }
}

const routes = [
    index,
    category,
    publish,
    article,
    photo,
]

module.exports.routes = routes

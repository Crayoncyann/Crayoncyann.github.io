/*
    @ 原评论功能
    每个日志都按 blog_id 加载评论
    评论存储 {
        comment_id
        comment-author
        comment-content
        comment_creatTime
    }
    加载时，先按照 blog_id 加载所有评论，
    遍历所有 comments，按照 <li> 插入
    对评论进行修改时，按照 comment_id 查找评论
*/

/*
    @ 现评论采用 来必力
*/

// var commentNew = function(form, callback) {
//     var data = JSON.stringify(form)
//     var request = {
//         method: 'POST',
//         url: '/api/comment/add',
//         contentType: 'application/json',
//         data: data,
//         callback: function(response) {
//             log('响应', response)
//             var c = JSON.parse(response)
//             callback(c)
//         }
//     }
//     ajax(request)
// }

// var actionCommentAdd = (event) => {
//     var self = event.target
//     var form = self.closest('.new-comment')
//     var blogId = form.querySelector('.comment-blog-id').value
//     var author = form.querySelector('.comment-author').value
//     var content = form.querySelector('.comment-content').value
//     var d = {
//         blog_id: blogId,
//         author: author,
//         content: content,
//     }
//     commentNew(d, (comment) => {
//         log('新评论', comment)
//         var t = templateComment(comment)
//         var div = e('.comm-list')
//         div.insertAdjacentHTML('afterbegin', t)
//     })
// }

// document.body.addEventListener('click', function(event) {
//     log('click comment new')
//     var self = event.target
//     if (self.classList.contains('comment-add')) {
//         actionCommentAdd(event)
//     }
// })

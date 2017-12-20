// 预加载
var buffer = function(controls) {
    var audio = e('audio')
    bindEvent(audio, 'canplay', function() {
        return controls
    })
}

var __main = () => {
    state()
    var list = [
        'IU - 夜信.mp3',
        'IU - Palette.mp3',
        'IU - Good Day.mp3',
        'IU - Someday.mp3',
        '金泰妍 - 11：11.mp3',
        '金泰妍 - I.mp3',
        '金泰妍 - 들리나요.mp3',
        '金泰妍 - 만약에.mp3',
    ]
    chioce(list)
    buffer(controls(list))
    loop(list)
    progress()
    volume()
}
__main()

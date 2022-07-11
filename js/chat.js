$(function () {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()


    $('.input_sub').on('click', function () {
        var text = $('.input_txt').val().trim();
        if (text.length <= 0) {
            return $('.input_txt').val('');
        }

        $('.talk_list').append('<li class="right_word"><img src="img/person02.png" /> <span>' + text + '</span></li>');
        $('.input_txt').val('');
        resetui();
        getMsg(text);

    })

    function getMsg(text) {
        $.ajax({
            methods: 'GET',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: text
            },
            success: function (res) {
                // if(res.me)
                console.log(res);
                if (res.message === 'success') {
                    var robotmsg = res.data.info.text;
                    $('.talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>' + robotmsg + '</span></li>');
                }
                resetui();

                getVoice(robotmsg);

            }

        })
    }


    function getVoice(text) {
        $.ajax({
            methods: 'GET',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data: {
                text: text
            },
            success: function (res) {
             
                if (res.status === 200) {
                    $('#voice').attr('src',res.voiceUrl)
                }
            }
        })
    }
    $('.input_txt').on('keyup',function(e){
        if(e.keyCode===13){
            // $('.input_sub').trigger('click');
            $('.input_sub').click();
        }
    })
})
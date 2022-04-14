(function($) {
    $.fn.wxAudio = function(options) {
        return this.each(function(options) {

           var init =  function (options) {
                let defaultOptions = {
                    ele: null,
                    width: '320px',
                    title: '这是一个测试title',
                    src: '',
                    disc: '这是一个测试disc',
                    autoplay: false,
                    // loop为true的时候不执行ended事件
                    loop: true,
                    ended: function () {}
                }
                this.opt = Object.assign({}, defaultOptions, tpl)
                // 判断传进来的是DOM还是字符串
                if (typeof this.opt.ele === 'string') {
                    this.opt.ele = document.querySelector(this.opt.ele)
                }
                if (!this.opt.ele) return

                this.loading = false
                this.isDrag = false
                this.isplaying = false
                this.durationT = 0
                this.currentT = 0
                this.currentP = 0
                this.maxProgressWidth = 0
                this.dragProgressTo = 0

                // 通过时间戳与当前时间的差值来判断是否需要加载
                this.reduceTBefore = 0   // 时间戳与当前时间的差值 (初始化)
                this.reduceTAfter = 0   // 时间戳与当前时间的差值 (执行中)

                this.initDom();
            }

            // 初始化元素
            var initDom = function () {
                // content
                this.wxAudioC = document.createElement('div')
                this.wxAudioC.className = 'wx-audio-content'
                this.wxAudioC.style.width = this.opt.width
                this.opt.ele.appendChild(this.wxAudioC)

                // audio
                this.wxAudio = document.createElement('audio')
                this.wxAudio.className = 'wx-audio-content'
                this.wxAudio.src = this.opt.src
                if (this.opt.loop) this.wxAudio.setAttribute('loop', this.opt.loop)
                this.wxAudioC.appendChild(this.wxAudio)

                // left
                this.wxAudioL = document.createElement('div')
                this.wxAudioL.className = 'wx-audio-left'
                this.wxAudioC.appendChild(this.wxAudioL)

                // left image
                this.wxAudioStateImg = document.createElement('img')
                this.wxAudioStateImg.className = 'wx-audio-state'
                this.wxAudioStateImg.src = pauseImg
                this.wxAudioL.appendChild(this.wxAudioStateImg)

                // right
                this.wxAudioR = document.createElement('div')
                this.wxAudioR.className = 'wx-audio-right'
                this.wxAudioC.appendChild(this.wxAudioR)

                // right  title
                this.wxAudioT = document.createElement('p')
                this.wxAudioT.className = 'wx-audio-title'
                this.wxAudioT.innerText = this.opt.title
                this.wxAudioR.appendChild(this.wxAudioT)

                // right  disc
                this.wxAudioD = document.createElement('p')
                this.wxAudioD.className = 'wx-audio-disc'
                this.wxAudioD.innerText = this.opt.disc
                this.wxAudioR.appendChild(this.wxAudioD)

                // right  progrees
                this.wxAudioP = document.createElement('div')
                this.wxAudioP.className = 'wx-audio-progrees'
                this.wxAudioR.appendChild(this.wxAudioP)

                // right progress detail
                this.wxAudioDetail = document.createElement('div')
                this.wxAudioDetail.className = 'wx-progrees-detail'
                this.wxAudioP.appendChild(this.wxAudioDetail)

                // voice p
                this.wxVoiceP = document.createElement('span')
                this.wxVoiceP.className = 'wx-voice-p'
                this.wxAudioDetail.appendChild(this.wxVoiceP)

                // buffer p
                this.wxBufferP = document.createElement('span')
                this.wxBufferP.className = 'wx-buffer-p'
                this.wxAudioDetail.appendChild(this.wxBufferP)

                // loading p
                this.wxLoading = document.createElement('span')
                this.wxLoading.className = 'wx-loading'
                this.wxAudioDetail.appendChild(this.wxLoading)

                // laoding wrapper
                this.wxLoadingWrapper = document.createElement('span')
                this.wxLoadingWrapper.className = 'wx-loading-wrapper'
                this.wxLoading.appendChild(this.wxLoadingWrapper)

                // origin
                this.wxAudioOrigin = document.createElement('div')
                this.wxAudioOrigin.className = 'wx-audio-origin'
                this.wxAudioP.appendChild(this.wxAudioOrigin)

                // 音乐时间信息
                this.wxAudioTime = document.createElement('div')
                this.wxAudioTime.className = 'wx-audio-time'
                this.wxAudioR.appendChild(this.wxAudioTime)

                // currentT
                this.wxAudioCurrent = document.createElement('span')
                this.wxAudioCurrent.className = 'current-t'
                this.wxAudioCurrent.innerText = '00:00'
                this.wxAudioTime.appendChild(this.wxAudioCurrent)

                // durationT
                this.wxAudioDuration = document.createElement('span')
                this.wxAudioDuration.className = 'duration-t'
                this.wxAudioDuration.innerText = '00:00'
                this.wxAudioTime.appendChild(this.wxAudioDuration)

                this.initAudioEvent();

                if (this.opt.autoplay) {
                    document.addEventListener('WeixinJSBridgeReady', () => {
                        this.audioPlay()
                    })
                }
            }




        });
    };
}(jQuery));
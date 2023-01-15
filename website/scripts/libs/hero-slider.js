class HeroSlider {
    constructor(el) {
        this.el = el;
        this.swiper = this._initSwiper();
    }
    _initSwiper() {
        return new Swiper(this.el, {
            // Optional parameters
            // direction: 'vertical',
            loop: true,
            grabCursor: true,
            effect: 'coverflow',
            centeredSlides: true,
            slidesPerView: 1,
            speed: 1000,
            breakpoints: {
                900: {
                    slidesPerView: 2,
                }
            },
        });
    }
    startPlay(option = {}) {
        option = Object.assign({
            delay: 4000,
            disableOnInteraction: false
        }, option)
        this.swiper.params.autoplay = option;
        this.swiper.autoplay.start();
    }
    stopPlay() {
        this.swiper.autoplay.stop();
    }
}
document.addEventListener('DOMContentLoaded', function() {
   const main = new Main();
});

class Main {
    constructor() {
        this.header = document.querySelector('.header');
        this.sides = document.querySelectorAll('.side');
        this._observers = [];
        this._init();
    }
    set setObservers(val) {
        this._observers.push(val);
    }
    get getObservers() {
        return this._observers;
    }
    _init() {
        new MobileMenu();
        this.hero = new HeroSlider('.swiper');
        Pace.on('done', this._paceDone.bind(this));
    }
    _paceDone() {
        this._scrollInit();
    }
    _cb(el, inview) {
        if(inview) {
            const ta = new TweenTextAnimation(el);
            ta.animate();
        }
    }
    _inviewAnimation(el, inview) {
        if(inview) {
            el.classList.add('inview');
        }else {
            el.classList.remove('inview');
        }
    }
    _navAnimation(el, inview) {
        if(inview) {
            this.header.classList.remove('triggered');
        }else {
            this.header.classList.add('triggered');
        }
    }
    _toggleSlideAnimation(el, inview) {
        if(inview) {
            this.hero.startPlay();
        } else {
            this.hero.stopPlay();
        }
    }
    _sideAnimation(el, inview) {
        if(inview) {
            this.sides.forEach(side => {
                side.classList.add('inview');
            });
        }else {
            this.sides.forEach(side => {
                side.classList.remove('inview');
            })
        }
    }
    _scrollInit() {
        this.setObservers = new ScrollObserver('.nav-trigger', this._navAnimation.bind(this), {once: false});
        this.setObservers = new ScrollObserver('.appear', this._inviewAnimation, {rootMargin: "-150px"});
        this.setObservers = new ScrollObserver('.cover-slide', this._inviewAnimation, {rootMargin: "-150px"});
        this.setObservers = new ScrollObserver('.animate-title', this._cb, {rootMargin: "-250px 0px"});
        this.setObservers = new ScrollObserver('#main-content', this._sideAnimation.bind(this), {once: false, rootMargin: "-300px 0px"});
        this.setObservers = new ScrollObserver('.swiper', this._toggleSlideAnimation.bind(this), {once: false});
        console.log(this._observers);
    }
    _destroyObservers() {
        this._observers.forEach(ob => {
            ob.destroy();
        })
    }
    destroy() {
        this._destroyObservers();
    }
}


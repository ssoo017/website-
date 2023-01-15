class ScrollObserver {
    constructor(el, cb, option) {
        this.els = document.querySelectorAll(el);
        this.cb = cb;
        const defaultOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0,
            once: true
        }
        this.option = Object.assign(defaultOptions, option);
        this._init();
    }
    _init() {
        const callback = function(entries, observer) {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    this.cb(entry.target, true);
                    if(this.option.once) {
                        observer.unobserve(entry.target);
                    }
                }else {
                    this.cb(entry.target, false);
                }
            });
        }
        this.io = new IntersectionObserver(callback.bind(this), this.option);
        this.els.forEach(el => this.io.observe(el));
    }
    destroy() {
        this.io.disconnect();
    }
}

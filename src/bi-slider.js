// Burak İbaoğlu - Slider Tool

class biSlider {
    constructor(selector, options) {
        this.sliderContainer = document.querySelector(selector);
        this.options = options;
    }
    createSlider() {
        this.sliderContainer.classList.add('bi-slider');
        this.sliderContainer.innerHTML = `
            <div class="bi-slider__container">
                <ul class="bi-slider__slides">
                    ${this.createSlides()}
                </ul>
            </div>
            ${this.createNavigation()}
        `;
        if (this.options.cuurentSlide !== 0) {
            this.changeCurrentSlide(this.options.cuurentSlide);
        }
        else {
            this.changeCurrentSlide(0);
        }
        this.sliderContainer.querySelector('.bi-slider__slides').style.transform = `translate3d(0, 0, 0)`;
        this.sliderContainer.querySelector('.bi-slider__slides').style.transitionDuration = `${this.options.speed}ms`;
        if (this.options.slidesToShow !== 1) {
            this.sliderContainer.querySelector('.bi-slider__slides').style.gap = `${100 / this.options.slidesToShow}px`;
            //this.sliderContainer.querySelector('.bi-slider__slides').style.padding = `0 ${100 / this.options.slidesToShow}px`;
        }
    }
    createSlides() {
        let slides = '';
        for (let i = 0; i < this.sliderContainer.children.length; i++) {
            slides += `<li class="bi-slider__slide" style="width:${100 / this.options.slidesToShow}%">${this.sliderContainer.children[i].outerHTML}</li>`;
        }
        return slides;
    }
    createNavigation() {
        let navigation = '';
        if (this.options.navigation) {
            navigation = `
                <div class="bi-slider__navigation">
                    ${this.createPrevButton()}
                    ${this.createNextButton()}
                </div>
            `;
        }
        return navigation;
    }
    createPrevButton() {
        return this.options.prevButton;
    }
    createNextButton() {
        return this.options.nextButton;
    }
    setButtonListeners() {
        document.querySelector('.bi-slider__next-button').addEventListener('click', () => {
            this.changeToNextSlide();
        });
        document.querySelector('.bi-slider__prev-button').addEventListener('click', () => {
            this.changeToPrevSlide();
        });
    }
    changeToNextSlide() {
        let currentSlide = this.sliderContainer.querySelector('.bi-slider__slide--active');
        let nextSlide = currentSlide.nextElementSibling;
        if (nextSlide) {
            currentSlide.classList.remove('bi-slider__slide--active');
            nextSlide.classList.add('bi-slider__slide--active');
            this.sliderContainer.querySelector('.bi-slider__slides').style.transform = `translate3d(-${nextSlide.offsetLeft}px, 0, 0)`;
        }
    }
    changeToPrevSlide() {
        let currentSlide = this.sliderContainer.querySelector('.bi-slider__slide--active');
        let prevSlide = currentSlide.previousElementSibling;
        if (prevSlide) {
            currentSlide.classList.remove('bi-slider__slide--active');
            prevSlide.classList.add('bi-slider__slide--active');
            this.sliderContainer.querySelector('.bi-slider__slides').style.transform = `translate3d(-${prevSlide.offsetLeft}px, 0, 0)`;
        }
    }
    changeCurrentSlide(index) {
        if(index === 0) {
            this.sliderContainer.querySelector('.bi-slider__slides').firstElementChild.classList.add('bi-slider__slide--active');
        }
        else {
            this.sliderContainer.querySelector('.bi-slider__slides').children[index].classList.add('bi-slider__slide--active');
            this.sliderContainer.querySelector('.bi-slider__slides').style.transform = `translate3d(-${this.sliderContainer.querySelector('.bi-slider__slides').children[index].offsetLeft}px, 0, 0)`;
        }
    }
    init() {
        this.createSlider();
        this.setButtonListeners();
    }
}

export default biSlider;
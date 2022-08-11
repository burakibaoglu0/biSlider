import biSlider from './bi-slider.js';

let sliderContainer = new biSlider('.product-container', {
    navigation: true,
    nextButton: '<button class="bi-slider__next-button"></button>',
    prevButton: '<button class="bi-slider__prev-button"></button>',
    slidesToShow: 3,
    slidesToScroll: 3,
    loop: true,
    speed: 500,
    cuurentSlide: 0,
});

sliderContainer.init();
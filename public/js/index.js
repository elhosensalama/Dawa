/* eslint-disable */

// TODO HOME PAGE

const homePage = document.querySelector('.home-section');

if (homePage) {
    console.log('welcome from home page');
    const sura = `<audio controls autoplay style="display: none">
                    <source src="/media/startAya.mp3" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>`;
    document.querySelector('.home-section .con').insertAdjacentHTML('afterbegin', sura);
    setTimeout(() => {
        const aya = `<h3 class="secondry-heading">{ يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنْكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ وَاللَّهُ بِمَا تَعْمَلُونَ خَبِيرٌ } </h3>`;
        document.querySelector('.home-section .con').insertAdjacentHTML('beforeend', aya);
        document.querySelector('.home-section .logo-mousqe').style.animation = "white-shadow 2s infinite";
    }, 1000);
    setTimeout(() => {
        location.assign('/main');
    }, 37000);
}

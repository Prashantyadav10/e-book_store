if(window.location.hash ==="#catalogue"){
  document.getElementById("catalogue-link").click();
}
if(window.location.hash ==="#login"){
  document.getElementById("login-link").click();
}
var swiper = new Swiper (".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
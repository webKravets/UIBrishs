$('.slider').slick({
  dots: false,
  infinite: true,
  autoplay: false,
  autoplaySpeed: 6000,
  prevArrow: "<button type='button' class='slick-prev'><i class='fas fa-angle-left slick-arrow' aria-hidden='true'></i></button>",
  nextArrow: "<button type='button' class='slick-next'><i class='fas fa-angle-right slick-arrow' aria-hidden='true'></i></button>"
});

$(".go_to").click(function(e) {
  // Убирает # в адресной строке
  e.preventDefault();
  // плавное перемещение страницы к нужному блоку
  elementClick = $(this).attr("href");
  destination = $(elementClick).offset().top;
  $("body,html").animate({ scrollTop: destination }, 800);
});
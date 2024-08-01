$(document).ready(function() {
    var slider = $("#slider");
    var thumb = $("#thumb");
    var slidesPerPage = 4; //globaly define number of elements per page
    var syncedSecondary = true;

    // Инициализация основного слайдера
    slider.owlCarousel({
        items: 1,
        slideSpeed: 2000,
        nav: false,
        autoplay: false, 
        dots: false,
        loop: true,
        responsiveRefreshRate: 200
    }).on('changed.owl.carousel', syncPosition);

    // Инициализация миниатюрного слайдера
    thumb.on('initialized.owl.carousel', function() {
        thumb.find(".owl-item").eq(0).addClass("current");
    }).owlCarousel({
        items: slidesPerPage,
        dots: false,
        nav: true,
        item: 4,
        smartSpeed: 200,
        slideSpeed: 500,
        slideBy: slidesPerPage, 
        navText: ['<svg width="18px" height="18px" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>', '<svg width="25px" height="25px" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
        responsiveRefreshRate: 100
    }).on('changed.owl.carousel', syncPosition2);

    // Функция для синхронизации положения основного и миниатюрного слайдеров
    function syncPosition(el) {
        var number = el.item.index;
        thumb.data('owl.carousel').to(number, 100, true);
    }

    function syncPosition2(el) {
        if (syncedSecondary) {
            var number = el.item.index;
            slider.trigger('to.owl.carousel', [number, 100, true]); // Используйте trigger для jQuery-объекта
        }
    }

    // Переключение слайдера при клике на миниатюру
    thumb.on("click", ".owl-item", function(e) {
        e.preventDefault();
        var number = $(this).index();
        slider.trigger('to.owl.carousel', [number, 300, true]); // Используйте trigger для jQuery-объекта
    });

    // Остальной код остается без изменений

    $(".qtyminus").on("click",function(){
        var now = $(".qty").val();
        if ($.isNumeric(now)){
            if (parseInt(now) -1 > 0)
            { now--;}
            $(".qty").val(now);
        }
    });

    $(".qtyplus").on("click",function(){
        var now = $(".qty").val();
        if ($.isNumeric(now)){
            $(".qty").val(parseInt(now)+1);
        }
    });



    // Получаем значение параметра id из URL
    var urlParams = new URLSearchParams(window.location.search);
    var productId = urlParams.get('id');

    // Функция для загрузки данных о продукте по его id
    function loadProductDetails(productId) {
        // Загружаем данные из JSON-файла
        $.getJSON("products.json", function(data) {
            var products = data.products;

            // Находим продукт по его id
            var product = products.find(function(item) {
                return item.id === productId;
            });

            // Проверяем, найден ли продукт
            if (product) {
                // Отображаем информацию о продукте на странице ProductDetails
                $('.product-name').text(product.name);
                $('.product-category').text(product.category);
                $('.main-description').text(product.productDescription);
                $('.features-main').html(product.productFeatures.replace(/\n/g, '<br>'));
                $('.composition').html(product.compasition);
                $('.nutritional').text(product.nutritionalValue);

                $('#slider').empty();

                // Создаем вложенный div для слайдера
                var carouselDiv = $('<div class="owl-carousel product-slider">');

                // Добавляем вложенный div в основной слайдер
                $('#slider').append(carouselDiv);

                // Добавляем изображения продукта во вложенный слайдер и thumb
                product.images.forEach(function(imageSrc) {
                    var slide = $('<div class="item"><img src="' + imageSrc + '"></div>');
                    carouselDiv.append(slide);

                    var thumbSlide = $('<div class="item"><img src="' + imageSrc + '"></div>');
                    thumbSlide.click(function() {
                        slider.trigger('to.owl.carousel', [carouselDiv.find('.item').index(slide), 300, true]); // Используйте trigger для jQuery-объекта
                    });

                    thumb.trigger('add.owl.carousel', [thumbSlide]).trigger('refresh.owl.carousel');
                });

                // Инициализируем слайдер после добавления всех изображений
                initSlider();
            }
        });
    }

    // Загрузка данных о продукте при загрузке страницы
    loadProductDetails(productId);
});

// Функция для инициализации слайдера
function initSlider() {
    $('.product-slider').owlCarousel({
        items: 1,
        slideSpeed: 2000,
        nav: false,
        autoplay: false, 
        dots: false,
        loop: true,
        responsiveRefreshRate: 200
    }).on('changed.owl.carousel', syncPosition);
}

// функция шторки

$(document).ready(function() {
    $('.product-composition h4').click(function() {
        $(this).parent().find('.composition').slideToggle();
        $(this).find('i').toggleClass('fa-plus fa-minus');
    });
    
    $('.nutritional-value h4').click(function() {
        $(this).parent().find('.nutritional').slideToggle();
        $(this).find('i').toggleClass('fa-plus fa-minus');
    });
});


    // функция Лупа 
document.getElementById('slider').addEventListener('mousemove', function (event) {
    if (window.innerWidth <= 767) {
        // Отключаем лупу на мобильных устройствах
        return;
    }
    
    var img = event.target.closest('.item').querySelector('img');
    var imgRect = img.getBoundingClientRect();
    var x = event.clientX - imgRect.left;
    var y = event.clientY - imgRect.top;
    var percentX = x / imgRect.width * 100;
    var percentY = y / imgRect.height * 100;
    img.style.transformOrigin = percentX + '% ' + percentY + '%';
});

    //функция Лупа 


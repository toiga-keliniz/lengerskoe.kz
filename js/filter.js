
// Загрузка данных из JSON главная страница
$(function() {
    
    $.getJSON("products.json", function(data) {
        var products = data.products;

        // Генерация HTML для каждого продукта
        products.forEach(function(product) {
            var firstImage = product.images[0];
            var html = `
                <div class="${product.category}" data-id="${product.id}">
                    <div class="catalog-ice-cream">
                        <div class="catalog-ice-cream__bg"></div>
                        <div class="catalog-ice-cream__image">
                        <img class="catalog-ice-cream__image-obj" src="${firstImage}">
                    </div>
                        <div class="catalog-ice-cream__title">${product.name}</div>
                    </div>
                </div>
            `;
            $('.covers').append(html);
        });

        // Фильтрация по категории "Мороженое" при загрузке страницы
        $('.covers > div').hide();
        $('.covers .ice-cream-main').show();

        // Обработчик события click для кнопок фильтрации
        $('.tabs div').click(function(){
            var filterClass = $(this).data('filter');
            $('.covers > div').hide();
            $('.covers .' + filterClass).show();
        });
    });

    // Обработчик события click для кнопки "О продукте"
    $(document).on('click', '.catalog-ice-cream__image, .catalog-ice-cream__title', function(e) {
        e.preventDefault(); // Предотвращаем переход по ссылке

        // Получаем id товара из атрибута data-id
        var productId = $(this).closest('.catalog-ice-cream').parent().data('id');

        // Переходим на страницу с подробной информацией о товаре
        window.location.href = 'product_detail.html?id=' + productId;
    });
});

// Установка начальной позиции линии под вкладкой "Мороженое"
$(document).ready(function() {
    var initialTabPosition = $('.tab-item[data-filter="ice-cream"]').position().left;
    var initialTabWidth = $('.tab-item[data-filter="ice-cream"]').outerWidth();
    $('.line').css({
        'left': initialTabPosition + 'px',
        'width': initialTabWidth + 'px'
    });
});
// Обработчик события click для кнопок фильтрации
$('.tabs div').click(function(){
    var filterClass = $(this).data('filter');

    // Перемещение линии под активную вкладку
    var tabPosition = $(this).position().left;
    var tabWidth = $(this).outerWidth();
    $('.line').css({
        'left': tabPosition + 'px',
        'width': tabWidth + 'px'
    });

    // Сделаем активной текущую вкладку
    $('.tabs .tab-item.active').removeClass('active');
    $(this).addClass('active');

    // Сделаем активным экран, соответствующий выбранной категории
    $('.tab-pane.active').removeClass('active'); // Удаляем класс active у текущего активного экрана
    $('.' + filterClass).addClass('active'); // Добавляем класс active к экрану, соответствующему выбранной категории
});



// ютуб ссылка на главном странице

$(document).ready(function() {
  // Находим все элементы с классом "play-button"
  var playButtons = document.querySelectorAll('.play-button');

  // Добавляем обработчик события клика на каждую кнопку
  playButtons.forEach(function(button) {
      button.addEventListener('click', function() {
          // Получаем ссылку из атрибута data-src
          var videoSrc = button.getAttribute('data-src');
          // Открываем ссылку в новом окне
          window.open(videoSrc, '_blank');
      });
  });
});





let lastScrollTop = 0;

window.addEventListener("scroll", function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > lastScrollTop) {
        // Прокрутка вниз
        document.querySelector('.header-menu').classList.add('hidden');
    } else {
        // Прокрутка вверх
        document.querySelector('.header-menu').classList.remove('hidden');
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Для обработки прокрутки вверх при достижении верха страницы
}, false);

/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId)
 
    toggle.addEventListener('click', () =>{
        // Add show-menu class to nav menu
        nav.classList.toggle('show-menu')
 
        // Add show-icon to show and hide the menu icon
        toggle.classList.toggle('show-icon')
    })
 }
 
 showMenu('nav-toggle','nav-menu')




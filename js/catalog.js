$(function() {
    // Функция для извлечения параметров из URL
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Загрузка данных из JSON главная страница
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
                        <div class="catalog-ice-cream__description">${product.weight}</div>
                        <div class="catalog-ice-cream__buttons">
                        <button class="button-default button-default--brown button-default__only-text" data-id="${product.id}">
                        <div class="button-default__text">О продукте</div>
                            </a>
                        </div>
                    </div>
                </div>
            `;
            $('.covers').append(html);
        });




        // Получение параметра фильтра из URL
        var filterParam = getUrlParameter('filter');
        if (filterParam) {
            // Применение фильтрации на основе параметра из URL
            $('.covers > div').hide();
            $('.covers .' + filterParam).show();
        } else {
            // Если параметра нет, показать категорию "ice-cream" по умолчанию
            $('.covers > div').hide();
            $('.covers .ice-cream').show();
        }

        // Обработчик события click для кнопок фильтрации
        $('.toggles button').click(function(){
            var filterClass = $(this).data('filter');
            $('.covers > div').hide();
            $('.covers .' + filterClass).show();
            updateURL(filterClass);
        });

        // Обработчик события click для кнопки "Показать все"
        $('.see-all').click(function() {
            $('.covers > div').show();
            updateURL('');
        });

        // Обработчик события click для ссылок меню
        $('.dropdown__link').click(function(event) {
            event.preventDefault(); // Предотвращаем переход по ссылке
            var filterClass = $(this).data('filter');
            if (filterClass === 'ice-cream') {
                $('.toggles button').show(); // Показываем все фильтры для других категорий
                $('.categories hr').show(); // Показываем линию hr
            } else {
                $('.toggles button').not('[data-filter="' + filterClass + '"]').hide();
                $('.categories hr').hide(); // Скрываем линию hr
            }
            $('.covers > div').hide(); // Скрываем все элементы
            $('.covers .' + filterClass).show(); // Показываем отфильтрованные элементы
            updateURL(filterClass);
        });
    });

    // Обработчик события click для кнопки "О продукте"
    $(document).on('click', '.button-default__text', function(e) {
        e.preventDefault(); // Предотвращаем переход по ссылке
        // Получаем id товара из атрибута data-id ближайшего элемента с классом .post-box
        var productId = $(this).closest('[data-id]').data('id');
        // Переходим на страницу с подробной информацией о товаре
        window.location.href = 'product_detail.html?id=' + productId;
    });

    // Функция для обновления URL с учетом параметра фильтра
    function updateURL(filter) {
        var currentURL = window.location.href;
        var baseURL = currentURL.split('?')[0];
        var newURL = baseURL;
        if (filter !== '') {
            newURL += '?filter=' + filter;
        }
        window.history.replaceState({}, '', newURL);
    }

    $(function() {
        // Проверяем размер экрана перед привязкой обработчика события click
        if ($(window).width() <= 767) {
            // Обработчик события click для всей карточки
            $(document).on('click', '.catalog-ice-cream', function(e) {
                e.preventDefault(); // Предотвращаем переход по ссылке
                // Получаем id товара из атрибута data-id текущей карточки
                var productId = $(this).closest('[data-id]').data('id');
                // Переходим на страницу с подробной информацией о товаре
                window.location.href = 'product_detail.html?id=' + productId;
            });
        }
    });
});

// робит робить
/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId);
 
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            // Add show-menu class to nav menu
            nav.classList.toggle('show-menu');
            // Add show-icon to show and hide the menu icon
            toggle.classList.toggle('show-icon');
        });

        // Add event listener to each dropdown link to close the menu on click
        const dropdownLinks = document.querySelectorAll('.dropdown__menu .dropdown__link');

        dropdownLinks.forEach(link => link.addEventListener('click', () => {
            // Remove show-menu class from nav menu
            nav.classList.remove('show-menu');
            // Remove show-icon class from toggle
            toggle.classList.remove('show-icon');
        }));
    }
}

showMenu('nav-toggle', 'nav-menu');
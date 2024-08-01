$(function() {
  // Загрузка данных из JSON
  $.getJSON("post.json", function(data) {
      var posts = data.post;

      // Генерация HTML для каждого поста
      posts.forEach(function(post) {
          var postBox = $('<div>').addClass('post-box').addClass(post.category);
          postBox.append(
              $('<img>').attr('src', post.images).addClass('post-img'),
              $('<h2>').addClass('category').text(post.category),
              $('<a>').attr('href', 'post-page.html').addClass('post-title').text(post['post-title']).data('id', post.id), // Добавляем передачу ID поста через data-атрибут
              $('<span>').addClass('post-date').text(post['post-date']),
              $('<p>').addClass('post-decription').text(post['post-decription']),
              $('<div>').addClass('profile').append(
                  $('<img>').attr('src', post.profileImg).addClass('profile-img'),
                  $('<span>').addClass('profile-name').text(post.author)
              )
          );
          $('.post.container').append(postBox);
      });
  });

  // Обработчик клика на заголовок поста
  $(document).on('click', '.post-title', function(e) {
      e.preventDefault(); // Предотвращаем стандартное действие ссылки
      var postId = $(this).data('id'); // Получаем ID поста из data-атрибута
      window.location.href = 'post-page.html?id=' + postId; // Перенаправляем на страницу с ID поста в URL
  });
});



$(function() {
  // Функция для загрузки данных поста по его ID
  function loadPostData(postId) {
      // Загрузка данных из JSON
      $.getJSON("post.json", function(data) {
          var posts = data.post;

          // Находим пост с соответствующим ID
          var post = posts.find(function(post) {
              return post.id === postId;
          });

          // Отображаем содержимое поста на странице
          if (post) {
            $('.header-title').text(post['post-title']); // Отображаем заголовок поста
            $('.header-img').attr('src', post.images); // Устанавливаем src атрибут для изображения
            $('.sub-heading').text(post['sub-heading']); // Отображаем заголовок поста
            $('.post-text').html(post['post-decription'].replace(/\n/g, '<br>')); // Отображаем текст поста, заменяя символы \n на тег <br>

          } else {
              $('.sub-heading').text('Post not found'); // Если пост не найден, выводим сообщение об ошибке
          }
      });
  }

  // Получаем ID поста из параметра URL
  var postId = getParameterByName('id');

  // Если есть ID в URL, загружаем данные поста и отображаем его содержимое
  if (postId) {
      loadPostData(postId);
  } else {
      $('.sub-heading').text('Post ID is missing'); // Если ID не указан в URL, выводим сообщение об ошибке
  }

  // Функция для получения значения параметра из URL
  function getParameterByName(name) {
      var url = window.location.href;
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
});




// Filter Js
$(document).ready(function(){
  $('.filter-item').click(function(){
    const value = $(this).attr('data-filter')
    if (value == 'all') {
      $('.post-box').show('1000')
    }
    else {
      $('.post-box').not('.' + value).hide('1000')
      $('.post-box').filter('.' + value).show('1000')
    }
  });
  // Add active to btn
  $(".filter-item").click(function() {
    $(this).addClass("active-filter").siblings().removeClass("active-filter");
  });
});

// Header BackGraund Change On Scroll
let header = document.querySelector('header')

window.addEventListener('scroll', () => {
  header.classList.toggle("shadow", window.scrollY > 0);

});


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
(function() {
  // ========== ДАННЫЕ МЕНЮ ==========
  const menuItems = [
    {
      name: "Салат с печёной свёклой",
      desc: "Свёкла, козий сыр, рукола, греческий орех",
      price: 680,
      image: "https://www.koolinar.ru/all_image/article/6/6045/article-5a55f32f-e8a3-4d5f-9cd1-0a2e4aeb6407_large.png"
    },
    {
      name: "Паста с лисичками",
      desc: "Домашняя паппарделле, лисички, сливочный соус",
      price: 890,
      image: "https://www.ogorod.ru/images/cache/1200x628/crop/images%7Ccms-image-000103264.jpg"
    },
    {
      name: "Утиная грудка",
      desc: "С ягодным соусом, пюре из корня сельдерея",
      price: 1350,
      image: "https://images.news.ru/2026/01/15/9zQsfT9MDvyK5IGI6XwxlIN6VX9lp0655z6ZiKas_780.png"
    },
    {
      name: "Томлёная говядина",
      desc: "Говяжьи щёки, картофельное пюре, тимьян",
      price: 1200,
      image: "https://avatars.mds.yandex.net/i?id=2cf041224701f8c791e17a4a246163eb_l-4119571-images-thumbs&n=13"
    },
    {
      name: "Десерт «Корень»",
      desc: "Морковный кекс, крем из маскарпоне, имбирь",
      price: 590,
      image: "https://www.koolinar.ru/all_image/article/4/4391/article-304135e2-a959-4e02-b311-a373f1343ae4_large.jpg"
    },
    {
      name: "Лимонад на тархуне",
      desc: "Домашний лимонад, эстрагон, лайм",
      price: 420,
      image: "https://thumbs.dreamstime.com/b/summer-drinks-refreshing-lemonade-lemons-mint-tarragon-72809769.jpg"
    }
  ];

  // ========== РЕНДЕР МЕНЮ ==========
  const menuContainer = document.getElementById('menuContainer');

  function renderMenu() {
    if (!menuContainer) return;

    menuContainer.innerHTML = menuItems.map(item => `
      <div class="menu-card">
        <img 
          src="${item.image}" 
          alt="${item.name}" 
          loading="lazy" 
          onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22250%22%3E%3Crect fill=%22%23f5f5f5%22 width=%22400%22 height=%22250%22/%3E%3Ctext fill=%22%23999%22 x=%22200%22 y=%22125%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-size=%2216%22%3E${encodeURIComponent(item.name)}%3C/text%3E%3C/svg%3E'"
        >
        <div class="menu-info">
          <h3>${item.name}</h3>
          <p class="desc">${item.desc}</p>
          <span class="price">${item.price} ₽</span>
          <button class="add-btn" data-dish="${item.name}" data-price="${item.price}">
            <i class="fas fa-plus" style="font-size: 0.8rem;"></i> Добавить
          </button>
        </div>
      </div>
    `).join('');

    // Навешиваем обработчики на кнопки "Добавить"
    document.querySelectorAll('.add-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const dish = this.dataset.dish;
        const price = this.dataset.price;
        alert(`«${dish}» (${price} ₽) добавлено. Для заказа позвоните нам: 8 910 126 99 24`);
      });
    });
  }

  // ========== БРОНИРОВАНИЕ СТОЛИКА ==========
  const bookBtn = document.getElementById('bookTableBtn');
  const bookingMessageDiv = document.getElementById('bookingMessage');

  function setMinDate() {
    const dateInput = document.getElementById('reserveDate');
    if (!dateInput) return;

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
    dateInput.value = `${yyyy}-${mm}-${dd}`;
  }

  function handleBooking() {
    const name = document.getElementById('guestName').value.trim();
    const phone = document.getElementById('guestPhone').value.trim();
    const date = document.getElementById('reserveDate').value;
    const time = document.getElementById('reserveTime').value;
    const guests = document.getElementById('guestCount').value;

    if (!name || !phone || !date) {
      alert('Пожалуйста, заполните имя, телефон и дату.');
      return;
    }

    const message = `✓ Столик забронирован: ${name}, ${date} в ${time}, ${guests} чел. Подтверждение по телефону ${phone}.`;
    bookingMessageDiv.textContent = message;
    bookingMessageDiv.style.display = 'inline-block';

    // Очищаем поля (кроме телефона)
    document.getElementById('guestName').value = '';
    document.getElementById('reserveDate').value = '';
    document.getElementById('reserveTime').value = '19:00';
    document.getElementById('guestCount').value = '2';
    document.getElementById('guestPhone').value = '+7 910 126 99 24';

    // Скрываем сообщение через 8 секунд
    setTimeout(() => {
      if (bookingMessageDiv) bookingMessageDiv.style.display = 'none';
    }, 8000);
  }

  // ========== ПЛАВНАЯ ПРОКРУТКА ==========
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // ========== ИНИЦИАЛИЗАЦИЯ ==========
  function init() {
    renderMenu();
    setMinDate();
    initSmoothScroll();

    if (bookBtn) {
      bookBtn.addEventListener('click', handleBooking);
    }

    // Устанавливаем телефон по умолчанию
    const phoneField = document.getElementById('guestPhone');
    if (phoneField && !phoneField.value) {
      phoneField.value = '8 910 126 99 24';
    }
  }

  // Запуск после полной загрузки DOM
  window.addEventListener('DOMContentLoaded', init);
})();
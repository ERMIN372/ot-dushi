# Чайхана От Души: демо-сайт

Одностраничный демо-сайт для чайханы в Одинцово (ул. Маршала Неделина, 8, +7 (925) 868-40-44, 24/7).
Меню, цены и фото примерные. Страница закрыта от индексации (`noindex`).

Живая версия: https://ermin372.github.io/ot-dushi/

## Стек

Vanilla HTML/CSS/JS, без сборки и зависимостей. Шрифт Playfair Display (OFL) лежит локально в `assets/fonts`,
фото пережаты в WebP.

```
index.html
assets/css/style.css
assets/js/main.js      вкладки меню, маска телефона, демо-форма, нижняя панель звонка
assets/img/            фото, favicon, og-картинка
assets/fonts/          Playfair Display, подмножества cyrillic и latin
```

Локально: открыть `index.html` в браузере или `python3 -m http.server` в корне.

## Что заменить для боевой версии

- Карта: сейчас iframe `yandex.ru/map-widget/v1` с меткой по координатам. Для карты из Конструктора
  подставить `https://yandex.ru/map-widget/v1/?um=constructor%3A<ID>&source=constructor` (комментарий в `index.html`).
- Форма заявки: сейчас только `alert`. Обработчик в `assets/js/main.js`, блок `Booking form`.
- Меню и фото: реальные позиции и снимки заведения.
- Убрать плашку демо и `noindex`.

## Фото

Все фото с Wikimedia Commons / Flickr под CC0 или Public Domain, указание автора не требуется.
Список источников: [CREDITS.md](CREDITS.md).

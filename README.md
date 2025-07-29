

# 🎬 03-React-Movies

## 📌 Опис проєкту
Застосунок для пошуку фільмів за ключовим словом, що отримує дані з **TMDB API**.  
Проєкт створено за допомогою **Vite + React + TypeScript**.  
Розгорнуто на **Vercel**.

---

## 🛠 Використані технології
- **React** + **TypeScript**
- **Axios** – для HTTP-запитів
- **React Hot Toast** – для повідомлень
- **CSS Modules** – стилізація
- **modern-normalize** – уніфікація стилів
- **createPortal** – для модального вікна

---

## 📂 Структура проєкту
src/
├── components/
│ ├── SearchBar/
│ ├── MovieGrid/
│ ├── Loader/
│ ├── ErrorMessage/
│ └── MovieModal/
├── services/
│ └── movieService.ts
├── types/
│ └── movie.ts
├── App.tsx
└── main.tsx

---

🧩 Компоненти
SearchBar
Приймає проп onSubmit(query: string)

Реалізовано через Form Actions

Використовує toast для повідомлень, якщо інпут пустий

MovieGrid
Приймає movies: Movie[] та onSelect(movie: Movie)

Рендерить список карток фільмів

Використовує заглушку, якщо постера немає

Loader
Відображає текст:

Loading movies, please wait...

ErrorMessage
Відображає текст:
There was an error, please try again...
MovieModal
Приймає movie: Movie та onClose()

Використовує createPortal

Відображає:

фон backdrop_path (або заглушку, якщо немає)

назву, опис, дату виходу, рейтинг

Закривається:

по ESC

при кліку на фон

по кнопці ×

Очищає слухачі подій і повертає скрол

🚀 Деплой на Vercel
У налаштуваннях Environment Variables додано:
VITE_TMDB_TOKEN=your_tmdb_token
Після збереження змін виконано Redeploy.

✅ Результат
Пошук працює, фільми відображаються

Модалка показує реальні дані

Помилки обробляються toast та ErrorMessage

Токен безпечно зберігається у .env

🧠 Що я вивчила під час цієї роботи
Як працювати з Form Actions у React

Як робити HTTP-запити з axios та типізувати їх

Використання createPortal для модальних вікон

Робота з .env у Vite і налаштування змінних на Vercel

Як обробляти помилки і показувати fallback для зображень

# Инструкция по деплою на Render

Этот документ содержит пошаговую инструкцию по деплою приложения интернет-магазина моторов на платформу Render.

## Предварительные требования

1. Аккаунт на [Render](https://render.com/)
2. Аккаунт на [MongoDB Atlas](https://www.mongodb.com/atlas/database) для базы данных
3. Аккаунт на [Cloudinary](https://cloudinary.com/) для хранения изображений
4. Ваш проект должен быть загружен в репозиторий GitHub

## Шаг 1: Настройка MongoDB Atlas

1. Создайте новый кластер в MongoDB Atlas
2. Настройте сетевой доступ, разрешив доступ со всех IP-адресов (0.0.0.0/0)
3. Создайте пользователя базы данных с правами на чтение и запись
4. Получите строку подключения в формате: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>`

## Шаг 2: Настройка Cloudinary

1. Зарегистрируйтесь на Cloudinary
2. В панели управления получите:
   - Cloud Name
   - API Key
   - API Secret

## Шаг 3: Настройка переменных окружения

Вам потребуется установить следующие переменные окружения в Render:

- `NODE_ENV` = production
- `PORT` = 5000 (или любой другой порт)
- `MONGODB_URI` = [Ваша строка подключения MongoDB]
- `JWT_SECRET` = [Секретный ключ для JWT токенов]
- `CLOUDINARY_CLOUD_NAME` = [Ваш Cloud Name]
- `CLOUDINARY_API_KEY` = [Ваш API Key]
- `CLOUDINARY_API_SECRET` = [Ваш API Secret]

## Шаг 4: Деплой backend-сервиса на Render

1. В панели управления Render выберите "New" > "Web Service"
2. Подключите свой GitHub репозиторий
3. Укажите следующие настройки:
   - **Name**: motors-shop-api (или любое другое название)
   - **Environment**: Node
   - **Region**: Выберите ближайший регион
   - **Branch**: main (или ваша основная ветка)
   - **Build Command**: `cd server && npm install && npm run build`
   - **Start Command**: `cd server && npm start`
   - **Plan Type**: Выберите подходящий тарифный план
4. Добавьте все необходимые переменные окружения из шага 3
5. Нажмите "Create Web Service"

## Шаг 5: Деплой frontend-приложения на Render

1. В панели управления Render выберите "New" > "Static Site"
2. Подключите тот же репозиторий GitHub
3. Укажите следующие настройки:
   - **Name**: motors-shop (или любое другое название)
   - **Branch**: main (или ваша основная ветка)
   - **Build Command**: `cd client && npm install && npm run build`
   - **Publish Directory**: `client/build`
   - **Environment Variables**: установите `REACT_APP_API_URL` равным URL вашего backend-сервиса
4. Нажмите "Create Static Site"

## Шаг 6: Настройка CORS и проверка работоспособности

1. В файле `server/src/app.ts` убедитесь, что CORS настроен для разрешения запросов с домена вашего frontend-приложения:

```typescript
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-url.render.com'] 
    : 'http://localhost:3000',
  credentials: true
}));
```

2. Проверьте работоспособность приложения, перейдя по URL вашего frontend-приложения
3. Убедитесь, что все функции работают корректно

## Шаг 7: Настройка постоянного домена (опционально)

1. В настройках вашего Static Site на Render перейдите в раздел "Settings" > "Custom Domain"
2. Следуйте инструкциям по настройке вашего домена

## Поддержка и обновление

После деплоя любые изменения, отправленные в репозиторий GitHub, будут автоматически применены на Render. Время сборки и деплоя может занять несколько минут. 
``
Не полный список
``

#Client

### Интерфейсы
- [ ] Создать единые интерфейсы после обновления БД

### Хранилища
- [ ] Сделать схему со всеми хранилищами

### Доступы
- [ ] Ограничить доступы к страницам когда пользователь не авторизован

#Backend
- [ ] Сделать список константных ошибок
- [ ] Заменить ошибки на константные
- [ ] Добавить удаление кортинок после ошибки при создании

- [ ] Добавить ISearchOptions & Projections везде где нужно
    - [X] Brands
    - [ ] [Еще не готов] Categories
    - [ ] [Еще не готов] Orders
    - [X] Products
    - [X] Users

### Гуарды
- [ ] **Возможно** создать гвард для доступа к Company
- [ ] **Возможно** создать интерцептор? для автоматического создание ISearchOptions

- [ ] Изменить AccessGuard
    - [ ] Добавить новые импорты/заменить
        - [X] Auth
        - [X] Brands
        - [X] Cart
        - [ ] [Еще не готов] Categories
        - [ ] [Еще не готов] Companies
        - [ ] [Еще не готов] Compilations
        - [ ] [Еще не готов] ImageLoader
        - [ ] [Еще не готов] Orders
        - [X] Session
        - [ ] [Еще не готов] Products
        - [X] Tokens
        - [ ] [Еще не готов] User
        - [X] Users
        - [ ] [Системный сервис] FileService
        - [ ] [Системный сервис] FileSystem
        - [ ] [Системный сервис] ImageService
        - [ ] [Системный сервис] SharpService

### База данных
- [X] Разделить sessionKey и userModel
- [ ] Разделить orders и userModel
- [X] Разделить cart и userModel
- [ ] Сделать схему связей в БД
- [ ] Сделать базы для хранения картинок компании/пользователя раздельно

- [X] Заменить icon/image на что-то одно

### Сервисы
- [X] Создать сервис SessionService
- [ ] Создать сервис OrdersService
- [X] Создать сервис CompanyAccess

- [X] Добавить доступы к компаниям с модификаторами

- [ ] Добавить { [GET], count, options }
    - [ ] Brands
    - [ ] Categories
    - [ ] Companies
    - [ ] Orders
    - [ ] Products
    - [ ] Users

- [ ] Добавить delete методы
    - [X] Brands
    - [X] Cart
    - [ ] Categories
    - [ ] Companies
    - [ ] ImageLoader
    - [ ] Orders
    - [ ] Session
    - [ ] Products
    - [ ] User

- [ ] Добавить везде обработчики ошибок
    - [ ] Сервисы
        - [X] Auth
        - [ ] Brands
        - [X] Cart
        - [ ] Categories
        - [ ] Companies
        - [ ] Compilations
        - [ ] ImageLoader
        - [ ] Orders
        - [X] Session
        - [ ] Products
        - [ ] Tokens
        - [ ] User
        - [ ] Users
        - [ ] FileService
        - [ ] FileSystem
        - [ ] ImageService
        - [ ] SharpService
        - [ ] CompanyAccess
        - [ ] SessionService
    - [ ] Гварды
        - [ ] AccessTokenGuard
    - [ ] Валидаторы
        - [ ] isPositiveOrZero
        - [ ] isProductDiscountType
    - [ ] Интерцепторы
    - [ ] Пайпы
        - [ ] Validation
    - [ ] Исключения
        - [ ] Validation
    - [ ] Декораторы
        - [ ] Cookie
        - [ ] UserVerified

- [ ] Проверить все доступы
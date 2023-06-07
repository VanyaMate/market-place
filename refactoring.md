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

### База данных
- [ ] Разделить secretToken и userModel
- [ ] Разделить orders и userModel
- [ ] Сделать схему связей в БД

### Сервисы

- [ ] Добавить везде обработчики ошибок
  - [ ] Сервисы
    - [ ] Auth
    - [ ] Brands
    - [ ] Cart
    - [ ] Categories
    - [ ] Companies
    - [ ] Compilations
    - [ ] ImageLoader
    - [ ] Orders
    - [ ] Products
    - [ ] Tokens
    - [ ] User
    - [ ] Users
    - [ ] FileService
    - [ ] FileSystem
    - [ ] ImageService
    - [ ] SharpService
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
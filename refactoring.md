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
 
- [ ] Добавить ISearchOptions & Projections везде где нужно
  - [ ] Users
  - [ ] Brands
  - [ ] Categories
  - [ ] Orders
  - [ ] Products
  - [ ] Users

- [ ] Изменить AccessGuard
  - [ ] Добавить новые импорты/заменить
    - [X] Auth
    - [ ] Brands
    - [ ] Cart
    - [ ] Categories
    - [ ] Companies
    - [ ] Compilations
    - [ ] ImageLoader
    - [ ] Orders
    - [ ] Session
    - [ ] Products
    - [ ] Tokens
    - [ ] User
    - [ ] Users
    - [ ] FileService
    - [ ] FileSystem
    - [ ] ImageService
    - [ ] SharpService

### База данных
- [X] Разделить sessionKey и userModel
- [ ] Разделить orders и userModel
- [ ] Разделить cart и userModel
- [ ] Сделать схему связей в БД

- [ ] Заменить icon/image/generalImage на что-то одно 

### Сервисы
- [ ] Создать сервис SessionService
- [ ] Создать сервис OrdersService

- [ ] Добавить доступы к компаниям с модификаторами

- [ ] Добавить { [GET], count, options } 
  - [ ] Brands
  - [ ] Categories
  - [ ] Companies
  - [ ] Orders
  - [ ] Products
  - [ ] Users
  
- [ ] Добавить delete методы
  - [ ] Brands
  - [ ] Cart
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
    - [ ] Cart
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
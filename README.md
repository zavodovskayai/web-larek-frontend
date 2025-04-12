# Проектная работа "Веб-ларек"

## Краткое описание
**WEB-ларёк** — это веб-приложение для управления корзиной покупок, оформления заказов и взаимодействия с пользователем через динамический интерфейс.

Основная цель проекта — предоставить пользователю удобный интерфейс для выбора товаров, добавления их в корзину, оформления заказа и оплаты.

**Стек:** HTML, SCSS, TS, Webpack

**Структура проекта:**
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

**Важные файлы:**
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Архитректура проекта
Приложение реализовано с использованием архитектурного паттерна **MVP (Model-View-Presenter)** с каталогом товаров и корзиной:
- **Model**: отвечает за данные и взаимодействие с API.
- **View**: отвечает за отображение данных и взаимодействие с пользователем.
- **Presenter**: связывает Model и View, обрабатывает логику приложения.

View генерирует события, которые обрабатываются Presenter.
Presenter вызывает методы Model для получения данных и обновляет View.

## Основные классы
Рассмотрим основные классы, сгуппировав их по слоям MVP.

Важно отметить, что в данных классах были выделены поля и методы. В них:
- **+(плюс)** — публичное свойство, доступно вне класса; 
- **#(решетка)** — защищённое свойство, доступно внутри класса и его потомкам; 
- **-(минус)** — приватное свойство, доступно только внутри класса. 

Типы связей:
- **Ассоциация** — связь, при которой два независимых класса равноправны и просто используют функциональность друг друга. 
- **Агрегация** — взаимодействие двух независимых классов с образованием структуры вложенности: один класс использует другой, при этом используемый класс может существовать отдельно и использоваться где-то ещё. 
- **Композиция** — создание сложного класса из простых; получается вложенная структура, в которой класс содержит другие классы, не способные существовать отдельно. 

## Описание главных файлов
1. AppData.ts
Назначение: Управляет состоянием приложения, включая каталог товаров, корзину и заказы.

Основные методы:
- setCatalog(items: IProduct[]): Устанавливает каталог товаров.
- addToBasket(item: Product): Добавляет товар в корзину.
- removeFromBasket(id: string): Удаляет товар из корзины.
- calculateTotal(): Рассчитывает общую стоимость товаров в корзине.
- validateOrder(type: "delivery" | "contact"): Валидирует данные заказа.

2. index.ts
Назначение: Основная точка входа приложения. Инициализирует события, API, компоненты и обрабатывает пользовательские действия.

Основные функции:
- updateCatalog(): Обновляет каталог товаров.
- updateBasket(): Обновляет корзину.
- Обработчики событий, такие как basket:changed, product:add, order:open.
3. Page.ts
Назначение: Управляет отображением страницы, включая каталог товаров, корзину и блокировку интерфейса.

Основные методы:
- set counter(value: number): Устанавливает количество товаров в корзине.
- set catalog(items: HTMLElement[]): Обновляет каталог товаров.
- set locked(value: boolean): Блокирует или разблокирует интерфейс.

4. Modal.ts
Назначение: Управляет модальными окнами.

Основные методы:
- open(): Открывает модальное окно.
- close(): Закрывает модальное окно.
- set content(value: HTMLElement): Устанавливает содержимое модального окна.

5. Basket.ts
Назначение: Управляет отображением корзины.

Основные методы:
- set items(items: HTMLElement[]): Устанавливает список товаров в корзине.
- set total(total: number): Устанавливает общую стоимость товаров.

6. LarekAPI.ts
Назначение: Обеспечивает взаимодействие с сервером.

Основные методы:
- getProductList(): Получает список товаров.
- getProductItem(id: string): Получает данные о конкретном товаре.
- orderProducts(order: IOrder): Отправляет заказ на сервер.


## Диаграмма UML-классов
### Слои архитектуры
Model (Модель):
- AppData
- Product
- LarekAPI

View (Представление):
- Page
- Modal
- Basket
- Card
- OrderAddress
- OrderContacts

Presenter (Презентер):
- index.ts

### Диаграмма классов
1. Класс AppData
-------------------------
(+) catalog: IProduct[]
(+) basket: IProduct[]
(+) order: IOrder
(+) preview: string | null
(+) formErrors: FormError
-------------------------
(+) setCatalog(items: IProduct[]): void
(+) addToBasket(item: Product): void
(+) removeFromBasket(id: string): void
(+) calculateTotal(): number
(+) setPaymentMethod(method: PaymentMethods): void
(+) setDeliveryAddress(address: string): void
(+) setContactField(field: keyof IOrderFormEmailPhone, value: string): void
(+) validateOrder(type: "delivery" | "contact"): boolean

2. Класс Page
-------------------------
(+) counter: number
(+) catalog: HTMLElement[]
(+) locked: boolean
-------------------------
(+) set counter(value: number): void
(+) set catalog(items: HTMLElement[]): void
(+) set locked(value: boolean): void

3. Класс Modal
-------------------------
(+) content: HTMLElement
-------------------------
(+) open(): void
(+) close(): void
(+) render(data: IModalData): HTMLElement

4. Класс Basket
-------------------------
(+) items: HTMLElement[]
(+) total: number
-------------------------
(+) set items(items: HTMLElement[]): void
+ set total(total: number): void

5. Класс LarekAPI
-------------------------
(+) getProductList(): Promise<IProduct[]>
(+) getProductItem(id: string): Promise<IProduct>
(+) orderProducts(order: IOrder): Promise<IOrderSuccess>

6. Класс Card
-------------------------
(+) id: string
(+) title: string
(+) image: string
(+) description: string
(+) price: number | null
(+) category: string
-------------------------
(+) set id(value: string): void
(+) set title(value: string): void
(+) set image(value: string): void
(+) set description(value: string): void
(+) set price(value: number | null): void
(+) set category(value: string): void

### Слой Model
1. Класс AppData - отвечает за работу с данными. Тип связи: ассоциация с классами Api, EventEmitter.

Поля:
- (+) basket: BasketItem[]  
- (+) products: Product[]  
- (+) selectedProduct: Product | null  
- (#) events: Events

Методы:
- (+) constructor(api: Api, events: EventEmitter)  
- (+) getCard(): Product[]  
- (+) addToBasket(item: BasketItem): void  
- (+) removeFromBasket(id: string): void  
- (+) getBasket(): BasketItem[]  
- (+) selectionPaymentMethod(method: PaymentMethod)
- (+) getSelectedProduct(): Product | null 
- (+) clearBacket() 

2. Класс Product - необходим для описания товаров. Тип связи: ассоциация с классами AppData, Card.

Поля:
- (#) id: string  
- (+) title: string  
- (+) description: string  
- (+) price: number | null
- (+) category: string  
- (+) image: string  

Методы:
- (+) constructor(id: string, title: string, description: string, price: number | null, category: string, image: string) 

**Важно:** Методы класса `Product` не вызываются напрямую в представлениях. Вместо этого, взаимодействие с классом `Product` осуществляется через слой `Presenter`, что позволяет сохранить независимость между слоями Model и View.

3. Класс BasketItem - необходим для отображения элементов в корзине. Тип связи: композиция с классом Basket.

Поля:
- (#) id: string  
- (+) title: string  
- (+) price: number | null
- (+) quantity: number  

Методы:
- (+) constructor(id: string, title: string, price: number, quantity: number)  

4. Класс Order - необходим для отображения заказа. Тип связи: ассоциация с классами AppData, OrderForm.

Поля: 
- (#) id: string  
- (-) items: BasketItem[]  
- (+) total: number | null
- (+) paymentMethod: 'Онлайн' | 'При получении' 
- (+) deliveryAddress: string  

Методы:
- (+) constructor(id: string, items: BasketItem[], total: number | null, paymentMethod: 'Онлайн' | 'При получении', deliveryAddress: string)  

 **Важно:** Методы класса `Order` не вызываются напрямую в представлениях. Вместо этого, взаимодействие с классом `Order` осуществляется через слой `Presenter`, что позволяет сохранить независимость между слоями Model и View.

### Слой View
1. Класс Component (абстрактный) - необходим для отображения базовых элементов и их создание для пользовательского интерфейса. Тип связи: ассоциация с DOM-элементами.

Поля:
- (-) element: HTMLElement  

Методы:
- (+) constructor(element: HTMLElement)  
- (+) toggleClass(className: string): void  
- (+) setText(text: string): void  
- (+) setImage(src: string): void  
- (+) setDisabled(isDisabled: boolean): void  
- (+) setHidden(isHidden: boolean): void  
- (+) setVisible(isVisible: boolean): void  
- (+) render(): void  

2. Класс View (базовый) - расширение класса Component полем events. Тип связи: наследование от Component, ассоциация с EventEmitter.

Поля и методы наследуются от класса Component. В отличие от родителя можно создать его экзепляр (в абстрактных классах нельзя создать его экземпляр)

3. Класс Modal (абстрактный) - отвечает за работы с модальными окнами. Тип связи: ассоциация с DOM-элементами.

Поля: 
- (-) title: string  
- (-) content: HTMLElement | string  

Методы:
- (+) constructor(title: string, content: HTMLElement | string)  
- (+) open(): void  
- (+) close(): void  
- (+) render(): void  

 **Важно:** Класс `Modal` не зависит от контента, который в нём отображается. Он может отображать любой контент, будь то карточка товара, корзина или форма заказа. 

Классы, предоставляющие контент для модального окна (например, `Card`, `Basket`, `OrderForm`), также независимы от `Modal`. Они могут использоваться в других частях приложения, например, на главной странице или в других представлениях.

Взаимодействие между `Modal` и контентом осуществляется через слой `Presenter`. Именно `Presenter` отвечает за создание экземпляра `Modal`, передачу ему контента и управление его поведением. Это позволяет сохранить независимость между слоями Model и View.

4. Класс Card - необходим для отображения карточек. Тип связи: композиция с DOM-элементами.

Поля:
- (#) id: string  
- (+) title: string  
- (+) price: number | null
- (+) category: string  
- (+) image: string  
- (+) template: HTMLTemplateElement  
- (-) addToCartButton: HTMLButtonElement 

Методы:
- (+) constructor(template: HTMLTemplateElement, data: Product, onClick: (product: Product) => void)  
- (+) render(): HTMLElement  
- (+) setDeleteButtonHandler(handler: () => void): void  

**Важно:** Класс `Card` является независимым и универсальным. Его реализация позволяет использовать карточки товаров в различных контекстах, например, в галерее (`Gallery`) или корзине (`Basket`). При этом классы `Gallery` и `Basket` не зависят от конкретного шаблона карточки и могут работать с карточками любых структур.

Взаимодействие между `Card` и `Gallery` или `Basket` осуществляется через слой `Presenter`. Это позволяет сохранить гибкость и независимость классов, а также упрощает их модификацию и переиспользование.

5. Класс Gallery - отвечает за галлерею картинок на главном экране. Тип связи: агрегация с классами Card, ассоциация с AppData.

Поля:
- (-) container: HTMLElement - HTML-элемент, в который вставляется разметка карточек товаров.  

Методы:
- (+) constructor(products: Product[])  
- (+) render(): void  
- (+) onProductClick(product: Product): void  

**Важно:** Класс `Gallery` не хранит состояние данных (`products`). Список товаров передаётся в метод `render` в качестве параметра. Это позволяет классу `Gallery` быть независимым от данных и сосредоточиться исключительно на отображении.

Состояние данных (например, список товаров) хранится в классе модели данных (`AppData`). Взаимодействие между `Gallery` и `AppData` осуществляется через слой `Presenter`. Например:
- Пользователь взаимодействует с карточкой товара в галерее.
- `Gallery` генерирует событие, которое обрабатывается в `Presenter`.
- `Presenter` вызывает методы модели данных (`AppData`) для обработки события.
- После обработки данных `Presenter` вызывает метод `render` класса `Gallery`, передавая обновлённый список товаров.

6. Класс Basket - отвечает за отображение корзины. Тип связи: композиция с классами BasketItem, ассоциация с AppData.

Поля:
- (-) container: HTMLElement - HTML-элемент, в который вставляется разметка элементов корзины.
- (-) totalElement: HTMLElement - HTML-элемент для отображения общей стоимости товаров.
- (-) checkoutButton: HTMLElement - HTML-элемент кнопки оформления заказа. 

Методы:
- (+) constructor(container: HTMLElement, totalElement: HTMLElement, checkoutButton: HTMLElement)  
- (+) render(items: BasketItem[]): void  
- (+) setCheckoutHandler(handler: () => void): void 

**Важно:** Класс `Basket` не хранит состояние данных корзины (например, список товаров или общую стоимость). Эти данные хранятся в модели данных (`AppData`). Класс `Basket` отвечает только за отображение данных, которые передаются ему через метод `render`.

Функционал добавления, удаления товаров из корзины и расчёта общей стоимости реализуется в методах модели данных (`AppData`). Например:
- Пользователь нажимает кнопку удаления товара.
- Класс `Basket` генерирует событие через метод `emit`.
- Событие обрабатывается в `Presenter`, который вызывает метод модели данных для удаления товара.
- После обновления данных модель передаёт обновлённый список товаров в метод `render` класса `Basket` для отображения.

7. Класс OrderForm - отображает форму заказа. Тип связи: ассоциация с Order.

Поля:
- (-) container: HTMLElement - HTML-элемент, в который вставляется разметка формы заказа.
- (-) paymentButtons: NodeListOf<HTMLButtonElement> - Кнопки выбора способа оплаты.
- (-) addressInput: HTMLInputElement - Поле ввода адреса доставки.
- (-) nextButton: HTMLButtonElement - Кнопка для перехода к следующему шагу.

Методы:
- (+) constructor(container: HTMLElement, paymentButtons: NodeListOf<HTMLButtonElement>, addressInput: HTMLInputElement, nextButton: HTMLButtonElement)  
- (+) render(): void  
- (+) validate(): boolean  
- (+) setNextHandler(handler: () => void): void  

**Важно:** Класс `OrderForm` не хранит данные о способе оплаты или адресе доставки. Эти данные передаются в модель через слой `Presenter`. Например:
- Пользователь выбирает способ оплаты и вводит адрес доставки.
- Класс `OrderForm` генерирует событие через метод `emit`.
- Событие обрабатывается в `Presenter`, который вызывает метод модели для сохранения данных.

8. Класс ContactsForm - необходим для формы заполнения контактных данных. Тип связи: композиция с Modal,ассоциация с EventEmitter.

Поля:
- (-) emailInput: HTMLInputElement
- (-) phoneInput: HTMLInputElement
- (-) submitButton: HTMLButtonElement
- (-) container: HTMLElement - HTML-элемент, в который вставляется разметка формы.

Методы:
- (+) constructor(container: HTMLElement, emailInput: HTMLInputElement, phoneInput: HTMLInputElement, submitButton: HTMLButtonElement)  
- (+) render(): void  
- (+) validate(): boolean  
- (+) getFormData(): { email: string; phone: string }  
- (+) onSubmit(handler: (data: { email: string; phone: string }) => void): void  

**Важно:** Класс `ContactsForm` не хранит данные о введённых пользователем контактных данных. Эти данные передаются в модель через слой `Presenter`. Например:
- Пользователь заполняет форму и нажимает кнопку отправки.
- Класс `ContactsForm` генерирует событие через метод `emit`.
- Событие обрабатывается в `Presenter`, который вызывает метод модели для сохранения данных.

9. Класс OrderSuccess. Тип связи: ассоциация с Order.

Поля:
- (-) container: HTMLElement - HTML-элемент, в который вставляется разметка успешного оформления заказа.
- (-) closeButton: HTMLButtonElement - Кнопка для закрытия сообщения об успешном заказе.

Методы:
- (+) constructor(container: HTMLElement, closeButton: HTMLButtonElement)  
- (+) render(total: number): void 

**Важно:** Класс `OrderSuccess` не хранит состояние данных, таких как общая сумма заказа. Вместо этого, он принимает сумму заказа в качестве параметра метода `render`. Это позволяет классу `OrderSuccess` быть универсальным и отображать информацию о заказе, передавая необходимые данные из модели через слой `Presenter`.

Взаимодействие между `OrderSuccess` и моделью данных осуществляется через `Presenter`. Например:
- После успешного оформления заказа, `Presenter` вызывает метод `render` класса `OrderSuccess`, передавая общую сумму заказа.
- Класс `OrderSuccess` отображает сообщение об успешном заказе с указанной суммой.

10. Класс Header - отображает элементы шапки. Тип связи: композиция с DOM-элементами.

Поля:
- (-) logo: HTMLElement  
- (-) basketIcon: HTMLElement  
- (-) basketCounter: HTMLElement  

Методы:
- (+) constructor(logo: HTMLElement, basketIcon: HTMLElement, basketCounter: HTMLElement)  
- (+) render(): void  
- (+) updateBasketCounter(count: number): void  

### Слой Presenter
1. Класс EventEmitter - отвечайт за события. Тип связи: ассоциация с классами AppData, View.

Поля: 
- (-) _events: Map 

Методы:
- (+) constructor()  
- (+) on: void  
- (+) off: void  
- (+) emit: void  
- (+) onAll: void  
- (+) offAll(): void  
- (+) trigger: (data: T) => void  

2. Класс Api - отвечает за общую часть, связанную с API. Тип связи: ассоциация с AppData.

Поля:
- (+) baseUrl: string  
- (-) options: RequestInit  

Методы:
- (+) constructor(baseUrl: string, options?: RequestInit)  
- (-) handleResponse(response: Response): Promise 
- (+) get(uri: string): Promise 
- (+) post(uri: string, data: object, method: string): Promise


3. Класс AppPresenter - отвечает за визуал. Тип связи: ассоциация с AppData, EventEmitter, View.
plaintext

Поля:
- (-) appData: AppData  
- (-) eventEmitter: EventEmitter  

Методы:
- (+) constructor(appData: AppData, eventEmitter: EventEmitter)  
- (+) initialize(): void  
- (+) handleCardClick(product: Product): void  
- (+) handleBasketUpdate(): void  

Таким образом, были описаны классы, необходимые для функционаирования приложения. 

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

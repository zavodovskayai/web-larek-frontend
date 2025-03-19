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

3. Класс BasketItem - необходим для отображения элементов в корзине. Тип связи: композиция с классом IBasket.

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

2. Класс View (базовый) - расширение класса Component полем events. Тип связи: наследование от IComponent, ассоциация с EventEmitter.

Поля и методы наследуются от класса Component. В отличие от родителя можно создать его экзепляр (в абстрактных классах нельзя создать его экземпляр)

3. Класс Modal - отвечает за работы с модальными окнами. Тип связи: композиция с классами Product, Basket, OrderForm.

Поля: 
- (-) title: string  
- (-) content: HTMLElement | string  

Методы:
- (+) constructor(title: string, content: HTMLElement | string)  
- (+) open(): void  
- (+) close(): void  
- (+) render(): void  

4. Класс Card - необходим для отображения карточек. Тип связи: композиция с DOM-элементами, ассоциация с Gallery и Backet.

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

5. Класс Gallery - отвечает за галлерею картинок на главном экране. Тип связи: агрегация с классами Card, ассоциация с AppData.

Поля:
- (-) products: Product[]  

Методы:
- (+) constructor(products: Product[])  
- (+) render(): void  
- (+) onProductClick(product: Product): void  

6. Класс Basket - отвечает за отображение корзины. Тип связи: композиция с классами BasketItem, ассоциация с AppData.

Поля:
- (-) items: BasketItem[]  
- (-) total: number  
- (-) checkoutButton: HTMLElement  

Методы:
- (+) constructor(items: BasketItem[], checkoutButton: HTMLElement)  
- (+) addItem(item: BasketItem): void  
- (+) removeItem(itemId: string): void  
- (+) calculateTotal(): number  
- (+) render(): void  
- (+) setCheckoutHandler(handler: () => void): void  

7. Класс OrderForm - отображает форму заказа. Тип связи: ассоциация с Order.

Поля:
- (-) paymentMethod: 'Онлайн' | 'При получении' 
- (-) deliveryAddress: string  
- (-) nextButton: HTMLButtonElement

Методы:
- (+) constructor()  
- (+) render(): void  
- (+) validate(): boolean  
- (+) submit(): void  
- (+) setNextHandler(handler: () => void): void

8. Класс ContactsForm - необходим для формы заполнения контактных данных. Тип связи: композиция с Modal,ассоциация с EventEmitter.

Поля:
- (-) emailInput: HTMLInputElement
- (-) phoneInput: HTMLInputElement
- (-) submitButton: HTMLButtonElement
- (-) formElement: HTMLFormElement

Методы:
- (+) constructor(template: HTMLTemplateElement)
- (+) render(): HTMLElement
- (+) validate(): boolean
- (+) getFormData(): { email: string; phone: string }
- (+) onSubmit(handler: (data: { email: string; phone: string }) => void): void

9. Класс OrderSuccess. Тип связи: ассоциация с Order.

Поля:
- (-) total: number  

Методы:
- (+) constructor(total: number)  
- (+) render(): void 

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

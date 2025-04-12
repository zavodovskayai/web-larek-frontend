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

## Диаграмма UML-классов
### Слои архитектуры
Model (Модель):
- AppData
- Product
- LarekAPI
- Model<T>

View (Представление):
- Page
- Modal
- Basket
- Card
- OrderAddress
- OrderContacts
- Success
- BasketCard

Presenter (Презентер):
- index.ts

Base (Базовые классы):
- Component<T>
- EventEmitter

### Диаграмма классов
1. Класс AppData

Поля:
- (+) catalog: IProduct[]
- (+) basket: IProduct[]
- (+) order: IOrder
- (+) preview: string | null
- (+) formErrors: FormError

Методы:
- (-) createEmptyOrder(): IOrder
- (+) updateBasketState()
- (+) resetBasket()
- (+) resetOrder()
- (+) setCatalog(items: IProduct[])
- (+) setProductPreview(item: Product)
- (+) getBasketProducts(): IProduct[]
- (+) isProductInBasket(item: IProduct): boolean
- (+) addProductToBasket(item: Product)
- (+) removeProductFromBasket(id: string)
- (+) calculateTotal(): number
- (+) setPaymentMethod(method: string)
- (+) setOrderFieldDelivery(value: string)
- (+) setOrderFieldContact(field: keyof IOrderFormEmailPhone, value: string)
- (+) validateOrder(type: "delivery" | "contact"): boolean

Связи:
- ассоциация с Product
- агрегация с EventEmitter

2. Класс Page

Поля:
- (#) _counter: HTMLElement;
- (#) _catalog: HTMLElement;
- (#) _wrapper: HTMLElement;
- (#) _basket: HTMLElement;

Методы:
- (#) constructor(container: HTMLElement, protected events: IEvents)
- (+) set counter(value: number)
- (+) set catalog(items: HTMLElement[]): void
- (+) set locked(value: boolean): void

Связи:
- агрегация с EventEmitter

3. Класс Modal

Поля:
- (#) _closeButton: HTMLButtonElement;
- (#) _content: HTMLElement;

Методы:
- (#) constructor(container: HTMLElement, protected events: IEvents)
- (+) open(): void
- (+) close(): void
- (+) render(data: IModalData): HTMLElement

Связи:
- агрегация с EventEmitter

4. Класс Basket

Поля:
- (#) _list: HTMLElement;
- (#) protected _total: HTMLElement;
- (#) protected _button: HTMLElement;

Методы:
- (#) constructor(container: HTMLElement, protected events: EventEmitter)
- (+) toggleButton(state: boolean)
- (+) set items(items: HTMLElement[])
- (+) set total(total: number)

Связи:
- агрегация с EventEmitter

5. Класс LarekAPI

Поля:
- (+) cdn: string

Методы:
- (-) constructor(cdn: string, baseUrl: string, options?: RequestInit)
- (+) getProductList(): Promise<IProduct[]>
- (+) getProductItem(id: string): Promise<IProduct>
- (+) orderProducts(order: IOrder): Promise<IOrderSuccess>

Связи:
- ассоциация с AppData

6. Класс Card

Поля:
- (#) _title: HTMLElement;
- (#) _image?: HTMLImageElement;
- (#) _description?: HTMLElement;
- (#) _button?: HTMLButtonElement;
- (#) _category?: HTMLElement;
- (#) _price: HTMLElement;
- (#) _buttonModal?: HTMLButtonElement;
- (-) color: { [key: string]: string }

Методы:
- (#) constructor(protected blockName: string, container: HTMLElement, action?: ICardAction)
- (+) set id(value: string)
- (+) get id(): string
- (+) set title(value: string)
- (+) get title(): string
- (+) set image(value: string)
- (+) set description(value: string | string[])
- (+) set titleOfButton(value: string)
- (+) set price(value: number | null)
- (+) set category(value: string)
- (+) get category() 

Связь: 
- ассоциация с BasketCard

7. Класс OrderAddress

Поля:
- (#) _payment: HTMLDivElement;
- (#) _button: HTMLButtonElement[];

Методы:
- (-) constructor(container: HTMLFormElement, events: IEvents)
- (+) updatePaymentMethod(selectedMethod: string): void
- (+) set address(value: string)

Связи:
- агрегация с EventEmitter

8. Класс OrderContacts

Поля:
- (+) phone: string
- (+) email: string

Методы:
- (+) set phone(value: string): void
- (+) set email(value: string): void

Связи:
- агрегация с EventEmitter

9. Класс Success

Поля:
- (#) _close: HTMLElement;
- (#) _total: HTMLElement;

Методы:
- (-) constructor(container: HTMLElement, actions: ISuccessActions)
- (+) render(data: ISuccess): HTMLElement
- (+) set totalWrittenOff(value: number)

Связи:
- агрегация с EventEmitter

10. Класс BasketCard

Поля:
- (#) _index: HTMLElement;
- (#) _title: HTMLElement;
- (#) _price: HTMLElement;
- (#) _deleteButton: HTMLButtonElement;

Методы:
- (-) constructor(container: HTMLElement, index: number, action?: ICardAction)
- (+) set index(value: number)
- (+) set title(value: string)
- (+) set price(value: number)

Связи:
- ассоциация с Card

11. Класс Api

Поля:
- (-) baseUrl: string
- (#) options: RequestInit

Методы:
- (-) constructor(baseUrl: string, options: RequestInit = {})
- (#) handleResponse(response: Response): Promise
- (+) get(uri: string)
- (+) post(uri: string, data: object, method: ApiPostMethods = 'POST')

Связи:
- ассоциация с LarekAPI

12. Абстрактный класс Component

Поля:
- (#) container: HTMLElement

Методы:
- (+) toggleClass(element: HTMLElement, className: string, force?: boolean)
- (#) setText(element: HTMLElement, value: unknown)
- (+) setDisabled(element: HTMLElement, state: boolean)
- (#) setHidden(element: HTMLElement)
- (#) setVisible(element: HTMLElement)
- (#) setImage(element: HTMLImageElement, src: string, alt?: string)
- (+) render(data?: Partial): HTMLElement

Связи:
- композиция со всеми классами слоя View

13. Класс EventEmitter

Поля:
- (-) _events: Map<>

Методы:
- (-) constructor()
- (+) on(eventName: EventName, callback: (event: T) => void)
- (+) off(eventName: EventName, callback: Subscriber)
- (+) emit(eventName: string, data?: T)
- (+) onAll(callback: (event: EmitterEvent) => void)
- (+) offAll()
- (+) trigger(eventName: string, context?: Partial)

Связи:
- агрегация с AppData, Page, Modal и т.д.

14. Абстрактный класс Model

Поля:
- (#) events: IEvents

Методы:
- (#) constructor(data: Partial, protected events: IEvents)
- (+) emitChanges(event: string, payload?: object)

Связи:
- композиция с AppData и Product.

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

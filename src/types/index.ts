/**
 * Интерфейс для карточки товара
 */
export interface IProduct {
    id: string; // Уникальный идентификатор товара
    title: string; // Название товара
    description: string; // Описание товара
    price: number | null; // Цена товара (предполагаем, что цена может быть не указана, так как она может быть договорная)
    category: string; // Категория товара
    image: string; // URL изображения товара
};

/**
 * Интерфейс для корзины
 */
export interface IBasket {
    items: BasketItem[]; // Список товаров в корзине
    total: number; // Общая стоимость товаров в корзине
}

/**
 * Типы для элемента корзины
 */
export type BasketItem = {
    id: string; // Уникальный идентификатор товара
    title: string; // Название товара
    price: number | null; // Цена товара
    quantity: number; // Количество товара в корзине
};

/**
 * Интерфейс для заказа
 */
export interface IOrder {
    id: string; // Уникальный идентификатор заказа
    items: BasketItem[]; // Список товаров в заказе
    total: number | null; // Общая стоимость заказа
    paymentMethod: 'Онлайн' | 'При получении'; // Способ оплаты
    deliveryAddress: string; // Адрес доставки
};

/**
 * Интерфейс для карточек
 */
export interface ICard {
    id: string; // Уникальный идентификатор товара
    title: string; // Название товара
    price: number | null; // Цена товара
    category: string; // Категория товара
    image: string; // URL изображения товара
    template: HTMLTemplateElement; // Шаблон карточки
    onClick: (product: IProduct) => void; // Обработчик клика по карточке
};

/**
 * Интерфейс для данных приложения
 */
export interface AppData {
    basket: BasketItem[]; // Список товаров в корзине
    products: IProduct[]; // Список всех товаров
    selectedProduct: IProduct | null; // Выбранный товар
};

/**
 * Интерфейс для модальных окон
 */
export interface IModal {
    title: string; // Заголовок модального окна
    content: HTMLElement | string; // Содержимое модального окна
    open(): void; // Метод для открытия модального окна
    close(): void; // Метод для закрытия модального окна
    render(): void; // Метод для рендеринга содержимого модального окна
};

/**
 * Интерфейс для базового компонента
 */
export interface IComponent {
    element: HTMLElement; // DOM-элемент, связанный с компонентом
    render(): void; // Метод для рендеринга компонента
};

/**
 * Интерфейс для галлереи
 */
export interface IGallery {
    products: IProduct[]; // Массив товаров для отображения
    render(): void; // Метод для рендеринга галереи
    onProductClick(product: IProduct): void; // Метод для обработки клика по карточке товара
};

/**
 * Интерфейс для формы заказа
 */
export interface IOrderForm {
    paymentMethod: string; // Способ оплаты
    deliveryAddress: string; // Адрес доставки
    render(): void; // Метод для рендеринга формы
    validate(): boolean; // Метод для валидации формы
    submit(): void; // Метод для отправки формы
};

/**
 * Интерфейс для успешной оплаты
 */
export interface IOrderSuccess {
    total: number; // Общая сумма заказа
    render(): void; // Метод для рендеринга сообщения
};

/**
 * Интерфейс для шапки
 */
export interface IHeader {
    logo: HTMLElement; // Логотип сайта
    basketIcon: HTMLElement; // Иконка корзины
    basketCounter: HTMLElement; // Счётчик товаров в корзине
    render(): void; // Метод для рендеринга шапки
    updateBasketCounter(count: number): void; // Метод для обновления счётчика товаров
};

/**
 * Интерфейс для данных формы контактов
 */
export interface IContactsFormData {
    email: string; // Email пользователя
    phone: string; // Телефон пользователя
}

/**
 * Интерфейс для формы контактов
 */
export interface IContactsForm {
    emailInput: HTMLInputElement; // Поле ввода email
    phoneInput: HTMLInputElement; // Поле ввода телефона
    submitButton: HTMLButtonElement; // Кнопка отправки формы
    formElement: HTMLFormElement; // HTML-элемент формы
    render(): HTMLElement; // Метод для рендеринга формы
    validate(): boolean; // Метод для валидации данных формы
    getFormData(): IContactsFormData; // Метод для получения данных формы
    onSubmit(handler: (data: IContactsFormData) => void): void; // Метод для обработки отправки формы
}

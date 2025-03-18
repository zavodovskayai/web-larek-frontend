/**
 * Интерфейс для карточки товара
 */
export interface ICard {
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
    price: number; // Цена товара
    quantity: number; // Количество товара в корзине
};

/**
 * Интерфейс для заказа
 */
export interface IOrder {
    id: string; // Уникальный идентификатор заказа
    items: BasketItem[]; // Список товаров в заказе
    total: number; // Общая стоимость заказа
    paymentMethod: 'online' | 'cash'; // Способ оплаты (online - предполагает онлайн оплату картой; cash - предполагает оплату наличными)
    deliveryAddress: string; // Адрес доставки
    status: 'pending' | 'completed' | 'cancelled'; // Статус заказа
};

/**
 * Методы для отправки данных
 */
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
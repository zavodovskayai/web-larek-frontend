// Рассмотрение основных типов
// Тип ошибки формы
export type FormError = Partial<Record<keyof IOrder, string>>

// Типы методов оплаты
export type PaymentMethods = 'card' | 'cash' | ''

// Рассмотрение интерфейсов главной страницы
// Интерфейс продукта
export interface IProduct {
  id: string,
  description: string,
  image: string,
  title: string,
  category: string,
  price: number | null,
}

// Интерфейс страницы
export interface IPage {
  counter: number;
  store: HTMLElement[];
  locked: boolean;
}

// Рассмотрение интерфейсов модальных окон
// Интерфейс карточки
export interface ICard {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number | null;
  selected: boolean;
  button: string;
}

// Интерфейс продукта с корзине
export interface IBasketItem {
  title: string;
  price: number;
}

// Интерфейс Данных
export interface IAppData {
  catalog: IProduct[],
  order: IOrder | null,
  basket: IProduct[] | null,
  preview: string | null,
  loading: boolean,
}

// Рассмотрение интерфейсов, важных для заказа
// Интерфейс модального окна с заполнением телефона и почты
export interface IOrderFormEmailPhone {
  email: string,
  phone: string,
}

// Интерфейс модального окна с заполнением типа оплаты и адреса
export interface IOrderFormDelivery {
  payment: PaymentMethods,
  address: string,
}

// Интерфейс ошибки заказа
export interface IOrderFormError extends IOrderFormEmailPhone, IOrderFormDelivery {}

// Интерфейс заказа
export interface IOrder extends IOrderFormError {
  items: string[],
  total: number;
  payment: PaymentMethods;
}

// Интерфейс модального окна успешной оплаты
export interface IOrderSuccess {
  id: string;
  total: number;
}


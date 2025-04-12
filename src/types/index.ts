import {Product} from '../components/Product'
// Тип ошибки формы
export type FormError = Partial<Record<keyof IOrder, string>>

// Типы методов оплаты
export type PaymentMethods = 'card' | 'cash' | ''

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
  catalog: HTMLElement[];
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

// Интерфейс действия карточки
export interface ICardAction {
  onClick: (event: MouseEvent) => void;
}

// Типы методов для API
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

// Хорошая практика даже простые типы выносить в алиасы
// Зато когда захотите поменять это достаточно сделать в одном месте
export type EventName = string | RegExp;
export type Subscriber = Function;
export type EmitterEvent = {
  eventName: string,
  data: unknown
};

export interface IEvents {
  on<T extends object>(event: EventName, callback: (data: T) => void): void;
  emit<T extends object>(event: string, data?: T): void;
  trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}

// Интерфейс для просмотра корзины
export interface IBasketView {
  items: HTMLElement[];
  total: number;
  selected: string[];
}

// Интерфейс форм
export interface IFormState {
  valid: boolean;
  errors: string[];
}

// Интерфейс данных модальных окон
export interface IModalData {
  content: HTMLElement;
}

// Интерфейсы для "успешного" модального окна
export interface ISuccess {
  total: number;
}

export interface ISuccessActions {
  onClick: () => void;
}

// Интерфейс для методов LarekAPI
export interface ILarekAPI {
  getProductList: () => Promise<IProduct[]>
  getProductItem: (id: string) => Promise<IProduct>
  orderProducts: (order: IOrder) => Promise<IOrderSuccess>
}

// Тип смены действия каталога
export type CatalogChangeEvent = {
  catalog: Product[];
}


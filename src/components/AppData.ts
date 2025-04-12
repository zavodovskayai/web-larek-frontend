import {Model} from "./base/model";
import {FormError, IAppData, IProduct, IOrder, IOrderFormEmailPhone, PaymentMethods } from "../types";

export type CatalogChangeEvent = {
  catalog: Product[];
}

export class Product extends Model<IProduct> implements IProduct {
  description: string;
  id: string;
  image: string;
  title: string;
  price: number | null;
  category: string;
}

export class AppData extends Model<IAppData> {
  catalog: IProduct[] = [];
  basket: IProduct[] = [];
  order: IOrder = this.createEmptyOrder();
  preview: string | null = null;
  formErrors: FormError = {};

  /**
   * Создаёт пустой объект заказа.
   */
  private createEmptyOrder(): IOrder {
    return {
      payment: "",
      items: [],
      total: 0,
      email: "",
      phone: "",
      address: "",
    };
  }

  /**
   * Обновляет состояние корзины и вызывает соответствующие события.
   */
  updateBasketState() {
    this.emitChanges('counter:changed', this.basket);
    this.emitChanges('basket:changed', this.basket);
  }

  /**
   * Очищает корзину и обновляет её состояние.
   */
  resetBasket() {
    this.basket = [];
    this.updateBasketState();
  }

  /**
   * Очищает данные заказа.
   */
  resetOrder() {
    this.order = this.createEmptyOrder();
  }

  /**
   * Устанавливает каталог товаров и вызывает событие обновления.
   */
  setCatalog(items: IProduct[]) {
    this.catalog = items.map(item => new Product(item, this.events))
    this.emitChanges('items:changed', { catalog: this.catalog })
  }

  /**
   * Устанавливает превью для выбранного товара.
   */
  setProductPreview(item: Product) {
    this.preview = item.id;
    this.emitChanges('preview:changed', item)
  }

  /**
   * Возвращает товары, добавленные в корзину.
   */
  getBasketProducts(): IProduct[] {
		return this.basket;
	}

  /**
   * Проверяет, находится ли товар в корзине.
   */
  isProductInBasket(item: IProduct): boolean {
    return this.basket.some((product) => product.id === item.id);
  }

  /**
   * Добавляет товар в корзину, если его там ещё нет.
   */
  addProductToBasket(item: Product) {
    if(!this.isProductInBasket(item)) {
      this.basket.push(item)
      this.updateBasketState()
    }
  }

  /**
   * Удаляет товар из корзины по его ID.
   */
  removeProductFromBasket(id: string) {
    this.basket = this.basket.filter((product) => product.id !== id);
    this.updateBasketState(); // Обновляем состояние корзины и счётчик
  }

  /**
   * Рассчитывает общую стоимость товаров в заказе.
   */
  calculateTotal(): number {
    let totalAmount = 0;
    this.order.items.forEach((itemId) => {
      const product = this.catalog.find((product) => product.id === itemId);
      if (product && product.price) {
        totalAmount += product.price;
      } else {
        console.warn(`Продукт с ID ${itemId} не найден или же он бесценный.`);
      }
    });
    return totalAmount;
  }

  /**
   * Устанавливает способ оплаты.
   */
  setPaymentMethod(method: string) {
    this.order.payment = method as PaymentMethods;
    this.validateOrder("delivery");
  }

  /**
   * Устанавливает адрес доставки.
   */
  setOrderFieldDelivery(value: string) {
    this.order.address = value;
    this.validateOrder("delivery");
  };

  /**
   * Устанавливает контактные данные.
   */
  setOrderFieldContact(field: keyof IOrderFormEmailPhone, value: string) {
    this.order[field] = value;
    this.validateOrder("contact");
  }

  /**
   * Универсальная валидация полей заказа.
   */
  validateOrder(type: "delivery" | "contact"): boolean {
    const errors: FormError = {};

    if (type === "delivery") {
      if (!this.order.payment) {
        errors.payment = "Необходимо указать способ оплаты";
      }
      if (!this.order.address) {
        errors.address = "Необходимо указать адрес";
      }
      this.events.emit("deliveryFormError:change", errors);
    }

    if (type === "contact") {
      if (!this.order.email) {
        errors.email = "Необходимо указать email";
      }
      if (!this.order.phone) {
        errors.phone = "Необходимо указать телефон";
      }
      this.events.emit("contactFormError:change", errors);
    }

    this.formErrors = errors;
    return Object.keys(errors).length === 0;
  }
}
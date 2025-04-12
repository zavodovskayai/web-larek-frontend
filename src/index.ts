import './scss/styles.scss';
import {LarekAPI} from "./components/LarekAPI";
import {API_URL, CDN_URL} from "./utils/constants";
import {EventEmitter} from "./components/base/events";
import {AppData} from "./components/AppData";
import {Product} from './components/Product'
import {Page} from "./components/Page";
import {cloneTemplate, ensureElement} from "./utils/utils";
import {Modal} from "./components/common/Modal";
import {Card} from './components/Card';
import {BasketCard} from './components/BasketCard';
import {Basket} from './components/common/Basket';
import {OrderAddress} from './components/OrderAddress';
import {Success} from './components/common/Success';
import {OrderContacts} from './components/OrderContacts';
import {IOrderFormEmailPhone, IOrderFormDelivery, CatalogChangeEvent} from './types';

// Инициализация событий и API
const events = new EventEmitter();
const api = new LarekAPI(CDN_URL, API_URL);

// Шаблоны
const templates = {
  cardCatalog: ensureElement<HTMLTemplateElement>('#card-catalog'),
  cardPreview: ensureElement<HTMLTemplateElement>('#card-preview'),
  cardBasket: ensureElement<HTMLTemplateElement>('#card-basket'),
  basket: ensureElement<HTMLTemplateElement>('#basket'),
  delivery: ensureElement<HTMLTemplateElement>('#order'),
  contact: ensureElement<HTMLTemplateElement>('#contacts'),
  success: ensureElement<HTMLTemplateElement>('#success'),
};

// Состояние приложения
const appDataNew = new AppData({}, events);

// Основные компоненты
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(templates.basket), events);
const delivery = new OrderAddress(cloneTemplate(templates.delivery), events)
const contact = new OrderContacts(cloneTemplate(templates.contact), events);

// Открытие корзины
events.on('basket:open', () => {
  modal.render({
    content: basket.render({}),
  });
});

// Выбор товара
events.on('product:selected', (product: Product) => {
  appDataNew.setProductPreview(product);
});

// Обновление каталога
events.on<CatalogChangeEvent>('items:changed', () => {
  page.catalog = appDataNew.catalog.map(item => {
    const card = new Card('card', cloneTemplate(templates.cardCatalog), {
      onClick: () => events.emit('card:select', item)
    });
    return card.render({
      title: item.title,
      image: item.image,
      price: item.price,
      category: item.category
    });
  });
});

// Обновление корзины
events.on('basket:changed', () => {
  updateBasketItems();
  updateBasketTotal();
});

function updateBasketItems() {
  basket.items = appDataNew.getBasketProducts().map((item, index) => {
      const card = new BasketCard(cloneTemplate(templates.cardBasket), index, {
          onClick: () => appDataNew.removeProductFromBasket(item.id),
      });
      return card.render({
          title: item.title,
          price: item.price,
      });
  });
}

function updateBasketTotal() {
  const total = appDataNew.getBasketProducts().reduce((sum, item) => sum + item.price, 0);
  basket.total = total;
  appDataNew.order.total = total;
}

// Добавление товара в корзину
events.on('product:add', (item: Product) => {
  appDataNew.addProductToBasket(item);
  modal.close();
});

// Удаление товара из корзины
events.on('product:remove', (item: Product) => {
  appDataNew.removeProductFromBasket(item.id)
});

// Открытие модального окна доставки
events.on('order:open', () => {
  appDataNew.setPaymentMethod('');
  delivery.updatePaymentMethod('');
  modal.render({
    content: delivery.render({
      payment: '',
      address: '',
      valid: false,
      errors: [],
    }),
  });
  appDataNew.order.items = appDataNew.basket.map((item) => item.id);
});

// Изменение способа оплаты
events.on('order.payment:change', (data: { target: string }) => {
	appDataNew.setPaymentMethod(data.target);
});

// Изменение адреса доставки
events.on('order.address:change', (data: { value: string }) => {
	appDataNew.setOrderFieldDelivery(data.value);
});

// Валидация доставки
events.on('deliveryFormError:change', (errors: Partial<IOrderFormDelivery>) => {
  const { payment, address } = errors;
  delivery.valid = !payment && !address
  delivery.errors = Object.values({ payment, address }).filter(i => !!i).join('; ');
});

// Открытие модального окна контактов
events.on('order:submit', () => {
  modal.render({
    content: contact.render({
      phone: '',
      email: '',
      valid: false,
      errors: [],
    })
  })
});

// Изменение контактных данных
events.on(/^contacts\..*:change/, (data: {field: keyof IOrderFormEmailPhone, value: string}) => {
  appDataNew.setOrderFieldContact(data.field, data.value)
});

// Валидация контактов
events.on('contactFormError:change', (errors: Partial<IOrderFormEmailPhone>) => {
  const { email, phone } = errors
  contact.valid = !email && !phone
  contact.errors = Object.values({ phone, email }).filter(i => !!i).join('; ')
});

// Оформление заказа
events.on('card:select', (item: Product) => {
  appDataNew.setProductPreview(item);
});

events.on('counter:changed', () => {
  page.counter = appDataNew.basket.length;
});

events.on('preview:changed', (item: Product) => {
  if (item) {
    api.getProductItem(item.id).then((res) => {
      item.id = res.id;
      item.category = res.category;
      item.title = res.title;
      item.description = res.description;
      item.image = res.image;
      item.price = res.price;

      const card = new Card('card', cloneTemplate(templates.cardPreview), {
        onClick: () => {
          if (appDataNew.isProductInBasket(item)) {
            appDataNew.removeProductFromBasket(item.id);
            modal.close();
          } else {
            events.emit('product:add', item);
          }
        },
      });

      const buttonTitle: string = appDataNew.isProductInBasket(item)
        ? 'Убрать из корзины'
        : 'Купить';

      card.titleOfButton = buttonTitle;

      modal.render({
        content: card.render({
          title: item.title,
          description: item.description,
          image: item.image,
          price: item.price,
          category: item.category,
          button: buttonTitle,
        }),
      });
    });
  }
});

events.on('contacts:submit', () => {
  api.orderProducts(appDataNew.order)
    .then(() => {
      const totalSynapses = appDataNew.order.total; // Получаем сумму из состояния заказа
      appDataNew.resetBasket(); // Очистка корзины
      appDataNew.resetOrder(); // Очистка данных заказа
      const success = new Success(cloneTemplate(templates.success), {
        onClick: () => {
          modal.close();
        },
      });
      modal.render({
        content: success.render({
          total: totalSynapses, // Передаем сумму в компонент Success
        }),
      });
    })
    .catch((err) => {
      console.error(err);
    });
});

// Блокировка и разблокировка страницы при открытии/закрытии модального окна
events.on('modal:open', () => { page.locked = true});
events.on('modal:close', () => {page.locked = false});

// Получаем продукты с сервера
api.getProductList()
    .then(appDataNew.setCatalog.bind(appDataNew))
    .catch(err => {console.log(err)});
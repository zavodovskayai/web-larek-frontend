import {Component} from "./base/Component";
import {IBasketItem, ICardAction} from "../types";
import {ensureElement} from "../utils/utils";

// Теперь поработаем над корзиной
export class BasketCard extends Component<IBasketItem> {
    protected _index: HTMLElement; // это номер карточки
    protected _title: HTMLElement; // это название
    protected _price: HTMLElement; // это цена
    protected _deleteButton: HTMLButtonElement; // кнопка
    constructor(container: HTMLElement, index: number, action?: ICardAction) {
        super(container);
        // Выбираем индекс и увеличиваем на 1, чтобы корретно отобразить номер, т.к. индексация начинается с 0 
        this._index = ensureElement<HTMLElement>('.basket__item-index', container);
        this.setText(this._index, index + 1);

        // Задаём остальные элементы
        this._title = ensureElement<HTMLElement>('.card__title', container);
        this._price = ensureElement<HTMLElement>('.card__price', container);
        this._deleteButton = ensureElement<HTMLButtonElement>(`.basket__item-delete`, container);

        if(action?.onClick) {
            if(this._deleteButton) {
            this._deleteButton.addEventListener('click', (action.onClick));
            }
        }
    }

    set index(value: number) {
        this.setText(this._index, value)
    }

    set title(value: string) {
        this.setText(this._title, value)
    }

    set price(value: number) {
        this.setText(this._price, value);
    }
}
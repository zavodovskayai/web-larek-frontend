import {Component} from "./base/Component";
import {ICard, ICardAction} from "../types";
import {ensureElement} from "../utils/utils";

// ICard - не универсальный
export class Card extends Component<ICard> {
  protected _title: HTMLElement;
  protected _image?: HTMLImageElement;
  protected _description?: HTMLElement;
  protected _button?: HTMLButtonElement;
  protected _category?: HTMLElement;
  protected _price: HTMLElement;
  protected _buttonModal?: HTMLButtonElement;
  
  // Берём типы из card.scss. Если присвоить значение из constants, то для софт и хард скилов цвета неверные
  private color: { [key: string]: string } = {
    'софт-скил': '_soft',
    'хард-скил': '_hard',
    'кнопка': '_button',
    'дополнительное': '_additional',
    'другое': '_other'
  }

  constructor(protected blockName: string, container: HTMLElement, action?: ICardAction) {
    super(container);

    this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
    this._image = ensureElement<HTMLImageElement>(`.${blockName}__image`, container);
    this._button = container.querySelector(`.${blockName}__button`);
    this._description = container.querySelector(`.${blockName}__description`);
    this._price = ensureElement<HTMLElement>(`.${blockName}__price`, container);
    this._category = container.querySelector(`.${blockName}__category`);

    if (action?.onClick) {
      if (this._button) {
        this._button.addEventListener("click", action.onClick);
      } else {
        container.addEventListener("click", action.onClick);
      }
    }
  }

  set id(value: string) {
    this.container.dataset.id = value;
  }

  get id(): string {
    return this.container.dataset.id || "";
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  get title(): string {
    return this._title.textContent || "";
  }

  set image(value: string) {
    this.setImage(this._image, value, this.title);
  }

  set description(value: string | string[]) {
    if (Array.isArray(value)) {
      this._description.replaceWith(...value.map(str => {
        const descTemplate = this._description.cloneNode() as HTMLElement;
        this.setText(descTemplate, str);
        return descTemplate;
      }))
    } else {
      this.setText(this._description, value);
    }
  }

  // По аналогии с названием устанавливаем отображение названия кнопки
  set titleOfButton(value: string) {
    this.setText(this._button, value);
  }

  // Опередляем цену. Если она нудевая - то пишем бесценно.
  set price(value: number | null) {
    if (value == null) {
      this.setText(this._price, 'Бесценно');
    } else {
      this.setText(this._price, value + ' синапсов')
    }
    this.setDisabled(this._button, value === null);
  }

  // Добавляем категорию
  set category(value: string) {
    this.setText(this._category, value);
    const category = this._category.classList[0];
    this._category.className = '';
    this._category.classList.add(`${category}`);
    this._category.classList.add(`${category}${this.color[value]}`)
  }

	get category() {
		return this._category.textContent || '';
	}
}


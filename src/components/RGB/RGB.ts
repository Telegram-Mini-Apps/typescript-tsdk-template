import $ from 'jquery';

import './styles.css';

export class RGB {
  private readonly el: JQuery<HTMLSpanElement>;

  constructor({ color, class: className }: {
    color: string;
    class?: string;
  }) {
    this.el = $<HTMLSpanElement>('<span/>')
      .attr('class', 'rgb')
      .addClass(className ?? '')
      .append(
        $(`<i class="rgb__icon" style="background-color: ${color}"/>`),
        color,
      );
  }

  element(): HTMLSpanElement {
    return this.el[0];
  }
}
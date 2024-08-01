import $ from 'jquery';

export class TonConnectButton {
  private readonly el: JQuery<HTMLDivElement>;

  constructor({ id, class: className }: { id: string, class?: string }) {
    this.el = $<HTMLDivElement>('<div/>')
      .addClass(className ?? '')
      .append($('<div style="width: fit-content;"/>').attr('id', id));
  }

  element(): HTMLDivElement {
    return this.el[0]
  }
}
import $ from 'jquery';

import { RGB } from '@/components/RGB/RGB';

import './styles.css';

export interface DisplayDataRow {
  title: string;
  value?: string | boolean | HTMLElement | number;
}

function isRGB(value: string): boolean {
  return /^#[a-f0-9]{3,6}$/i.test(value);
}

export class DisplayData {
  private readonly el: JQuery<HTMLDivElement>;

  constructor({ rows }: { rows: DisplayDataRow[] }) {
    this.el = $<HTMLDivElement>('<div/>');
    this.setRows(rows);
  }

  element(): HTMLDivElement {
    return this.el[0];
  }

  setRows(rows: DisplayDataRow[]): this {
    this.el.empty().append(
      ...rows.map(row => {
        const lineValue = $('<span class="display-data__line-value"/>');
        if (typeof row.value === 'string' && isRGB(row.value)) {
          lineValue.append(new RGB({ color: row.value }).element());
        } else if (row.value === false) {
          lineValue.text('❌');
        } else if (row.value === true) {
          lineValue.text('✔️');
        } else if (row.value === undefined) {
          lineValue.html('<i>empty</i>');
        } else if (row.value instanceof HTMLElement) {
          lineValue.append(row.value);
        } else {
          lineValue.append(row.value.toString());
        }

        return $('<div class="display-data__line"/>').append(
          $('<span class="display-data__line-title"/>').text(row.title),
          lineValue,
        );
      }),
    );
    return this;
  }
}
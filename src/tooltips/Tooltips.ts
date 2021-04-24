import Vue from 'vue';

import TooltipsComponent from './Tooltips.vue';

export enum PLACEMENT {
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left',
  PAGE_CENTER = 'page-center',
}

export enum TYPE {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  DANGER = 'danger',
}

export interface Options {
  placement?: PLACEMENT,
  type?: TYPE,
}

export interface ElementRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export default class Tooltips {
  public static OPTIONS: Options = {
    placement: PLACEMENT.TOP,
    // placement: PLACEMENT.RIGHT,
    // placement: PLACEMENT.BOTTOM,
    // placement: PLACEMENT.LEFT,

    type: TYPE.DANGER,
    // type: TYPE.INFO,
    // type: TYPE.WARNING,
    // type: TYPE.SUCCESS,
  }

  private static INDEX: number = 1;
  private static COMPONENT_REF = 'tooltipsComponent';

  private readonly target: Element;
  private content: string;
  private options: Options;
  private rootVueIns: any;

  constructor(target: Element, content = '', options = Tooltips.OPTIONS) {
    this.target = target;
    this.content = content;
    this.options = options

    this.init().then();
  }

  public resetContent(content: string): void {
    this.content = content;
    this.setContent();
    this.setPosition();
  }

  async init() {
    this.rootVueIns = await this.createVueInstance();

    this.setContent();
    this.setPosition();
  }

  private createTooltipsElement(): HTMLElement {
    const id = `toolTips_${Tooltips.INDEX}`;
    const element = document.createElement('div');

    element.id = id;
    document.body.appendChild(element);

    Tooltips.INDEX += 1;

    return element;
  }

  private createVueInstance() {
    const element = this.createTooltipsElement();
    const el = '#' + element.id;
    const that = this;

    return new Promise((resolve) => {
      new Vue({
        el,
        data: {
          content: '',
        },
        render(h) {
          return h(TooltipsComponent, {
            ref: Tooltips.COMPONENT_REF,
            props: {
              content: this.content,
              placement: that.options.placement,
              type: that.options.type,
            },
            on: {
              tooltipsComponentMounted: () => {
                console.log(this);
                resolve(this);
              }
            },
          });
        }
      })
    });
  }

  private setPosition() {
    this.getComponentVueIns().setPosition(this.getTargetRect());
  }

  private getComponentVueIns() {
    return this.rootVueIns.$refs[Tooltips.COMPONENT_REF];
  }

  private setContent() {
    this.rootVueIns.content = this.content;
  }

  private getTargetRect(): ElementRect {
    const target = this.target;
    const {left: targetLeft, top: targetTop, width, height} = target.getBoundingClientRect();

    const body = document.body;
    const docEl = document.documentElement;

    const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    const clientTop = docEl.clientTop || body.clientTop || 0;
    const clientLeft = docEl.clientLeft || body.clientLeft || 0;

    const top = targetTop + scrollTop - clientTop;
    const left = targetLeft + scrollLeft - clientLeft;

    return {top: Math.round(top), left: Math.round(left), width, height};
  }
}
import './regionSelection.less';


export default class RegionSelection {
    isMouseDown = false;
    mouseDownX;
    mouseDownY;

    isMouseUp = false;
    mouseUpX;
    mouseUpY;

    mouseMoveX;
    mouseMoveY;

    animateId;

    guideElement;
    guideLineXElement;
    guideLineYElement;
    guideBoxElement;

    options = {
        onFinish(rect) {
            console.log(rect);
        }
    };

    constructor(options = {}) {
        this.options = {
            ...this.options,
            ...options,
        };
        this.init();
    }

    init() {
        this.createElements();
        this.addEventListeners();
        this.animate();
    }

    createElements() {
        const guideElement = document.createElement('div');

        guideElement.className = 'rsa-guide';

        document.body.appendChild(guideElement);

        guideElement.innerHTML = `
            <div class="rsa-guide-line rsa-guide-line_x"></div>
            <div class="rsa-guide-line rsa-guide-line_y"></div>
            <div class="rsa-guide-box"></div>
        `;

        const guideLineXElement = document.querySelector('.rsa-guide-line_x');
        const guideLineYElement = document.querySelector('.rsa-guide-line_y');
        const guideBoxElement = document.querySelector('.rsa-guide-box');

        this.guideElement = guideElement;
        this.guideLineXElement = guideLineXElement;
        this.guideLineYElement = guideLineYElement;
        this.guideBoxElement = guideBoxElement;
    }

    removeElements() {
        this.guideElement.parentNode.removeChild(this.guideElement);
    }

    addEventListeners() {
        this.mouseMoveListener = (event) => {
            const {pageX: x, pageY: y} = event;

            this.mouseMoveX = x;
            this.mouseMoveY = y;
        };

        this.mousedownListener = (event) => {
            const {pageX: x, pageY: y} = event;

            this.isMouseDown = true;

            this.mouseDownX = x;
            this.mouseDownY = y;
        };

        this.mouseupListener = (event) => {
            const {pageX: x, pageY: y} = event;

            this.mouseUpX = x;
            this.mouseUpY = y;

            this.isMouseDown = false;
            this.isMouseUp = true;
        };

        window.addEventListener('mousemove', this.mouseMoveListener, false);
        window.addEventListener('mousedown', this.mousedownListener, false);
        window.addEventListener('mouseup', this.mouseupListener, false);
    }

    removeEventListeners() {
        window.removeEventListener('mousemove', this.mouseMoveListener, false);
        window.removeEventListener('mousedown', this.mousedownListener, false);
        window.removeEventListener('mouseup', this.mouseupListener, false);
    }

    animate() {
        this.animateId = requestAnimationFrame(() => {
            this.render();

            if (!this.animateId) {
                return;
            }
            this.animate();
        })
    }

    render() {
        this.setElementStyles(this.guideLineXElement, {top: this.mouseMoveY + 'px'});
        this.setElementStyles(this.guideLineYElement, {left: this.mouseMoveX + 'px'});

        if (this.isMouseUp) {
            this.doFinish();
            return;
        }

        if (this.isMouseDown) {
            this.setElementStyles(this.guideElement, {backgroundColor: 'rgba(0, 0, 0, 0.2)'});

            const isStarTopLeft = this.mouseMoveX > this.mouseDownX;

            let x = this.mouseDownX;
            let y = this.mouseDownY;
            let width = this.mouseMoveX - this.mouseDownX;
            let height = this.mouseMoveY - this.mouseDownY;

            if (!isStarTopLeft) {
                x = this.mouseMoveX;
                y = this.mouseMoveY;
                width = this.mouseDownX - this.mouseMoveX;
                height = this.mouseDownY - this.mouseMoveY;
            }

            this.setElementStyles(this.guideBoxElement, {
                display: 'block',
                left: `${x}px`,
                top: `${y}px`,
                width: `${width}px`,
                height: `${height}px`,
            });
        } else {
            this.setElementStyles(this.guideBoxElement, {
                display: 'none',
            });
        }
    }

    doFinish() {
        this.options.onFinish(this.guideBoxElement.getBoundingClientRect());
        this.animateId = null;
        cancelAnimationFrame(this.animateId);
        this.removeEventListeners();
        this.removeElements();
    }

    setElementStyles(element, styles) {
        Object.getOwnPropertyNames(styles).forEach((cssProp) => {
            element.style[cssProp] = styles[cssProp];
        });
    }
}



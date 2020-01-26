import Alert from './Alert';
const TIME_HIDE_TOOLTIP = 1500; // sec

class AlertCopyMessage extends Alert {
  constructor({ container, btnCopy, copiedEl, btnClose, content, tooltip }) {
    super({ container, btnClose, content });
    this.btnCopy = btnCopy;
    this.copiedEl = copiedEl;
    this.copy = this.copy.bind( this );
    this.range = new Range();
    this.tooltip = tooltip;

    this.btnCopy.addEventListener('click', this.copy );
  }

  copy() {
    this.copiedEl.innerHTML = this.message;
    this.range.setStart( this.copiedEl, 0 );
    this.range.setEnd( this.copiedEl, 1 );

    document.getSelection().removeAllRanges();
    document.getSelection().addRange( this.range );
    document.execCommand('copy');

    this.showHideTooltip();
  }

  showHideTooltip() {
    this.tooltip.classList.add('active');
    setTimeout(() =>
      this.tooltip.classList.remove('active'),
    TIME_HIDE_TOOLTIP );
  }
};

export default AlertCopyMessage;
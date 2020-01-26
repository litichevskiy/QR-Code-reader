class Alert {
  constructor({ container, btnClose, content }) {
    this.container = container;
    this.btnClose = btnClose;
    this.content = content;
    this.message;

    this.hideMessage = this.hideMessage.bind( this );
    this.btnClose.addEventListener('click', this.hideMessage );
  }

  showMessage( message ) {
    this.container.classList.remove('disable');
    this.message = message;
    this.content.innerHTML = this.message;
  }

  hideMessage() {
    this.container.classList.add('disable');
    this.message = '';
    this.content.innerHTML = this.message;
  }

  appendMessage( child ) {
    this.container.classList.remove('disable');
    this.message = child;
    this.content.appendChild( this.message );
  }
};

export default Alert;
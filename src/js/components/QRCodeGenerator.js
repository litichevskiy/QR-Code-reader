import QRCode from 'qrcode';
import {
  OPTIONS_QR_CODE_GENERATOR,
  MAX_LENGTH_FOR_QRCODE,
  MIN_LENGTH_FOR_QRCODE } from '../config';

const errors = {
  'min-length': 'This field cannot be empty',
  'max-length': `Maximum ${MAX_LENGTH_FOR_QRCODE} symbols`,
};

class QRCodeGenerator {
  constructor({ container, canvas, btnCreateQR, qrCodeInput, alert, alertError, quantitySymbols, btnClear }) {
    this.container = container;
    this.canvas = canvas;
    this.btnCreateQR = btnCreateQR;
    this.qrCodeInput = qrCodeInput;
    this.alert = alert;
    this.alertError = alertError;
    this.quantitySimbols = quantitySymbols;
    this.btnClear = btnClear;
    this.invalidText = false;

    this.generateQRCode = this.generateQRCode.bind( this );
    this.disableError = this.disableError.bind( this );
    this.updateQuantitySymnols = this.updateQuantitySymnols.bind( this );
    this.clear = this.clear.bind( this );

    this.btnCreateQR.addEventListener('click', this.generateQRCode );
    this.qrCodeInput.addEventListener('focus', this.disableError );
    this.qrCodeInput.addEventListener('input', this.updateQuantitySymnols );
    this.btnClear.addEventListener('click', this.clear );
  }

  clear() {
    this.qrCodeInput.value = '';
    this.quantitySimbols.innerHTML = MAX_LENGTH_FOR_QRCODE;
    this.quantitySimbols.classList.remove('error');
  }

  updateQuantitySymnols() {
    const value = this.qrCodeInput.value;
    const quantity = MAX_LENGTH_FOR_QRCODE - value.length;

    if( quantity < 0 ) this.quantitySimbols.classList.add('error');
    else if( quantity >= 0 && this.quantitySimbols.classList.contains('error') ) {
      this.quantitySimbols.classList.remove('error');
    }

    this.quantitySimbols.innerHTML = quantity;
  }

  isValidText( text ) {
    const _text = text.trim();

    if( _text.length < MIN_LENGTH_FOR_QRCODE ) {
      this.errorText = errors['min-length'];
    } else if( _text.length > MAX_LENGTH_FOR_QRCODE ) {
      this.errorText = errors['max-length'];
    } else return true;
  }

  disableError() {
    if( this.invalidText ) {
      this.invalidText = false;
      this.errorText = '';
      this.qrCodeInput.classList.remove('error');
    }
  }

  showError() {
    this.invalidText = true;
    const errorEl = this.container.querySelector('.error-message');
    errorEl.innerHTML = this.errorText;
    this.qrCodeInput.classList.add('error');
  }

  generateQRCode( event ) {
    event.preventDefault();

    const value = this.qrCodeInput.value;

    if( !this.isValidText( value ) ) {
      this.showError();

    } else {

      QRCode.toCanvas( this.canvas, value, OPTIONS_QR_CODE_GENERATOR, error => {

        if ( error ) this.alertError.showMessage( error.message );
        else{
          this.alert.appendMessage( this.canvas );
          this.canvas.classList.add('show');
        }

        this.clear();
      });
    }
  }
};

export default QRCodeGenerator;
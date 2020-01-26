import swRegister from './serviceWorkerRegister';
import checkSupport from './components/checkSupport';
import QRCodeReader from './components/QRCodeReader';
import QRCodeGenerator from './components/QRCodeGenerator';
import TabNavigation from './components/TabNavigation';
import Alert from './components/Alert';
import AlertCopyMessage from './components/AlertCopyMessage';

Promise.resolve( checkSupport.mediaDevices() )
.then( response => {

  if( !response.isSupported ) throw new Error( response.message );

  swRegister();

  const alertError = new Alert({
    container: document.querySelector('.alert-error'),
    btnClose: document.querySelector('.alert-error .close-alert'),
    content: document.querySelector('.alert-error .alert-content'),
  });

  const alertCopyMessage = new AlertCopyMessage({
    container: document.querySelector('.alert-copy-scanQRCode'),
    btnClose: document.querySelector('.alert-copy-scanQRCode .close-alert'),
    content: document.querySelector('.alert-copy-scanQRCode .alert-content'),
    copiedEl: document.querySelector('.alert-copy-scanQRCode .hidden-copied-content'),
    btnCopy: document.querySelector('.alert-copy-scanQRCode .btn-copy'),
    tooltip: document.querySelector('.alert-copy-scanQRCode .copy-tooltip'),
  });

  const defautAlert = new Alert({
    container: document.querySelector('.alert.defaut-alert'),
    btnClose: document.querySelector('.defaut-alert .close-alert'),
    content: document.querySelector('.defaut-alert .alert-content'),
  });

  new TabNavigation({
    container: document.querySelector('.tab-navigation'),
    tabList: [... document.querySelectorAll('.tab')],
    activeTabId: 0,
  });

  new QRCodeReader({
    container: document.querySelector('.tab-scanQRCode'),
    video: document.querySelector('.tab-scanQRCode video'),
    videoWrapper: document.querySelector('.container-video'),
    canvas: document.querySelector('canvas'),
    btnStartScan: document.querySelector('.start-scan'),
    btnStopScan: document.querySelector('.stop-scan'),
    lampBtn: document.querySelector('.on-off-light'),
    alertError: alertError,
    alert: alertCopyMessage,
  });

  new QRCodeGenerator({
    container: document.querySelector('.tab-createQRCode'),
    canvas: document.querySelector('.created-qr-code'),
    btnCreateQR: document.querySelector('.btn-createQRCode'),
    qrCodeInput: document.querySelector('.createQRCode-input'),
    quantitySymbols: document.querySelector('.quantity-symbols'),
    btnClear: document.querySelector('.clear-text'),
    alert: defautAlert,
    alertError: alertError,
  });

  showApp();

})
.catch( error => {
  new Alert({
    container: document.querySelector('.alert-error'),
    btnClose: document.querySelector('.alert-error .close-alert'),
    content: document.querySelector('.alert-error .alert-content'),
  }).showMessage( error.message );
  console.error( error );

  showApp();

});

const showApp = () => {
  const app = document.querySelector('.app');
  const loader = document.querySelector('.loader');

  const removeLoader = () => {
    loader.removeEventListener('transitionend', removeLoader );
    document.body.removeChild( loader );
  };

  loader.addEventListener('transitionend', removeLoader );

  app.classList.remove('disable');
  loader.classList.add('disable');
};
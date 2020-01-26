import jsQR from 'jsqr';
import { MEDIA_PARAMS_DESCTOP, MEDIA_PARAMS_MOBILE } from '../config';
const VIDEO_HAVE_ENOUGH_DATA = 4;
const PERMISSION_DENIED = 'It looks like you have banned the use of the camera';
const DEVICE_NOT_FOUND = 'Camera is not found';

class QRCodeReader {
  constructor({ container, canvas, video, videoWrapper, btnStartScan, btnStopScan, lampBtn, alert, alertError }) {
    this.container = container;
    this.video = video;
    this.canvasElement = canvas;
    this.canvas = this.canvasElement.getContext('2d');
    this.btnStartScan = btnStartScan;
    this.btnStopScan = btnStopScan;
    this.videoWrapper = videoWrapper;
    this.alert = alert;
    this.alertError = alertError;
    this.track;
    this.lampBtn = lampBtn;
    this.isCheckSupportLamp = false;
    this.isLamp = false;
    this.lampBtn.hidden = true;
    this.isSetCanvasSizes = false;
    this.idReqAnimFrame;

    this.start = this.start.bind( this );
    this.stop = this.stop.bind( this );
    this.onOffLamp = this.onOffLamp.bind( this );
    this._tickScan = this._tickScan.bind( this );

    this.lampBtn.addEventListener('click', this.onOffLamp );
    this.btnStartScan.addEventListener('click', this.start );
    this.btnStopScan.addEventListener('click', this.stop );
  }

  start() {
    this.videoWrapper.classList.toggle('active');
    this.startScan( MEDIA_PARAMS_MOBILE );
  }

  stop() {
    const mediaStreams = this.video.srcObject.getTracks();
    mediaStreams.forEach( stream => stream.stop() );
    cancelAnimationFrame( this.idReqAnimFrame );
    this.videoWrapper.classList.toggle('active');
  }

  onOffLamp() {
    this.isLamp = !this.isLamp;
    this.track.applyConstraints({ advanced: [{torch: this.isLamp}] });
  }

  checkSupportsLamp() {
    this.isCheckSupportLamp = true;

    if( !this.track.getCapabilities ) return;

    const settings = this.track.getCapabilities();

    if( settings.hasOwnProperty('torch') ) {
      this.lampBtn.hidden = false;
    }
  }

  setCanvasSizes() {
    const height = this.video.videoHeight;
    const width = this.video.videoWidth;

    this.canvasElement.height = height;
    this.canvasElement.width = width;
    this.canvasElementWidth = width,
    this.canvasElementHeight = height;
    this.isSetCanvasSizes = true;
    this.isReadQRCode = false;
  }

  startScan( options ) {
    navigator.mediaDevices.getUserMedia( options )
    .then( mediaStream => {

      this.track = mediaStream.getVideoTracks()[0];
      this.video.srcObject = mediaStream;

      this.video.onloadedmetadata = () => {
        this.video.play();
        this.isReadQRCode = false;
        if( !this.isSetCanvasSizes ) this.setCanvasSizes();
        if( !this.isCheckSupportLamp ) this.checkSupportsLamp();

        this._tickScan();
      }

    })
    .catch( error => {
      let { constraint, message, name } = error;
      if( !message ) message = name;

      if( message === 'Permission denied' || message === 'PermissionDeniedError' ) {
        this.alertError.showMessage( PERMISSION_DENIED );
        this.videoWrapper.classList.toggle('active');
      } else if( constraint === 'facingMode' ) {
        this.startScan( MEDIA_PARAMS_DESCTOP );
      } else if( constraint === 'Request device not found' ) {
        this.alertError.showMessage( DEVICE_NOT_FOUND );
        this.videoWrapper.classList.toggle('active');
      } else {
        this.alertError.showMessage( DEVICE_NOT_FOUND );
        this.videoWrapper.classList.toggle('active');
        console.error( error );
      }
    })
  }

  _tickScan() {
    const { readyState } = this.video;

    if ( readyState === VIDEO_HAVE_ENOUGH_DATA ) {

      this.canvas.drawImage(
        this.video,
        0,
        0,
        this.canvasElementWidth,
        this.canvasElementHeight
      );

      const { data, width, height } = this.canvas.getImageData(
        0,
        0,
        this.canvasElementWidth,
        this.canvasElementHeight
      );

      const code = jsQR( data, width, height, { inversionAttempts: 'dontInvert' } );

      if ( code ) {

        this.isReadQRCode = true;
        this.alert.showMessage( code.data );
        this.btnStopScan.click();
      }
    }

    if( !this.isReadQRCode ) {
      this.idReqAnimFrame = requestAnimationFrame( this._tickScan );
    }
  }
};

export default QRCodeReader;
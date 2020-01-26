const NOT_SUPPORT_MEDIADEVICES = `Your browser doesn't provide access to the camera.`;

const checkSupport = {

  mediaDevices() {
    let message = '';
    let isSupported = true;

    if( !navigator.mediaDevices ) {
      isSupported = false, message = NOT_SUPPORT_MEDIADEVICES;
    }

    return { message, isSupported };
  }
};

export default checkSupport;
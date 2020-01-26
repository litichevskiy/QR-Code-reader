const swRegister = () => {
  if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
    .then( response => {
      response.update();
    })
    .catch(error => console.error(error) );
  }
};

export default swRegister;
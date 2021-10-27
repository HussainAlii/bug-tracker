var jwt = require('jsonwebtoken');

export function isValidEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function refresh(time){
  setTimeout(
    function () {
      window.location.reload();
    }.bind(this),
    time
  );
}

export function href(href, time=0){
  setTimeout(
    function () {
      window.location.href = href;
    }.bind(this),
    time
  );
}

export function timeout(fun,time){
  setTimeout(fun,
    time
  )
  }

  export function localStorageStore(key, val){
    localStorage.setItem(key, JSON.stringify(val));
  }
  export function localStorageRetrieve(key){
    var retrievedObject = localStorage.getItem(key);
    return JSON.parse(retrievedObject);
  }

  export function decodeJWT(token){
    var decoded = false
    try{
      var decoded = jwt.verify(token, process.env.REACT_APP_KEY );
    }catch(e){console.log(e)}
    return decoded
  }
  
  export function encodeJWT(data){
    var token = jwt.sign(data, process.env.REACT_APP_KEY );
    return token;
  }

  export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
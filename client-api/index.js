var apiDomain = 'http://api.doarama.com';
var apiReady = false;
var player;

// Only allow posting messages once API is ready
function wrapPost(method, value) {
  var msg = {
    "method" : method,
    "value" : value
  };
  if (typeof player !== 'undefined' && apiReady) {
    player.postMessage(msg, apiDomain);
  } else {
    alert("Doarama Client API not ready yet!");
  }
}

document.getElementById('doarama-iframe').onload = function() {

  // Access the iframe's content window
  player = document.getElementById('doarama-iframe').contentWindow;

  // Receive messages from the API
  function onMessageReceived(e) {
    if (e.data.method === 'ready') {
      apiReady = true;
      console.log('API is ready!');
    } else {
      console.log('client received: ' + JSON.stringify(e.data));
    }
  }

  window.addEventListener('message', onMessageReceived, false);
};

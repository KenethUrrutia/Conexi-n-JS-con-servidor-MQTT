
var client  = mqtt.connect('ws://172.17.0.2:8083/mqtt');

function error(err) {
  if (err) {
    console.log("error");
  }
}

function conectar() {
  client.subscribe("web/distancia", error);
  client.subscribe("web/tempC", error);
  client.subscribe("web/tempF", error);
  client.subscribe("web/humedad", error);
  client.subscribe("web/heatC", error);
  client.subscribe("web/heatF", error);

}

function recibido(topic, message) {
  switch (topic) {
    case "web/distancia":
      (document.getElementById("distancia")).innerHTML = (message.toString() + " cm");
      break;

    case "web/tempC": 
      var s = message.toString();  
      var d = s.replace(/[^0-9]*/g, ''); 
      console.log(d);
      if (d < 2500) {
        document.getElementById("tempC").innerHTML = (message.toString() + ' °C     <img src="https://images.emojiterra.com/google/android-11/512px/1f976.png" width="50px" height="50px"></img> ' );
      } else if (d > 2500 && d < 3500){
        document.getElementById("tempC").innerHTML = (message.toString() + ' °C     <img src="https://images.emojiterra.com/google/android-11/512px/1f60a.png" width="50px" height="50px"></img> ' );
      }else {
        document.getElementById("tempC").innerHTML = (message.toString() + ' °C     <img src="https://images.emojiterra.com/google/android-10/512px/1f975.png" width="50px" height="50px"></img> ' );
      }
      
      break;
    case "web/tempF":
      document.getElementById("tempF").innerHTML = (message.toString() + " °F");
      break;

    case "web/humedad":
      document.getElementById("humedad").innerHTML = (message.toString() + "%");
      break;
    
    case "web/heatC":
      document.getElementById("heatC").innerHTML = (message.toString() + " °C");
      break;
    case "web/heatF":
      document.getElementById("heatF").innerHTML = (message.toString() + " °F");
      break;
 
  
    default:
      break;
  }
}


client.on('connect', conectar)
client.on('message', recibido)



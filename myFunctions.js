//-----------------------------------------------------------------------
function gotCharacteristics(error, characteristics) {
  if (error) {console.log('error: ', error);}
  console.log('characteristics: ', characteristics);
  // Set the first characteristic as myCharacteristic
  myCharacteristic = characteristics[0];
//  myCharacteristic_r = characteristics[2];

//  myBLE.read(myCharacteristic_r, gotValue);
//  myBLE.startNotification(myCharacteristic, gotValue , 'string' );
myBLE.startNotifications(myCharacteristic, handleNotifications, 'string');
  //console.log('characteristics[0]: ', characteristics[0]);
  //console.log('characteristics[1]: ', characteristics[1]);
  //console.log('characteristics[2]: ', characteristics[2]);
//  writeCharacteristic = characteristics[1];
  isConnected = myBLE.isConnected();
  myBLE.onDisconnected(onDisconnected);
  
}

//--------------------------- connect/disconnect/notification to BLE -------------------------------
function connectToBle() {
  // Connect to a device by passing the service UUID
//myBLE.connect(0xFFE0, gotCharacteristics);
myBLE.connect(serviceUuid, gotCharacteristics);
//myBLE.connect(serviceUuid_sens, gotCharacteristics);

}

function disconnectToBle() {
  // Disonnect to the device
  myBLE.disconnect();
  // Check if myBLE is connected
  //isConnected = myBLE.isConnected();
}

function onDisconnected() {
  console.log('Device got disconnected.');
  isConnected = false;
}

// A function that will be called once got characteristics
function handleNotifications(value) {
  //console.log('BLE data: ', data);
  //myBLEValue = data;

console.log('value recieved -> ',value);
receivedValue = value;

console.log('entered data: ', receivedValue);
console.log('data length ', receivedValue.length);

var start = receivedValue.charAt(0);
var finish = receivedValue.charAt(receivedValue.length-1);

console.log('start symbol -> ', start);
console.log('finish symbol -> ', finish);

if ((start == '$') && (finish == ';')) {

parseString = receivedValue.substring(1,receivedValue.length-1);
console.log('string for parsing -> ', parseString);

parsedData = split(parseString, '!');

parseBright = parseInt(parsedData[0]);
parseOffset = parseInt(parsedData[1]);
parseSync = parseInt(parsedData[2]);
parseSenId = parseInt(parsedData[3]);
parseMAC = parsedData[4];
nrdEn = parseInt(parsedData[5]);
forEn= parseInt(parsedData[6]);
parseCityId = parseInt(parsedData[7]);
parseKey = parsedData[8];

console.log('----------------------------------------<<< Parsed data >>>----------------------------------- ');
console.log('Bright -> ',parseBright);
console.log('Offset -> ',parseOffset);
console.log('Sync -> ',parseSync);
console.log('sensor ID -> ',parseSenId);
console.log('MAC -> ',parseMAC);
console.log('narodmon.ru enable -> ',nrdEn);
console.log('forecast enable -> ',forEn);
console.log('City ID -> ',parseCityId);
console.log('Weather KEY -> ',parseKey);
console.log('-----------------------------------------> end of parsing <----------------------------------------- ');

} else {console.log('illegal START ro FINISH symbol :(');}

}

// A function to stop notifications
function stopNotifications() {
  myBLE.stopNotifications(myCharacteristic);
}

//-------------- parsing event -----------------
function parsingEvent() {
  
  //    $!1!7!0!5!78:21:84:7C:87:90!0!1!1726354!qwertyuiopasdfghjklzxcvbnmqwerty;
  
var data = this.value();
console.log('entered data: ', data);
console.log('data length ', data.length);

//var start = data.charAt(0);
//var finish = data.charAt(data.length-1);

//console.log('start symbol -> ', start);
//console.log('finish symbol -> ', finish);

//if ((start == '$') && (finish == ';')) {

//parseString = data.substring(2,data.length-1);
//console.log('string for parsing -> ', parseString);

//parsedData = split(parseString, '!');

//parseBright = parseInt(parsedData[0]);
//parseOffset = parseInt(parsedData[1]);
//parseSync = parseInt(parsedData[2]);
//parseSenId = parseInt(parsedData[3]);
//parseMAC = parsedData[4];
//nrdEn = parseInt(parsedData[5]);
//forEn= parseInt(parsedData[6]);
//parseCityId = parseInt(parsedData[7]);
//parseKey = parsedData[8];

//console.log('----------------------- Parsed data: ----------------------- ');
//console.log('Bright -> ',parseBright);
//console.log('Offset -> ',parseOffset);
//console.log('Sync -> ',parseSync);
//console.log('sensor ID -> ',parseSenId);
//console.log('MAC -> ',parseMAC);
//console.log('narodmon.ru enable -> ',nrdEn);
//console.log('forecast enable -> ',forEn);
//console.log('City ID -> ',parseCityId);
//console.log('Weather KEY -> ',parseKey);
//console.log('----------------------- end of parsing ----------------------- ');

//} else {console.log('illegal START ro FINISH symbol :(');}

}

//---------------- function for read from BLE ---------------------
function gotValue(value) {

//    $!1!7!0!5!78:21:84:7C:87:90!1!0!1726354!qwertyuiopasdfghjklzxcvbnmqwerty;  

//    $!bright!offset!synctime!sensorID!MAC!narodEN!forecastEn!cityID!keyAPI;
  
//console.log('value recieved -> ',value);
//receivedValue = value;

//console.log('entered data: ', receivedValue);
//console.log('data length ', receivedValue.length);

//var start = receivedValue.charAt(0);
//var finish = receivedValue.charAt(receivedValue.length-1);

//console.log('start symbol -> ', start);
//console.log('finish symbol -> ', finish);

//if ((start == '$') && (finish == ';')) {

//parseString = receivedValue.substring(2,receivedValue.length-1);
//console.log('string for parsing -> ', parseString);

//parsedData = split(parseString, '!');

//parseBright = parseInt(parsedData[0]);
//parseOffset = parseInt(parsedData[1]);
//parseSync = parseInt(parsedData[2]);
//parseSenId = parseInt(parsedData[3]);
//parseMAC = parsedData[4];
//nrdEn = parseInt(parsedData[5]);
//forEn= parseInt(parsedData[6]);
//parseCityId = parseInt(parsedData[7]);
//parseKey = parsedData[8];

//console.log('----------------------------------------<<< Parsed data >>>----------------------------------- ');
//console.log('Bright -> ',parseBright);
//console.log('Offset -> ',parseOffset);
//console.log('Sync -> ',parseSync);
//console.log('sensor ID -> ',parseSenId);
//console.log('MAC -> ',parseMAC);
//console.log('narodmon.ru enable -> ',nrdEn);
//console.log('forecast enable -> ',forEn);
//console.log('City ID -> ',parseCityId);
//console.log('Weather KEY -> ',parseKey);
//console.log('-----------------------------------------> end of parsing <----------------------------------------- ');

//} else {console.log('illegal START ro FINISH symbol :(');}


//  keyAPI = inputWeatherKey.value();



//splitInData = split(receivedValue, '!');

//d = parseInt(splitInData[2]);
//mon = parseInt(splitInData[1]);
//yr = parseInt(splitInData[0]);

//console.log('day -> ', d);
//console.log('month -> ', mon);
//console.log('year -> ', yr);

  //if (value == 'bt data')
  //{ receivedValue = "Button pressed"; }
  //else 
  //{recievedValue = " ";}
  
  
//  //-----------------------
//  if (error) console.log('error: ', error);
//  console.log('value: ', value);
//  myValue = value;
//  // After getting a value, call p5ble.read() again to get the value again
//  myBLE.read(FFE0, gotValue);
//  // You can also pass in the dataType
//  // Options: 'unit8', 'uint16', 'uint32', 'int8', 'int16', 'int32', 'float32', 'float64', 'string'
//  // myBLE.read(myCharacteristic, 'string', gotValue);
//  //-----------------------
}

//-------------------------------- write to BLE date only ----------------------------
function writeToBleDate() {
let indata;
indata = '$3!' + d + '!' + mon + '!' + yr + ';';
  var encdate = new TextEncoder();
  myCharacteristic.writeValue(encdate.encode(indata));  
}

//-------------------------------- write to BLE ----------------------------
function writeToBle(wrMode) {
  let inputValue;

  switch (wrMode) {  // формирую значение для записи по BLE в соответствии с протоколом
    case 0:
    inputValue = '$' + wrMode + '!' + brightV + ';';    
    break;

    case 1:
    inputValue = '$' + wrMode + '!' + autoBr + ';';     
    break;

    case 2:
    inputValue = '$' + wrMode + '!' + hours + '!' + min + ';';
    break;

    case 3:
    inputValue = '$' + wrMode + '!' + d + '!' + mon + '!' + yr + ';';     
    break;
    
    case 4:
    inputValue = '$' + wrMode + '!' + watchface + ';';     
    break;

    case 5:
    inputValue = '$' + wrMode + '!' + hours + '!' + min + '!'+ d + '!' + mon + '!' + yr + ';';
    break;

    case 7:
    inputValue = '$' + wrMode + '!' + narodEnable + ';';     
    break;

    case 8:
    inputValue = '$' + wrMode + '!' + narodMAC;     
    break;

    case 9:
    inputValue = '$' + wrMode + '!' + sensorID + ';';     
    break;

    case 12:
    inputValue = '$' + wrMode + '!' + forecastEnable + ';';     
    break;

    case 15:
    inputValue = '$' + wrMode + '!' + ssid + ',' + pas;     
    break;
    
    case 16:
    inputValue = '$' + wrMode + '!' + item + ';';     
    break;

    case 17:
    inputValue = '$' + wrMode + '!' + synctime + ';';     
    break;

    case 18:
    inputValue = '$' + wrMode + '!' + townID;     
   //console.log('sending city ID via BLE -> ', townID);
    break;

    case 19:
    inputValue = '$' + wrMode + '!' + keyAPI;     
    break;

/*
// если не получиться как выше можно попробовать так,
// здесь надо указывать характеристику которая предназначена для записи
  if (!("TextEncoder" in window)) {
  console.log('This browser does not support TextEncoder...');
  }
  var enc = new TextEncoder();
  myCharacteristic.writeValue(enc.encode(inputValue));
*/ 
  }
    // Write the value of the input to the myCharacteristic
//  myBLE.write(myCharacteristic, inputValue);
//  myBLE.write(serviceUuid_w, inputValue);
  var enc = new TextEncoder();
  myCharacteristic.writeValue(enc.encode(inputValue));

  setComplete = true;
  //    if(setComplete) {
  //inputValue = '$' + 3 + '!' + d + '!' + mon + '!' + yr + ';';    
  //var encdate = new TextEncoder();
  //myCharacteristic.writeValue(encdate.encode(inputValue));  
  //setComplete = false;
  //}
    
}

//------------------- checkbox event -------------------
//function myCheckedEvent() {
//  if (autobrightCB.checked()) {
//    autoBr = 1;
//if (isConnected) {    writeToBle(1);}
//    console.log('Autobright ON');
//  } else {
//    autoBr = 0;
//if (isConnected) {    writeToBle(1);}
//    console.log('Autobright OFF');
//  }
//}

//------------------------------ sensor ID ----------------------------------
function setSensorID() {
  sensorID = inputSensorID.value();
  if (isConnected && sensorID.length != 0) {
    writeToBle(9);
  }
if (sensorID.length != 0) {console.log('set sensor ID -> ', sensorID);}
else {console.log('please enter sensor ID ');}

}
//------------------------ set town ID --------------------------
function setTownID() {
  townID = inputCityID.value();
  if (isConnected && (townID.length != 0)) {
    writeToBle(18);
     console.log('entered city ID -> ', townID);
  }
  console.log('city ID length ', townID.length);
  
//if (townID.lenght === true) {console.log('enter city ID ');} 
if (townID.length == 0) {console.log('enter city ID ');}
}
//------------------------ set key API --------------------------
function setKeyAPI() {
  keyAPI = inputWeatherKey.value();
  if (isConnected && keyAPI.length != 0) {
    writeToBle(19);
  }
  if (keyAPI.length != 0) {console.log('keyAPI -> ', keyAPI);}
  else {console.log('enter weather keyAPI ', keyAPI);}
}
//-------------------------- set time zone -------------------------------------
function setTimeZone() {
  timeZone = inputTimeZone.value();
  if (isConnected && timeZone.length != 0) {
    writeToBle(16);
  }
if (timeZone.length != 0) {console.log('set time zone offset: ', timeZone);}
}
//------------------------- UTC selector event ------------------------
function utcSelectEvent() {

  item = selUTC.value();
  if (isConnected && item.length != 0) {
    writeToBle(16);
  }
  if (item.length != 0) {console.log('selected time zone offset: ', item);}
}

//---------------------- Autobright toggle event --------------------
function myToggleEvent() {
console.log('toggle event: ');
  
//if (checkbox.checked()) { console.log('TOGGLE ON');}
  //else { console.log('TOGGLE OFF');}
//  if (checkbox.checked()) {
//    autoBr = 0;
//if (isConnected) {writeToBle(1);}
//    console.log('Autobright OFF');
//  } else {
//    autoBr = 1;
//if (isConnected) {writeToBle(1);}
//    console.log('Autobright ON');
//  }
}
//---------------------- Autobright new checkbox event --------------------
function brightCheckEvent() {

br = document.getElementById("autobrightCheck").checked;

console.log('autobright value: ', br);
  
if (isConnected) {
   if(br) 
   {
    autoBr = 1;
    writeToBle(1);
    brr = 1;
    console.log('Autobright ON');
   } else 
   {
    autoBr = 0;
    writeToBle(1);
    brr = 0;
    console.log('Autobright OFF');
   }
}  
 

}
//---------------------- time sync toggle event --------------------
//function myToggleSync() {
//  //if (checkboxSync.checked()) { console.log('TOGGLE ON');}
//  //else { console.log('TOGGLE OFF');}
//  if (checkboxSync.checked()) {
//    synctime = 1;
//if (isConnected) {writeToBle(17);}
//    console.log('Time sync ON');
//  } else {
//    synctime = 0;
//if (isConnected) {writeToBle(17);}
//    console.log('Time sync OFF');
//  }
//}
//---------------------- net time sync new checkbox event --------------------
function netSyncCheckEvent() {
  
syncWithNet = document.getElementById("netSyncro").checked;

console.log('sync time with internet: ', syncWithNet);
  
if (isConnected) {
   if(syncWithNet) 
   {
    synctime = 1;
    writeToBle(17);
//    brr = 1;
    console.log('sync time ON');
   } else 
   {
    synctime = 0;
    writeToBle(17);
//    brr = 0;
    console.log('sync time OFF');
   }
}

}

//---------------------- narodmon.ru enable toggle event --------------------
//function myToggleNarodmon() {
//  //if (checkboxNarod.checked()) { console.log('NORODMON ON');}
//  //else { console.log('NARODMON OFF');}
//  if (checkboxNarod.checked()) {
//    narodEnable = 1;
//if (isConnected) {writeToBle(7);}
//    console.log('NORODMON ON');
//  } else {
//    narodEnable = 0;
//if (isConnected) {writeToBle(7);}
//    console.log('NORODMON OFF');
//  }
//}

//---------------------- narodmon.ru new checkbox event --------------------
function narodCheckEvent() {
syncWithNarod = document.getElementById("narodSendCheck").checked;

console.log('send data to narodmon.ru: ', syncWithNarod);
  
if (isConnected) {
   if(syncWithNarod) 
   {
    narodEnable = 1;
    writeToBle(7);
    console.log('NORODMON ON');
   } else 
   {
    narodEnable = 0;
    writeToBle(7);
    console.log('NORODMON OFF');
   }
}

}

//---------------------- forecast enable toggle event --------------------
function myToggleForecast() {
  //if (checkboxForecast.checked()) { console.log('Forecast ENABLE');}
  //else { console.log('Forecast DISABLE');}
  if (checkboxForecast.checked()) {
    forecastEnable = 1;
if (isConnected) {writeToBle(12);}
    console.log('forecast -> ENABLE');
  } else {
    forecastEnable = 0;
if (isConnected) {writeToBle(12);}
    console.log('forecast -> DISABLE');
  }
}

//---------------------- narodmon.ru new checkbox event --------------------
function forecastCheckEvent() {
enForecast = document.getElementById("forecastCheck").checked;

console.log('enable forecast: ', enForecast);
  
if (isConnected) {
   if(enForecast) 
   {
    forecastEnable = 1;
    writeToBle(12);
    console.log('forecast -> ENABLE');
   } else 
   {
    forecastEnable = 0;
    writeToBle(12);
    console.log('forecast -> ENABLE');
   }
}

}

//------------------------- set MAC for narodmon ------------------------
function setMAC() {
  narodMAC = inputMac.value();

if ((narodMAC.length != 0) && isConnected){  // только если введен MAC и есть подключение по bluetooth
 writeToBle(8);
 console.log('MAC address: ', narodMAC);
}
else {
 console.log('need bluetooth connection ...');
 console.log('entered MAC address: ', narodMAC);
 }
}

//------------------------- manual brightness -------------------------
function brChanged() {
//brightV = map(bSlider.value(), 0, 500, 1, 100);  // just map brightness 1 t0 100
brightV = int(bSlider.value());
if (isConnected) {writeToBle(0);}  // send data only when connected status
console.log('bright: ', brightV);
}

//------------------------- sync time/date  with system------------------------
function setTime() {
sec_now = second();
min = minute();
hours = hour();
d = day();
mon = month();
yr = year();

if (isConnected) {
writeToBle(5);

}

//if(setComplete == true) {
//  setComplete = false;
//  if (isConnected) {
//writeToBleDate();
//}
//}
console.log('current time: ', hours + ':' + min + ':' + sec_now);
console.log('current date: ', d + '/' + mon + '/' + yr);
}

function setDate() {
d = day();
mon = month();
yr = year();
if (isConnected) {writeToBle(3);}
console.log('current date: ', d + '/' + mon + '/' + yr);
}

//--------------------- Date and Time selector event -------------------------
function inputDataEvent() {
console.log('input date event: ', databInput.value());
splitDateString = split(databInput.value(), '-');

d = parseInt(splitDateString[2]);
mon = parseInt(splitDateString[1]);
yr = parseInt(splitDateString[0]);

console.log('day -> ', d);
console.log('month -> ', mon);
console.log('year -> ', yr);

if (isConnected) {
writeToBle(3);
}
}

function inputTimeEvent() {
sec = second();
  console.log('input time event: ', timebInput.value());
splitTimeString = split(timebInput.value(), ':');
console.log('hour -> ', splitTimeString[0]);
console.log('min -> ', splitTimeString[1]);
hours = splitTimeString[0];
min = splitTimeString[1];
if (isConnected) {
writeToBle(2);
}
}

//------------------------- save wifi settings ------------------------
function writeWiFiSet() {
  ssid = inputSSID.value();
  pas = inputPSW.value();
if ((ssid.length /*&& pas*/ != 0) && isConnected){  // только если введены имя/пароль и есть подключение по bluetooth
 writeToBle(15);
 console.log('wifi settings: ', ssid +',' + pas);
}
else {
console.log('please enter SSID at least '); 
console.log('and make bluetooth connection ...');}
}
//-------------------------- set different clockfaces ---------------------
function setClockFace_1() {
watchface = 1;
if (isConnected) {writeToBle(4);}
    console.log('set watchface -> ', watchface);
}

function setClockFace_2() {
watchface = 2;
if (isConnected) {writeToBle(4);}
    console.log('set watchface -> ', watchface);
}

function setClockFace_3() {
watchface = 3;
if (isConnected) {writeToBle(4);}
    console.log('set watchface -> ', watchface);
}

function setClockFace_4() {
watchface = 4;
if (isConnected) {writeToBle(4);}
    console.log('set watchface -> ', watchface);
}

function setClockFace_5() {
watchface = 5;
if (isConnected) {writeToBle(4);}
    console.log('set watchface -> ', watchface);
}

function setClockFace_6() {
watchface = 6;
if (isConnected) {writeToBle(4);}
    console.log('set watchface -> ', watchface);
}

function setClockFace_7() {
watchface = 7;
if (isConnected) {writeToBle(4);}
    console.log('set watchface -> ', watchface);
}

function setClockFace_8() {
watchface = 8;
if (isConnected) {writeToBle(4);}
    console.log('set watchface -> ', watchface);
}

function setClockFace_9() {
watchface = 9;
if (isConnected) {writeToBle(4);}
    console.log('set watchface -> ', watchface);
}

function setClockFace_10() {
watchface = 10;
if (isConnected) {writeToBle(4);}
    console.log('set watchface -> ', watchface);
}
//function changeBG() {
//  let col = color(25, 23, 200, 50);
//  connectButton.style('background-color',col);
//}

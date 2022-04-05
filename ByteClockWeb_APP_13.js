//let input, connectButton, greeting, title;
//const serviceUuid = "0000ffe0-0000-1000-8000-00805f9b34fb";  // service for make connection
const serviceUuid = 0xFFE0;  // service for make connection
const serviceUuid_r = "0000ffe2-0000-1000-8000-00805f9b34fb";
const serviceUuid_sensor = "0000181a-0000-1000-8000-00805f9b34fb";
const serviceUuid_s = "00010203-04050607-0809-0a0b0c0d1912";
const serviceUuid_t = "00002a1f-0000-1000-8000-00805f9b34fb";
let myCharacteristic, myCharacteristic_r;
let input;
let myBLE;
let myCanvas;
let bSlider;
let brTitle, title;
let brightV;
let isConnected = false;
let autobright = false;
let autoBr;
let autobrightCB;
var button;
var clockface;
var watchface;
var sec, sec_now;
var min, mm;
var hours, hh;
let d, mon, yr;
var toggle, lspan;
var ssid, pas;
var sensorID;
var mobileView, koef, centr;
var btnW, iconW;
var timeZone, synctime;
var narodEnable, narodMAC;
var myValue;
var townID;
var receivedValue;
var item, selUTC;
let myBLEValue = 0;
var m1;
var br,brr;
var splitTimeString, splitDateString;
let setComplete = false;
var syncWithNet;
var syncWithNarod;
var enForecast;
var parseString, parsedData;
var parseBright;
var parseOffset;
var parseSync;
var parseSenId;
var parseMAC;
var parseCityId;
var parseKey;
var nrdEn,forEn;
var currentSensID;
var mobileDesktop;
var currSync;

function setup() {
  // create canvas
//  createCanvas(600, 800);
//output = new AdaptiveOutput(this,1920,1080);

  createCanvas(windowWidth, windowHeight);
//  canvas.parent('sketch-holder');
//  _handleMotion();
console.log('orientation: ', deviceOrientation);  
// landscape/portrait
mobileDesktop = deviceOrientation;  
  
 koef = width/height;
 centr = width/2;
 if (koef < 0.8) {mobileView = true;}
 else {mobileView = false;}
 console.log('koef -> ', koef);

  textSize(20);
  noStroke();
  //myCanvas = createCanvas(800, 400);
//  background(200);
  //myCanvas.position(20,0);
//noCanvas();
  myBLE = new p5ble();    // create BLE istance

/*-------------- create simple link -----------------------
  let a = createA('http://p5js.org/', 'this is a link');
  a.position(10, 500);
 --------------------------------------------------------- */
/*
//---------------- Create buttons with clickable.js library --------------------------------------------
  //Create, style and resize clickables.
  click1 = new Clickable();
  click1.resize(120, 40);
  click1.locate(20, 480);
  //This function is ran when the clickable is hovered but not pressed.
  click1.onHover = function () {
    this.color = "#259525";
    this.textColor = "#FFFFFF";
    this.text = "> PRESS <";
  };
  //This function is ran when the clickable is NOT hovered.
  click1.onOutside = function () {
    this.color = "#257525";      //Background color of the clickable
    this.text = "PRESS";
    this.textSize = 18;
    this.textColor = "#FFFFFF";
    this.textFont = "curier";
    this.stroke = "#00BB00";      //Border color of the clickable
    this.cornerRadius = 5;       //Corner radius of the clickable (float)
    this.strokeWeight = 4;        //Stroke width of the clickable (float)
    this.textScaled = false;       //Whether to scale the text with the clickable
};
  
  //This function is ran when the clickable is pressed.
  click1.onPress = function () {
    this.color = "teal";
  };
  
  click1.onRelease = function () {
  };
//-------------------------------------------------------------
*/  
if(mobileView) 
{
//  windowHeight;
btnW = width/2 - 30;
iconW = width/3 - 20;
}
//else
//{
//btnW = 275;  
//}
console.log('btnW -> ', btnW);

//--------------------- заголовок ------------------------
  title = createElement('h4', 'BYTE CLOCK configuration ver.13');  
  title.style('font-family','"Courier New", "Lucida Console", monospace');
  title.style('margin', '5px');
  title.style('color', '#efefef');
  title.style('font-size', '20px');
  title.position(365, 0);
  if(mobileView) 
  {  title.position(85, 0);}
//----------------- кнопки connect/disconnect -------------
  // Create a 'Connect' button
  const connectButton = createButton('connect');
  connectButton.mousePressed(connectToBle);
  connectButton.style('font-size', '18px');
  connectButton.style('font-family','"Courier New", "Lucida Console", monospace');
  if(mobileView) {connectButton.size(btnW,40);}
  else {connectButton.size(275,40);}
//  connectButton.size(275,35);
  connectButton.position(15, title.y + 35);
  connectButton.style('border','solid 2px');
  connectButton.style('border-color','#DDDDDD');
  connectButton.style('border-radius','0.3em');
  connectButton.style('cursor','pointer');  
  connectButton.style('padding','0.1em 0.3em');
  connectButton.style('color','#ffffff');
  connectButton.style('background-color','#22BB11');
  

//  connectButton.mouseOver(changeBG);
//  connectButton.style('hover','#45ff45');
//  connectButton.style('background-color','#9555af');


  // Create a 'Connect' button
  const disConnectButton = createButton('disonnect');
  disConnectButton.mousePressed(disconnectToBle);
//  disConnectButton.style('font-size', '20px');  // change in style.css
  if(mobileView) {disConnectButton.size(btnW,40);}
  else {disConnectButton.size(275,40);}
//  disConnectButton.size(275,35);
  disConnectButton.style('border','solid 2px');
  disConnectButton.style('border-color','#DDDDDD');
  disConnectButton.style('border-radius','0.3em');
  disConnectButton.style('cursor','pointer');
  disConnectButton.style('padding','0.1em 0.3em');
  disConnectButton.style('color','#ffffff');
  disConnectButton.style('background-color','#e82145');
  disConnectButton.position(connectButton.width + 30, connectButton.y);
  disConnectButton.class('discButton');// assign a class to be used by the CSS sheet

//const btn = createButton('I am button');
//  btn.position(100, 200);
//  btn.style('border','solid 2px transparent');
//  btn.style('border-radius','0.4em');

//--------------- текстовый ввод SSID ---------------------------
  // Create a text input
//  inputSSID = createInput('ssid');  // можно сразу задать hint
  inputSSID = createInput().attribute('placeholder', 'ssid');  // а можно через добавление атрибута
  inputSSID.position(15, connectButton.y+connectButton.height + 10);
  if(mobileView) {inputSSID.size(btnW/1.52,40);}
  else {inputSSID.size(165,40);}
  inputSSID.class('inputfield');
//--------------- текстовый ввод PASSWORD ---------------------------
  // Create a text input
  inputPSW = createInput().attribute('placeholder', 'password').attribute('type', 'password');
  inputPSW.position(inputSSID.width + 20, connectButton.y+connectButton.height + 10);
  if(mobileView) {inputPSW.size(btnW/1.52,40);}
  else {inputPSW.size(165,40);}
//  inputPSW.size(165,35);
  inputPSW.class('inputfield');
//  inputPSW.style('type','password');
//------------------- кнопка save WIFI settings ---------------------------
  // Create a 'Write' button
  const writeButton = createButton('save WI-FI settings');
  writeButton.position(inputSSID.width + inputPSW.width + 25, inputSSID.y );
  if(mobileView) {writeButton.size(btnW/1.37,40);}
  else {writeButton.size(230,40);}
//  writeButton.size(230,35);
  writeButton.mousePressed(writeWiFiSet);
  writeButton.class('timeDate');

//--------------------- auto brightness label ------------------------  
autoBrTitle = createElement('h4', 'auto bright');
autoBrTitle.style('color', '#ffffff');
autoBrTitle.style('font-size', '16px');
autoBrTitle.style('margin', '3px');
autoBrTitle.style('font-family','"Courier New", "Lucida Console", monospace');
autoBrTitle.position(25, connectButton.height+inputSSID.height + title.height +50);
//--------------------- toggle auto brightness switch ------------------------  
//  let label = createElement('label',
//    `<input id="toggle" type="checkbox" />
//     <span class="slider round"></span>`
//  );
//label.position(65, autoBrTitle.y + 30);
//   // Because I'm using createElement() to create the label I have to add the class attribute:
//  label.addClass('switch');
//  checkbox = select('#toggle');
//  checkbox.changed(myToggleEvent);
  
//----------------- checkbox autobright ----------------------
  let brightCheckBox = createInput('click','checkbox');
  brightCheckBox.position(65, autoBrTitle.y + 30);
  brightCheckBox.id('autobrightCheck');
  brightCheckBox.class('newCheckbox');
  brightCheckBox.changed(brightCheckEvent);

//--------------------- slider label ------------------------
brTitle = createElement('h4', 'set brightness');
brTitle.style('color', '#ffffff');
brTitle.style('font-size', '16px');
brTitle.style('margin', '3px');
brTitle.style('font-family','"Courier New", "Lucida Console", monospace');
brTitle.position(brightCheckBox.y+125, connectButton.height + inputSSID.height + title.height + 50);
//---------------------- slider ----------------------------  
  // create sliders
  bSlider = createSlider(1, 100, 25);
  bSlider.position(inputPSW.x, brTitle.y + 30);
  bSlider.addClass("mySliders");
  if(mobileView) {bSlider.style('width', '320px');}
  else {bSlider.style('width', '380px');}
  //textAlign(CENTER);
  //textSize(20);
//bSlider.changed(brChanged);
  bSlider.mouseReleased(brChanged);  // значение слайдера обновляется только при отпускании мыши
//------------------- date/time input selectors ------------------------
  databInput = createInput('1970-01-01', 'date');
  databInput.position(15, bSlider.y + 60);
  databInput.class('timeDateInput');
  databInput.input(inputDataEvent);

  timebInput = createInput('12:45', 'time');
  timebInput.position(databInput.x + databInput.width + 130, bSlider.y + 60);
  timebInput.class('timeDateInput');
  timebInput.input(inputTimeEvent);
//------------------- UTC offset selector ------------------
  selUTC = createSelect();
  selUTC.position(timebInput.x + timebInput.width + 70, databInput.y);
  selUTC.size(80,35);
  //selUTC.style('font-size', '20px');
  //selUTC.style('text-align','center');
  //selUTC.style('border','none');
  //selUTC.style('border-radius','0.3em');
  selUTC.option('-12');
  selUTC.option('-11');
  selUTC.option('-10');
  selUTC.option('-9');
  selUTC.option('-8');
  selUTC.option('-7');
  selUTC.option('-6');
  selUTC.option('-5');
  selUTC.option('-4');
  selUTC.option('-3');
  selUTC.option('-2');
  selUTC.option('-1');
  selUTC.option('0');
  selUTC.option('1');
  selUTC.option('2');
  selUTC.option('3');
  selUTC.option('4');
  selUTC.option('5');
  selUTC.option('6');
  selUTC.option('7');
  selUTC.option('8');
  selUTC.option('9');
  selUTC.option('10');
  selUTC.option('11');
  selUTC.option('12');
  selUTC.option('13');
  selUTC.option('14');
  selUTC.selected('0');
  selUTC.changed(utcSelectEvent);
  selUTC.class('selector');
  
    //--------------------- UTC offset label ------------------------  
utcLabel = createElement('h4', 'UTC offset');
utcLabel.style('color', '#ffffff');
utcLabel.style('font-size', '16px');
utcLabel.style('margin', '3px');
utcLabel.style('font-family','"Courier New", "Lucida Console", monospace');
utcLabel.position(selUTC.x-10, selUTC.y - 25);
  
 //----------------- кнопкa sync date with system -------------
  //const dateButton = createButton('sync date with OS');
  //dateButton.mousePressed(setDate);
  //if(mobileView) {dateButton.size(btnW/1.95,40);}
  //else {dateButton.size(200,40);}
  //dateButton.position(15, databInput.y + 60);
  //dateButton.class('timeDate');
 
 //----------------- кнопкa sync time & date with system -------------
  // Create a 'set time' button
  const timeButton = createButton('sync time & date with system');
  timeButton.mousePressed(setTime);
//  timeButton.style('font-size', '18px');
  if(mobileView) {timeButton.size(btnW/0.7,40);}
  else {timeButton.size(420,40);}
//  timeButton.size(140,45);
  timeButton.position(15, databInput.y + 60);
  timeButton.class('timeDate');



  //--------------------- sync net time label ------------------------  
timeSyncEn = createElement('h4', 'sync net time');
timeSyncEn.style('color', '#ffffff');
timeSyncEn.style('font-size', '16px');
timeSyncEn.style('margin', '3px');
timeSyncEn.style('font-family','"Courier New", "Lucida Console", monospace');
timeSyncEn.position(timeButton.x + timeButton.width + 10, timeButton.y-20);
//--------------------- checkbox time sync function ------------------------  
  let netSyncCheckBox = createInput('sync','checkbox');
  netSyncCheckBox.position(timeSyncEn.x + 45, timeSyncEn.y + 25);
  netSyncCheckBox.id('netSyncro');
  netSyncCheckBox.class('newCheckbox');
  netSyncCheckBox.changed(netSyncCheckEvent);
//  let labelSync = createElement('label',
//    `<input id="toggle1" type="checkbox" />
//     <span class="slider round"></span>`
//  );
//labelSync.position(timeSyncEn.x + 35, timeSyncEn.y + 25);
//   // Because I'm using createElement() to create the label I have to add the class attribute:
//  labelSync.addClass('switch');
//  checkboxSync = select('#toggle1');
//  checkboxSync.changed(myToggleSync);
//+++++++++++++++++++++
 
/*
  //--------------- текстовый ввод set timezone offset ---------------------------
  inputTimeZone = createInput().attribute('placeholder', 'time zone');  // а можно через добавление атрибута
  inputTimeZone.position( 15, timeButton.y+timeButton.height+10);
  if(mobileView) {inputTimeZone.size(btnW/1.95,40);}
  else {inputTimeZone.size(200,40);}
  inputTimeZone.class('inputfield');
   //----------------- кнопка set TIME zone -------------
  const setOffset = createButton('set TIME zone');
  setOffset.mousePressed(setTimeZone);
  if(mobileView) {setOffset.size(btnW/1.95,40);}
  else {setOffset.size(200,40);}
  setOffset.position(inputTimeZone.width + 35, dateButton.y+dateButton.height+10);
  setOffset.class('timeDate');
*/ 

  //------------------- current sensor ID paragraph ----------------------
  currentSensID = createP('current sensor ID');
  currentSensID.style('margin','2px');
  currentSensID.class('currentdata');
  currentSensID.id('cursensid');
  currentSensID.position(15,timeButton.y+timeButton.height+10); 
  //--------------- текстовый ввод sensor ID ---------------------------
  // Create a text input
//  inputSSID = createInput('ssid');  // можно сразу задать hint
  inputSensorID = createInput().attribute('placeholder', 'enter sensor ID');  // а можно через добавление атрибута
  inputSensorID.position( 15, currentSensID.y+currentSensID.height+10);
//  inputTimeZone.position( 15, inputSensorID.y+inputSensorID.height+20);
//  inputSSID.position(15, connectButton.y+connectButton.height + 20);
  if(mobileView) {inputSensorID.size(btnW/1.5,40);}
  else {inputSensorID.size(200,40);}
  inputSensorID.class('inputfield');
 
 //----------------- кнопка set sensor ID -------------
  const setIDButton = createButton('set sensor ID');
  setIDButton.mousePressed(setSensorID);
//  dateButton.style('font-size', '18px');
  if(mobileView) {setIDButton.size(btnW/1.5,40);}
  else {setIDButton.size(200,40);}
//  setIDButton.size(160,35);
  setIDButton.position(inputSensorID.width + 35, currentSensID.y+currentSensID.height+10);
  setIDButton.class('timeDate');
  
    //------------------- current sensor MAC address paragraph ----------------------
  currentSensMAC = createP('current sensor MAC');
//  currentSensID.style('margin','2px');
  currentSensMAC.class('currentdata');
  currentSensMAC.id('cursensmac');
  currentSensMAC.position(15,inputSensorID.y+inputSensorID.height+10); 

  //--------------- текстовый ввод set MAC adress ---------------------------
  // Create a text input
//  inputSSID = createInput('ssid');  // можно сразу задать hint
  inputMac = createInput().attribute('placeholder', 'enter MAC address');  // а можно через добавление атрибута
  inputMac.position( 15, currentSensMAC.y+currentSensMAC.height+10);
//  inputSSID.position(15, connectButton.y+connectButton.height + 20);
  if(mobileView) {inputMac.size(btnW/1.5,40);}
  else {inputMac.size(200,40);}
  inputMac.class('inputfield');
 //----------------- кнопка set MAC adress -------------
  const setMac = createButton('set MAC address');
  setMac.mousePressed(setMAC);
//  dateButton.style('font-size', '18px');
  if(mobileView) {setMac.size(btnW/1.5,40);}
  else {setMac.size(200,40);}
//  setIDButton.size(160,35);
  setMac.position(inputMac.width + 35, currentSensMAC.y+currentSensMAC.height+10);
  setMac.class('timeDate');
  //--------------------- narodmon.ru enable label ------------------------  
narodmonEn = createElement('h4', 'narodmon.ru');
narodmonEn.style('color', '#ffffff');
narodmonEn.style('font-size', '16px');
narodmonEn.style('margin', '3px');
narodmonEn.style('font-family','"Courier New", "Lucida Console", monospace');
narodmonEn.position(setMac.x + setMac.width + 25, setMac.y-25);

//--------------------- checkbox send data to narodmon function ------------------------  
  let narodCheckBox = createInput('narod','checkbox');
  narodCheckBox.position(narodmonEn.x + 30, narodmonEn.y + 25);
  narodCheckBox.id('narodSendCheck');
  narodCheckBox.class('newCheckbox');
  narodCheckBox.changed(narodCheckEvent);
//--------------------- toggle narodmon.ru enable function ------------------------  
  //let labelNarodmon = createElement('label',
  //  `<input id="toggle2" type="checkbox" />
  //   <span class="slider round"></span>`
  //);
  //labelNarodmon.position(narodmonEn.x + 20, narodmonEn.y + 25);
  // // Because I'm using createElement() to create the label I have to add the class attribute:
  //labelNarodmon.addClass('switch');
  //checkboxNarod = select('#toggle2');
  //checkboxNarod.changed(myToggleNarodmon);
//+++++++++++++++++++++
//+++++++++++++++++++++

    //------------------- current city ID paragraph ----------------------
  currentCityID = createP('current city ID');
//  currentSensID.style('margin','2px');
  currentCityID.class('currentdata');
  currentCityID.id('curcityid');
  currentCityID.position(15,setMac.y+setMac.height+10); 
  //--------------- текстовый ввод set city ID ---------------------------
  // Create a text input
//  inputSSID = createInput('ssid');  // можно сразу задать hint
  inputCityID = createInput().attribute('placeholder', 'enter city ID');  // а можно через добавление атрибута
  inputCityID.position( 15, currentCityID.y+currentCityID.height+10);
//  inputSSID.position(15, connectButton.y+connectButton.height + 20);
  if(mobileView) {inputCityID.size(btnW/1.5,40);}
  else {inputCityID.size(200,40);}
  inputCityID.class('inputfield');
 //----------------- кнопка set city ID -------------
  const setCityID = createButton('set ID');
  setCityID.mousePressed(setTownID);
//  dateButton.style('font-size', '18px');
  if(mobileView) {setCityID.size(btnW/1.5,40);}
  else {setCityID.size(200,40);}
//  setIDButton.size(160,35);
  setCityID.position(inputCityID.x + inputCityID.width + 20, inputCityID.y);
  setCityID.class('timeDate');
  //--------------------- forecast enable label ------------------------  
forecastEn = createElement('h4', 'enable forecast');
forecastEn.style('color', '#ffffff');
forecastEn.style('font-size', '16px');
forecastEn.style('margin', '3px');
forecastEn.style('font-family','"Courier New", "Lucida Console", monospace');
forecastEn.position(setCityID.x + setCityID.width+25,setCityID.y-15);

//--------------------- checkbox forecast enable function ------------------------  
  let forecastCheckBox = createInput('forecast','checkbox');
  forecastCheckBox.position(forecastEn.x + 30, forecastEn.y + 25);
  forecastCheckBox.id('forecastCheck');
  forecastCheckBox.class('newCheckbox');
  forecastCheckBox.changed(forecastCheckEvent);
//--------------------- toggle forecast enable function ------------------------  
  //let labelForecast = createElement('label',
  //  `<input id="toggle3" type="checkbox" />
  //   <span class="slider round"></span>`
  //);
  //labelForecast.position(forecastEn.x + 20, forecastEn.y + 25);
  // // Because I'm using createElement() to create the label I have to add the class attribute:
  //labelForecast.addClass('switch');
  //checkboxForecast = select('#toggle3');
  //checkboxForecast.changed(myToggleForecast);  
  
      //------------------- current api KEY paragraph ----------------------
  currentKey = createP('current weather keyAPI');
//  currentSensID.style('margin','2px');
  currentKey.class('currentdata');
  currentKey.id('curkey');
  currentKey.position(15,inputCityID.y+inputCityID.height+10); 
  //--------------- текстовый ввод weather key ---------------------------  
    inputWeatherKey = createInput().attribute('placeholder', 'enter AccuWeather keyAPI');  // а можно через добавление атрибута
  inputWeatherKey.position( 15, currentKey.y+currentKey.height+10);
//  inputSSID.position(15, connectButton.y+connectButton.height + 20);
  if(mobileView) {inputWeatherKey.size(btnW*1.4,40);}
  else {inputWeatherKey.size(420,40);}
  inputWeatherKey.class('inputfield');
  inputWeatherKey.id('weatherKEY');
    //--------------- текстовый for testing parsing ---------------------------  
    inputParsing = createInput().attribute('placeholder', 'enter data for parsing');  // а можно через добавление атрибута
  inputParsing.position( 15, 800);
//  inputSSID.position(15, connectButton.y+connectButton.height + 20);
  if(mobileView) {inputParsing.size(btnW*1.4,40);}
  else {inputParsing.size(720,40);}
  inputParsing.class('inputfield');
  inputParsing.input(parsingEvent);

 //----------------- кнопка set city KEY -------------
  const setCityKey = createButton('set KEY');
  setCityKey.mousePressed(setKeyAPI);
//  dateButton.style('font-size', '18px');
  if(mobileView) {setCityKey.size(btnW/2.6,40);}
  else {setCityKey.size(100,40);}
//  setIDButton.size(160,35);
  setCityKey.position(inputWeatherKey.x + inputWeatherKey.width + 20, inputWeatherKey.y);
  setCityKey.class('timeDate');
//*************************************************************************************
//------------------------ buttons for watchfaces -------------------------  
//*************************************************************************************
// ----create buttons with image for clockfaces----
            //---------- small -------------
    buttSmall = createImg('image/small_1.png');
//    buttSmall.position(15, inputWeatherKey.y + inputWeatherKey.height + 25);
buttSmall.position(650, disConnectButton.y+20);
if(mobileView) {
  buttSmall.size(iconW/1.2,iconW/1.8);
  buttSmall.position(15, inputWeatherKey.y+inputWeatherKey.height+30);
  }
  else {
  buttSmall.size(180,120);
  }
  //  buttSmall.size(220,150);
//    buttSmall.style('border-radius','0.2em');
//    buttSmall.style('cursor','pointer');
    buttSmall.mousePressed(setClockFace_1);
    buttSmall.class('faceButton');
          //---------- big ---------------
   buttBig = createImg('image/big_2.png');
//  
    buttBig.position(buttSmall.x+buttSmall.width +20, disConnectButton.y+20);
  if(mobileView) {
  buttBig.size(iconW/1.2,iconW/1.8);
buttBig.position(buttSmall.x+buttSmall.width +20, inputWeatherKey.y + inputWeatherKey.height + 30);
}
  else {
  buttBig.size(180,120);
  }
//    buttBig.size(120,65);
//    buttBig.style('border-radius','0.2em');
//    buttBig.style('cursor','pointer');
    buttBig.mousePressed(setClockFace_2);
    buttBig.class('faceButton');
            //------------- big half -----------------
    buttBigHalf = createImg('image/big_half_3.png');
    buttBigHalf.position(buttBig.x+buttBig.width +20, disConnectButton.y+20);

   if(mobileView) {
    buttBigHalf.position(buttBig.x+buttBig.width +20, inputWeatherKey.y + inputWeatherKey.height + 30); 
     buttBigHalf.size(iconW/1.2,iconW/1.8);
    }
    else {
    buttBigHalf.size(180,120);

//    buttBigHalf.position(buttBig.x+210, inputSensorID.y + inputSensorID.height + 210);  
    }
   //buttBigHalf.style('border-radius','0.2em');
    //buttBigHalf.style('cursor','pointer');
    //buttBigHalf.size(120,65);
    buttBigHalf.mousePressed(setClockFace_3);   
    buttBigHalf.class('faceButton');
          //---------------- thermo ------------------
    buttThermo = createImg('image/thermo_4.png');
    buttThermo.position(650, buttSmall.y + buttSmall.height + 20);
   if(mobileView) {
    buttThermo.size(iconW/1.2,iconW/1.8);
    buttThermo.position(15, buttSmall.y + buttSmall.height + 20);
    }
    else {
    buttThermo.size(180,120);
    }
    //buttThermo.style('border-radius','0.2em');    
    //buttThermo.style('cursor','pointer');
    //buttThermo.size(120,65);
    buttThermo.mousePressed(setClockFace_4);
    buttThermo.class('faceButton');
          //------------- info view ---------------
    buttInfo = createImg('image/info_5.png');
    buttInfo.position(buttThermo.x + buttThermo.width + 20, buttSmall.y + buttSmall.height + 20);
    if(mobileView) {
    buttInfo.size(iconW/1.2,iconW/1.8);
    }
    else {
    buttInfo.size(180,120);
    }
    //buttVertical.style('border-radius','0.2em');
    //buttVertical.style('cursor','pointer');
    //buttVertical.size(120,65);
    buttInfo.mousePressed(setClockFace_5);
    buttInfo.class('faceButton');
            //-------------- vertical ----------------
    buttVertical = createImg('image/vertical_6.png');
    buttVertical.position(buttInfo.x + buttInfo.width + 20, buttSmall.y + buttSmall.height + 20);
   if(mobileView) {
    buttVertical.size(iconW/1.2,iconW/1.8);
    }
    else {
    buttVertical.size(180,120);
    }
    //buttPicture.style('border-radius','0.2em');
    //buttPicture.style('cursor','pointer');
    //buttPicture.size(120,65);
    buttVertical.mousePressed(setClockFace_6);
    buttVertical.class('faceButton');
        //---------------picture ----------------
    buttPicture = createImg('image/picture_7.png');
    buttPicture.position(650, buttThermo.y + buttThermo.height + 20);
   if(mobileView) {
    buttPicture.size(iconW/1.2,iconW/1.8);
    buttPicture.position(15, buttThermo.y + buttThermo.height + 20);
  }
    else {
    buttPicture.size(180,120);
    }
    buttPicture.mousePressed(setClockFace_7);   
    buttPicture.class('faceButton');
    
        //------------ weather -----------------
    buttWeather = createImg('image/weather_9.png');
    buttWeather.position(buttPicture.x+buttPicture.width + 20, buttThermo.y + buttThermo.height + 20);
    if(mobileView) {
    buttWeather.size(iconW/1.2,iconW/1.8);
    }
    else {
    buttWeather.size(180,120);
    }
    buttWeather.mousePressed(setClockFace_9);
    buttWeather.class('faceButton');
      //--------------- chat -----------------     
    buttChat = createImg('image/chat_10.png');
    buttChat.position(buttWeather.x+buttWeather.width + 20, buttThermo.y + buttThermo.height + 20); 
   if(mobileView) {
    buttChat.size(iconW/1.2,iconW/1.8);
    }
    else {
    buttChat.size(180,120);
    }
    buttChat.mousePressed(setClockFace_10);
    buttChat.class('faceButton');
//+++++++++++++++++++++ clockface title +++++++++++++++++++++++++
let p = createP('select watchface');
  p.style('font-family','"Courier New", "Lucida Console", monospace');
  p.style('margin', '2px');
  p.style('color', '#efefef');
  p.style('font-size', '16px');
  p.position(buttBig.x+10, disConnectButton.y);
  if(mobileView) {  p.position(buttSmall.x+buttSmall.width, buttBig.y-25 );}

  
//  let box_new = createInput('click','checkbox');
//  box_new.position(15,550);
//  box_new.id('newbox');
//  box_new.class('newCheckbox');
  
////    const box = box_new.elt.getElementsByTagName('newbox')[0];
//    var x = document.getElementById("newbox").checked = true;  



//let names = 'Pat,Xio,Alex';
//let splitString = split(names, ',');
//text(splitString[0], 5, 30);
//text(splitString[1], 5, 50);
//text(splitString[2], 5, 70);
  
}



function draw() {
//  if (mouseIsPressed === true) {
//console.log('window width -> ', windowWidth);
//console.log('window height -> ', windowHeight);
//}

  //--------------- draw background first ---------------- 
  if (isConnected) {
//    background(49,145,123);
    background('#4bb4b4');
//    text('Connected :)', 220, title.y + 65);
  } else {
    background(150,150,150);
//    textAlign(LEFT, TOP);
//    text('Disconnected :/', 220, title.y + 65);
  }

rect(635, buttSmall.y -20, buttBigHalf.width*3 + 65, buttSmall.height*3+75);
if(mobileView) {
rect(5, buttSmall.y -20, buttBigHalf.x+buttBigHalf.width +5, buttSmall.height*3+65);
}
fill('gray');
//------------------------------------- 
text('BLE data > ',15,inputWeatherKey.y+inputWeatherKey.height+50);
text(receivedValue,125,inputWeatherKey.y+inputWeatherKey.height+50);

//if(parseBright=='1') {
//currentBr = document.getElementById("autobrightCheck").checked = true;
//}
//else {
//currentBr = document.getElementById("autobrightCheck").checked = false;
//}

switch(parseBright) {
  case 0: /* currentBr = */document.getElementById("autobrightCheck").checked = false;
  break;
  case 1: /* currentBr =*/ document.getElementById("autobrightCheck").checked = true;
  break;
}

switch(parseSync) {
  case 0:  /*currSync = */document.getElementById("netSyncro").checked = false;
  break;
  case 1:  /*currSync =*/ document.getElementById("netSyncro").checked = true;
  break;
}

switch(nrdEn) {
  case 0:  /*currentBr =*/ document.getElementById("narodSendCheck").checked = false;
  break;
  case 1:  /*currentBr =*/ document.getElementById("narodSendCheck").checked = true;
  break;
}

switch(forEn) {
  case 0:  /*currentBr =*/ document.getElementById("forecastCheck").checked = false;
  break;
  case 1:  /*currentBr =*/ document.getElementById("forecastCheck").checked = true;
  break;
}


document.getElementById("cursensid").innerHTML = "current ID: " + parseSenId;   // current sensor ID
document.getElementById("cursensmac").innerHTML = "current MAC: " + parseMAC;    // current sensor MAC
document.getElementById("curcityid").innerHTML = "current city ID: " + parseCityId;  // current city ID
document.getElementById("curkey").innerHTML = "current keyAPI: " + parseKey;        // current city ID
//if(parseBright == 1) {
//currentBr = document.getElementById("autobrightCheck").checked = true;
//}
//else {
//currentBr = document.getElementById("autobrightCheck").checked = false;
//}

//document.getElementById("weatherKEY").value = parseKey;
}  // draw

/// Add these lines below sketch to prevent scrolling on mobile
function touchMoved() {
  // do some stuff
  return false;
}

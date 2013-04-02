#!/usr/local/bin/node



// Make random numbers
function getRandomInt(min, max) {
    return Math.floor( Math.random() * (max - min + 1)) + min;
}

var fs = require('fs')
var rootName = "BMSBoard_",
    numFiles = 28;

var value1 = undefined;
var value2 = undefined;
var value3 = undefined;
var value4 = undefined;
var value5 = undefined;
var value6 = undefined;
var value7 = undefined;
var value8 = undefined;
var insideScript = "";

function createIno(){

    value1 = getRandomInt(800, 1970);
    value2 = getRandomInt(800, 1970);
    value3 = getRandomInt(800, 1970);
    value4 = getRandomInt(800, 1970);
    value5 = getRandomInt(800, 1970);
    value6 = getRandomInt(800, 1970);
    value7 = getRandomInt(800, 1970);
    value8 = getRandomInt(800, 1970);

    insideScript = 
    "#include <SoftwareSerial.h>\n" +
    "#include <XBee.h>\n"+
    "\n"+
    "\n"+
    "#define loadOffset 0\n"+
    "\n"+
    "\n"+
    "SoftwareSerial mySerial(8,7);\t\t\t //RX, TX\n"+
    "XBee xbee = XBee();\n"+
    "\n"+
    "\n"+
    "// For Transmission\n"+
    "uint8_t payload[20];\n"+
    "Tx16Request tx = Tx16Request(0x0000, payload, sizeof(payload));\n"+
    "\n"+
    "\n"+
    "// For recieving\n"+
    "Rx16Response rx16 = Rx16Response();\n"+
    "\n"+
    "\n"+
    "// Values we'll be sending\n"+
    "\n"+
    "\n"+
    "int Voltage1 = " + value1 + ";\n"+
    "int Voltage2 = " + value2 + ";\n"+
    "int Voltage3 = " + value3 + ";\n"+
    "int Voltage4 = " + value4 + ";\n"+
    "int Voltage5 = " + value5 + ";\n"+
    "int Voltage6 = " + value6 + ";\n"+
    "int Voltage7 = " + value7 + ";\n"+
    "int Voltage8 = " + value8 + ";\n"+
    "\n"+
    "void createPayload(){ \n"+
    "\tpayload[0 + loadOffset] = Voltage1 >> 8 & 0xff;\n"+
    "\tpayload[1 + loadOffset] = Voltage1 >> 8 & 0xff;\n"+
    "\tpayload[2 + loadOffset] = Voltage2 >> 8 & 0xff;\n"+
    "\tpayload[3 + loadOffset] = Voltage2 >> 8 & 0xff;\n"+
    "\tpayload[4 + loadOffset] = Voltage3 >> 8 & 0xff;\n"+
    "\tpayload[5 + loadOffset] = Voltage3 >> 8 & 0xff;\n"+
    "\tpayload[6 + loadOffset] = Voltage4 >> 8 & 0xff;\n"+
    "\tpayload[7 + loadOffset] = Voltage4 >> 8 & 0xff;\n"+
    "\tpayload[8 + loadOffset] = Voltage5 >> 8 & 0xff;\n"+
    "\tpayload[9 + loadOffset] = Voltage5 >> 8 & 0xff;\n"+
    "\tpayload[10 + loadOffset] = Voltage6 >> 8 & 0xff;\n"+
    "\tpayload[11 + loadOffset] = Voltage6 >> 8 & 0xff;\n"+
    "\tpayload[12 + loadOffset] = Voltage7 >> 8 & 0xff;\n"+
    "\tpayload[13 + loadOffset] = Voltage7 >> 8 & 0xff;\n"+
    "\tpayload[14 + loadOffset] = Voltage8 >> 8 & 0xff;\n"+
    "\tpayload[15 + loadOffset] = Voltage8 >> 8 & 0xff;\n"+
    "}\n"+
    "\n"+
    "void setup(){\n"+
    "\tSerial.begin(115200);\n"+
    "\tmySerial.begin(9600);\n"+
    "\n"+
    "\n"+
    "\txbee.setSerial(mySerial);\n"+
    "}\n"+
    "\n"+
    "void loop(){\n"+
    "\txbee.readPacket(100);\n"+
    "\tif(xbee.getResponse().isAvailable()){\n"+
    "\t\tif(xbee.getResponse().getApiId() == RX_16_RESPONSE){\n"+
    "\t\t\txbee.getResponse().getRx16Response(rx16);\n"+
    "\t\t\tSerial.print('Message recieved from: ');\n"+
    "\t\t\tSerial.println(rx16.getRemoteAddress16());\n"+
    "\t\t\tSerial.print('Message Content: ');\n"+
    "\t\t\tfor(int i = 0; i < rx16.getDataLength(); i++){\n"+
    "\t\t\t\tSerial.print(char(rx16.getData(i)));\n"+
    "\t\t\t}\n"+
    "\t\t\tcreatePayload();\n"+
    "\t\t\txbee.send(tx);\n"+
    "\t\t\tSerial.println('\\n------------------');\n"+
    "\t\t}\n"+
    "\t}\n"+
    "}\n"
}

for( var i = 0; i < numFiles; i++){

    createIno();
    dirName = rootName+ i.toString(16);
    fs.mkdirSync(dirName);
    fs.writeFileSync(dirName+'/'+dirName+'.ino', insideScript)
    console.log("\nFile Name: " + dirName);
    console.log("Values are: " +
                "\n\t" + value1 +
                "\n\t" + value2 + 
                "\n\t" + value3 +
                "\n\t" + value4 + 
                "\n\t" + value5 +
                "\n\t" + value6 +
                "\n\t" + value7 + 
                "\n\t" + value8 )}



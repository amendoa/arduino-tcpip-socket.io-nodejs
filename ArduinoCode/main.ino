#include <SPI.h>
#include <Ethernet.h>
#include <ArduinoJson.h>

byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };

IPAddress clientIP(192, 168, 0, 177);
IPAddress serverIP(192, 168, 0, 100);

int serverPort = 1337;

EthernetClient ethernetClient;

JsonObject& stringToJSON (const char* charJSONString) {
	StaticJsonBuffer<200> jsonBuffer;
	return jsonBuffer.parseObject(charJSONString);
}

void setup () {
	pinMode(13, OUTPUT);
	Ethernet.begin(mac, clientIP);
	Serial.begin(9600);	
}

void loop () {
	digitalWrite(13, HIGH);
	delay(1000);
	digitalWrite(13, LOW);
 	delay(1000);
	
	if (!ethernetClient.connected()) {
		ethernetClient.stop();
		ethernetClient.connect(serverIP, serverPort);
		Serial.println("Disconnected");
	} else {
		Serial.println("Conectado");
		if (ethernetClient.available()) {
			String command = ethernetClient.readString();
			command.trim();
			const char* serverMessage = command.c_str();
			JsonObject& JSONObject = stringToJSON(serverMessage);
			Serial.println((int)JSONObject["pin"]);
		}
	}
	delay(2000);
}


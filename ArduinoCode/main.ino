#include <SPI.h>
#include <Ethernet.h>
#include <ArduinoJson.h>

byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };

IPAddress clientIP(192, 168, 0, 177);
IPAddress serverIP(192, 168, 0, 100);

int serverPort = 1337;

EthernetClient ethernetClient;

void setup () {
	pinMode(13, OUTPUT);
	Ethernet.begin(mac, clientIP);
	Serial.begin(9600);
}

void loop () {
	if (!ethernetClient.connected()) {
		ethernetClient.stop();
		ethernetClient.connect(serverIP, serverPort);
		Serial.println("Disconnected");
	} else {
		Serial.println("Conectado");
		if (ethernetClient.available()) {
			StaticJsonBuffer<200> jsonBuffer;

			String serverMessage = ethernetClient.readString();
			JsonObject& jsonObject = jsonBuffer.parseObject(serverMessage);
			digitalWrite((int)jsonObject["pin"], !digitalRead((int)jsonObject["pin"]));

			JsonObject& serverResponse = jsonBuffer.createObject();
			serverResponse["pin"] = jsonObject["pin"];
			serverResponse["pinMode"] = digitalRead((int)jsonObject["pin"]);
			char buffer[256];
			serverResponse.printTo(buffer, sizeof(buffer));
			ethernetClient.print(buffer);
		}
	}
}
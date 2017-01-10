#include <SPI.h>
#include <Ethernet.h>

IPAddress clientIP(192, 168, 0, 255);
IPAddress serverIP(192, 168, 15, 7);
int serverPort = 1337;
byte mac[] = { 0x90, 0xA2, 0xDA, 0x00, 0x6C, 0xFE };

EthernetClient ethernetClient;

void setup () {
	Ethernet.begin(mac, clientIP);
	Serial.begin(9600);
	delay(1500);
	Serial.println("Conecting");

	if (ethernetClient.connect(serverIP, serverPort)) {
		Serial.println('Connected');
	} else {
		Serial.println('Error');
	}
	pinMode (11, OUTPUT);
}

void loop () {
	digitalWrite (11, HIGH);
	delay (1000);
	digitalWrite (11, LOW);
	delay (1000);
}
#include <SPI.h>
#include <Ethernet.h>

IPAddress clientIP(192, 168, 0, 255);
IPAddress serverIP(192, 168, 122, 1);

void setup () {
	pinMode (11, OUTPUT);
}

void loop () {
	digitalWrite (11, HIGH);
	delay (1000);
	digitalWrite (11, LOW);
	delay (1000);
}

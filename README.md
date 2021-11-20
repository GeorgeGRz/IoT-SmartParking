# IoT-SmartParking
## About this project
This repository holds the group project of two courses of the 7th semester. Namely, we will be developing a group project for the IoT course as well as the Network and Communication Security course. 

Even though this group project consists of two smaller - and now merged - projects, it holds the basic idea of Smart Parking. That is, the user's ability of searching free parking spots, as well as the notification over various changes of the parking space and the proper authentication of the user as a matter of security, using the OAuth 2.0 Protocol.

By implementing this project we validate the basic points made by the IoT objectives which are : cheap sensors, low energy consumming and easily accessible technologies.

## Hardware Prerequisites
- RaspberryPi
- ESP Wi-Fi MCU 
- Arduino
- Contactless Magnetic Sensor

## Brief System Functioning Description 
### User Authentication (Security project driven)
1. User selects his car and types in his credentials. A HTTS/POST is sent to the server in order to authenticate the user.
2. If the user's credentials are invalid then the server rejects the user. However, if the user's credentials are valid, then a random passphrase is sent to the user along with the IP address of the car.
3. User sends the passphrase to the car.
4. Car sends the passphrase back to the webserver.
5. Webserver checks the passphrase sent by the car. If it is the same with the one he sent to the user, then the user is to be authenticated successfully. If not, then the server rejects the user.

### Updating and Retrieving Cars' List (IoT project driven)
1. Car holds its own password that is only known by the user.
2. Car enters the parking lot after the authentication mentioned above.
3. Car sends a HTTP/POST request to the server, which contains its IP address along with its type/name.
4. Server updates the car list.
5. User sends a HTTPS/GET request to receive availability of the parking lot.
6. Server sends back the car list.

## Indicative User Authentication Schematic
![Authentication Schematic](https://user-images.githubusercontent.com/75671329/142730237-7f333837-6855-4a40-a260-14c8fe9222c5.png)

## Indicative IoT Architecture Schematic
![IoT Architecture Schematic](https://user-images.githubusercontent.com/75671329/142730261-6a98ecbb-93ec-489f-aafc-513025a776d5.png)


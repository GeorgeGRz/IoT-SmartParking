# IoT-SmartParking
## About this project
This repository holds the group project of the IoT course of the 7th semester. Namely, we will be developing a group project for the IoT course.

This project holds the basic idea of Smart Parking. That is, the user's ability of searching free parking spots, as well as the notification over various changes of the parking space.

By implementing this project we validate the basic points made by the IoT objectives which are : cheap sensors, low energy consumming and easily accessible technologies.

## Hardware Prerequisites
- RaspberryPi
- Smartphone 

## Software Prerequisites
- Smart Parking Android Application
- Smart Parking Website

## Brief System Functioning Description 

### Updating and Retrieving Cars' List (IoT project driven)
1. Car holds its own password that is only known by the user.
2. Car enters the parking lot after the authentication mentioned above.
3. Car sends a HTTP/POST request to the server, which contains its IP address along with its type/name.
4. Server updates the car list.
5. User sends a HTTPS/GET request to receive availability of the parking lot.
6. Server sends back the car list.


## Indicative IoT Architecture Schematic
![IoT Architecture Schematic](https://user-images.githubusercontent.com/75671329/142730261-6a98ecbb-93ec-489f-aafc-513025a776d5.png)

## Overall Architecture 
![Overall Architecture](https://user-images.githubusercontent.com/75671329/142731802-6fcb20df-bad0-4dd8-96cc-cb1e7e298582.png)

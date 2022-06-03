# Raspberry Pi Configuration 

```
   __  ____                        ____                     _      __ __  
  / / |  _ \ _ __ ___  _ __   ___ / ___|_   _  __ _ _ __ __| |    / / \ \ 
 / /  | | | | '__/ _ \| '_ \ / _ \ |  _| | | |/ _` | '__/ _` |   / /   \ \
 \ \  | |_| | | | (_) | | | |  __/ |_| | |_| | (_| | | | (_| |  / /    / /
  \_\ |____/|_|  \___/|_| |_|\___|\____|\__,_|\__,_|_|  \__,_| /_/    /_/ 

```
## Relevant Links

- [Etcher](https://www.balena.io/etcher/)
- [OS image](https://www.raspberrypi.com/software/operating-systems/#:~:text=Raspberry%20Pi%20OS%20Lite%20(Legacy))
- [Setup Raspberry Pi Zero](https://youtu.be/3VO4vGlQ1pg)
- [Setup Raspberry Pi Zero (2022 version)](https://youtu.be/yn59qX-Td3E)

## Set up new RP
### 1. Use Etcher to flash the [OS](https://www.raspberrypi.com/software/operating-systems/#:~:text=Raspberry%20Pi%20OS%20Lite%20(Legacy)) image to the SD card
### 2. Create ssh file
> `$touch ssh`
### 3. Create / edit wpa_supplicant.conf file
> `$vim wpa_supplicant.conf`
```js
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=US

network={
	ssid="your_wifi_network_name"
	psk="your_wifi_network_password"
	key_mgmt=WPA-PSK
}
```
### 4. Run `setup-new-rp.sh` to install relevant apps
> `$chmod +x ./setup-new-rp.sh && ./setup-new-rp.sh`
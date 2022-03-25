# Rasperry Pi Configuration 

```
   __  ____                        ____                     _      __ __  
  / / |  _ \ _ __ ___  _ __   ___ / ___|_   _  __ _ _ __ __| |    / / \ \ 
 / /  | | | | '__/ _ \| '_ \ / _ \ |  _| | | |/ _` | '__/ _` |   / /   \ \
 \ \  | |_| | | | (_) | | | |  __/ |_| | |_| | (_| | | | (_| |  / /    / /
  \_\ |____/|_|  \___/|_| |_|\___|\____|\__,_|\__,_|_|  \__,_| /_/    /_/ 

```
## Relevant Links

- <a href="https://www.balena.io/etcher/" target="_blank">Etcher</a>
- <a href="https://www.raspberrypi.com/software/operating-systems/#:~:text=Raspberry%20Pi%20OS%20Lite%20(Legacy)" target="_blank">OS img</a>
- <a href="https://youtu.be/3VO4vGlQ1pg">Setup Raspberry Pi Zero</a>
- <a href="https://youtu.be/yn59qX-Td3E" target="_blank">Setup Raspberry Pi Zero (2022 version)</a>

## SD card essentials files
- Create ssh file: <br/>
> `$touch ssh`
- Create / edit wpa_supplicant.conf file: <br/>
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

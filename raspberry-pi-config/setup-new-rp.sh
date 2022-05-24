#!/bin/sh

# This .sh file created in order to config a new ubuntu machine for DroneGuard Project
# ======= cat /etc/*-release ========
# PRETTY_NAME="Raspbian GNU/Linux 10 (buster)"
# NAME="Raspbian GNU/Linux"
# VERSION_ID="10"
# VERSION="10 (buster)"
# VERSION_CODENAME=buster
# ID=raspbian
# ID_LIKE=debian
# HOME_URL="http://www.raspbian.org/"
# SUPPORT_URL="http://www.raspbian.org/RaspbianForums"
# BUG_REPORT_URL="http://www.raspbian.org/RaspbianBugs"

HEADER=$(tput setaf 5; tput bold; tput smul)
NC=$(tput sgr0)

echo "${HEADER}===== Update current OS =====${NC}"
sudo apt -y install ntp;
sudo apt clean && sudo apt update && sudo apt list --upgradable
sudo apt dist-upgrade;
sudo apt autoremove;

echo "${HEADER}===== Set aliases =====${NC}"
echo alias l=\'ls -CF\'$'\n'alias ll=\'ls -alF\'$'\n'alias la=\'ls -A\' > ~/.bash_aliases;
sleep 0.5;
source ~/.bash_aliases;

echo "${HEADER}===== Install git =====${NC}"
sudo apt -y install git;

echo "${HEADER}===== Install vim =====${NC}"
sudo apt -y install vim;

echo "${HEADER}===== Install Node and NPM =====${NC}"
sudo apt -y install nodejs;
sudo apt -y install npm;

echo "${HEADER}===== Install Python =====${NC}"
sudo apt-get -y install python3;
echo alias python=python3 >> ~/.bash_aliases;
sleep 0.5;
source ~/.bash_aliases;

echo "${HEADER}===== Install pip =====${NC}"
sudo apt-get -y install python3-pip;
echo alias pip=pip3 >> ~/.bash_aliases;
sleep 0.5;
source ~/.bash_aliases;

echo "${HEADER}===== Set Local Time =====${NC}"
sudo dpkg-reconfigure tzdata;
#!/bin/bash

if [ `cat /etc/issue |cut -d' ' -f3` != "openSUSE" ]
then
    echo "Not in an openSUSE environment!"
    exit 1
fi

sudo zypper in texlive-xetex
sudo zypper in texlive-latex
sudo zypper in texlive
sudo zypper in texlive-xetex-def texlive-xltxtra texlive-tocbibind
sudo zypper in in texlive-euenc texlive-frame texlive-footnpag texlive-titlesec
sudo zypper in texlive-appendix

sudo zypper in texlive-arphic # from arphic
sudo zypper in arphic-gbsn00lp-fonts arphic-ukai-fonts arphic-uming-fonts
sudo zypper in wqy-microhei-fonts wqy-zenhei-fonts # from WenQuanYi

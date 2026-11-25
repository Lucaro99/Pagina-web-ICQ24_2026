#!/bin/sh
# Uso: sh render.sh Nombre ANCHO ALTO [white]
#  - sin "white": ../render/Nombre.png con fondo transparente (para la web)
#  - con "white": ../render/preview/Nombre.png sobre blanco (para revisar)
DIR="$(cd "$(dirname "$0")" && pwd -W 2>/dev/null || pwd)"
CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
OUT="$DIR/../render/$1.png"; Q=""
if [ "$4" = "white" ]; then mkdir -p "$DIR/../render/preview"; OUT="$DIR/../render/preview/$1.png"; Q="?white"; fi
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --default-background-color=00000000 \
  --force-device-scale-factor=1 --window-size="$2,$3" --virtual-time-budget=8000 \
  --screenshot="$OUT" "file:///$DIR/$1.html$Q" 2>/dev/null

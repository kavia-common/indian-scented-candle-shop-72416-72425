#!/bin/bash
cd /home/kavia/workspace/code-generation/indian-scented-candle-shop-72416-72425/candle_store_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


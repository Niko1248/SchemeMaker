@echo off
start cmd /k "node index.js"
timeout /t 5 /nobreak > nul
start chrome.exe http://localhost:3000

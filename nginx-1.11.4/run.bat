@echo off
rd /s /q  temp
md temp 
rd /s /q logs
md logs 
nginx.exe -c conf\nginx.conf
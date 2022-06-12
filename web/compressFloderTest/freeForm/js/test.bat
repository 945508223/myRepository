@echo off
SET JSFOLDER=E:\projects\echarsTest\web\compressFloderTest\freeForm\js\components
echo 正在查找JS文件
chdir /d %JSFOLDER%
for /r . %%a in (*.js) do (
    @echo 正在压缩 %%~a ...
    uglifyjs %%~fa  -m -o %%~fa
)

echo. & pause
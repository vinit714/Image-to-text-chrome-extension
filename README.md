# Image-to-text-chrome-extension
## Abstract
A chrome extension that can recognize any type of text in your browser
from any video or image using the concept of OCR. OCR is the short
form of Optical Character Recognition or in other word-finding text in
images. Google had previously released an engine called Tesseract OCR,
this means that Google provides you with a program that has text recognition already trained into it, so I don’t have to do complicated things
like training the data in OCR myself. But to get more accurate we have
to pre-process the image before passing it through Tesseract as Tesseract
has some predefined circumstances which are needed to be followed to
get an accurate result. So for the functionality of our extension, it first
takes a screenshot from the currently opened tab, then crops the desired
part using canvas and adjusts it using threshold binarization so that it
can fill OCR requirements to give more accurate results. Then send it to
pytesseract (Python version of Tesseract) so it can convert it. At the end
get the text and download it in .txt file format. So the user can open it
in notepad or any other text editor and compare and modify the text if
needed.

## Motivation behind the project
I do very often encounter code snippets on youtube or any other website, now while I greatly appreciate the effort tutorial makers put into their videos every time I encounter a piece of code which does not provide a link to download or copy it. So to get codes from those video I made this project with the help of tesseract plugin so I can extract text from those videos or images.

## ARCHITECTURE DIAGRAM

![image](https://user-images.githubusercontent.com/52816788/140599129-6cb7a4c1-3ddb-493b-90b2-36a1e863e5b9.png)

Modules implementation and demo could be found in the ppt.

## Installations required for the project

### pytesseract
```
pip install pytesseract
```

### Flask
```npm i flask```

### Ajax jQuery
The jQuery min file is attached with the files in case you want to change it or use cdn approach you can change it.

## How to load unpack extension in the chrome
1. Make sure Developer mode is enabled
2. Click on the load unpacked button
3. select the [Extension unpack](https://github.com/vinit714/Image-to-text-chrome-extension/tree/main/templates) file to unpack





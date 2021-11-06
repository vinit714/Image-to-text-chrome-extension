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

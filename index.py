from PIL import Image
from flask import Flask, redirect, url_for, render_template,request,send_file
import flask
from flask_cors import CORS
import base64
import pytesseract
from pytesseract.pytesseract import image_to_string
from io import BytesIO



app = Flask(__name__)
CORS(app)

@app.route('/uploadajax', methods = ['POST'])
def upldfile():
    #getting base64 image url
    datain64 = flask.request.form.get('gg')


    #putting base64 image url data in outputb64.txt temporarily
    text_file = open("outputb64.txt", "w")

    text_file.write(datain64)

    text_file.close()
    
    #reading base64 image url data from outputb64.txt
    f = open('outputb64.txt', 'r')
    data = f.read()
    f.closed

    #converting base64 to image
    img = Image.open(BytesIO(base64.b64decode(data)))

    #passing that image to pytesseract
    result = pytesseract.image_to_string(img)
    print(result)

    #returning outputb64.txt with it's default text
    text_after = open("outputb64.txt", "w")

    text_after.write("Here image data is converted to its base64 format!!")

    text_after.close()

    #return pytesseract processed text
    return result
    
    

if __name__ == "__main__":
    app.run()
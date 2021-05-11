import os
import cv2
import pytesseract
from flask import Flask, render_template, send_from_directory, request, jsonify
from flask_cors import CORS, cross_origin  # comment this on deployment
from PIL import Image

pytesseract.pytesseract.tesseract_cmd = 'C:\Program Files\Tesseract-OCR\\tesseract'

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app, support_credentials=True)  # comment this on deployment

UPLOAD_FOLDER = os.path.basename('.')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route("/", defaults={'path': ''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


@app.route('/api/ocr', methods=['POST', 'GET'])
def upload_file():
    if request.method == "GET":
        return "Nothing to return"
    elif request.method == "POST":
        file = request.files['image']

        f = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)

        file.save(f)
        # print(file.filename)

        image = cv2.imread(UPLOAD_FOLDER+"/"+file.filename)
        os.remove(UPLOAD_FOLDER+"/"+file.filename)
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        # check to see if we should apply thresholding to preprocess the
        # image
        gray = cv2.threshold(gray, 0, 255,
                             cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]

        # make a check to see if median blurring should be done to remove
        # noise

        # write the grayscale image to disk as a temporary file so we can
        # apply OCR to it
        filename = "{}.png".format(os.getpid())
        print(filename)
        cv2.imwrite(filename, gray)
        print("write done")
        # load the image as a PIL/Pillow image, apply OCR, and then delete
        # the temporary file
        # print("C:/Users/mzm/PycharmProjects/My_website/ocr_using_video/"+filename,Image.open("C:\\Users\mzm\PycharmProjects\My_website\ocr_using_video\\"+filename))
        text = pytesseract.image_to_string(Image.open(filename))
        print("Text in Image :\n", text)
        os.remove(filename)

        return jsonify({"text": text})


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run("0.0.0.0", port, threaded=True, debug=True)

try:
	from PIL import Image
except ImportError:
	import Image
import pytesseract

from modify import prepare
from flask import Flask, flash, request, redirect, url_for
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def upload_file():
	data = request.get_json()
	encodedImage = u' '.join(data['value']).encode('utf-8').strip()
	imgdata = base64.b64decode(encodedImage)
	with open('test.png','wb') as f:
		f.write(imgdata)

	result = pytesseract.image_to_string(Image.open('some_image.png'),lang='eng+Monaco')
	return render('background.html',result)

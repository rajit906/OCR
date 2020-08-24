import cv2

def prepare(img):
	img = cv.imread(img,0)
	img = cv.medianBlur(img,5)
	ret,th1 = cv.threshold(img,127,255,cv.THRESH_BINARY)
	th2 = cv.adaptiveThreshold(img,255,cv.ADAPTIVE_THRESH_MEAN_C,\
	cv.THRESH_BINARY,11,2)
	th3 = cv.adaptiveThreshold(img,255,cv.ADAPTIVE_THRESH_GAUSSIAN_C,\
	cv.THRESH_BINARY,11,2)
	titles = ['Original Image', 'Global Thresholding (v = 127)','Adaptive Mean Thresholding', 'Adaptive Gaussian Thresholding']
	images = [img, th1, th2, th3]
	return th3
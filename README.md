# OCR

This app provides the skeleton functionality of an OCR App. It uses Tesseract.js to convert image to text. I applied inverse thresholding as it works best on black text and white background. Most coding snippets are white text black background. I did'nt spend too much time on this compared to my other projects because I wanted to take a stab at a single sitting project. I'm not fully satisfied with the result but not bad for someone who does'nt know Javascript XD
The app.py is Flask implementation and the ext.js is a chrome extension implementation. Background.py simply provides a simple thresholding to improve text. 

Some steps for improvement:
1. Adding an in-built cropper, HTML5 Canvas and not cropper.js because we need full control over the details
2. Improving the rendering
3. Feature to automatically copy to clipboard

import zipfile
import os
from PIL import Image
import pytesseract
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO



zip_path = 'pytesseract_configs.zip'

extract_dir = 'pytesseract_configs'


if not os.path.isdir(extract_dir):

    with zipfile.ZipFile(zip_path, 'r') as zip_ref:

        zip_ref.extractall(extract_dir)



pytesseract.pytesseract.tesseract_cmd = os.path.join(extract_dir, 'pytesseract_configs', 'tesseract.exe')


app = FastAPI()


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def welcome():
    return {
        'success': True,
        'message': 'server of "image text extractor" is up and running successfully.'
    }

@app.post('/extract-text-from-image')
async def extract_text_from_img(imageUploadedByUser: UploadFile = File(...)):
    
    img = await imageUploadedByUser.read()  

    img_bytes_io = Image.open(BytesIO(img))

    gray_scale_img = img_bytes_io.convert('L')

    text = pytesseract.image_to_string(gray_scale_img)

    text_cleaned = ' '.join(text.split())

    return {
        'success': True,
        'message': 'Text has been successfully extracted from the uploaded image',
        'extracted_text': text_cleaned
    }

# Image Text Extractor

This is a web app that lets users extract text from any image and also the user has the option to copy the extracted text in the clipboard as well.

## Tech Stack Used

NextJS along with TailwindCSS and daisyUI is used to develop the complete frontend whereas FastAPI along with pytesseract package is used to extract text from uploaded image as part of the backend.

## Links

1) Live Preview of the whole application: https://image-text-generator.vercel.app/
2) Deployed FastAPI backend API: https://som11-image-text-extract.hf.space/
3) Swagger Documentation of the FastAPI: https://som11-image-text-extract.hf.space/docs

## NOTE

If you want to deploy the backend FASTAPI with the help of a service that runs on top of linux then, you need to make some changes in both the Dockerfile and the app.py file because `tesseract.exe` is a windows executable for which it will not work on linux servers.

Your Dockerfile should look like this:
```Dockerfile
# Use the official Python image
FROM python:3.9.7

# Set the working directory in the container
WORKDIR /code

# Copy the requirements file into the container
COPY ./requirements.txt /code/requirements.txt

# Install the dependencies
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Install Tesseract OCR via the package manager
RUN apt-get update && apt-get install -y tesseract-ocr

# Copy the entire project directory into the container
COPY . /code

# Command to run the FastAPI server
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]
```

and app.py should look like this
```py
from PIL import Image
import pytesseract
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO


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
```

Now, you are ready to deploy the backend FastAPI application on linux servers.
## Warning

While this application is able to extract text quite accurately from image, there are occasions when it may produce incorrect text or fail to extract any text from image at all.

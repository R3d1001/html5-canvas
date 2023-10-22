import base64

with open('image.jpg', 'rb') as image_file:
    encoded_image = base64.b64encode(image_file.read())

# Convert bytes to string for printing
encoded_image_str = encoded_image.decode('utf-8')

print("data:image/jpg;base64,"+encoded_image_str)

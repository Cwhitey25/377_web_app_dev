import os
import shutil

def rename_photos():
    path = input("Enter image path: ")
    prefix = input("Enter the filename prefix: ")

    i = 1
    for filename in os.listdir(path):
        filename.sort()
        extension = filename.split(".")[1].lower()
        if extension in ["jpg", "png", "gif", "bmp", "svg", "webp"]:
            print(filename)

            source = path + "/" + filename
            destination = path + "/" + prefix + str(i) + "." + extension
            
            os.rename(source,destination)

            i += 1
# rename_photos()

def copy_file():
    original = 'C:/Users/colin/OneDrive/Desktop/Background/background2.jpg'
    filename, extension = original.split('.')

    for i in range(5):
        copy_filename = filename + ' - copy' + str(i + 1) + '.' + extension
        print(copy_filename)
        shutil.copyfile(original, copy_filename)

copy_file()
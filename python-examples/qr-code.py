import qrcode

img = qrcode.make('https://www.google.com')

img.save('search.png')
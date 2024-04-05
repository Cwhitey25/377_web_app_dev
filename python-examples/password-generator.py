import random

SPECIALS = '~!@#$%^&*()_+`-={}[]|\:;<,>.?/'
password = []

length = int(input('Enter password length: '))

include_upper = input('Include uppercase letter [y/n]: ')
if include_upper == 'y':
    password.append(chr(ord('A') + random.randint(0,25)))
    length -= 1

include_lower = input('Include lowercase letter [y/n]: ')
if include_lower == 'y':
    password.append(chr(ord('a') + random.randint(0,25)))
    length -= 1

include_digit = input('Include digit [y/n]: ')
if include_digit == 'y':
    password.append(str(random.randint(0,9)))
    length -= 1

include_special = input('Include special [y/n]: ')
if include_special == 'y':
    password.append(SPECIALS[random.randint(0, len(SPECIALS) - 1)])
    length -= 1

for i in range(length):
    choice = random.randint(0,3)

    if choice == 0:
        character = str(random.randint(0,9))
    elif choice == 1:
        character = chr(ord('A') + random.randint(0,25))
    elif choice == 2:
        character = chr(ord('a') + random.randint(0,25))
    else:
        character = SPECIALS[random.randint(0, len(SPECIALS) - 1)]
    
    password.append(character)

random.shuffle(password)
print(''.join(password))


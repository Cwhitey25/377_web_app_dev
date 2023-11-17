f0 = 1
f1 = 2
fNext = 0

sum = f1

while fNext < 4000000:
    fNext = f0 + f1
    if fNext % 2 == 0:
        sum += fNext

    f0, f1 = f1, fNext

print(sum)

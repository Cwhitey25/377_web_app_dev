file = open('day1.txt','r')
lines = file.readlines()

total = 0
totals = []
for line in lines:
    line = line.strip()

    if line =='':
        totals.append(total)
        total = 0
    else:
        total += int(line)

totals.append(total)
totals.sort(reverse=True)

max = totals[0] + totals[1] + totals[2]

print(max)
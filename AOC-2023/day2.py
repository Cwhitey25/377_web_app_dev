# PART 1:
# file = open('day2.txt','r')
# lines = file.readlines()

# def part1():
#     total = 0
#     game_id = 1
#     for line in lines:
#         valid = True
#         for round in line.split(':')[1].split(';'):
#             for color_count in [ x.strip() for x in round.split(',') ]:
#                 count, color = [ entry.strip() for entry in color_count.split(' ')]

#                 if (color == 'red' and int(count) > 12) or \
#                     (color == 'green' and int(count) > int(13)) or \
#                     (color == 'blue' and int(count) > int(14)):
#                     valid = False

#         if valid:
#             total += game_id

#         game_id += 1
#     print(total)
                 
# part1()

# PART 2:
import math
import re
from collections import defaultdict

with open("day2.txt") as f:
    ls = f.read().strip().split("\n")


good_ids = 0
total_power = 0
for l in ls:
    parts = re.sub("[;,:]", "", l).split()
    colormax = defaultdict(int)
    for count, color in zip(parts[2::2], parts[3::2]):
        colormax[color] = max(colormax[color], int(count))
    if colormax["red"] <= 12 and colormax["green"] <= 13 and colormax["blue"] <= 14:
        good_ids += int(parts[1])
    total_power += math.prod(colormax.values())

print(total_power)
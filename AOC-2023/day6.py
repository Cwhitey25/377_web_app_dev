# PART 1:
# import math
# def part1():
#     time = [35, 93, 73, 66]
#     distance = [212, 2060, 1201, 1044]
#     total_ways = 1
#     current_speed = 0

#     for time, distance in zip(time, distance):
#         ways = 0
#         for hold_time in range(time):
#             speed = current_speed + hold_time
#             traveled_distance = speed * (time - hold_time)
#             if traveled_distance > distance:
#                 ways += 1

#         total_ways *= ways

#     print(total_ways)
    
# part1()

# PART 2:
def part2():
    time = 35937366
    distance = 212206012011044

    total_ways = 0

    for hold_time in range(1, time):
        speed = hold_time
        traveled_distance = speed * (time - hold_time)
        if traveled_distance > distance:
            total_ways += 1


    print(total_ways)

part2()
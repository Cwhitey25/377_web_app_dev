# PART 1:
# file = open('day1.txt','r')
# lines = file.readlines()

# def sum_values(lines):
#     total_sum = 0

#     for line in lines:
#         digits = ''.join(filter(str.isdigit, line))

#         value = int(digits[0] + digits[-1])

#         total_sum += value

#     return total_sum

# result = sum_values(lines)

# print(result)

# PART 2:
file = open('day1.txt','r')
lines = file.readlines()



result = sum_values(lines)

print(result)
file = open('day4.txt','r')
cards_input = file.readlines()

def calculate_points(cards):
    total_points = 0
    sum = 0

    for card in cards:
        _, numbers_str = card.split(": ")
        winning_numbers, your_numbers = numbers_str.split(" | ")
        winning_numbers = list(map(int, winning_numbers.split()))
        your_numbers = list(map(int, your_numbers.split()))

        points = 0
        for number in your_numbers:
            if number in winning_numbers:
                points += 1
        if points > 0:
            total_points =  (2**(points-1))
            sum += total_points

    return sum

result = calculate_points(cards_input)
print(result)
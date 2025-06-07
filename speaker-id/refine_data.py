import csv


input_file = "speakers.txt"
output_file = "speakers.csv"


with open(input_file, 'r', encoding='utf-8') as infile:
    lines = infile.readlines()

with open(output_file, 'w', encoding='utf-8', newline='') as outfile:
    writer = csv.writer(outfile, quoting=csv.QUOTE_MINIMAL)

    header = lines[0].strip().split('|')
    writer.writerow([h.strip() for h in header])

    for line in lines[1:]:
        if line.strip(): 
            row = [item.strip() for item in line.split('|')]
            writer.writerow(row)

print(f"CSV file saved as {output_file}")
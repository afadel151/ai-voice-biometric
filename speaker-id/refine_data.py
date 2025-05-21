import csv

# Input text file content (you can read from the file directly)
input_file = "speakers.txt"
output_file = "speakers.csv"

# Read the text file
with open(input_file, 'r', encoding='utf-8') as infile:
    lines = infile.readlines()

# Prepare CSV file
with open(output_file, 'w', encoding='utf-8', newline='') as outfile:
    writer = csv.writer(outfile, quoting=csv.QUOTE_MINIMAL)
    
    # Write header
    header = lines[0].strip().split('|')
    writer.writerow([h.strip() for h in header])
    
    # Write data rows
    for line in lines[1:]:
        if line.strip():  # Skip empty lines
            row = [item.strip() for item in line.split('|')]
            writer.writerow(row)

print(f"CSV file saved as {output_file}")
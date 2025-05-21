import sqlite3
import csv
import os

# File paths
csv_file = "SPEAKERS.csv"
db_file = "database.db"

# Connect to SQLite database (creates the file if it doesn't exist)
conn = sqlite3.connect(db_file)
cursor = conn.cursor()

# Create the speakers table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS speakers (
        ID INTEGER PRIMARY KEY,
        SEX TEXT,
        SUBSET TEXT,
        MINUTES REAL,
        NAME TEXT
    )
''')

# Read the CSV file and insert data into the database
with open(csv_file, 'r', encoding='utf-8') as file:
    csv_reader = csv.reader(file)
    header = next(csv_reader)  # Skip the header row
    
    # Insert each row into the database
    for row in csv_reader:
        if len(row) == 5:  # Ensure the row has all expected columns
            cursor.execute('''
                INSERT OR REPLACE INTO speakers (ID, SEX, SUBSET, MINUTES, NAME)
                VALUES (?, ?, ?, ?, ?)
            ''', (int(row[0]), row[1], row[2], float(row[3]), row[4]))

# Commit changes and close the connection
conn.commit()
conn.close()

print(f"Data successfully imported from {csv_file} to {db_file}")
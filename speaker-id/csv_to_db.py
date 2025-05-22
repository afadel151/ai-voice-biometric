import sqlite3
import csv

csv_file = "speakers.csv"
db_file = "database.db"

conn = sqlite3.connect(db_file)
cursor = conn.cursor()

cursor.execute('''
    CREATE TABLE IF NOT EXISTS speakers (
        ID INTEGER PRIMARY KEY,
        SEX TEXT,
        SUBSET TEXT,
        MINUTES REAL,
        NAME TEXT
    )
''')
with open(csv_file, 'r', encoding='utf-8') as file:
    csv_reader = csv.reader(file)
    header = next(csv_reader)  
    for row in csv_reader:
        if len(row) == 5:  
            cursor.execute('''
                INSERT OR REPLACE INTO speakers (ID, SEX, SUBSET, MINUTES, NAME)
                VALUES (?, ?, ?, ?, ?)
            ''', (int(row[0]), row[1], row[2], float(row[3]), row[4]))

conn.commit()
conn.close()

print(f"Data successfully imported from {csv_file} to {db_file}")
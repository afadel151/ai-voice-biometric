import sqlite3


def get_speaker(speaker_id):
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM speakers WHERE id=?", (speaker_id,))
    speaker = cursor.fetchone()
    connection.close()
    if speaker:
        return {
            'id': speaker[0],
            'name': speaker[1],
            'sex': speaker[2],
        }
    return None
        
def get_sex(speaker_id):
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()
    cursor.execute("SELECT sex FROM speakers WHERE id=?", (speaker_id,))
    sex = cursor.fetchone()
    connection.close()
    if sex:
        return sex[0]
    return None

def add_speaker(id,name,sex):
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()
    cursor.execute("INSERT INTO speakers (id, name,sex) VALUES (?, ?, ?)", (id,name,sex))
    connection.commit()
    connection.close()
    
    return cursor.lastrowid

def get_all_speakers():
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM speakers")
    speakers = cursor.fetchall()
    connection.close()
    if speakers:
        return speakers
    return None

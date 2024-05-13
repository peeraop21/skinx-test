import json
import psycopg2

# Connect to PostgreSQL
conn = psycopg2.connect(
    dbname="skinx_test",
    user="peera",
    password="peera1234",
    host="postgres",  # This is the hostname of the PostgreSQL container
    port="5432",
)

# Create a cursor object using the cursor() method
cursor = conn.cursor()

# Read JSON data and insert into PostgreSQL
with open('posts.json') as f:
    data = json.load(f)
    for record in data:
        cursor.execute(
            'INSERT INTO public.post (title, content, tags, "createdAt", "createdBy") VALUES (%s, %s, %s, %s, %s)',
            (record['title'], record['content'], record['tags'], record['postedAt'], record['postedBy'])  # Replace field1, field2, ... with your JSON keys
        )

# Commit changes
conn.commit()

# Close the cursor and connection
cursor.close()
conn.close()
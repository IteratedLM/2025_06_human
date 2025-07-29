import json
import random

syllables = ["da", "vi", "ho", "wi", "nu", "ri", "bi", "ka", "tu"]

num_words = 27
possible_lengths = [2, 3, 4]

shapes = ["cross", "square", "triangle"]
colors = ["black", "blue", "red"]
motions = ["bounce", "move", "spin"]

words = []

for i in range(num_words):
    s = shapes[i // 9]
    c = colors[(i % 9) // 3]
    m = motions[i % 3]
    filename = f"../animations/{s}_{c}_{m}.gif"
    word_length = random.choice(possible_lengths)
    word = ''.join(random.choice(syllables) for _ in range(word_length))
    words.append({
        "test_round": "Round 4",
        "image": filename,
        "label": word
    })

with open('data_1_0_1234.json', 'w') as f:
    json.dump(words, f, indent=2)

print("Generated words:")
print(json.dumps(words, indent=2))

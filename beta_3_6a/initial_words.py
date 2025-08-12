import json
import random

# Optional: for reproducibility
# random.seed(1234)

tokens = ["dreff", "plone", "skerm", "tulve", "frast", "quemp", "vorn", "sproth", "glape"]

num_words = 27
possible_lengths = [2, 3, 4]

shapes = ["cross", "square", "triangle"]
colors = ["black", "blue", "red"]
motions = ["bounce", "move", "spin"]

items = []

for i in range(num_words):
    s = shapes[i // 9]
    c = colors[(i % 9) // 3]
    m = motions[i % 3]
    filename = f"../animations/{s}_{c}_{m}.gif"

    phrase_len = random.choice(possible_lengths)
    # sample without replacement to avoid duplicates within a phrase
    phrase_words = random.sample(tokens, k=phrase_len)
    phrase = " ".join(phrase_words)

    items.append({
        "test_round": "Round 4",
        "image": filename,
        "label": phrase
    })

with open('data_1_0_1234.json', 'w') as f:
    json.dump(items, f, indent=2)

print("Generated items:")
print(json.dumps(items, indent=2))

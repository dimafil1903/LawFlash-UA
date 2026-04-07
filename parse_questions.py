import re
import json

file_path = "/Users/dimafilipenko/.gemini/antigravity/brain/e34835fe-66eb-4633-af7d-85013b0d1b82/.system_generated/steps/6/content.md"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

# We have 3 main sections:
# #### І. Питання на перевірку знання Конституції України
# #### ІІ. Питання на перевірку знання Закону України «Про Національну поліцію»
# #### ІІІ. Питання на перевірку знання Закону України «Про запобігання корупції»

sections = {
    "constitution": "Конституції України",
    "police": "Закону України «Про Національну поліцію»",
    "corruption": "Закону України «Про запобігання корупції»"
}

cards = []
card_id = 1

lines = text.split('\n')
current_category = ""
current_section_title = ""

for line in lines:
    line = line.strip()
    if line.startswith("#### І."):
        current_category = "constitution"
        current_section_title = "Конституція України"
    elif line.startswith("#### ІІ."):
        current_category = "police"
        current_section_title = "Закон України «Про Національну поліцію»"
    elif line.startswith("#### ІІІ."):
        current_category = "corruption"
        current_section_title = "Закон України «Про запобігання корупції»"
    
    match = re.match(r"^##### \d+\.\s*(.+)$", line)
    if match and current_category:
        question_text = match.group(1).strip()
        cards.append({
            "id": str(card_id),
            "category": current_category,
            "sourceSection": current_section_title,
            "question": question_text,
            "answerShort": "TODO: Short Answer",
            "answerFull": "TODO: Full detailed answer will be parsed and added in future stages.",
            "lawRef": "",
            "tags": [current_category],
            "updatedAt": "2026-04-07"
        })
        card_id += 1

print(f"Parsed {len(cards)} questions.")

out_path = "/Users/dimafilipenko/LawFlash-UA/public/cards.json"
import os
os.makedirs(os.path.dirname(out_path), exist_ok=True)
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(cards, f, ensure_ascii=False, indent=2)

print(f"Cards saved to {out_path}")

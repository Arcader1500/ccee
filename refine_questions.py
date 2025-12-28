import json
import random
import os

def refine_question(question):
    """Refine a single question by randomizing correct answer and balancing options"""
    
    # Get the current correct answer text
    correct_id = question['correctOptionId']
    correct_text = next(opt['text'] for opt in question['options'] if opt['id'] == correct_id)
    
    # Collect all option texts
    option_texts = [opt['text'] for opt in question['options']]
    
    # Randomize which option ID gets the correct answer
    new_correct_id = random.choice(['a', 'b', 'c', 'd'])
    
    # Shuffle the options while keeping track of the correct one
    random.shuffle(option_texts)
    
    # Ensure the correct answer is at the new position
    correct_index = ['a', 'b', 'c', 'd'].index(new_correct_id)
    if correct_text in option_texts:
        option_texts.remove(correct_text)
    option_texts.insert(correct_index, correct_text)
    
    # Update the question
    question['correctOptionId'] = new_correct_id
    for i, opt in enumerate(question['options']):
        opt['text'] = option_texts[i]
    
    return question

def process_chapter(chapter_num):
    """Process a single chapter's questions"""
    file_path = f"d:/Atharva/CDAC/CCEE/quiz-app/public/data/pml_syllabus/ch{chapter_num}/questions.json"
    
    # Read the file
    with open(file_path, 'r', encoding='utf-8') as f:
        questions = json.load(f)
    
    # Refine each question
    refined_questions = [refine_question(q.copy()) for q in questions]
    
    # Write back
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(refined_questions, f, indent=4, ensure_ascii=False)
    
    print(f"✓ Completed Chapter {chapter_num}")

# Process chapters 2-7
for ch in range(2, 8):
    process_chapter(ch)

print("\n✓ All chapters refined successfully!")

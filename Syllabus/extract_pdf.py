import pypdf
import os
import glob

syllabus_dir = r"d:\Atharva\CDAC\CCEE\Syllabus"
raw_text_dir = os.path.join(syllabus_dir, "raw_texts")
os.makedirs(raw_text_dir, exist_ok=True)

pdf_files = glob.glob(os.path.join(syllabus_dir, "*.pdf"))

for pdf_path in pdf_files:
    try:
        filename = os.path.basename(pdf_path)
        # Skip Python.pdf if we want, but no harm re-extracting to keep raw text consistent
        print(f"Processing {filename}...")
        reader = pypdf.PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        
        output_filename = os.path.splitext(filename)[0] + ".txt"
        output_path = os.path.join(raw_text_dir, output_filename)
        
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(text)
        print(f"Saved to {output_path}")
    except Exception as e:
        print(f"Failed to process {pdf_path}: {e}")

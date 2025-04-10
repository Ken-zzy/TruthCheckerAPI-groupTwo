# translate.py
import sys
import json
from transformers import MarianMTModel, MarianTokenizer

lang = sys.argv[1]
text = sys.argv[2]

model_map = {
    'ig': 'Helsinki-NLP/opus-mt-en-ig',
    'yo': 'Helsinki-NLP/opus-mt-en-yo',
    'ha': 'Helsinki-NLP/opus-mt-en-ha',
}

if lang not in model_map:
    print(json.dumps({ "error": "Unsupported language" }))
    sys.exit(1)

model_name = model_map[lang]
tokenizer = MarianTokenizer.from_pretrained(model_name)
model = MarianMTModel.from_pretrained(model_name)

tokens = tokenizer.prepare_seq2seq_batch([text], return_tensors="pt", padding=True)
translated = model.generate(**tokens)
output = tokenizer.decode(translated[0], skip_special_tokens=True)

print(json.dumps({ "translated": output }))

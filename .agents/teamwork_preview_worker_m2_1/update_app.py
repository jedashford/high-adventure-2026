import os
import re

html_path = '/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html'

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

print("Current html length:", len(content))

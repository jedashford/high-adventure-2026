import os
from build_full_app import html_content
from generate_app import script_code

full_html = html_content + script_code

target_path = '/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html'
with open(target_path, 'w', encoding='utf-8') as f:
    f.write(full_html)

print(f"Successfully generated {target_path} ({len(full_html)} bytes)")

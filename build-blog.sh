#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
POSTS_DIR="$ROOT_DIR/posts"
OUTPUT="$ROOT_DIR/posts.json"

python3 - "$POSTS_DIR" "$OUTPUT" <<'PY'
import json
import re
import sys
from pathlib import Path

posts_dir = Path(sys.argv[1])
output = Path(sys.argv[2])


def parse_front_matter(text):
    if not text.startswith("---"):
        return {}, text
    match = re.match(r"^---\s*\n(.*?)\n---\s*\n?", text, re.S)
    if not match:
        return {}, text
    meta = {}
    for line in match.group(1).splitlines():
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        key = key.strip()
        value = value.strip().strip("'\"")
        if value.startswith("[") and value.endswith("]"):
            value = [item.strip().strip("'\"") for item in value[1:-1].split(",") if item.strip()]
        meta[key] = value
    return meta, text[match.end():]


def first_heading(text):
    match = re.search(r"^#\s+(.+)$", text, re.M)
    return match.group(1).strip() if match else "Untitled Post"


def strip_markdown(text):
    text = re.sub(r"```[\s\S]*?```", " ", text)
    text = re.sub(r"!?\[[^\]]*\]\([^)]*\)", " ", text)
    text = re.sub(r"[#>*_`~-]", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def read_language(post_dir, lang):
    path = post_dir / f"post-{lang}.md"
    if not path.exists():
        return None
    raw = path.read_text(encoding="utf-8")
    meta, content = parse_front_matter(raw)
    return {
        "path": f"posts/{post_dir.name}/post-{lang}.md",
        "title": meta.get("title") or first_heading(content),
        "description": meta.get("description") or strip_markdown(content)[:180],
        "date": meta.get("date", ""),
        "tags": meta.get("tags", []) if isinstance(meta.get("tags", []), list) else [meta.get("tags")],
    }

posts = []
for post_dir in sorted(p for p in posts_dir.iterdir() if p.is_dir()):
    en = read_language(post_dir, "en")
    ar = read_language(post_dir, "ar")
    if not en and not ar:
        continue
    base = en or ar
    posts.append({
        "slug": post_dir.name,
        "date": base["date"],
        "tags": base["tags"],
        "en": en,
        "ar": ar,
    })

posts.sort(key=lambda item: item["date"], reverse=True)
output.write_text(json.dumps(posts, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Generated {output} with {len(posts)} post(s).")
PY

import os

DOC = r"""---
title: "The Road Not Taken: A Chronology of Available Choices"
subtitle: "Who knew what, and when? What choices were made — and what choices were actually available at each moment in the history of quantum mechanics"
author: "Expanded from the Ultrametric Paradigm by Rowan Brad Quni-Gudzinas (2026)"
date: 2026-05-03
version: 0.7
audience: General — fact-checked chronology, epistemological analysis
status: draft
---

# THE ROAD NOT TAKEN
## A Chronology of Available Choices
### Who knew what, and when? What choices were made — and what choices were actually available?

Version 0.7

---

## INTRODUCTION: THE QUESTION OF WHAT WAS POSSIBLE

Every version of "what might have been" in the history of science must answer a prior question: was the alternative actually available? It is one thing to say, with the benefit of hindsight, that a different choice would have led to a better outcome. It is another to establish that the choice was genuinely present at the time — that the knowledge, the tools, and the conceptual framework existed to make it.

The previous versions of this document have explored what quantum mechanics would look like if it had been built on the ultrametric geometry of the p-adic numbers — a tree rather than a line. But those versions left a critical question partially unexamined: who could have known what, and when? What was actually published, where, and by whom? Who had access to it? What choices were made — explicitly or implicitly — and what choices were not made but could have been, given the state of knowledge at each historical moment?

This version addresses those questions directly. It is organized as a chronology of available choices. At each checkpoint, it examines what was known and by whom, what explicit and implicit choices were made, what alternatives were actually available at that moment, and whether the connection between ultrametric mathematics and quantum physics could reasonably have been made. The analysis draws on published biographical and historical sources. Where the record is clear, conclusions are stated. Where it is not, uncertainty is acknowledged."""

TARGET = r"G:\My Drive\Obsidian\projects\Road Not Taken\0.7.md"
with open(TARGET, 'w', encoding='utf-8') as f:
    f.write(DOC)
print(f"Wrote {len(DOC)} chars to 0.7.md")

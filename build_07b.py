DOC2 = r"""

## 1. 1900: WHAT PLANCK COULD HAVE KNOWN

### The Situation

In December 1900, Max Planck presented his derivation of the blackbody radiation law to the German Physical Society in Berlin. He was forty-two years old and a well-established figure. He had been a professor of theoretical physics at the University of Berlin since 1889, when he was appointed to succeed Gustav Kirchhoff. He was at the center of German physics.

Planck's derivation introduced the quantum of action and the idea that energy is exchanged in discrete packets. The derivation used Boltzmann's statistical methods: Planck counted the number of ways to distribute energy elements among oscillators. Implicit in this counting was a metric. Planck used the ordinary Archimedean metric: the absolute difference between two energies.

### What Was Available

Three years earlier, in 1897, a paper had appeared in the *Jahresbericht der Deutschen Mathematiker-Vereinigung* — the Annual Report of the German Mathematical Society. The paper was titled "Uber eine neue Begrundung der Theorie der algebraischen Zahlen" and its author was Kurt Hensel. It occupied six pages (Volume 6, Issue 3, pages 83-88). In it, Hensel introduced the p-adic numbers: a new number system in which distance is measured by divisibility rather than magnitude. Under this metric, for the prime 2, the number 16 is closer to 0 than the number 1 is. The geometry of these numbers is not a line but a tree.

Who was Hensel? He was a mathematician, thirty-six years old in 1897, who had earned his doctorate at the University of Berlin in 1884 under Leopold Kronecker. After his habilitation in 1886, Hensel became a Privatdozent at Berlin: an unsalaried lecturer whose income depended on student fees. He was not a professor. He was a junior, unestablished member of the mathematics faculty, working in pure number theory.

Hensel would not become a full professor until 1901, when he was appointed to a chair at the University of Marburg, where he remained until retirement in 1930.

### Where They Stood

In 1897-1900, Planck and Hensel were both at the University of Berlin. Planck was a senior professor of physics. Hensel was a junior Privatdozent in mathematics. They were at the same institution, but in different departments, at different career stages, embedded in different intellectual communities, reading different journals, and attending different seminars. There is no documentary evidence they knew each other.

Hensel's 1897 paper was published in the Jahresbericht der DMV — a mathematics society journal. Theoretical physicists in 1900 did not routinely read such publications. The paper was a brief, six-page announcement with no mention of physical applications.

### What Choices Were Made

Explicit choices by Planck: to quantize oscillator energies; to use Boltzmann's statistical methods; to present the derivation as a solution to the ultraviolet catastrophe.

Implicit choices: to use the Archimedean metric. This was not experienced as a choice. It was the only metric Planck knew. The idea that distance could be defined differently — and that this choice might have physical consequences — was not part of the conceptual framework of physics in 1900.

Choices not made: Planck did not consider the p-adic metric. He did not read Hensel's paper. Even if he had, the physical relevance would not have been apparent.

### Assessment

Could Planck, in 1900, reasonably have connected Hensel's p-adic numbers to his blackbody problem? Almost certainly no. The conceptual distance between abstract number theory and thermal radiation physics was enormous. No bridge between these fields existed. Planck had no reason to look at the Jahresbericht der DMV. The leap from "numbers organized by divisibility" to "energy states organized on a tree" would have required an insight for which no precedent existed.

The choice was not made because it was not visible as a choice. In 1900, the road did not exist. It could only be seen in retrospect.

---

## 2. 1897-1925: MATHEMATICS AND PHYSICS IN PARALLEL

After Hensel's 1897 paper, the p-adic numbers developed steadily within pure number theory. They proved powerful for studying Diophantine equations and algebraic number fields. By the 1920s, p-adic analysis was a mature subfield, with contributions from Hasse, Ostrowski, and others. Hensel published a book-length treatment in 1908 and a textbook in 1913. But the p-adic numbers remained entirely within mathematics, with no physical interpretation.

The same period saw the development of quantum mechanics: Einstein's photon hypothesis (1905), Bohr's atomic model (1913), de Broglie's matter waves (1924), and the full formalism of 1925-1927. Throughout, physics and number theory had no interaction. They were different disciplines with different journals, conferences, and intellectual cultures. The Archimedean metric remained the unquestioned foundation of all physical theory.

Between 1897 and 1925, the road not taken remained invisible. The mathematics was developing in isolation. Physicists had no access to it — not because it was hidden, but because disciplinary boundaries made it functionally inaccessible.

---

## 3. 1925-1927: THE EXPLICIT CHOICES

The years 1925-1927 saw the construction of quantum mechanics as we know it. This period embedded choices that would shape the next century.

Heisenberg (1925) chose to represent observables as non-commuting matrices, with [x, p] = i-hbar as the fundamental postulate. Schrodinger (1926) chose to represent states as complex-valued wavefunctions. Born (1926) chose to interpret the squared magnitude as probability — a postulate, not a derivation. Heisenberg (1927) chose to interpret uncertainty as a fundamental limitation on reality. Bohr (1927) codified these into the Copenhagen interpretation.

Beneath all these explicit choices lay an implicit one: Archimedean geometry. Every formalism assumed it. Hilbert space is Archimedean. The possibility of ultrametric geometry was never considered — not rejected, but never asked.

By 1925, Hensel's p-adic numbers were nearly three decades old. But the core geometric tools — the Bruhat-Tits tree (1972), the Monna map (1968), Shapiro's lemma (1983) — were decades away. What existed was the metric itself. An unusually insightful physicist might have noticed the strong triangle inequality produces tree-like geometry, but no physicist was looking.

The explicit choices of 1925-1927 have been debated ever since. But the deepest choice — Archimedean geometry — was not visible as a choice. The tools for the alternative were decades away.

---

## 4. 1935-1964: LOCK-IN

By 1935, quantum mechanics was the most successful physical theory in history. The EPR paper challenged its completeness; Bohr defended Copenhagen. In 1964, Bell proved no local hidden-variable theory could reproduce quantum correlations. Both debates operated entirely within the Archimedean framework.

By 1964, p-adic analysis was mature. The adele ring had been constructed (Chevalley, Weil, 1930s-1940s). The Langlands program was beginning. But none of this had crossed into physics.

Between 1935 and 1964, the Archimedean framework became locked in. Quantum mechanics was too successful to question at its deepest level. The puzzles it produced were seen as evidence that the quantum world is strange, not that the framework might be incomplete."""

TARGET = r"G:\My Drive\Obsidian\projects\Road Not Taken\0.7.md"
with open(TARGET, 'a', encoding='utf-8') as f:
    f.write(DOC2)
print(f"Appended {len(DOC2)} chars")

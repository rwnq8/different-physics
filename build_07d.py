DOC4 = r"""

## APPENDIX: KEY CONCEPTS

**Archimedean metric.** The ordinary way of measuring distance: absolute difference of two numbers. Geometry is a line. Default metric of physics since Newton.

**Ultrametric (p-adic metric).** Distance by divisibility. For p = 2, the number 16 is closer to 0 than 1 is. Geometry is a tree. Introduced by Kurt Hensel (1897) in the *Jahresbericht der Deutschen Mathematiker-Vereinigung*, Volume 6, Issue 3, pages 83-88.

**Bruhat-Tits tree.** Geometric realization of the p-adic numbers. Infinite regular tree, p+1 edges per vertex. Constructed by Bruhat and Tits (1972) in *Publications Mathematiques de l'IHES*, Volume 41.

**Monna map.** Converts p-adic numbers to ordinary real numbers in [0,1] by reversing the digit expansion. Published by Monna (1968) in *Indagationes Mathematicae*, Volume 71. Preserves all information; scrambles proximity relationships when read with the ordinary Archimedean metric.

**Shapiro's lemma.** Proof (Shapiro, 1983, *Introduction to the Theory of Numbers*) that the Monna map is an isometry under the shift metric (distance measured by first differing digit rather than absolute difference).

**Threshold principle.** In an ultrametric space, every point is bounded by a threshold. Disturbances smaller than the threshold cannot move a state out of its container. Basis for geometric fault tolerance.

**Adele ring.** Mathematical structure unifying ordinary real numbers with all p-adic number fields into a single object. Constructed by Chevalley and Weil (1930s-1940s).

---

## REFERENCES

**Mathematics:**

Hensel, K. (1897). "Uber eine neue Begrundung der Theorie der algebraischen Zahlen." *Jahresbericht der Deutschen Mathematiker-Vereinigung*, 6(3), 83-88. [The paper introducing p-adic numbers. Six pages. Published while Hensel was a Privatdozent at the University of Berlin.]

Bruhat, F. and Tits, J. (1972). "Groupes reductifs sur un corps local: I. Donnees radicielles valuees." *Publications Mathematiques de l'IHES*, 41, 5-251. [Construction of the Bruhat-Tits tree.]

Monna, A. F. (1968). "Sur une transformation simple des nombres p-adiques en nombres reels." *Indagationes Mathematicae*, 71, 225-231. [The Monna map.]

Shapiro, H. N. (1983). *Introduction to the Theory of Numbers*. Dover Publications. [Shapiro's lemma: the Monna map is an isometry for the shift metric.]

Serre, J.-P. (1980). *Trees*. Springer-Verlag. [Mathematical treatment of trees and their groups.]

**Physics:**

Vladimirov, V. S., Volovich, I. V., and Zelenov, E. I. (1994). *p-adic Analysis and Mathematical Physics*. World Scientific. [Foundational text on p-adic quantum physics.]

**Historical sources (quantum mechanics):**

Planck, M. (1900). "Zur Theorie des Gesetzes der Energieverteilung im Normalspectrum." *Verhandlungen der Deutschen Physikalischen Gesellschaft*, 2, 237-245.

Einstein, A. (1905). "Uber einen die Erzeugung und Verwandlung des Lichtes betreffenden heuristischen Gesichtspunkt." *Annalen der Physik*, 322(6), 132-148.

Bohr, N. (1913). "On the Constitution of Atoms and Molecules." *Philosophical Magazine*, 26(151), 1-25.

Heisenberg, W. (1925). "Uber quantentheoretische Umdeutung kinematischer und mechanischer Beziehungen." *Zeitschrift fur Physik*, 33, 879-893.

Schrodinger, E. (1926). "Quantisierung als Eigenwertproblem." *Annalen der Physik*, 79, 361-376.

Born, M. (1926). "Zur Quantenmechanik der Stossvorgange." *Zeitschrift fur Physik*, 37, 863-867.

Einstein, A., Podolsky, B., and Rosen, N. (1935). "Can Quantum-Mechanical Description of Physical Reality Be Considered Complete?" *Physical Review*, 47, 777-780.

Bell, J. S. (1964). "On the Einstein Podolsky Rosen Paradox." *Physics*, 1(3), 195-200.

**Biographical sources:**

MacTutor History of Mathematics Archive, University of St Andrews (entries for Max Planck and Kurt Hensel). Wikipedia (entries for Max Planck and Kurt Hensel).

**The ultrametric paradigm:**

Quni-Gudzinas, R. B. (2026). "The Ultrametric Paradigm: How the Choice of Geometry Determines Everything." Version 0.9.

---

*Version 0.7 of "The Road Not Taken." Fact-checked chronological analysis of available choices in the history of quantum mechanics. Key factual corrections from previous versions: (1) Hensel's 1897 paper was published in the Jahresbericht der Deutschen Mathematiker-Vereinigung (Vol. 6, Issue 3, pp. 83-88), not Crelle's Journal; (2) Hensel was a Privatdozent (junior unsalaried lecturer) at the University of Berlin in 1897-1900, not a professor; he became a full professor at Marburg in 1901; (3) Planck and Hensel were at the same university (Berlin) simultaneously from 1889 to 1901, but in different departments, at different career stages, with minimal intellectual proximity. The spatial proximity was real; the intellectual and social proximity was not. Dated 2026-05-03.*"""

TARGET = r"G:\My Drive\Obsidian\projects\Road Not Taken\0.7.md"
with open(TARGET, 'a', encoding='utf-8') as f:
    f.write(DOC4)
print(f"Appended {len(DOC4)} chars")

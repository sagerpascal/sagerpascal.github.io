---
title: Optical music recognition in the wild
short: RealScore
order: 6
role: Project team
years: 2019 to 2022
funder: Innosuisse
budget: CHF 870'000
partner: ScorePad AG
image: /assets/images/realscore.png
tags: [Computer vision, Domain adaptation, Product]
summary: Sheet-music scanning worked beautifully on clean scans and fell apart on a phone photo of a dog-eared page. Unsupervised domain adaptation doubled detection performance on real-world input.
links:
  - label: Project page, ZHAW
    url: https://www.zhaw.ch/en/research/project/71811
  - label: Paper (TISMIR)
    url: https://transactions.ismir.net/articles/10.5334/tismir.157/
---

**RealScore.** ScorePad's sheet-music scanning service worked well on high-quality input. That is a
narrow business: real customers photograph used sheets on a phone, under bad light, on
paper that has been folded, annotated in pencil and left in a case for twenty years.

RealScore set out to close that gap by making the deep learning adapt to data it had
never seen, without anyone labelling it.

## What worked

- **Augmentation that simulates the real world.** Combining synthetic data with noisy
  perturbations of genuine documents, ageing, lighting, dirt, narrowed the distance
  between the sanitised benchmark and the actual task. Detection performance on noisy
  real-world data went from 36.0 to 73.3 per cent.
- **Adversarial domain adaptation.** Unsupervised, and worth 12.9 points on its own,
  taking the 36.0 baseline to 48.9 without any target labels.
- **Confidence you can act on.** Model ensembles with prediction fusion produce a
  trustworthy rating per prediction, which is what makes human post-processing
  efficient rather than a second full pass.

Evaluated on a new test set of manually annotated pages of varying real-world quality,
sourced from IMSLP, the Petrucci Music Library. Published in TISMIR.

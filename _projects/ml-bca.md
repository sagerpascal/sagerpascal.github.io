---
title: Machine Learning for Body Composition Analysis
short: ML-BCA
order: 2
role: Deputy project lead
years: 2023 to 2025
funder: Kantonsspital Aarau
partner: Kantonsspital Aarau
image: /assets/images/ml-bca.jpeg
tags: [Medical imaging, Deployment, Data efficiency]
summary: Turning a promising prototype into a tool clinicians actually use. Automated tissue segmentation on CT, built to work with the little annotated data a hospital can spare.
links:
  - label: Project page, ZHAW
    url: https://www.zhaw.ch/en/research/project/73901
---

Body composition, meaning how much muscle, how much fat and where, predicts how a
patient will do. It is also rarely measured, because extracting it from a CT scan by hand costs
radiologist time nobody has.

ZHAW's Centre for AI and the Cantonal Hospital Aarau had laid the groundwork in
preliminary studies, some of it my own master's project thesis. This project took those
prototypes and developed them far enough to run a medical validation and a prospective
study, and to publish the joint scientific work.

## Making it work with less data

Clinical annotation is the bottleneck, so most of the effort went into needing less of it:

- **Domain knowledge as an input constraint.** Tissues occupy known ranges on the
  Hounsfield scale. Encoding those ranges as extra binary input masks improved
  intramuscular adipose tissue segmentation by up to 5 per cent, and beat the baseline
  while using half the training data.
- **Unsupervised domain adaptation.** A domain sanity loss transfers a model trained on
  public data to a specific hospital's scanners and protocols without target labels.
  It reaches 72.8 per cent vertebra identification accuracy with no target labels and
  89.2 per cent with ten, on par with full supervision using roughly twenty times fewer.

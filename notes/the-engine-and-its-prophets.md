---
layout: essay
title: The engine and its prophets
description: An opinionated read of where machine learning actually stands, who called it right, and what is missing before robots become useful.
permalink: /notes/the-engine-and-its-prophets/
sitemap: false
noindex: true
date: 2026-08-11
standfirst: >-
  Generative learning at scale is the engine. The field's most decorated voices
  have each bet against it and lost. What stands between us and useful robots is
  the price of data, not a missing idea.
---

Machines could not hold a conversation, and then they could. The capability is not the
interesting part. The interesting part is that it took about a year for the public
verdict to travel from "this is impossible" to "this is unreliable and overhyped",
skipping astonishment on the way. We normalise very quickly and we almost never notice
that we have done it.

Let me put my position up front so the rest can be read as a defence of it. Generative
learning at scale is the engine behind everything that has worked in the last decade.
It will be the engine behind robotics too. What stands in the way there is the price of
embodied data, not the absence of an idea. Nearly every disagreement I have with people
I respect comes down to which part of that they find hardest to accept.

## The engine, and two objections that do not hold

I spent my doctorate looking for learning rules that a brain could plausibly run, so I
have some standing to say that biological plausibility is not a requirement. I hold
that more firmly for having started from the opposite assumption. Gradient descent on
large networks already exceeds us at a widening list of tasks. If a further principle
is needed, it is needed for the residual failures, not for the enormous territory
already taken. My own work on the
[Cooperative Network Architecture](https://direct.mit.edu/neco/article/38/4/538/135632/The-Cooperative-Network-Architecture-Learning)
argues that a structured, composable representation buys robustness that distributed
activations do not, and I still believe the architecture is right. I no longer believe
biology is what justifies it. Neuroscience gets to propose. It does not get to set
requirements.

Two objections recur and neither survives contact with practice. The first is that
these systems only reproduce patterns from their training data. The framing from Bender
and colleagues [[1](#r1)] earned its place as a warning about provenance and
deployment, and it should be read that way. As a scientific claim it is unusable,
because nobody will say what would count as understanding, and a claim that cannot fail
is not a finding. What a system does and where it breaks is measurable. That is the
only version of the question worth anyone's time.

The second is the impossibility result. Dziri and colleagues [[2](#r2)] are the
honourable case: a compositional failure mode that more of the same training does not
repair, characterised carefully enough to survive scrutiny. Most claimed ceilings are
not that. Before believing one, ask whether it would still stand after another order of
magnitude of compute. If it rests on a fixed parameter count or a fixed context, it
describes this quarter's configuration rather than the method.

## Three people who bet against scale

Sutton wrote the best paragraph the field owns. General methods that convert
computation into capability defeat handcrafted structure, and they do it again and
again [[3](#r3)]. The Alberta Plan builds a research programme on learning from
interaction rather than from human records [[4](#r4)], which is a serious position and
may well be where the next decade goes. But he now dismisses language models as
imitation that leads nowhere, and I cannot make that fit. Imitation at web scale is
exactly a simple method that turns compute into capability. The author of the scaling
argument is arguing against its clearest instance. There is a defensible objection
buried in there, that data drawn from humans caps you near human performance, and it
deserves to be made on those terms instead of by calling the method mere copying.

Schmidhuber is the same lesson told from the inside. The priority claims are largely
correct [[5](#r5)]: world models and adversarial objectives in 1990, fast weight
programmers in 1991 that Schlag and colleagues later proved equivalent to linearised
attention [[6](#r6)]. He had the concepts. He did not have the compute, and the
concepts alone bought almost nothing for thirty years. Credit is the least interesting
thing about that story. The useful reading is that an idea arriving decades before the
hardware is a hypothesis, not a result, and the field keeps mistaking one for the
other.

Hinton is the third variation. He helped make backpropagation the default and has spent
much of his career since trying to replace it, through wake-sleep, capsules and most
recently Forward-Forward [[7](#r7)]. Every one of them is well motivated. Every one of
them loses to backpropagation on the benchmark. I have no standing to be smug about
this, because my thesis is another entry on that list.

Three of the most decorated people in the discipline have each, in a different way,
backed the elegant mechanism over the scalable one. I do not think that is coincidence.
It is what taste feels like from the inside, and taste has been on the losing side of
this argument for fifteen years.

## Right about the map, wrong about the roads

LeCun's 2022 position paper [[8](#r8)] got two large things right: that learning
without labels would carry the field, and that agents acting in the world need models
predicting in a learned representation space rather than in raw sensory detail.
Joint-embedding objectives are now everywhere in robotics, and he called that early.
Against this he has declared autoregressive prediction a dead end across several model
generations, and the models have walked through the wall each time. Predicting the
destination turns out to be much easier than predicting which route fails, and he keeps
doing the harder thing in public.

Karpathy is the most useful practitioner the field has. Software 2.0 [[9](#r9)] named
the shift from programs that are written to programs that are fitted before it was
obvious, and the data engine he described, deploy the system, harvest its failures,
retrain on them, is still the operating manual for anything that has to survive outside
a benchmark. His remark that reinforcement learning is a very thin supervision signal
is correct, and it argues for generative pretraining plus verification rather than
against agents. The place I break with him is timing. His horizon for reliably useful
agents is measured in years. On a factory floor the demand is this quarter, and what
stands in the way is data collection, not insight.

Marcus has been wrong about nearly every specific prediction and right about one
general thing [[10](#r10), [11](#r11)]. End-to-end learning alone is not dependable
enough to deploy unsupervised. Where he goes wrong is the remedy. Symbolic structure
belongs around the network as verification, retry and repair, not grafted into its
weights. Production systems worked this out years ago without waiting for the argument
to be settled. The networks never stalled. They grew a shell.

## The body

The claim I will defend is that whatever produced language will produce manipulation.
Train generative models on enough embodied experience and the abstractions that
competence is built from will condense out of it, as they did for text.

The evidence is accumulating rather than settled, and it points one way. RT-2 carried
web knowledge into robot control [[12](#r12)]. Open X-Embodiment pooled data across 22
platforms and found positive transfer between them [[13](#r13)]. OpenVLA trained an
open policy on 970,000 demonstrations [[14](#r14)]. Diffusion Policy showed generative
action modelling beating direct regression on contact-rich work [[15](#r15)]. The
systems that followed have not changed direction [[16](#r16), [17](#r17)].

So I will say the uncomfortable thing plainly: the recipes are finished. We know how to
learn perception, abstraction and skill from demonstration, and nothing on the critical
path to a useful robot is still a research question. What remains is that embodied
experience is bought with warehouses, teleoperators and hourly wages. The frontier is
financial. It is a procurement problem in a lab coat, and the field is temperamentally
unequipped to find that interesting.

Which resolves an old puzzle rather than deepening it. Moravec noticed that computers
found calculus easy and perception hard [[18](#r18)]. Then the internet supplied a
billion labelled images and perception quietly stopped being hard. Manipulation still
looks hard because nobody has uploaded an internet of movement. There was never a
hierarchy of intrinsic difficulty. There was an accident of which skills happened to
leave records.

Read that way, most arguments about policy architecture are close to irrelevant.
Behaviour cloning, reinforcement on top of a learned world model, denoising your way to
an action: these set how fast you can absorb data, not where you top out. Pick whatever
moves the most data through the network. Two things I would rule out. Do not run
exploration from a blank slate on physical hardware, because a method needing a million
attempts will eat actuators that cost as much as cars. And do not expect the simulator
to save you. Locomotion transfers from simulation beautifully. A tool biting into an
unpredictable workpiece does not, and no amount of randomised rendering closes that
gap.

On the humanoid form: two legs and five fingers are not optimal and that is not the
argument. Every factory, staircase, doorway and hand tool on Earth was specified for
one chassis, and inheriting that entire design space for nothing beats any elegance
claim against it.

The last piece is the one almost nobody funds. A system that emits a plan and assumes
it will work is not autonomous, only optimistic. Autonomy starts the moment a machine
notices it has failed and acts to undo the damage. So the most valuable data in
robotics is recordings of things going wrong and being put right, and essentially
nobody is collecting it. If I had one budget line to defend, it would be that one.

## Theory that has not kept up

Our mathematics does not predict our systems, and the field mostly copes by not
looking. Zhang and colleagues [[19](#r19)] made this concrete a decade ago by fitting
random labels perfectly with networks that still generalise on real ones, which is very
hard to reconcile with any capacity-based account. We cited it, admired it, and carried
on.

Double descent [[20](#r20), [21](#r21)] is real and reproducible and probably beside
the point for frontier models, which see far more tokens than they have parameters and
never enter the interpolation regime where the second descent lives. My broader
suspicion is that any theory starting from linear models will explain linear models and
stop. Whatever eventually explains this will turn on scale and on the structure that
condenses inside it.

Diffusion has the prettiest theory in the field and the theory is mostly decoration.
The stochastic differential equation story is elegant [[22](#r22)], and then Cold
Diffusion showed the method still works when the noise is swapped for arbitrary
deterministic degradations [[23](#r23)], and flow matching reached the same quality
from a different formulation entirely [[24](#r24)]. What survives all three framings is
iterative refinement, which is simply a scalable way to let a network spend more
computation on a hard output. That is the mechanism. The rest is narration.

One embarrassment while the shelf is open. Grokking, the delayed jump from memorisation
to generalisation [[25](#r25)], has been characterised almost entirely with one family
of optimisers. Whether the delay belongs to the task, the architecture or the update
rule is a straightforward ablation that anyone could run, and as far as I can tell
nobody has run it properly.

And one conviction. Predicting every pixel of the future is a tax on capacity. A model
built for planning should predict the compressed variables that decisions actually turn
on, and be judged by the actions it enables rather than by the pictures it repaints.

## Coda

Adversarial training [[26](#r26)] produced remarkable results and, in my experience,
bought instability and opacity to get them. I will admit the preference is
temperamental as well as technical: the systems worth building are the ones whose parts
are on the same side.

That is the whole position. The engine is generative learning at scale. The field's
best-known voices have each been about half right, and consistently wrong in the same
direction, which is towards cleverness and away from compute. The next results in
robotics will be written in demonstrations, failures and recoveries rather than in
equations. And the machines will keep making miracles ordinary at a steady rate,
whether or not we remember to be impressed.

---

## References

1. <a id="r1"></a>Bender, Gebru, McMillan-Major, Shmitchell. [On the Dangers of Stochastic Parrots](https://dl.acm.org/doi/10.1145/3442188.3445922). FAccT, 2021.
2. <a id="r2"></a>Dziri et al. [Faith and Fate: Limits of Transformers on Compositionality](https://arxiv.org/abs/2305.18654). NeurIPS, 2023.
3. <a id="r3"></a>Sutton. [The Bitter Lesson](http://incompleteideas.net/IncIdeas/BitterLesson.html). 2019.
4. <a id="r4"></a>Sutton, Bowling, Pilarski. [The Alberta Plan for AI Research](https://arxiv.org/abs/2208.11173). 2022.
5. <a id="r5"></a>Schmidhuber. [Annotated History of Modern AI and Deep Learning](https://arxiv.org/abs/2212.11279). 2022.
6. <a id="r6"></a>Schlag, Irie, Schmidhuber. [Linear Transformers Are Secretly Fast Weight Programmers](https://arxiv.org/abs/2102.11174). ICML, 2021.
7. <a id="r7"></a>Hinton. [The Forward-Forward Algorithm](https://arxiv.org/abs/2212.13345). 2022.
8. <a id="r8"></a>LeCun. [A Path Towards Autonomous Machine Intelligence](https://openreview.net/forum?id=BZ5a1r-kVsf). 2022.
9. <a id="r9"></a>Karpathy. [Software 2.0](https://karpathy.medium.com/software-2-0-a64152b37c35). 2017.
10. <a id="r10"></a>Marcus. [Deep Learning: A Critical Appraisal](https://arxiv.org/abs/1801.00631). 2018.
11. <a id="r11"></a>Marcus. [The Next Decade in AI](https://arxiv.org/abs/2002.06177). 2020.
12. <a id="r12"></a>Brohan et al. [RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control](https://arxiv.org/abs/2307.15818). 2023.
13. <a id="r13"></a>Open X-Embodiment Collaboration. [Robotic Learning Datasets and RT-X Models](https://arxiv.org/abs/2310.08864). 2023.
14. <a id="r14"></a>Kim et al. [OpenVLA: An Open-Source Vision-Language-Action Model](https://arxiv.org/abs/2406.09246). 2024.
15. <a id="r15"></a>Chi et al. [Diffusion Policy: Visuomotor Policy Learning via Action Diffusion](https://arxiv.org/abs/2303.04137). RSS, 2023.
16. <a id="r16"></a>Black et al. [π0: A Vision-Language-Action Flow Model for General Robot Control](https://arxiv.org/abs/2410.24164). 2024.
17. <a id="r17"></a>NVIDIA. [GR00T N1: An Open Foundation Model for Generalist Humanoid Robots](https://arxiv.org/abs/2503.14734). 2025.
18. <a id="r18"></a>Moravec. *Mind Children: The Future of Robot and Human Intelligence*. Harvard University Press, 1988.
19. <a id="r19"></a>Zhang, Bengio, Hardt, Recht, Vinyals. [Understanding Deep Learning Requires Rethinking Generalization](https://arxiv.org/abs/1611.03530). ICLR, 2017.
20. <a id="r20"></a>Belkin, Hsu, Ma, Mandal. [Reconciling Modern Machine Learning Practice and the Bias-Variance Trade-off](https://arxiv.org/abs/1812.11118). PNAS, 2019.
21. <a id="r21"></a>Nakkiran et al. [Deep Double Descent: Where Bigger Models and More Data Hurt](https://arxiv.org/abs/1912.02292). ICLR, 2020.
22. <a id="r22"></a>Ho, Jain, Abbeel. [Denoising Diffusion Probabilistic Models](https://arxiv.org/abs/2006.11239). NeurIPS, 2020.
23. <a id="r23"></a>Bansal et al. [Cold Diffusion: Inverting Arbitrary Image Transforms Without Noise](https://arxiv.org/abs/2208.09392). 2022.
24. <a id="r24"></a>Lipman et al. [Flow Matching for Generative Modeling](https://arxiv.org/abs/2210.02747). ICLR, 2023.
25. <a id="r25"></a>Power, Burda, Edwards, Babuschkin, Misra. [Grokking: Generalization Beyond Overfitting on Small Algorithmic Datasets](https://arxiv.org/abs/2201.02177). 2022.
26. <a id="r26"></a>Goodfellow et al. [Generative Adversarial Networks](https://arxiv.org/abs/1406.2661). NeurIPS, 2014.

---
layout: essay
title: The engine and its prophets
description: An opinionated read of where machine learning actually stands, who called it right, and what is missing before robots become useful.
permalink: /notes/the-engine-and-its-prophets/
sitemap: false
noindex: true
date: 2026-08-11
standfirst: >-
  A personal assessment of where the field stands, which of its loudest voices
  were right about what, and why the remaining problem in robotics is economic
  rather than intellectual.
---

Machines could not hold a conversation, and then they could. What I find striking is
not the capability but the speed of habituation. In roughly a year the common verdict
moved from "this is not possible" to "this is unreliable and overhyped", with very
little time spent in between. That says more about how we recalibrate than about the
systems themselves.

## Biological plausibility is not a requirement

I spent my doctorate looking for learning rules a brain could plausibly implement, and
I want to state the conclusion I came to plainly, because it argues against my own
starting position. Biological plausibility is a source of hypotheses. It is not a
constraint on capability.

Networks trained by gradient descent already exceed human performance on a widening
set of tasks. If some further principle is required, it is required for the remaining
failure modes rather than for the territory already covered. My own work on the
[Cooperative Network Architecture](https://direct.mit.edu/neco/article/38/4/538/135632/The-Cooperative-Network-Architecture-Learning)
argues that a structured, composable representation buys robustness that distributed
activations do not. I still believe that. I no longer believe the argument needs
biology to justify it.

## Two weak forms of criticism

The first is the claim that a model only reproduces patterns from its training data.
The framing comes from Bender and colleagues [[1](#r1)] and it has been useful as a
warning about deployment and data provenance. As a scientific claim it is hard to work
with, because "understanding" has no agreed operational definition. What a system can
do and where it fails does have one, and that is answerable by experiment.

The second is the impossibility result. Some are careful and hold up. Dziri and
colleagues [[2](#r2)] show compositional tasks where transformer performance degrades
in a way that more of the same training does not fix, and that finding has survived
scrutiny. Many other claimed ceilings have not. A useful test before believing one is
whether it would still hold after another order of magnitude of compute. If the proof
depends on a fixed model size or a fixed context, it is a statement about today's
configuration rather than about the method.

## Sutton

The Bitter Lesson [[3](#r3)] is, to my mind, the most useful short text the field has
produced. General methods that scale with computation beat handcrafted structure, and
they do so repeatedly. The Alberta Plan [[4](#r4)] extends this into a research
programme built on learning from interaction rather than from human-generated data.

My difficulty is with the position that language models are a dead end because they
imitate. Imitation at web scale is precisely a simple method that converts computation
into capability, which is what the Bitter Lesson recommends. I do not think the two
positions sit comfortably together. There is a coherent version of the argument, that
data drawn from humans caps you at human performance, but it needs to be made on those
terms rather than by calling the method mere copying.

## LeCun

His 2022 position paper [[5](#r5)] makes two claims I think are correct. Learning
without labels would carry the field, and agents that act in the world will rely on
models that predict in a learned representation space rather than in raw sensory
detail. Joint-embedding objectives are now visible across robotics.

Where the record is weaker is the repeated claim that autoregressive prediction is a
dead end. Several model generations have passed and the boundary keeps moving. Being
right about the destination does not require being right about which road fails.

## Schmidhuber

The priority claims [[6](#r6)] are, in the main, correct. World models in 1990,
adversarial objectives in 1990, and fast weight programmers in 1991 that Schlag and
colleagues later showed to be formally equivalent to linearised attention [[7](#r7)].

The lesson I draw is not about credit. An idea that arrives decades before the compute
that makes it work is a hypothesis rather than a result. That is the Bitter Lesson
read from the other end: the constraint was never the concept.

## Hinton

He co-authored backpropagation and has spent much of the time since proposing
alternatives, from wake-sleep through capsules to Forward-Forward [[8](#r8)]. Each is
well motivated. None has displaced backpropagation on benchmarks.

I mention this with sympathy rather than as criticism, because my thesis is another
instance of the same pattern. You propose the biologically motivated alternative, it
behaves interestingly, and gradient descent still wins the comparison.

## Karpathy

Software 2.0 [[9](#r9)] named the shift from programs that are written to programs
that are fitted, before that shift was obvious. The data engine he described at Tesla,
deploy the system, collect the cases where it fails, retrain on them, remains the right
operating loop for anything that has to work outside a benchmark.

His characterisation of reinforcement learning as a very low-bandwidth learning signal
is fair, and I read it as an argument for generative pretraining plus verification
rather than against building agents. Where I disagree is timing. He has suggested
something like a decade before agents are reliably useful. In industrial machine
tending the demand is immediate, and what stands in the way is data collection rather
than a missing idea.

## Marcus

The critique has been consistent for a long time [[10](#r10), [11](#r11)], and many of
its specific predictions have not held. One claim has held well: end-to-end learning on
its own is not dependable enough to deploy without a safety net.

I think the remedy is different from the one proposed. The symbolic structure belongs
around the network rather than inside it, as verification, retry and repair wrapped
around a learned core. That is roughly what production systems have converged on
anyway. The networks did not stall. They acquired a shell.

## The body

The claim I am willing to defend is that the method which produced language will
produce manipulation. Train generative models on large volumes of embodied experience
and useful abstractions will emerge, as they did for text.

The evidence is accumulating rather than conclusive. RT-2 showed transfer from web
knowledge into robotic control [[12](#r12)]. Open X-Embodiment pooled data across 22
platforms and showed positive transfer between them [[13](#r13)]. OpenVLA trained an
open policy on 970,000 demonstrations [[14](#r14)]. Diffusion Policy demonstrated that
generative action modelling beats direct regression on contact-rich tasks
[[15](#r15)]. More recent systems continue in the same direction [[16](#r16),
[17](#r17)].

What is missing is not another component. It is the loop: a mechanism by which a
robot's failures in the field return to training without a human moving files in
between. That loop is what every roadmap promises and few have built.

I would go further and say the recipes are largely settled. We know how to learn
perception, abstraction and skill from examples. The frontier is economic. Embodied
experience is paid for in warehouses, teleoperators and hourly wages, and that is a
different kind of problem from the one the field is used to solving.

This reframes an old puzzle. Moravec observed that computers found calculus easy and
perception hard [[18](#r18)]. Then the internet supplied a billion labelled images and
perception stopped being the hard part. Manipulation still looks hard because no
comparable corpus of movement exists. The paradox was never a hierarchy of intrinsic
difficulty. It was an accident of which skills happened to leave records.

Given that, the arguments over policy architecture matter less than they appear to.
Behaviour cloning, reinforcement on top of a learned world model, or denoising your way
to an action mostly set how fast you can absorb data rather than where you top out.
What I would avoid is tabula-rasa exploration on physical hardware, because a method
that needs a million attempts will consume actuators that cost as much as a car. Copy
first and explore later. I would also not expect simulation to close every gap.
Locomotion transfers from simulation well. Contact-rich manipulation against an
unpredictable workpiece transfers far less well, and no amount of randomised rendering
fixes that.

On the humanoid form: two legs and five fingers are not optimal. The argument for them
is that every factory, staircase, doorway and hand tool was specified for that chassis,
and inheriting the whole design space is worth more than an elegance argument against
it.

Shape and planning are not sufficient. A system that emits a sequence of steps and
assumes they will work is not autonomous, only optimistic. Autonomy begins when a
machine can detect that it has failed and act to recover. Which is why the most
valuable data in this field is recordings of things going wrong and being put right,
and why so little of it is being collected.

## The theory shelf

Our theory has not kept pace with our systems. Classical capacity bounds predict, with
real rigour, behaviour that large networks decline to exhibit. Zhang and colleagues
[[19](#r19)] made this concrete by showing that standard networks can fit random labels
perfectly while still generalising when given real ones, which is difficult to
reconcile with capacity-based explanations.

Double descent [[20](#r20), [21](#r21)] is a genuine and reproducible phenomenon. I am
less sure it describes frontier models, which are trained on far more tokens than they
have parameters and so never enter the interpolation regime where the second descent
lives. My broader suspicion is that any account starting from linear models will
explain linear models. Whatever the eventual explanation is, I expect it to turn on
scale and on the structures that condense inside it.

Diffusion has the most attractive theory in the field and I suspect the theory is
partly decorative. The stochastic differential equation story is elegant [[22](#r22)],
and then Cold Diffusion showed the method still works when the noise is replaced with
arbitrary deterministic degradations [[23](#r23)], and flow matching reached similar
quality from a different formulation [[24](#r24)]. The mechanism that survives all
three framings is iterative refinement, which is a scalable way to let a network spend
more computation on a hard output.

One open question I would like someone to close. Grokking, the delayed transition from
memorisation to generalisation [[25](#r25)], has been characterised largely with one
family of optimisers. Whether the delay is a property of the task, the architecture or
the update rule is answerable with a straightforward ablation, and I have not seen it
done thoroughly.

A last conviction. Predicting every pixel of the future is a poor use of capacity. A
model built for planning should predict the compressed variables that decisions
actually depend on, and be evaluated on the actions it enables rather than on
reconstruction quality.

## Coda

Adversarial training [[26](#r26)] produced remarkable results and, in my experience,
instability and opacity along with them. I have a mild engineering preference, and
possibly a temperamental one, for systems whose components optimise the same objective
rather than fight each other.

That is the position. The engine is generative learning at scale. The field's loudest
voices have each been right about roughly half of what they claimed. And the next set
of results in robotics will come from demonstrations, failures and recoveries rather
than from a new equation.

---

## References

1. <a id="r1"></a>Bender, Gebru, McMillan-Major, Shmitchell. [On the Dangers of Stochastic Parrots](https://dl.acm.org/doi/10.1145/3442188.3445922). FAccT, 2021.
2. <a id="r2"></a>Dziri et al. [Faith and Fate: Limits of Transformers on Compositionality](https://arxiv.org/abs/2305.18654). NeurIPS, 2023.
3. <a id="r3"></a>Sutton. [The Bitter Lesson](http://incompleteideas.net/IncIdeas/BitterLesson.html). 2019.
4. <a id="r4"></a>Sutton, Bowling, Pilarski. [The Alberta Plan for AI Research](https://arxiv.org/abs/2208.11173). 2022.
5. <a id="r5"></a>LeCun. [A Path Towards Autonomous Machine Intelligence](https://openreview.net/forum?id=BZ5a1r-kVsf). 2022.
6. <a id="r6"></a>Schmidhuber. [Annotated History of Modern AI and Deep Learning](https://arxiv.org/abs/2212.11279). 2022.
7. <a id="r7"></a>Schlag, Irie, Schmidhuber. [Linear Transformers Are Secretly Fast Weight Programmers](https://arxiv.org/abs/2102.11174). ICML, 2021.
8. <a id="r8"></a>Hinton. [The Forward-Forward Algorithm](https://arxiv.org/abs/2212.13345). 2022.
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

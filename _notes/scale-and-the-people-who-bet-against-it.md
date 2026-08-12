---
title: Scale and the people who bet against it
description: What I think is actually happening in machine learning, which parts of the standard criticism I no longer take seriously, and why robotics is now a question of money rather than ideas.
date: 2026-08-11
tags: [Machine learning, Robotics, Opinion]
standfirst: >-
  I spent four years looking for learning rules a brain could plausibly run and
  came out believing that biological plausibility is not a requirement for
  anything.
---

I spent four years looking for learning rules that a brain could plausibly run, and I
finished that work believing that biological plausibility is not a requirement for
anything. That is an awkward conclusion to arrive at from inside a neuro-inspired
doctorate, so it is worth being precise about what I mean.

Gradient descent on large networks already outperforms us on a widening list of tasks,
and it does so using an update rule no neuron has ever implemented. If some further
principle is needed, it is needed for whatever remains after that list stops growing,
not for the territory already taken. I still think the architecture I worked on is
right, and I would defend
[the Cooperative Network Architecture](/work/net-fragments/) on the grounds that
composable structure buys robustness that distributed activations do not. What I would
no longer do is defend it by pointing at a brain. Neuroscience is an excellent place to
get ideas. It is a bad place to get requirements, and the field keeps confusing the
two, treating a mechanism's resemblance to biology as evidence it will work when the
evidence has been running the other way for fifteen years.

What I actually believe, and what the rest of this is a defence of, is narrower.
Generative learning at scale is the engine behind nearly everything that has worked in
the last decade. It will be the engine in robotics too. And what stands between us and
robots that earn their keep is the cost of getting data out of the physical world,
rather than an idea nobody has had yet.

## Two arguments I have stopped taking seriously

The first is that these systems only recombine what was in their training data. The
stochastic parrots paper [[1](#r1)] did real and necessary work as a warning about
provenance, labour and deployment, and I think it should still be read that way. As a
claim about capability it has a structural problem. I have never seen anyone who makes
it specify what observation would settle it. Every demonstration of competence gets
absorbed as more sophisticated mimicry, which means the position is compatible with any
possible result. A claim that survives all conceivable evidence is not a claim about
the system. What a model does, and where exactly it stops doing it, can be measured,
and that is the only form of the question I know how to work with.

The second is the impossibility result. There is an honourable version of this. Dziri
and colleagues [[2](#r2)] found a compositional failure that more of the same training
does not repair and characterised it carefully enough that it has held up. Most claimed
ceilings are not that. The test I apply before believing one is whether it would
survive another order of magnitude of compute. If the argument turns on a fixed
parameter count, a fixed context length or a particular tokeniser, it is a description
of one configuration rather than a limit on the method, and configurations have a short
shelf life.

## A pattern I keep noticing

Rich Sutton wrote the essay that everyone in this field can quote from memory. General
methods that turn computation into capability beat handcrafted structure, reliably,
across seventy years of attempts to prove otherwise [[3](#r3)]. It is the best thing
written about machine learning that I know of.

I cannot make his current position fit it. He now describes large language models as
imitation that leads nowhere. But imitation at web scale is exactly a general method
that converts computation into capability, which makes it the clearest instance of the
thing his own essay is about. There is a real argument in the vicinity, that data
produced by humans will cap you somewhere near human performance and that learning from
interaction is the only way past that. The Alberta Plan takes it seriously
[[4](#r4)] and may well describe where the next decade goes. I wish he would make that
argument rather than the one about copying.

Schmidhuber gives you the same story from a different angle. The priority claims are
largely correct [[5](#r5)]. World models and adversarial objectives were there in 1990,
and the fast weight programmers of 1991 were later shown by Schlag and colleagues to be
equivalent to linearised attention [[6](#r6)]. He had the ideas and not the machines,
and for thirty years the ideas alone bought him remarkably little. Credit is the least
interesting part of this. What the story actually shows is that an idea arriving decades
before the hardware is a hypothesis, and that we routinely mistake hypotheses for
results because they are written in the same notation.

Hinton is the third variation. He did more than anyone to make backpropagation the
default and has spent much of his career since trying to replace it, through wake-sleep,
through capsules, most recently through Forward-Forward [[7](#r7)]. Every one of those
is more elegant than the thing it was meant to replace. Every one of them loses to it on
the benchmark. I have no standing to be smug here, because my own thesis belongs on that
list, which is roughly how I came to notice the pattern at all.

Three of the most decorated people in the field, in three different decades, each backed
the more elegant mechanism against the more scalable one. That is not stupidity and I do
not think it is coincidence. It is what good taste does when the thing that works is
ugly. I feel the same pull every time I read a paper and find the clean idea more
persuasive than the large one, which is often.

## Right about where, wrong about when

LeCun's 2022 position paper [[8](#r8)] got two large things right well before they were
obvious. Learning without labels would carry the field, and agents acting in the world
need models that predict in a learned representation rather than in raw sensory detail.
Joint-embedding objectives are now standard in robotics and he called that early. The
same person has also declared autoregressive prediction a dead end across several model
generations, and each time the models went through the wall he had drawn. Predicting
which direction a field will move turns out to be much easier than predicting which
particular route will fail, and he keeps making the second kind of prediction in
public.

Karpathy is the most useful practitioner we have. Software 2.0 [[9](#r9)] named the
shift from programs that are written to programs that are fitted before most people had
noticed it was happening, and the data engine he described, ship the thing, collect its
failures, retrain on them, remains the operating manual for any system that has to
survive outside a benchmark. His observation that reinforcement learning is a very thin
supervision signal is correct and is an argument for pretraining plus verification
rather than an argument against agents. Where I part company is timing. His horizon for
agents that are reliably useful is measured in years, and on a factory floor the demand
is already here. What is missing is not capability. It is somebody willing to do the
unglamorous work of collecting the data.

Marcus has been wrong about almost every specific prediction he has made and right
about one general thing [[10](#r10), [11](#r11)]. End-to-end learning on its own is not
dependable enough to deploy without supervision. His mistake is the remedy. Symbolic
structure belongs around the network as verification, retry and repair, not grafted into
its weights. Production systems worked this out years ago while the argument was still
going on, which is usually how these things get settled.

## The body

Here is the part I would actually bet on. Whatever produced language will produce
manipulation. Train generative models on enough embodied experience and the abstractions
that competence is made of will condense out of it, the way they did for text.

The evidence is suggestive rather than settled, and all of it points the same way. RT-2
showed knowledge from the web transferring into robot control [[12](#r12)]. Open
X-Embodiment pooled data across twenty-two platforms and found positive transfer between
robots that share almost nothing physically [[13](#r13)]. OpenVLA trained an open policy
on 970,000 real demonstrations [[14](#r14)]. Diffusion Policy showed that modelling
actions generatively beats regressing them directly on contact-rich tasks
[[15](#r15)]. Nothing since has changed the direction [[16](#r16), [17](#r17)].

If that is right, then the recipes are essentially finished and nothing on the critical
path to a useful robot is still a research question. What is left is warehouses,
teleoperation rigs, hourly wages and a great deal of patience. This is an uncomfortable
thing to say to a research community, because it means the bottleneck is precisely the
kind of work that does not turn into papers, and the people best placed to solve it are
the ones with the least professional incentive to try.

It also settles an old puzzle rather than deepening it. Moravec noticed that computers
found calculus easy and perception hard, and the observation hardened into a claim about
intrinsic difficulty [[18](#r18)]. Then the internet delivered a billion labelled images
and perception quietly stopped being hard. Manipulation still looks hard because nobody
has uploaded an internet of movement. There was never a hierarchy of difficulty. There
was an accident about which human skills happened to leave written records.

The obvious objection is that there is an internet of movement, and it is called video.
Elvis Nava lays out the strongest version of this case [[19](#r19)], and I agree with
almost all of it. His diagnosis of the field is the part I would put on a wall. Robotics
today looks like voice assistants did before language models, millions of lines of
bespoke logic with learning bolted into the gaps, which turns what should be a data
scaling problem into an endless series of ad-hoc engineering problems. He is also right
that the field is roughly five years behind language in both compute and data, and that
this is an opportunity rather than an embarrassment.

Where I would push back is on how much of the gap human video closes. Video gives you
what the world looks like when a task goes well. It does not give you the actions, the
forces, the proprioception, or the moment where a grip slipped and somebody adjusted
without thinking about it. You can recover some of that by inference and it helps, and
pretraining on it is clearly worth doing. But the expensive part of the dataset is
precisely the part video does not contain, which is what the body did and what happened
when it was wrong.

Read that way, most of the arguments about policy architecture matter less than they
appear to. Behaviour cloning, reinforcement learning on a learned world model, denoising
your way to an action: these determine how fast you can absorb data, not where you
eventually top out. Two things I would rule out anyway. Do not run exploration from
scratch on physical hardware, because a method that needs a million attempts will
destroy actuators that cost as much as a car. And do not expect simulation to rescue
you. Locomotion transfers from simulation beautifully. A tool biting into a workpiece
whose material properties vary does not, and no amount of domain randomisation has
closed that particular gap.

On the humanoid form, two legs and five fingers are not optimal and that was never the
argument. Every doorway, staircase, workbench and hand tool in the industrial world was
specified around one body, and inheriting that whole design space for free outweighs any
elegance objection.

The last piece is the one almost nobody funds. A system that emits a plan and assumes it
worked is not autonomous, it is optimistic. Autonomy begins when a machine notices it has
failed and does something about it. Which means the most valuable recordings in robotics
are of things going wrong and being put right, and as far as I can tell nobody is
systematically collecting them.

## What the theory does not cover

Our mathematics does not predict our systems and the field mostly copes by not looking
directly at this. Zhang and colleagues made it concrete a decade ago by fitting random
labels perfectly with networks that still generalise on real ones [[20](#r20)], which is
very hard to reconcile with any account based on capacity. It was cited, admired and
worked around.

Double descent [[21](#r21), [22](#r22)] is real, reproducible and probably not relevant
to frontier models, which see far more tokens than they have parameters and never enter
the interpolation regime where the second descent lives. My broader suspicion is that a
theory starting from linear models will end up explaining linear models. Whatever
eventually accounts for this will have to be about scale itself and about the structure
that appears inside it.

Diffusion has the most attractive theory in the field and I have come to think the
theory is mostly decorative. The stochastic differential equation framing is elegant
[[23](#r23)]. Then Cold Diffusion showed the method still works when you replace the
noise with arbitrary deterministic degradations [[24](#r24)], and flow matching reached
comparable quality from an entirely different formulation [[25](#r25)]. What survives
all three descriptions is iterative refinement, which is a way of letting a network
spend more computation on a hard output. The mathematics is a language for discussing
that, rather than the reason it works.

One small embarrassment while the shelf is open. Grokking, the delayed jump from
memorisation to generalisation [[26](#r26)], has been characterised almost entirely with
one family of optimisers. Whether the delay belongs to the task, the architecture or the
update rule is a straightforward ablation, and as far as I can tell nobody has run it
properly.

I might be wrong about the central claim, and I know what would show it. Someone trains
on an order of magnitude more embodied data than anyone currently holds, and the curve
flattens instead of bending. Nobody has done that, which is rather the point. Until
somebody does, I am going to keep buying data.

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
19. <a id="r19"></a>Nava. [The Scaling Hypothesis and Robotics](https://www.elvisnava.com/posts/2024_10_29_scaling_hypothesis/). 2024.
20. <a id="r20"></a>Zhang, Bengio, Hardt, Recht, Vinyals. [Understanding Deep Learning Requires Rethinking Generalization](https://arxiv.org/abs/1611.03530). ICLR, 2017.
21. <a id="r21"></a>Belkin, Hsu, Ma, Mandal. [Reconciling Modern Machine Learning Practice and the Bias-Variance Trade-off](https://arxiv.org/abs/1812.11118). PNAS, 2019.
22. <a id="r22"></a>Nakkiran et al. [Deep Double Descent: Where Bigger Models and More Data Hurt](https://arxiv.org/abs/1912.02292). ICLR, 2020.
23. <a id="r23"></a>Ho, Jain, Abbeel. [Denoising Diffusion Probabilistic Models](https://arxiv.org/abs/2006.11239). NeurIPS, 2020.
24. <a id="r24"></a>Bansal et al. [Cold Diffusion: Inverting Arbitrary Image Transforms Without Noise](https://arxiv.org/abs/2208.09392). 2022.
25. <a id="r25"></a>Lipman et al. [Flow Matching for Generative Modeling](https://arxiv.org/abs/2210.02747). ICLR, 2023.
26. <a id="r26"></a>Power, Burda, Edwards, Babuschkin, Misra. [Grokking: Generalization Beyond Overfitting on Small Algorithmic Datasets](https://arxiv.org/abs/2201.02177). 2022.

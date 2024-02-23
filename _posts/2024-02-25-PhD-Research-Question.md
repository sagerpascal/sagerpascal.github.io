---
layout: post
title:  What Computer Control Misses and how Natural Intelligence can Help
date: 2024-02-20
modified: 2024-02-20
categories: english deep-learning computer-control phd
comments: true
summary: Allowing agents to control computers allows to automate various tasks, harbouring enormous potential. Nonetheless, the current level of advancement in computer control remains notably imperfect. This article delves into the constraints of computer control and explores how leveraging natural intelligence can mitigate these shortcomings.
---


*This blog post serves a dual purpose: to organize my thoughts and to disseminate my ideas to a broader audience
(that hopefully provides feedback). Concurrently, I am in the pursuit of a formulating a research question for my
doctoral research. After considerable contemplation, I have amassed a reservoir of potential topics. Yet, the
crystallization of a precise research question eludes me. My intention in writing this post is to catalyze the
refinement of my thoughts and ultimately pinpoint an area of research that ignites my fervor.*

# Computer Control

In the realm of artificial intelligence (AI), the intersection of natural language instruction (NL) and computer control agents represents a focal point of innovation and research. This blog post delves into the intricacies of these agents, which execute actions on computers based on NL commands, shedding light on their strengths and limitations.

We define the task of computer control as follows:
In this section, we formalize the task fulfilled by instruction-based agents for computer control. The agent operates within a computer environment, such as a personal computer, notebook, or smartphone.
We denote the state space of the computer environment as $$\mathcal{S}$$, with a single state of this environment at time $$t$$ represented as $$s_t \in \mathcal{S}$$.
Typically, the agent only observes a partial aspect of this state, denoted as $$o_t \in \mathcal{O}$$, where $$\mathcal{O}$$ is the observation space.
This partial observation, $$o_t$$, may lack certain details present in $$s_t$$.
For instance, while $$s_t$$ could represent a personal computer with multiple running processes, the agent's observation $$o_t$$ might be limited to a pixel-based screenshot captured from the user interface.

The agent can perform various actions denoted as $$a_t \in \mathcal{A}$$, within the action space $$\mathcal{A}$$.
The action space might include a low-level interface, such as the computer's keyboard or mouse, or a higher-level interface, such as an API that can be called programmatically and then performs actions within the environment.
Typically, a stochastic policy $$\pi$$ determines the action to take based on the agent's observation and a given natural language instruction denoted as $$i$$:

\begin{equation}
    a_t \sim \pi(\cdot | o_t, i)
\end{equation}

Note that we do not use a subscript $$t$$ for the instruction $$i$$, as it is typically provided at the beginning of a trajectory sequence $$\tau = (o_0,a_0, o_1, a_1, ...)$$. Consequently, after receiving an instruction $$i$$, such as *"Open the calculator app,"* the agent captures a representation of the system's state $$o_0$$ (e.g., a screenshot) and then samples and executes an action $$a_0 \sim \pi (\cdot \mid o_0, i)$$ (e.g., clicking on a symbol). This process of observing and executing actions iteratively repeats until a stop criterion is met.

# Existing Approaches

This blogpost does not aim to provide an exhaustive overview of existing approaches in computer control. Nonetheless, it is essential to highlight the two primary paradigms that have been employed to tackle this task: reinforcement learning (RL) and large language models (LLMs).

Reinforcement learning methodologies typically operate within two distinct types of observation spaces $$\mathcal{O}$$: These spaces consist of either raw pixel data representing the user interface, a more abstract representation such as the Document Object Model (DOM) in the context of web browsers, or a combination of both.
The action space $$\mathcal{A}$$ is commonly defined by actions such as mouse movements, clicks, or keyboard inputs.
The agent's policy $$\pi$$ is usually acquired through iterative interaction with the environment, during which the agent receives feedback in the form of a reward signal based on the efficacy of its actions.
This reward signal is often sparse and delayed, presenting a significant challenge in the learning process.

In contrast, LLMs harness the capabilities of natural language processing (NLP) to comprehend and carry out instructions conveyed in natural language. These models can either directly process textual descriptions of the user interface or utilize an additional model to convert pixel-level observations into textual representations. The set of actions, denoted as $$\mathcal{A}$$, is typically delineated by high-level commands such as XML patterns or API calls, specifying how to engage with the environment. State-of-the-art (SOTA) LLMs surpass reinforcement learning (RL) agents in terms of both sample efficiency and adaptability to novel environments. This superiority stems from their pretraining on extensive corpora, endowing them with certain "reasoning" abilities that enable the formulation of step-by-step plans for interacting with the environment.


## My Bitter Lesson: Am I too Slow?

While writing this post, I experienced a surge of excitement as I formulated a compelling research question along with its accompanying sub-questions and some ideas how to tackle them.
I couldn't help but envision this endeavor evolving into a series of impactful papers, potentially shaping the trajectory of my PhD journey.
However, it took me, due to vacation and other obligations, about two weeks to write this post.
It was during this time that I stumbled upon a published paper that not only mirrored my idea but had already implemented it.
The realization was a humbling reminder of the rapid pace at which this field of "agents for computer control" evolves (with an average of ~10 publications per month).

Acknowledging the reality of this swift-moving landscape, it became evident that speed alone would not suffice in navigating the intricacies of academic research, especially for an individual researcher.
As I reflected on this experience, it underscored the importance of not only identifying the state of the art but also pinpointing areas that offer less competition—a niche where one can make a meaningful and enduring contribution without the looming threat of rapid invalidation.


# Ultimate Goal

In contemporary computing, the majority of applications are navigated by users through a pixel-based UIs (as $$\mathcal{O}$$), alongside input devices such as keyboards and mice ($$\mathcal{A}$$). The paramount aspiration is the development of an autonomous agent proficient in comprehending natural language directives and effectively controlling the computer system akin to human interaction.
Specifically, the focal aim is the creation of an agent utilizing the pixel-level display as its observation space and the keyboard and mouse as its action space. This agent is envisaged to possess the capability to interpret natural language instructions and execute tasks delineated by human operators.
Although this endeavor is more complex compared to using higher-level interfaces, it offers unparalleled versatility with potential applicability across diverse computing applications.

Current research focuses especially on creating policies $$\pi$$ that allows agents to act.
However, their observation space $$\mathcal{O}$$ is often limited very specific applications such as web browsers, Android applications, or games.
Furthermore, SOTA models typically require textual descriptions of the user interface, which are for most applications not available.
Other approaches claiming that they can work with pixel-based observations are often pre-trained on screenshot-HTML pairs, allowing to translate the pixel-based observation into a textual representation of the user interface.
Approaches that directly work with pixel-based observations are still in their infancy and perform surprisingly bad.

I argue that the missing ingredient for the success of computer control agents is the ability to understand UI elements and that it is key to derive actionable representations.

>
> Being able to derive actionable representations from pixel-based UI observations in a unsupervised manner is fundamental for controlling computers.
> 
> -- <cite>Me</cite>

Having actionable representation allows a model to understand the consequences of actions, i.e., it can predict the next state of the environment given an action.
Such representations are fundamental for planning and reasoning, combining these with existing models would allow to act on various applications and not be limited to web browsers, Android applications, or games anymore.

## Research Question

Based on these insights and the current state of the art, I believe that the following questions will be answered by others:

- How to use LLMs for computer control?
- How to use RL for computer control?
- How to access the UI screen using LLMs?
- How to use mouse and keyboard using LLMs?
- How to find elements on UI screens and map them to instructions?

*Maybe, instead of LLMs, novel research will use hybrid vision-language models to control computers. However, the principle remains the same.*

I believe that others will not focus on the following question:
- How to control **various unknown** applications without expert demonstrations? (Most research focuses on specific applications such as web browsers, Android applications, or similar.)

Furthermore, I think that RL is too sample-inefficient to be trained from scratch using pixel-based observations. LLMs, on the other hand, provide reasoning capabilities that are sufficient for some applications but are not yet able to generalize to non-mainstream applications.
Thus, to advance computer control for various applications, I believe that an interplay between discovering and understanding screen elements and reasoning (e.g., using LLMs) is necessary.
This interplay must be self-supervised, as expert demonstrations are not available for various applications.

Based on this insights, I propose the following research question for my doctoral research:

**How can we derive actionable representations from pixel-based UI observations in an unsupervised manner to enable agents to control computers across diverse applications?**

This question includes the following sub-questions:

- How to identify actionable objects (unsupervised)? E.g., "where can I click and type?"
- How to learn the consequences of actions (unsupervised)? E.g., "what happens if I click here?"
- How to represent actionable objects in a way that is useful for planning and reasoning? E.g., "how to map a learned world model to instructions and reasoning?"


UIs pose the challenges that

- agents can observe the screen to learn but typically no expert instruction is provided -> the agent has to come up with an interpretation what the user is doing
- UIs are complex and diverse -> the agent has to be able to generalize to various applications
  - UIs contain multiple windows, and windows contain multiple sub-windows. Typically, the focus is only on one sub-window
  - UIs scale with the screen size and window sizes can be adjusted
  - UIs can change due to hovering, clicking, or typing


# Link to Natural Intelligence

Humans have internal models of the  external world that represents all behavior-relevant information. These models are acquired by interacting with the world and are used to predict the consequences of actions.
Neuroscientific findings suggest that humans, when acting, integrate efference copies of motor signals with incoming sensory observations to predict future sensory inputs (Keller et al., 2012).
Hypotheses in psychology (Piaget, 1964) suggest that perceiving an object is not creating a mental copy of it but rather understanding of how this object behaves under different interventions.

Existing research in computer vision uses these insights and focuses on building actionable representations for objects within 3D worlds (Keurti et al. 2023).
However, there is no work focusing on actionable representations for pixel-based UI observations.

# Approach

## Idea 1: The LLM interface

We use a LLM for action planning and reasoning. It acts as the brain, telling an agent where to click and type.
It provides a reward if satisfied with the result (text response: helpful, wrong, not helpful, ...), e.g. see https://arxiv.org/abs/2312.09187.
However, it is "blind" in the sense that it cannot observe the screen and has to rely on the agent to provide a textual description of the screen.

The agent is a small LVM or model that takes an image as input and outputs a textual description of the screen of the screen.
In a subsequent step, it takes a textual input from the LLM and outputs an action.

The small agents thus must be trained to take a text and image as input and output an action and UI description.
The first task, taking a screenshot and describing it, is known as UI grounding and described here: https://arxiv.org/abs/2401.10935.
A very obvious approach would be to use some kind of labels, e.g., derived from webpages, RICO dataset, etc. to train the agent to describe the screen.
However, this is already done in the literature.
Another approach would be to

- Build an application that generates random UIs following the Mac/Windows/Linux guidelines and let the agent describe these UIs. When building UIs, we could directly derive the descriptions (used as labels) and the pixel-based rendering (used as input for the agent).
- Alternatively, we could create scripts for labeling UIs, e.g., by accessing information about open applications, focused windows, OCR, bounding box predictions, etc. (e.g. https://github.com/MulongXie/UIED)

**However, these steps seem like a huge engineering effort and less like a research effort.**


The second task, taking a textual description and outputting an action.
This could be done in a RL style by leveraging the LLM as the reward signal.
First, the agent provides a description of the screen, then the LLM provides a textual instruction, and the agent has to execute the instruction.
Afterwards, the agent provides a textual description of the screen again and the LLM provides a reward signal.
For example, if the LLM instructs the agents to click on open calculator, the next UI description of the agent should contain the calculator.
In that case, the LLM provides a positive reward signal.
However, if the agent does not detect the calculator, the LLM provides a negative reward signal.

### Impression

This approach seems promising to get something up and running.
However, it seems like a lot of engineering and less like a research effort.
It lacks scientific novelty as it is a combination of existing approaches together with creating a new dataset.

(of course, some novelty can be added: It seems, for example, helpful to store working (sub-)workflows, such as open an app, in a tree-based structure and to retrieve it if similar actions are required.)

## Idea 2: The "autoregressive" agent

Similar to LLMs, pretrain the network to build a world model of computers.
This can be done by observing the screen and predicting the next screen for a given action.
Therefore, the computer runs in a virtual environment (a "gym-like" environment) and the agent can observe the screen and execute actions.
After pre-training, a query encoder is tuned so that the correct action is selected for a given textual instruction.

### Impression

Would require vast amount of resources to pre-train the agent.


## Idea 3: Human observations

The agent observes a human interacting with the computer and tries to predict what the human will do next.


### Impression

Not feasible, as similar work has shown that vast amounts of data are required to learn from human demonstrations.
For example, for simple web-tasks, most SOTA approaches use more than 25k demonstrations per task.
Even though our approach would be more sample efficient, we would probably still require thousands of demonstrations per task.
Since we want to control the entire computer, the number of samples required would be enormous (while probably having only a few persons allowing to observe their screen).






# References

- Keurti, Hamza, Hsiao-Ru Pan, Michel Besserve, Benjamin F Grewe, and Bernhard Schölkopf. 2023. “Homomorphism AutoEncoder – Learning Group Structured Representations from Observed Transitions.” In Proceedings of the 40th International Conference on Machine Learning, 202:16190–215.


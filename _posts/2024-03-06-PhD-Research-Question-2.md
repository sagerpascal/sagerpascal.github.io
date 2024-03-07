---
layout: post
title:  What Computer Control Misses and how Natural Intelligence can Help - V2
date: 2024-03-06
modified: 2024-03-06
categories: english deep-learning computer-control phd
comments: true
summary: Allowing agents to control computers allows to automate various tasks, harbouring enormous potential. Nonetheless, the current level of advancement in computer control remains notably imperfect. This article delves into the constraints of computer control and explores how leveraging natural intelligence can mitigate these shortcomings.
---



# Computer Control

The ability to control computers through natural language (NL) instructions harbors enormous potential, as it allows for the automation of various tasks.
This blog post delves into the intricacies of agents, which execute actions on computers based on NL commands.

We define the task of computer control as follows:
The agent operates within a computer environment, such as a personal computer, notebook, or smartphone.
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

Note that we do not use a subscript $$t$$ for the instruction $$i$$, as it is typically provided at the beginning of a trajectory sequence $$\tau = (o_0,a_0, o_1, a_1, ...)$$.
Consequently, after receiving an instruction $$i$$, such as *"Open the calculator app,"* the agent captures a representation of the system's state $$o_0$$ (e.g., a screenshot) and then samples and executes an action $$a_0 \sim \pi (\cdot \mid o_0, i)$$ (e.g., clicking on a symbol).
This process of observing and executing actions iteratively repeats until a stop criterion is met.

# Existing Approaches

This blogpost does not aim to provide an exhaustive overview of existing approaches in computer control.
Nonetheless, it is essential to highlight the two primary paradigms that have been employed to tackle this task: Reinforcement learning (RL) and large language models (LLMs).

Reinforcement learning methodologies typically operate within two types of observation spaces $$\mathcal{O}$$: These spaces consist of either raw pixel data representing the user interface, a more abstract representation such as the Document Object Model (DOM) in the context of web browsers, or a combination of both.
The action space $$\mathcal{A}$$ is commonly defined by actions such as mouse movements, clicks, or keyboard inputs.
The agent's policy $$\pi$$ is usually acquired through iterative interaction with the environment, during which the agent receives feedback in the form of a reward signal based on the efficacy of its actions.
This reward signal is often sparse and delayed, presenting a significant challenge in the learning process.

In contrast, LLMs harness the capabilities of natural language processing (NLP) to comprehend and carry out instructions conveyed in natural language. These models can either directly process textual descriptions of the user interface or utilize an additional model to convert pixel-level observations into textual representations. The set of actions, denoted as $$\mathcal{A}$$, is typically delineated by high-level commands such as XML patterns or API calls, specifying how to engage with the environment. State-of-the-art (SOTA) LLMs surpass reinforcement learning (RL) agents in terms of both sample efficiency and adaptability to novel environments. This superiority stems from their pretraining on extensive corpora, endowing them with certain "reasoning" abilities that enable the formulation of step-by-step plans for interacting with the environment.


# Ultimate Goal

On personal computers, the majority of applications are navigated by users through a pixel-based UIs (as $$\mathcal{O}$$), alongside input devices such as keyboards and mice ($$\mathcal{A}$$).
The goal of this research is the development of an autonomous agent proficient in comprehending natural language instructions and effectively controlling the computer system akin to human interaction.
Specifically, the agent should utilize the pixel-level screen as its observation space $$\mathcal{O}$$ and the keyboard and mouse as its action space $$\mathcal{A}$$.
Using these interfaces, the agent should be able to execute a wide range of tasks on various (business) applications and not be limited to a few apps that provide specific interfaces (such as APIs, HTML source code, etc.).
This agent should possess the capability to interpret natural language instructions and execute tasks delineated by human operators.
Although this endeavor is more complex compared to using higher-level interfaces, it offers unparalleled versatility with potential applicability across diverse computing applications.

Current research focuses especially on creating policies $$\pi$$ that allows agents to act on limited observation spaces $$\mathcal{O}$$ such as HTML from web browsers, the view hierarchy from Android, etc.
Hence, SOTA models typically require textual descriptions of the user interface, which are for most applications not available.
Other approaches, claiming that they can work with pixel-based observations, are often pre-trained on screenshot to text translation, allowing to process text instead of pixel observations.
However, these applications typically do not scale well as the pre-training focuses on specific domains such as web browsers and does not consider, for example, older CRM systems.
Approaches that directly work with pixel-based observations are still in their infancy and perform surprisingly bad.

I argue that the missing ingredient for the success of computer control agents is the ability to understand UI elements and that it is key to derive actionable representations.
Having actionable representation allows a model to understand the consequences of actions, i.e., it can predict the next state of the environment given an action.
Such representations are fundamental for planning and reasoning, combining these with existing models would allow to act on various applications.


# Main Limitations


In the following, I outline the main limitations of current approaches.

## Predicting Actions from Pixel-Based Observations fails

Directly prediction actions from pixel-based observations is highly inefficient and does not work at all.
For example, for simple web-tasks, most SOTA approaches use more than 25k demonstrations per task (Humphreys et al. 2022), whereby the tasks are highly simplified (to a degree where they can be considered unrealistic).
Since we want to control the entire computer, the number of samples required would be enormous and we cannot ask users to execute simple tasks 25k times before we can reproduce them.
Also, the argument of Yann LeCun that building generative models for sensory inputs is often intractable is likely to hold here as well.


> "If your goal is to train a world model for recognition or planning, using pixel-level prediction is a terrible idea.
> Generation happens to work for text because text is discrete with a finite number of symbols.
> Dealing with uncertainty in the prediction is easy in such settings. Dealing with prediction uncertainty in high-dimension
> continuous sensory inputs is simply intractable. That's why generative models for sensory inputs are doomed to failure."
> 
> -- <cite>Yann LeCun</cite> ![Twitter](https://twitter.com/ylecun/status/1759486703696318935)
 
This does not mean that we cannot use pixel-based observations to predict actions.
However, we might need to incorporate constraints (restrict the latent space so that it becomes discrete and finite) to do so more efficiently.

### Symbolic Approach

From preliminary investigations, I believe that mapping UIs to hierarchical descriptions of its element and learning actions on this level is highly promising
This is also supported by other work (Ma, Tsao, and Shum 2022) arguing that predictions should be made in the latent space.
Hierarchical descriptions can be considered a much lower-dimensional space and allows to predict the consequences of actions in a more sample-efficient manner (towards the parsimony principle described by (Ma, Tsao, and Shum 2022)).
Furthermore, encoding a screenshot to a hierarchical description and predicting how an action will change this description fulfills the self-consistency principle described by (Ma, Tsao, and Shum 2022).
This approach is closely related to the homomorphic autoencoder described by (Keurti et al. 2023) who learns to perform action in a latent space.
Furthermore, having a hierarchical description of the UI allows to align the elements with language instructions.

### Two Binding Problems

I identify two types of binding problems that have to be solved: First, the binding between UI elements. Second,
the binding of pixels to UI elements.

The first binding problem is the problem of understanding how UI elements are related to each other.
This problem could be solved by learning a hierarchical description of the UI.
When we know which button and text belong together, we can derive the meaning behind the button.
This is a problem that is solved by humans instantly when looking at a UI as we have this understanding between relations.
Furthermore, the observation space becomes much smaller as we move from pixel-based observations to a hierarchical description of the UI.
I believe that these are the main reasons for the success of LLMs in computer control.

The second binding problem is the problem of understanding which pixel belongs to which UI element.
As outlined above, SOTA approaches require huge amounts of training data, e.g. 25k demonstrations for solving simple web tasks (Humphreys et al. 2022).
I believe that observing actions on pixel level is highly inefficient: There are countless ways how one can move the mouse to a button, on which pixel of the button is clicked, etc.
Other datasets provide actions as textual descriptions (e.g. button "xy" is clicked).
However, creating such annotations is costly.
Therefore, I argue that we should not only predict hierarchical descriptions of the UI but also the bounding boxes of the UI elements.
This allows to automatically convert humans actions conducted on pixel level into descriptive actions that can be linked to the hierarchical description of the UI.
So far, I am not aware of any work that predicts the bounding boxes of UI elements from pixel-based observations.

### (Weak) Evidence

It is evident that LLMs perform much better than RL agents for computer control.
Especially providing them HTML descriptions of the UI and actions allows LLMs to understand the structure of the UI.
I hypothesize that LLMs are more efficient because they are working on this symbolic level and providing HTML solves the aforementioned binding-problems.
When we only describe the UI elements without their relations, the LLMs are cannot perform well and there is a hughe drop in performance.
The same goes if they are provided with action detailed action trajectories instead of high-level actions (such as button was clicked).
This is weak evidence as it is only based on my observations and not on a systematic study.
However, it shows the importance of not just knowing the UI elements but also their relations.

### Current Models

There exist some research mapping screenshots to structured text.
However, these model perform surprisingly bad and completely fail to describe UIs on a meaningful level or to generalize.
It could be worth to investigate why these models fail and how they can be improved.


## Long-Sequence Planning

A lot of research is focusing on planning action sequences for computer control.
Thereby, mainly RL, LLMs, large language-vision models, and search algorithms are used.
This is a highly dynamic field with a lot of research output.
So far, I couldn't really identify a gap to contribute to this field without having the risk of being too slow and not able to compete with the current state of the art.
However, we could focus on other areas such as "unsupervised transfer-learning" to run these models on unseen applications as well.

## Human in the loop

Surprisingly little research is done on how to use humans in the loop despite it seems extremely important.
Current systems are optimized to execute actions and, thereby, focus on doing the best possible action for a given instruction.
However, in a real-world scenario, we humans tend to forget specifying things, make mistakes, etc.
If you have an assistant or employees, think about how often they ask back to you for clarification, confirmation, etc.
Imaging the following cases:

- You ask the agent to look up an article in SAP and print the price - When your description is not clear, the agent should ask for clarification.
- You ask the agent to delete an entry in SAP - The agent should ask for confirmation before deleting something.
- You ask the agent to create a new document in Word - Instead of just creating something as good as possible, there is a huge potential in asking a few questions back to improve the overall result. (E.g., for the task write a CV, every agents writes something that is typically untrue - it would be much better if he asks where you worked, your education, etc.)

I believe that solving these questions is highly important and that it is a highly under-researched field.
Some research, such as chain-of-thought reasoning, show that agents are well capable of identifying weaknesses in their action plans.
They try to address these weaknesses by asking questions to themselves.
However, as long as humans provide imperfect instructions, they will always have to ask back.
And since we humans almost always ask back to our superiors, showing that we are not able to provide the perfect instruction, I believe that this is a highly important field to research.
Furthermore, it would allow agents to learn much more about us, providing them additional knowledge that could be used in future tasks.


# Research Question

Based on these insights and the current state of the art, I believe that the following questions will be answered by others:

- How to use LLMs for computer control?
- How to use RL for computer control?

*Maybe, instead of LLMs, novel research will use hybrid vision-language models to control computers. However, the principle remains the same.*

I believe that others will not focus on the following question:
- How to control **various unknown** applications without expert demonstrations? (Most research focuses on specific applications such as web browsers, Android applications, or similar.)

Based on this insights, I identify three main research questions:

- How can we **derive actionable representations from pixel-based UI** observations to enable agents to control computers across diverse applications?
- How can we implement a **hierarchical planning** based on a high-level instruction and multiple low-level actions?
- How can we **integrate humans in the loop** to improve the overall result of the agent's actions?

The first question deals with the problem of understanding the UI screen and the consequences of actions.
These are considered rather understanding atomic elements (e.g., clicking button "xy" creates a new document).
As previously outlined, this task includes building hierarchical descriptions of UI elements to capture their relations.
The second question deals with the problem of breaking down a high-level instruction into multiple atomic elements (e.g. to write a letter: Open a new document, select font, ...).
This can be done, for example, by leveraging human demonstrations or allowing the agent to click around and observe the consequences of actions.

These questions include the following sub-questions:

- **Actionable representations**
  - How to identify actionable objects (unsupervised)? E.g., "where can I click and type?"
  - How to learn the consequences of actions (unsupervised)? E.g., "what happens if I click here?"
  - How to represent actionable objects in a way that is useful for planning and reasoning? E.g., "how to map a learned world model to instructions and reasoning?"
- **Hierarchical planning**
  - How to break down a high-level instruction into multiple atomic elements?
  - How to plan and reason based on a high-level instruction and multiple low-level actions?
  - How to align language instructions with actions?
- **Human in the loop**
  - How can we decide if an agent should ask for confirmation, clarification, etc.?
  - How can feedback be integrated into the agent's planning process?
  - How can we leverage learned feedback in future tasks?


# Research Plan

## Stage 1: Survey of Existing Work

We will conduct a comprehensive survey of existing work in computer control.

- **Outcome**: An Overview of existing approaches, providing insights into the strengths and limitations of current methodologies and hopefully showing where and how to contribute.
- **Goal**: There is no survey in this fast growing field. I want to aim for a top journal such as Artificial Intelligence Review: It will require more effort but experience from our institute (Jan) shows that it is doable and has the chance to become a highly cited paper.

## Stage 2

Subsequently to the survey, there exist various directions to proceed.
My current impression is as follows: 

- There exist only two works on building proper hierarchical representations of UIs from pixel-based observations which both perform surprisingly bad.
Focusing on this direction seems to be promising and can be combined with existing planning approaches, allowing to advance the SOTA on various applications.
Furthermore, we can investigate how it can scale to new, unseen applications.
- The hierarchical planning for computer control is such a hot research topic that it is hard to compete and others are working on this question. If we want to proceed in this direction, we should focus on transferring knowledge to new applications or learning more efficient from human demonstrations (so that it scales to new applications). However, scientifically, this is a very hard field, as many groups with a lot of resources are working on this question.
- The human in the loop question is highly under-researched and seems to be a promising field to contribute to. It is also a highly important field to research as it is highly relevant for real-world applications.

From a research perspective, I believe that the first and third question are the most promising to contribute to.
They will both have an big impact on the field and are highly under-researched.
I see solving question 1 as the most fundamental one to get the system running and question 3 as the low hanging fruit that can lead to a solid publication with reasonable effort.
Therefore, it might be beneficial to work on both questions in parallel.

### Question 1: Actionable Representations

I plan in the following steps:

1. Analyze existing work
2. Define a structured symbolic language to represent UI elements
3. Develop a simple generator that can produce such UI's in a pre-defined style
4. Train a model to predict the UI elements and their relations -> Publication 1
5. Combine the generator with a "style-model", a model that is trained in a GAN-style to make the rendered UI look like a real UI from a business application -> Publication 2 (most GANs focus on UI generation and not on code that is rendered to generate a UI)
6. After having a generator that can produce UIs matching the style of business applications, we can train a model to work on various applications -> Publication 3 (due to limited resources, we might not get it to scale to a production-level application but we should be able to show that it works in principle)

### Question 3: Human in the Loop

1. Analyze existing work
2. Develop a simple dataset/environment (e.g., an existing one and remove some information) where the agent has to ask for clarification, confirmation, etc.
3. Develop a baseline model that can ask for clarification, confirmation, etc.
4. Combine this baseline model with existing computer control models and show that it improves the overall result
5. Improve iteratively until publishable -> Publication


# Other Research Questions

Most of the current research is about pushing the scores on a few existing benchmarks.
The knowledge is typically derived from predicting HTML from screenshots and/or interacting with a virtual environment.
However, from a research viewpoint, computers provide a highly interesting environment to study intelligence.

- UI elements are easier to identify than objects in the real world: They have some uniform appearance and a high contrast to other elements, allowing to seperate them well from the background
- UIs are highly structured: They contain multiple windows, and windows contain multiple sub-windows. Each element is related to other elements (e.g., checkboxes to a text, multiple checkboxes to a description what they are doing, etc.)

Therefore, analyzing the binding problem and Gestalt phenomena seems to be easier in this environment than in the real world.

# Link to Natural Intelligence and Benjamin's group

Humans have internal models of the  external world that represents all behavior-relevant information. These models are acquired by interacting with the world and are used to predict the consequences of actions.
Neuroscientific findings suggest that humans, when acting, integrate efference copies of motor signals with incoming sensory observations to predict future sensory inputs (Keller et al., 2012).
Hypotheses in psychology (Piaget, 1964) suggest that perceiving an object is not creating a mental copy of it but rather understanding of how this object behaves under different interventions.

Existing research in computer vision uses these insights and focuses on building actionable representations for objects within 3D worlds (Keurti et al. 2023).
This work encodes images and actions to embeddings and builds consistency between transformed images in the image space and latent space.
The principle is highly similar to the proposed approach: For a computer agent, we first transform the high-dimensional UI to a lower-dimensional hierarchical description and predict action consequences in this space.

Current (unpublished) work of INI UZH/ETH focuses on learning relation between objects.
Again, this is highly similar as we build representations of UI elements using a hierarchical description of the UI that captures these relationships.


# References

- Cheng, Kanzhi, Qiushi Sun, Yougang Chu, Fangzhi Xu, Yantao Li, Jianbing Zhang, and Zhiyong Wu. 2024. “SeeClick: Harnessing GUI Grounding for Advanced Visual GUI Agents.” arXiv. http://arxiv.org/abs/2401.10935.
- Humphreys, Peter C, David Raposo, Tobias Pohlen, Gregory Thornton, Rachita Chhaparia, Alistair Muldal, Josh Abramson, Petko Georgiev, Adam Santoro, and Timothy Lillicrap. 2022. “A Data-Driven Approach for Learning to Control Computers.” In Proceedings of the 39th International Conference on Machine Learning, edited by Kamalika Chaudhuri, Stefanie Jegelka, Le Song, Csaba Szepesvari, Gang Niu, and Sivan Sabato, 162:9466–82. Proceedings of Machine Learning Research. PMLR. https://proceedings.mlr.press/v162/humphreys22a.html.
- Keller, Georg B., Tobias Bonhoeffer, and Mark Hübener. 2012. “Sensorimotor Mismatch Signals in Primary Visual Cortex of the Behaving Mouse.” Neuron 74 (5): 809–15. https://doi.org/10.1016/j.neuron.2012.03.040.
- Keurti, Hamza, Hsiao-Ru Pan, Michel Besserve, Benjamin F Grewe, and Bernhard Schölkopf. 2023. “Homomorphism AutoEncoder – Learning Group Structured Representations from Observed Transitions.” In Proceedings of the 40th International Conference on Machine Learning, 202:16190–215.
- LeCun, Yann. 2022. “A Path Towards Autonomous Machine Intelligence.” Open Review 62 (June).
- Ma, Yi, Doris Tsao, and Heung-Yeung Shum. 2022. “On the Principles of Parsimony and Self-Consistency for the Emergence of Intelligence.” Frontiers of Information Technology & Electronic Engineering 23 (9): 1298–1323. https://doi.org/10.1631/FITEE.2200297.
- Piaget, Jean. 1964. “Cognitive Development in Children: Piaget Development and Learning.” Journal of Research in Science Teaching 2 (3): 176–86. https://doi.org/10.1002/tea.3660020306.
- Shaw, Peter, Mandar Joshi, James Cohan, Jonathan Berant, Panupong Pasupat, Hexiang Hu, Urvashi Khandelwal, Kenton Lee, and Kristina Toutanova. 2023. “From Pixels to UI Actions: Learning to Follow Instructions via Graphical User Interfaces.” arXiv. http://arxiv.org/abs/2306.00245.



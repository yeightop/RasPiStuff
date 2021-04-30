# SICTC So you like Computer Science?
Hello, my name is John Cobb and I am a Technology Entrepreneur. I've been developing technology for over 20 years and have come up with some core principles that every future developer should understand. The curriculum outlines what I expect of my interns and senior level engineers that are working on new and exciting innovations to the industries we serve. The examples in this curriculum focus primarily on Web/API/UX/Database but all skills and mindset here are designed to prepare, encourage, stretch, and grow any engineer.

## Topics
 - Bash
    - What is it?
    - Basic Commands
    - Permissions
    - Tools
 - Agile
    - What is agile
    - Experiments/Prototyping/Feedback loops
    - Pivot
 - Scrum
    - Daily Standup
    - Status Report
    - Blockers
    - Collective Conscience
    - Moving forward
 - Sprint (2 weeks)
    - Pipelining
    - Testing
    - CI/CD/CD
 - Task Management
    - Epochs
    - Storys
    - Tasks
 - Developer Producivity
    - Flow/Locked in
    - Max productivity 3 hours
    - Uninteruppted workflow
    - Taking brakes/Diffuse mode of brain solves problems
 - Good to great
    - Develop software as if the environment is shrinking
      - Do not use a byte when a bit will do
      - Compress data
      - Optimize data calls
      - Protocol Optimization for non essential udates TCP vs UDP broadcast
    - Press the decimal
    - Better version of self everyday
    - Challenge yourself
    - Google Fu
    - Fail Fast Learn Fast
    - Simplify
    - Slow down to speed up
    - Normalization of deviation

 - Stretch topics to discuss
    - GAN (Generative Adverserial Nerual Networks)
    - Norrow Domain Intelligence (AI) vs General Level Intelligence (AI)
    - Convolutional Neural Networks
    - Machine Learning


## Skills
 - Git
    - What is Git
    - DevOps Flow
        - Epoch/Story/Tasks
        - Bug Management/Priority
    - Sprints
        - Daily Standup
        - Blockers
    - Testing
        - Scope Management
        - Automated Testing
        - Design for test
        - Impact on automated pipelining
        - User Acceptance
    - Markdown
        - README
            - Project Narrative
            - Detailed Explanation
            - Tutorial Mindset
        - Developer Resume (landing page)
- Web Development
    - HTTP/TCP-IP
        - Browser/Server/Communication
        - Mobile Device/Server/Communication
    - REST API
        - Language Choice
            - Javascript (Node)
            - Python
            - C#
        - Framework vs Language
            - Angular vs React vs Flask
        - GET POST PUT PATCH DELETE
        - When to use which
        - Secure vs Nonsecure
            - JWT
        - Routes
            - Secure vs Unsecure
        - Optimization
            - Compression
            - Dataset Reduction/Data Dictionary
                - Protobuf
- Database
    - NoSQL
        - MongoDB
    - RDBMS
        - MySQL MSSQL Postgres Oracle
        - Tables
            - Rows Columns
            - Id Columns
            - Constraints
                - Two camps
                    - Application Level
                    - Database Level
        - Query
            - SELECT INSERT UPDATE DELETE
        - Relational Database Design
            - Benefits
                - Easier to maintain
                - Leveraging Modern Languages
                    - MVC/MVVM Patterns
            - Normalization
                - 1-1/1-n/n-n
            - Less is more
- Infrastructure Management
    - Amazon/Azure/Rackspace
        - Develop for chosen platform not where the future "might" go
    - Scaling
    - Deploying
    - DevOps Flow
    - Stack/Growth/Optimization
        - Autoscaling
        - Queues
            - When to leverage



## Research Topics

### Computer Architecture (Dependency Graphs)
Humans think in serial narrative. For example, we read books by chapters/pages/paragraphs etc. This ordred sequence is known as a serial narrative. Dependency graphs can constructed to determine which paragraphs/sentences/words can be reordered without changing the meaning. A computer's processor builds dependency graphs to determine task execution order and optimization. TODO: (research last sentence)


### Notes from Jim Keller Moore's Law, Microprocessors, Abstractions and First Principles
The following are notes from Lex Fridman's interview with Jim Keller:

Basic computer instructions:
load/store/multiply/add/subtract/conidtional branch
90% of all execution is 25 instructions or opcodes

Modern computers load 500 instructions and calculate a dependency graph between instructions then execute them in independent units called micrographs.

Given vs found parallelism
GPU vs Processor

Given Parallelism - TODO:

Found Parallelism - narrative is sequential and you find large pockets of parallelism
Example: Fetch 10 instructions at a time, calculate dependency between them, describe dependencies

CPI - Cycles Per Instruction
Approximately 10x parallelism is found in modern processors

To do this will processors have to do two things:
Find parallelism in narrative
Predictability of the narrative
export type Subject = {
    id: string;
    name: string;
    description: string;
    icon: string;
    chapters: Chapter[];
};

export type Chapter = {
    id: string;
    title: string;
    topicCount: number;
};

// Based on RefinedSyllabus files:
// 1. ai_trends_syllabus.md
// 2. da_syllabus.md
// 3. dnn_syllabus.md
// 4. fai_syllabus.md
// 5. java_syllabus.md
// 6. math_ai_syllabus.md
// 7. nlp_cv_syllabus.md
// 8. pml_syllabus.md
// 9. python_syllabus.md

export const SUBJECTS: Subject[] = [
    {
        id: "python_syllabus",
        name: "Python Programming",
        description: "Master Python from basics to advanced OOP and Data Science libraries.",
        icon: "🐍",
        chapters: [
            { id: "ch1", title: "Chapter 1: Introduction and Control Flow", topicCount: 10 },
            { id: "ch2", title: "Chapter 2: Strings and Tuples", topicCount: 8 },
            { id: "ch3", title: "Chapter 3: Data Structures (Lists & Dictionaries)", topicCount: 12 },
            { id: "ch4", title: "Chapter 4: Functions, Methods, and Regex", topicCount: 9 },
            { id: "ch5", title: "Chapter 5: Object Oriented Programming", topicCount: 7 },
            { id: "ch6", title: "Chapter 6: Exception Handling and Debugging", topicCount: 5 },
            { id: "ch7", title: "Chapter 7: Data Science Libraries", topicCount: 8 },
            { id: "ch8", title: "Chapter 8: Database and Web Development", topicCount: 6 },
        ]
    },
    {
        id: "java_syllabus",
        name: "Java Programming",
        description: "Core Java concepts, OOPs, Streams, and Frameworks.",
        icon: "☕",
        chapters: [
            { id: "ch1", title: "Chapter 1: Java Fundamentals", topicCount: 6 },
            { id: "ch2", title: "Chapter 2: Object Oriented Programming", topicCount: 8 },
            { id: "ch3", title: "Chapter 3: Exception Handling", topicCount: 5 },
            { id: "ch4", title: "Chapter 4: Advanced Java Features", topicCount: 7 },
            { id: "ch5", title: "Chapter 5: Concurrency", topicCount: 4 },
            { id: "ch6", title: "Chapter 6: Reflection and Frameworks", topicCount: 5 },
        ]
    },
    {
        id: "ai_trends_syllabus",
        name: "AI Trends & Compute Platforms",
        description: "Spark, Kafka, DevOps, Docker, Kubernetes, and Cloud Computing.",
        icon: "🚀",
        chapters: [
            { id: "ch1", title: "Chapter 1: Big Data Processing with PySpark", topicCount: 8 },
            { id: "ch2", title: "Chapter 2: Real-time Data Streaming", topicCount: 5 },
            { id: "ch3", title: "Chapter 3: DevOps for AI/ML", topicCount: 6 },
            { id: "ch4", title: "Chapter 4: Containerization and Orchestration", topicCount: 7 },
            { id: "ch5", title: "Chapter 5: Cloud Computing", topicCount: 6 },
        ]
    },
    {
        id: "da_syllabus",
        name: "Data Analytics",
        description: "Statistics, Probability, Hypothesis Testing, and Predictive Modelling.",
        icon: "📊",
        chapters: [
            { id: "ch1", title: "Chapter 1: Introduction to Data Analytics", topicCount: 5 },
            { id: "ch2", title: "Chapter 2: Descriptive Statistics", topicCount: 6 },
            { id: "ch3", title: "Chapter 3: Probability and Sampling", topicCount: 8 },
            { id: "ch4", title: "Chapter 4: Correlation and Estimation", topicCount: 5 },
            { id: "ch5", title: "Chapter 5: Predictive Modelling", topicCount: 7 },
            { id: "ch6", title: "Chapter 6: Advanced Analytics", topicCount: 6 },
            { id: "ch7", title: "Chapter 7: Advanced Concepts", topicCount: 4 },
        ]
    },
    {
        id: "dnn_syllabus",
        name: "Deep Neural Networks",
        description: "Neural Networks, CNNs, RNNs, GANs, and Optimization.",
        icon: "🧠",
        chapters: [
            { id: "ch1", title: "Chapter 1: Introduction to Neural Networks", topicCount: 7 },
            { id: "ch2", title: "Chapter 2: Deep Learning Frameworks", topicCount: 5 },
            { id: "ch3", title: "Chapter 3: Shallow vs Deep Networks", topicCount: 8 },
            { id: "ch4", title: "Chapter 4: Training Challenges", topicCount: 6 },
            { id: "ch5", title: "Chapter 5: Convolutional Neural Networks (CNN)", topicCount: 8 },
            { id: "ch6", title: "Chapter 6: Sequence Models (RNN)", topicCount: 6 },
            { id: "ch7", title: "Chapter 7: Advanced Deep Learning", topicCount: 7 },
        ]
    },
    {
        id: "fai_syllabus",
        name: "Foundations of AI",
        description: "AI History, Ethics, Search Algorithms, and Logic.",
        icon: "🏛️",
        chapters: [
            { id: "ch1", title: "Chapter 1: Introduction to AI", topicCount: 5 },
            { id: "ch2", title: "Chapter 2: AI Ethics and Trends", topicCount: 6 },
            { id: "ch3", title: "Chapter 3: Learning and Expert Systems", topicCount: 4 },
            { id: "ch4", title: "Chapter 4: Search Methodologies", topicCount: 8 },
            { id: "ch5", title: "Chapter 5: Knowledge Representation and Logic", topicCount: 7 },
            { id: "ch6", title: "Chapter 6: Big Data in AI", topicCount: 5 },
        ]
    },
    {
        id: "math_ai_syllabus",
        name: "Mathematics for AI",
        description: "Linear Algebra, Calculus, and Optimization.",
        icon: "📐",
        chapters: [
            { id: "ch1", title: "Chapter 1: Linear Algebra - Vectors", topicCount: 6 },
            { id: "ch2", title: "Chapter 2: Linear Algebra - Matrices", topicCount: 8 },
            { id: "ch3", title: "Chapter 3: Calculus", topicCount: 7 },
            { id: "ch4", title: "Chapter 4: Optimization", topicCount: 6 },
        ]
    },
    {
        id: "nlp_cv_syllabus",
        name: "NLP & Computer Vision",
        description: "Linguistics, Transformers, BERT, CNNs, and Object Detection.",
        icon: "👁️",
        chapters: [
            { id: "ch1", title: "Chapter 1: Natural Language Processing Basics", topicCount: 6 },
            { id: "ch2", title: "Chapter 2: Parsing and Statistical NLP", topicCount: 6 },
            { id: "ch3", title: "Chapter 3: Deep Learning for NLP", topicCount: 8 },
            { id: "ch4", title: "Chapter 4: Speech Processing", topicCount: 5 },
            { id: "ch5", title: "Chapter 5: Computer Vision Basics", topicCount: 5 },
            { id: "ch6", title: "Chapter 6: Deep Learning for Vision", topicCount: 7 },
        ]
    },
    {
        id: "pml_syllabus",
        name: "Practical Machine Learning",
        description: "Regression, Classification, Clustering, and Time Series.",
        icon: "🤖",
        chapters: [
            { id: "ch1", title: "Chapter 1: Machine Learning Basics", topicCount: 5 },
            { id: "ch2", title: "Chapter 2: Clustering", topicCount: 6 },
            { id: "ch3", title: "Chapter 3: Regression Algorithms", topicCount: 6 },
            { id: "ch4", title: "Chapter 4: Classification Algorithms", topicCount: 6 },
            { id: "ch5", title: "Chapter 5: Ensemble Methods", topicCount: 5 },
            { id: "ch6", title: "Chapter 6: Time Series Analysis", topicCount: 5 },
            { id: "ch7", title: "Chapter 7: Advanced Systems", topicCount: 5 },
        ]
    }
];

export type Question = {
    id: string;
    text: string;
    options: { id: string; text: string }[];
    correctOptionId: string;
    hint: string;
    explanation: string;
};

// Default questions for "Python" specifically
export const MOCK_QUESTIONS_PYTHON: Question[] = [
    {
        id: "q_py_1",
        text: "Which keyword is used to start a function definition in Python?",
        options: [
            { id: "a", text: "function" },
            { id: "b", text: "def" },
            { id: "c", text: "fun" },
            { id: "d", text: "define" },
        ],
        correctOptionId: "b",
        hint: "It's a three-letter word short for 'define'.",
        explanation: "In Python, the 'def' keyword is used to define functions. For example: def my_function(): pass"
    },
    {
        id: "q_py_2",
        text: "What data type is the result of: 3 / 2 in Python 3?",
        options: [
            { id: "a", text: "Integer (1)" },
            { id: "b", text: "Float (1.5)" },
            { id: "c", text: "String ('1.5')" },
            { id: "d", text: "Decimal" },
        ],
        correctOptionId: "b",
        hint: "Python 3's division operator always returns a floating-point number.",
        explanation: "In Python 3, the single slash operator (/) always performs true division and returns a float, even if the result is a whole number. 3/2 results in 1.5."
    }
];

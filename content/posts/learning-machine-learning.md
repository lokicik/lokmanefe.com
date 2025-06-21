---
title: "My Journey Learning Machine Learning"
date: "2024-01-20"
excerpt: "Reflections on my first year diving into AI and machine learning, from CNN projects to Kaggle competitions."
published: true
tags: ["machine-learning", "ai", "kaggle", "learning"]
relatedBooks: ["foundation", "sapiens"]
---

## My colourful section

Here is a <span style="color:#e11d48;">red highlight</span> and a normal link to [Next.js](https://nextjs.org).

![Northern Lights](https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200)

# My Journey Learning Machine Learning

It's been almost a year since I started my journey into artificial intelligence and machine learning, and what a ride it's been! I wanted to share some reflections on the experience and what I've learned so far.

## Starting from Zero

When I first started, terms like "CNN," "gradient descent," and "overfitting" were completely foreign to me. I remember struggling with basic concepts like understanding the difference between supervised and unsupervised learning.

## My First Projects

### Dog vs Cat Classification

My first serious ML project was building a CNN to classify images of dogs and cats. It sounds simple now, but at the time, getting TensorFlow to work and understanding how convolutional layers processed images felt like magic.

```python
# My first CNN model (simplified)
model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(150, 150, 3)),
    MaxPooling2D(2, 2),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D(2, 2),
    Flatten(),
    Dense(512, activation='relu'),
    Dense(1, activation='sigmoid')
])
```

### Moving to Ensemble Methods

Later, I worked on a drinking/smoking prediction project using ensemble learning with LGBM, XGBoost, and Random Forest. This taught me that sometimes combining simpler models can outperform complex ones.

## Kaggle Competitions

Participating in Kaggle competitions has been incredibly educational:

- **Datathon 2023**: Ranked 113/255 - Not amazing, but my first taste of competitive ML
- **DTC Zoomcamp Q&A Challenge**: Ranked 21/54 - Much better!

The key lesson? Feature engineering often matters more than fancy algorithms.

## What I've Learned

### Technical Skills

- **Deep Learning**: CNNs for image classification
- **Traditional ML**: Random Forest, XGBoost, LGBM
- **Tools**: Python, TensorFlow, scikit-learn, pandas
- **Deployment**: Basic model serving and APIs

### Soft Skills

- **Problem-solving**: Breaking down complex problems into manageable pieces
- **Research**: Reading papers and implementing techniques
- **Patience**: ML projects take time, and debugging is part of the process

## Current Focus

Right now, I'm particularly interested in:

- **Hardware acceleration**: Learning about custom ASIC and FPGA design for LLMs
- **Production ML**: How to deploy and maintain models in real-world applications
- **Computer vision**: Exploring more advanced CV techniques

## Advice for Beginners

1. **Start with projects, not just theory** - Build something, even if it's simple
2. **Join communities** - Kaggle, Discord servers, university clubs
3. **Don't get overwhelmed** - The field is huge, focus on one area at a time
4. **Practice regularly** - Consistency beats intensity

## What's Next?

I'm planning to dive deeper into:

- Advanced computer vision techniques
- MLOps and model deployment
- Contributing to open-source ML projects
- Maybe starting a YouTube channel to share what I learn?

The journey is far from over, but I'm excited about where it's leading!

---

_What's your ML journey been like? Feel free to reach out and share your experiences!_

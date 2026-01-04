---
title: "Syntax Highlighting Test"
date: "2024-01-15"
excerpt: "Testing VSCode-quality syntax highlighting with multiple languages"
description: "A test article to verify Shiki syntax highlighting works correctly"
published: true
tags: ["test", "code", "development"]
---

# Syntax Highlighting Test

Let's test the new VSCode-quality syntax highlighting with various languages!

## JavaScript

```javascript
// Complex JavaScript example
const greeting = (name) => {
  return `Hello, ${name}!`;
};

class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  async fetchData() {
    const response = await fetch('/api/user');
    return response.json();
  }
}

const user = new User('John', 30);
console.log(greeting(user.name));
```

## TypeScript

```typescript
interface Person {
  name: string;
  age: number;
  email?: string;
}

function greet(person: Person): string {
  return `Hello, ${person.name}! You are ${person.age} years old.`;
}

const john: Person = {
  name: 'John Doe',
  age: 30
};

console.log(greet(john));
```

## Python

```python
# Python example with classes and decorators
from typing import List, Optional
import asyncio

class DataProcessor:
    def __init__(self, data: List[str]):
        self.data = data
    
    @staticmethod
    def clean_text(text: str) -> str:
        return text.strip().lower()
    
    async def process(self) -> List[str]:
        return [self.clean_text(item) for item in self.data]

# Usage
processor = DataProcessor(['  Hello  ', 'WORLD'])
result = asyncio.run(processor.process())
print(result)  # ['hello', 'world']
```

## CSS

```css
/* Modern CSS with variables and nesting */
:root {
  --primary-color: #3b82f6;
  --spacing: 1rem;
}

.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing);
  
  &:hover {
    transform: scale(1.02);
    transition: transform 0.3s ease;
  }
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }
}
```

## JSON

```json
{
  "name": "example-project",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  },
  "dependencies": {
    "react": "^18.2.0",
    "next": "^14.0.0"
  }
}
```

## Bash

```bash
#!/bin/bash

# Setup script
echo "Setting up project..."

if [ -d "node_modules" ]; then
  echo "Dependencies already installed"
else
  npm install
fi

npm run build
echo "Build complete!"
```

## Inline Code

Here's some inline code: `const x = 42;` and more text. The inline code should look different from code blocks.

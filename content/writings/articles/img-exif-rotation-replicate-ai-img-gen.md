---
title: "When Replicate Decided My Image Needed a Yoga Pose"
date: "2025-10-15"
excerpt: "Everything worked fine until demo day, when Replicate decided to rotate my generated images by 90 degrees. Here's what caused it."
published: true
tags: ["replicate", "qwen", "image-editing", "exif", "debugging"]
---

This week my university hosted **Club Fair**, and I built three small apps to demo at our booth.  
One of them was simple but fun:

Someone takes a photo → it instantly appears on the dashboard → the operator types a prompt → that image and prompt go to the **Replicate API** → the **`bytedance/seedream-4`** or **`qwen/qwen-image-edit-plus`** model edits the image → and the result pops up live in a bento styled way on the big TV screen.

Everything worked perfectly during my tests.  
Until demo day.

---

## The 90° Surprise

A new photo came in, from a different device, and suddenly, every generated image on the TV was rotated 90 degrees.  
Portraits turned sideways. Landscapes stood on their heads. My booth looked like a modern art installation.

I tried everything: changing the resolution, uploading new photos, even restarting the whole pipeline.  
Nothing helped.  
And the strangest part? It had worked fine before with both iOS and Android devices.

![img-1](/posts/img-exif-rotation-replicate-ai-img-gen/img-1.webp)
---

## The Hidden Culprit: EXIF Orientation

After a bit of digging, I realized the issue wasn’t Replicate’s fault at all, it was **EXIF metadata**.

Most JPEG photos (especially those taken on phones) include hidden EXIF data.  
One of those fields is called `Orientation`, and it tells image viewers, *“Hey, this photo is actually sideways, please rotate it when displaying.”*

Image models like `qwen/qwen-image-edit-plus` or `bytedance/seedream-4` usually **ignore** this metadata.  
So the model sees the raw pixels (which are technically sideways), edits them faithfully, and returns a sideways masterpiece.  
Meanwhile, we humans only see the corrected preview our phones show us, until the AI exposes the truth.

---

## The Fix

Once I understood that, the solution was almost annoyingly simple.  
I just needed to “normalize” my input images before sending them to Replicate. 

Basically, apply the EXIF rotation manually and save the corrected file.

Here is an example Python code snippet:

```python
from PIL import Image, ImageOps

img = Image.open("input.jpg")
img = ImageOps.exif_transpose(img)
img.save("input_fixed.jpg")
````

That one line (`ImageOps.exif_transpose(img)`) takes the orientation info, applies the rotation, and clears the EXIF tag.
Now the image is stored in its correct position, and the model sees it exactly as intended.

Problem gone. Booth saved. TV upright again.

---

## Why It Happens

When an image viewer displays a photo, it quietly reads the EXIF data and rotates it for you.
When a machine learning model reads a photo, it doesn’t, it only sees pixels.
If those pixels are “physically” sideways, that’s what it learns from and generates.

The fix just makes sure both you and the model are looking at the same reality.

---

## TL;DR

Your photos aren’t broken, your **EXIF metadata** is.
AI models don’t read it.
Rotate your images manually before uploading:

```python
img = ImageOps.exif_transpose(img)
```

and you’ll never again have to watch your outputs strike yoga poses on demo day.

---

### Bonus Tip

If you always upload **PNG** instead of **JPEG**, this problem vanishes.
PNGs don’t carry EXIF orientation data, so what you see is what the model gets.

---

## Closing Thought

Debugging image pipelines teaches a strange kind of humility.
Sometimes the most complex part of your AI workflow isn’t the model or the API,
it’s a tiny invisible tag hiding in your photo saying, *“Rotate me, please.”*

If you ever find your AI outputs sideways, don’t panic.
It’s not a bug, it’s just a reminder that even pixels have opinions about which way is up.


---
title: "Adding custom domain for emails on Firebase using Squarespace"
date: "2025-10-05"
excerpt: "Squarespace loves to help by appending your domain twice, and Firebase hates that. Here's how I finally got my email domain verified after 48 hours of head-scratching."
published: true
tags: ["firebase", "squarespace", "dns", "email", "debugging"]
---

I tried connecting my Squarespace domain to Firebase so my emails would look a little less suspicious.  
Two days later Firebase still said **“Verification failed.”**

No errors. No guidance.

---

## The Setup

Firebase asks for a few DNS records to prove you own your domain.  
Simple enough.

| Domain | Type | Value |
|---------|------|--------|
| `mydomain.com` | TXT | `v=spf1 include:_spf.firebasemail.com ~all` |
| `mydomain.com` | TXT | `firebase=my-backend` |
| `firebase1._domainkey.mydomain.com` | CNAME | `mail-mydomain-com.dkim1._domainkey.firebasemail.com.` |
| `firebase2._domainkey.mydomain.com` | CNAME | `mail-mydomain-com.dkim2._domainkey.firebasemail.com.` |

I added them exactly as shown in Squarespace and waited for 2 days.  
Nothing happened.  

---

## Where It Goes Wrong

Squarespace tries to be helpful. It automatically appends your root domain to every record.  

So when you type:

```bash
firebase1._domainkey.mydomain.com
```

Squarespace secretly changes it to:

```bash
firebase1._domainkey.mydomain.com.mydomain.com
```

It looks fine in the panel but it breaks Firebase’s verification completely.

---

## The Fix

Remove the redundant part. Only keep the subdomain.

| Host | Type | Value |
|------|------|--------|
| `firebase1._domainkey` | CNAME | `mail-mydomain-com.dkim1._domainkey.firebasemail.com` |
| `firebase2._domainkey` | CNAME | `mail-mydomain-com.dkim2._domainkey.firebasemail.com` |
| `@` | TXT | `v=spf1 include:_spf.firebasemail.com ~all` |
| `@` | TXT | `firebase=my-backend` |

I saved the records, hit verify again, and it worked in seconds.  
After waiting two days that felt almost offensive.

---

## Why It Happens

Firebase checks your DNS for exact record matches.  
Squarespace assumes you want it to finish your sentences.  

So Firebase looks for  
```bash
firebase1._domainkey.mydomain.com 
```
but finds  
```bash
firebase1._domainkey.mydomain.com.mydomain.com  
```
and refuses to verify.

---

## Sanity Check

If you want to confirm your records are live, run:

```bash
dig CNAME firebase1._domainkey.mydomain.com
dig TXT mydomain.com
```

If you see Firebase’s values, you’re good.  
If not, wait a bit or try again later.

---

## TL;DR

Squarespace adds your domain twice.  
Firebase doesn’t like that.  
Remove the duplicate part, verify instantly, move on with your life.

---

### Side Quest

If nothing works, use a subdomain like 
```bash
mail.mydomain.com
```
instead.  
Firebase is fine with that as long as it resolves.

---

## Closing Thought

Squarespace isn’t the villain. It just tries too hard to help.  
Once you know this trick, domain verification goes from two days of guessing to one minute of relief.  

If you found this post while pacing around your Firebase console, I’ve been there. You’re not alone.
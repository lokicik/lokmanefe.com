---
title: "WhatsApp Desktop Slow on Windows 11? What to Check First"
date: "2026-09-24"
excerpt: "If WhatsApp Desktop is slow or lagging on Windows 11, separate connection delays from app lag, then check updates, resource use, Repair, and Efficiency Mode."
published: true
tags: ["windows-11", "whatsapp", "performance", "efficiency-mode"]
---

If WhatsApp Desktop feels slow on Windows 11, first pin down **what is actually slow**. Messages or media taking a long time to send may point to a connection problem. A window that takes ages to open, stutters while scrolling, or freezes when switching chats points you toward the app or the PC. The two symptoms need different checks.

On my PC, I saw Windows Task Manager's green **Efficiency Mode** leaf beside WhatsApp processes. I did not measure whether that caused WhatsApp to lag, and I have not verified a safe, persistent WhatsApp-specific rule to turn it off. Here is how I would narrow the problem down before changing process settings.

## Slow messages or downloads? Check the connection

Try the same action in [WhatsApp Web](https://web.whatsapp.com/). If messages and media are delayed there too, check the connection status and try another network. [WhatsApp's connection guide](https://faq.whatsapp.com/852892549070029/?cms_platform=web&helpref=hc_fnav) identifies poor connectivity as a common cause of slow sending and downloading.

If WhatsApp Web feels responsive but the Windows app does not, move on to the app checks below. This comparison is a clue, not a conclusive diagnosis.

## WhatsApp's Windows app lagging? Try these checks

1. **Check for app updates.** If you installed WhatsApp from the Microsoft Store, open the Store and check for updates. [Microsoft explains how](https://support.microsoft.com/en-us/accounts-billing/get-updates-for-apps-and-games-in-microsoft-store).
2. **Watch what happens during the lag.** Open Task Manager with `Ctrl + Shift + Esc`, expand WhatsApp under **Processes**, and watch CPU and memory use while you reproduce the slowdown. Note which process, if any, has the green leaf. If other apps stutter at the same time, the slowdown may not be specific to WhatsApp.
3. **Try Repair if it is available.** In Windows 11, go to **Settings → Apps → Installed apps → WhatsApp → Advanced options → Repair**. [Microsoft documents the Repair option](https://support.microsoft.com/en-us/windows/apps/repair-apps-and-programs-in-windows). **Reset** is a separate action that can affect app data and your sign-in, so check its consequences before using it.

## Could Windows 11 Efficiency Mode be the cause?

The leaf tells you a process is in Efficiency Mode. It does **not**, by itself, prove why WhatsApp is slow. A useful test is to repeat the same action while the leaf is present and while it is absent, then compare the behavior. I have not recorded that test for WhatsApp.

In my [Process Lasso experiment with ChatGPT and Claude](/writing/windows-11-efficiency-mode-process-lasso), an **Efficiency Mode → Always → Off** rule persisted when I reopened those apps. I also tried a broad rule for `msedgewebview2.exe` while looking at WhatsApp, but I cannot recommend it as a WhatsApp fix. [Microsoft notes that other apps use WebView2 too](https://learn.microsoft.com/en-us/microsoft-edge/webview2/concepts/end-user-faq); a rule matching every process with that name may affect them as well.

If you see the leaf beside WhatsApp, identify the exact child process before changing a persistent rule. If you cannot distinguish it from other apps' WebView2 processes, avoid an `msedgewebview2.exe`-wide rule. I have not confirmed that a narrower rule fixes WhatsApp lag.

**Start with the symptom:** connection checks for delayed messages and media; updates, resource use, and Repair for a sluggish desktop app. Treat Efficiency Mode as something to investigate, not a proven speed fix.

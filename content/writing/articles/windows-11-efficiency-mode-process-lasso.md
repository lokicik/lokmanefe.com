---
title: "Windows 11 Efficiency Mode: Turn It Off with Process Lasso"
date: "2026-09-23"
lastModified: "2026-10-01"
excerpt: "Turn off Windows 11 Efficiency Mode with Process Lasso. WhatsApp Desktop slow or lagging? Try connection checks, app updates and Repair."
published: true
tags: ["windows-11", "efficiency-mode", "process-lasso", "chatgpt", "claude", "whatsapp"]
---

Windows 11 Efficiency Mode kept coming back for my chat apps. I could turn it off in Task Manager, but after closing and reopening ChatGPT or Claude, the green leaf could return.

**With Process Lasso running, the programs I add to its Always Off rules reopen without Efficiency Mode.** My documented tests were with `ChatGPT.exe` and `Claude.exe`. The rule has continued to do what I wanted: I don't have to turn the setting off again each time I open those apps.

I also saw the leaf beside WhatsApp processes, but identifying a rule specific to WhatsApp was less straightforward. I haven't measured a speed improvement or completed a separate Windows reboot test, and I didn't test Codex separately.

WhatsApp Desktop slow on Windows 11, or lagging when you switch chats? <a href="#whatsapp-desktop-slow-windows-11" class="underline underline-offset-4">Jump to the WhatsApp troubleshooting steps</a> for connection checks, app updates, Repair, and how to check whether Efficiency Mode makes a difference.

## Quick answer: keep Efficiency Mode off with Process Lasso

1. Open ChatGPT or Claude, then find its process in [Process Lasso](https://bitsum.com/download-process-lasso/). In my case, the process names were `ChatGPT.exe` and `Claude.exe`.
2. Right-click the process and select **Efficiency Mode → Always → Off**. **Always** saves a rule for future matching processes; **Current** changes only the running instance.
3. Close and reopen the app while Process Lasso's background engine is running. Check the small `e` in its **Rules** column, then check the process in Windows Task Manager to see whether the green leaf returns.

You can review saved rules under **Options → CPU → Efficiency Modes**. The lowercase `e` means Always Off; uppercase `E` means Always On. The Rules column shows the saved instruction, so checking the actual process in Task Manager matters too. [Bitsum documents these controls and indicators](https://bitsum.com/apps/process-lasso/docs/rules/efficiency-mode/).

## What is Efficiency Mode in Windows 11?

Efficiency Mode reduces a process's CPU priority and uses **EcoQoS** to favor energy-efficient execution. This can leave more CPU time for active work and reduce power use. The green leaf in Task Manager identifies the efficiency state; it doesn't establish why an app is slow. [Microsoft explains how it works](https://devblogs.microsoft.com/performance-diagnostics/reduce-process-interference-with-task-manager-efficiency-mode/).

Windows Task Manager's Efficiency Mode is separate from Microsoft Edge's browser energy saver. Changing one does not switch off the other. [Microsoft documents that distinction](https://support.microsoft.com/en-us/edge/learn-about-performance-features-in-microsoft-edge). I wanted to control particular app processes on my PC.

<h2 id="turn-off-efficiency-mode-task-manager">How to turn off Efficiency Mode in Task Manager</h2>

1. Press `Ctrl + Shift + Esc` to open Task Manager and select **Processes**.
2. Find the app. If it has an expandable group, click the arrow to see its individual processes.
3. Right-click the process with the green leaf and click the checked **Efficiency mode** option to turn it off. Check that the leaf disappears for that process.

These are [Microsoft's steps for changing the running process](https://support.microsoft.com/en-us/edge/learn-about-performance-features-in-microsoft-edge). On my PC, doing this manually didn't keep the setting off after I reopened the apps.

### Why is Efficiency Mode greyed out?

If you cannot turn off Efficiency Mode for an app group, expand it and select an individual child process. Task Manager doesn't let you toggle most process groups as a whole. Some core Windows processes also have the control disabled; selecting a child process will not unlock every case. Microsoft's [Task Manager explanation](https://devblogs.microsoft.com/performance-diagnostics/reduce-process-interference-with-task-manager-efficiency-mode/) covers that restriction.

## Why does Efficiency Mode keep turning on?

An app can request energy-efficient execution itself. [Microsoft describes browsers using power-efficiency APIs](https://devblogs.microsoft.com/performance-diagnostics/reduce-process-interference-with-task-manager-efficiency-mode/) even when the user hasn't enabled the setting in Task Manager. A manual change to one running process therefore isn't a saved preference for every process the app starts later.

That matches the problem I was trying to solve: I would reopen an app and have to check the leaf again. Process Lasso's **Always Off** rule gave me a saved setting that its background engine applies to matching processes.

### Can you disable Efficiency Mode permanently?

For selected processes, Process Lasso provides a persistent Off rule. Here, "permanently" means the rule remains saved and the Governor reapplies it while running. Keeping it enforced depends on that background engine. My result is that matching programs reopen without the leaf while Process Lasso is running; I haven't separately verified behavior after reboot.

Before I got to that rule, I tried the registry. Here is the order of my tests.

## I tried the Windows registry first

I first set `PowerThrottlingOff=1` in Registry Editor.

![PowerThrottlingOff set to 1 in Windows Registry Editor](/posts/windows-11-efficiency-mode-process-lasso/power-throttling-regedit.png)

*The first registry value I set.*

Checking it from the terminal was more confusing than setting it. One direct query couldn't find the key, a recursive query did, and trying to write it again from a non-admin PowerShell window returned "Access denied." I confirmed the value was there and reopened the apps. The leaves still came back.

I then added `DisableUserPresenceQos=1` and checked both values again.

![PowerThrottlingOff and DisableUserPresenceQos both set to 1 in a Windows terminal](/posts/windows-11-efficiency-mode-process-lasso/registry-values.png)

*Both values were present after the second change.*

Reopening the apps still didn't give me the result I wanted. I don't have a clean before-and-after test from a full Windows reboot, so I can't claim these registry changes never work. Windows can assign quality-of-service levels to processes and individual threads, which also made a global setting a poor substitute for an app-specific rule. [Microsoft's QoS documentation](https://learn.microsoft.com/en-us/windows/win32/procthread/quality-of-service) explains those controls.

## Installing Process Lasso

After more research, I installed [Process Lasso](https://bitsum.com/download-process-lasso/). In its startup options I selected **"Start core engine as a service at system boot"**. The GUI was initially set to start for all users. Later, the installer reported an error about starting that GUI with elevated rights.

I left the management scope at **"Manage ALL processes Process Lasso has access to"** and used `C:\ProgramData\ProcessLasso` for the configuration.

![Process Lasso management scope and configuration folder selected during installation](/posts/windows-11-efficiency-mode-process-lasso/management-scope.png)

*The management scope and configuration folder from my install.*

The core engine, called the **Governor**, applies rules in the background. The Process Lasso window is where I set and inspect them; [the GUI doesn't need to stay open](https://bitsum.com/apps/process-lasso/docs/deployment/auto-start/). The Governor was running, so the GUI startup error didn't stop me from setting rules.

![Process Lasso installer error about starting the GUI at login with elevated rights](/posts/windows-11-efficiency-mode-process-lasso/gui-startup-error.png)

*The GUI startup error I saw during installation.*

## ChatGPT and Claude: my Process Lasso Efficiency Mode rule

With ChatGPT open, I right-clicked **one** `ChatGPT.exe` row in Process Lasso and chose:

```text
Efficiency Mode → Always → OFF
```

![Process Lasso on Windows 11 showing the Efficiency Mode Always Off rule for ChatGPT.exe and the e indicator in the Rules column](/posts/windows-11-efficiency-mode-process-lasso/chatgpt-always-off.png)

*The checked Off option is under Always. The `e` beside ChatGPT is in the Rules column.*

I repeated that for `Claude.exe`. I didn't have to select every instance or use a process ID. The saved executable-name rules covered matching processes when I reopened ChatGPT and Claude, and the leaves stayed off.

Several Chrome processes were in Efficiency Mode too. I left them alone because I wasn't trying to change how every browser subprocess runs.

WhatsApp wasn't where I expected it in the process list. I put an Always OFF rule on `msedgewebview2.exe` too, though that name could match other apps. Then I closed and reopened the apps and reported that the leaves had gone. The ChatGPT and Claude result was useful. The WebView2 rule needed another look.

To check startup behavior, I'd look for a running, automatic Governor service in `services.msc`, restart Windows, then open the apps without launching the Process Lasso window. That is a follow-up test I still need to do.

Bitsum [lists Efficiency Mode among the features in its free edition](https://bitsum.com/howfree/). I didn't need to buy Pro for this setup.

<h2 id="whatsapp-desktop-slow-windows-11">Why is WhatsApp Desktop so slow on Windows 11?</h2>

If WhatsApp is lagging on your PC, first pin down **what is actually slow**: sending messages and downloading media, or opening the app, scrolling, and switching chats. I saw the Efficiency Mode leaf beside WhatsApp processes, but I did not measure whether it caused the lag. These checks help narrow down where the delay is happening.

### How to fix WhatsApp Desktop lag on Windows 11

Work through these checks in order, repeating the action that felt slow after each change:

1. **For slow messages or downloads, check the connection.** Try the same action in [WhatsApp Web](https://web.whatsapp.com/). If messages and media are delayed there too, check the connection status and try another network. [WhatsApp's connection guide](https://faq.whatsapp.com/852892549070029/?cms_platform=web&helpref=hc_fnav) covers slow sending and downloading. If the browser version responds normally, continue with the Windows app checks. This comparison is a clue, not a conclusive diagnosis.
2. **Update WhatsApp, then reopen it.** If you installed it from the Microsoft Store, open the Store and select **Check for Updates**. [Microsoft explains how to update Store apps](https://support.microsoft.com/en-us/accounts-billing/get-updates-for-apps-and-games-in-microsoft-store). After any update, reopen WhatsApp and try the same chat or action again.
3. **Check resource use while the app is lagging.** Open Task Manager with `Ctrl + Shift + Esc`, expand WhatsApp under **Processes**, and watch CPU and memory use while you reproduce the slowdown. Note which process, if any, has the green leaf. If other apps stutter at the same time, the slowdown may not be specific to WhatsApp.
4. **Test Efficiency Mode on the identified process.** If a WhatsApp child process has the leaf, follow the <a href="#turn-off-efficiency-mode-task-manager" class="underline underline-offset-4">Task Manager steps above</a> to turn it off for that running process. Compare the same action with the leaf present and absent. I have not measured this comparison for WhatsApp. Before saving a Process Lasso rule, read the WebView2 scope issue below; a rule for every `msedgewebview2.exe` can affect other apps.
5. **Try Repair if it is available.** In Windows 11, go to **Settings → Apps → Installed apps → WhatsApp → Advanced options → Repair**. [Microsoft documents the Repair option](https://support.microsoft.com/en-us/windows/apps/repair-apps-and-programs-in-windows). **Reset** is a separate action that can affect app data and your sign-in, so check its consequences before using it.

### WhatsApp still slow with Efficiency Mode off?

If turning it off makes no noticeable difference, that test hasn't established Efficiency Mode as the cause. Keep a note of the WhatsApp version, the action that lags, and whether the delay also happens in the browser. Slow message delivery and a freezing chat window can need different follow-up checks.

If [WhatsApp Web](https://web.whatsapp.com/) works better on your PC, it can be a temporary alternative while you investigate the desktop app. I wouldn't assume it will be faster on every machine.

### WhatsApp Efficiency Mode on Windows 11: why my rule was too broad

`msedgewebview2.exe` belongs to Microsoft's WebView2 runtime. Teams, Outlook, Widgets, and other apps can use it too. In Task Manager's Details tab, their WebView2 processes appear under the same executable name. A rule matching that name could therefore change the behavior of apps I never meant to touch. [Microsoft explains the shared process name here](https://learn.microsoft.com/en-us/microsoft-edge/webview2/concepts/end-user-faq).

Process Lasso can match a process by more than its name, including its path or command line. A WhatsApp-specific rule would need me to identify the right processes first, then test a narrower match. [Bitsum documents those matching options](https://bitsum.com/apps/process-lasso/docs/reference/process-matching/). I haven't verified that rule, and I don't have a record of removing the broad WebView2 rule afterward. I wouldn't copy that setting as a WhatsApp fix.

If WhatsApp is the app showing the leaf on your PC, a safer next test is to expand WhatsApp in Task Manager's **Processes** tab, identify which child process has Efficiency Mode, then inspect that process's details in Process Lasso. Look for a path or command-line match that is specific to WhatsApp before making an Always Off rule. If you cannot distinguish it from other apps' WebView2 processes, don't apply a rule to every `msedgewebview2.exe`. I have not tested a WhatsApp-specific match, so this is a way to investigate the problem, not a verified fix.

## Codex on Windows: does the Efficiency Mode rule apply?

[OpenAI describes Codex as part of the ChatGPT desktop app on Windows](https://learn.chatgpt.com/docs/windows/windows-app). My screenshot and successful rule were for a process named `ChatGPT.exe`; I did **not** run a separate Codex test, inspect every Codex subprocess, or establish that Efficiency Mode causes Codex lag.

If you see the green leaf while using Codex, first identify which process has it in your version of the app. A rule for `ChatGPT.exe` may affect that matching process, but it does not prove every Codex process is covered or that a performance problem will disappear.

I also considered setting CPU priority to **Normal**, excluding apps from ProBalance, and preferring P-cores. I didn't verify any of those changes. The part I can recommend from my own test is narrower: targeted Always OFF rules kept Efficiency Mode from reappearing when I reopened ChatGPT and Claude.

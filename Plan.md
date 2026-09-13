# InternGo: Gamified Skill Assessment Platform — Master Architecture & Product Plan

## 1. Executive Summary & Core Mission
The objective of this platform is to build a **gamified training and testing web application** that evaluates candidates' skills in **Quantitative Aptitude**, **Logical Reasoning**, and **Problem Solving**. 

The platform is designed with a **dual purpose**:
1. **Candidate Value**: High-quality, non-repetitive, gamified skill assessment with clear level progression, instant feedback, star ratings, and daily streaks.
2. **Monetization Engine**: High eCPM ad monetization utilizing a **3-Level Batch Unlock Model** (Rewarded Video Ads) to maximize publisher ad revenue while preserving user retention.

---

## 2. Content Taxonomy & Level Architecture

### Core Rule:
- **1 Batch = 3 Levels = 30 Questions**
- **5 Truly Unique Conceptual Problem Types per 3-Level Batch**
- **No Object/Number Swaps, No Programming/Coding Assessments**

### Master Breakdown Table:

| Category | Truly Unique Conceptual Types | 3-Level Batches ($\text{Types} / 5$) | Total Levels ($\text{Batches} \times 3$) | Questions per Level | Total Questions ($\text{Levels} \times 10$) | Master Reference File |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **1. Quantitative Aptitude** | **450 Types** | 90 Batches | **270 Levels** | 10 Qs | **2,700 Questions** | [Quantitative_Aptitude.md](file:///d:/Projects/InternGo/Quantitative_Aptitude.md) |
| **2. Logical Reasoning** | **200 Types** | 40 Batches | **120 Levels** | 10 Qs | **900 Questions** | [Logical_Reasoning.md](file:///d:/Projects/InternGo/Logical_Reasoning.md) |
| **3. Problem Solving** | **120 Types** | 24 Batches | **72 Levels** | 10 Qs | **720 Questions** | [Problem_Solving.md](file:///d:/Projects/InternGo/Problem_Solving.md) |
| **GRAND TOTAL ECOSYSTEM** | **770 Types** | **154 Batches** | **462 Levels** | **10 Qs / Level** | **4,620 Questions** | Master Content Suite |

---

## 3. Question Distribution & 3-Level Difficulty Progression

Across every **3-Level Batch (30 Questions total testing 5 Unique Types)**, questions scale along a clear difficulty curve:

- **Question Count**: 10 Questions per Level = 2 Questions per Problem Type $\times$ 5 Problem Types.

| Level Tier | Difficulty | Questions per Type | Level Qs | Example Pattern (using Number Series Type) |
| :--- | :--- | :---: | :---: | :--- |
| **Level 1** | **Easy (Foundation)** | 2 Qs $\times$ 5 Types | **10 Qs** | **Arithmetic Series**: `2, 4, 6, 8, ?` $\rightarrow$ *(Ans: 10, Difference of +2)* |
| **Level 2** | **Intermediate (Application)** | 2 Qs $\times$ 5 Types | **10 Qs** | **Fibonacci Series**: `1, 1, 2, 3, 5, ?` $\rightarrow$ *(Ans: 8, Sum of previous two terms)* |
| **Level 3** | **Hard (Mastery)** | 2 Qs $\times$ 5 Types | **10 Qs** | **Polynomial Difference**: `2, 3, 5, 8, 12, 17, ?` $\rightarrow$ *(Ans: 23, Gaps +1, +2, +3, +4...)* |

### Learning Benefits:
- Candidates get **6 total practice questions per concept** (2 Easy in Level 1, 2 Medium in Level 2, 2 Hard in Level 3).
- Clearing Level 3 ($\ge 70\%$ score) proves complete concept mastery.

---

## 4. Monetization Strategy: "3-Level Batch Access"

1. **Batch 1 (Levels 1, 2, 3) — 100% FREE Access**:
   - Open to all visitors immediately (0 mandatory ads).
   - Hook phase: Candidates experience gamified UI, earn stars, build streaks, and master the first 5 problem types.

2. **Batches 2 to 154 — Watch 1 Video Ad to Unlock Next 3 Levels**:
   - Completing Level 3 prompts: *"Watch a short video ad to unlock Levels 4, 5, & 6!"*
   - Total Ad Checkpoints across website = **153 Ad Gates**.
   - Generates predictable, high-yield ad impressions (Rewarded Video eCPM: $\$15.00 - \$25.00+$ USD).

3. **Bonus Revenue — Heart / Lives System**:
   - Candidate has 5 Hearts. Wrong answer consumes 1 Heart.
   - Refill Hearts instantly by watching a 15–30s Rewarded Video Ad.

---

## 5. Gamification Mechanics

- **Star Rating System**: 
  - $7/10 \text{ Score} = 1 \star$ (Pass & Unlock Ad Prompt)
  - $8-9/10 \text{ Score} = 2 \star$
  - $10/10 \text{ Score} = 3 \star$ (Perfect Mastery)
- **Daily Streak Counter**: Playing at least 1 level per day increments the streak.
- **Skill Badges**: Completing a 3-level batch awards a category badge (e.g., *"Number Theory Specialist"*).
- **Leaderboards**: Monthly global leaderboard based on total Stars earned.

---

## 6. Content Inventory Files
All 770 unique conceptual problem types are cataloged in the repository:
1. **[Quantitative_Aptitude.md](file:///d:/Projects/InternGo/Quantitative_Aptitude.md)** — 450 Types / 90 Batches / 270 Levels
2. **[Logical_Reasoning.md](file:///d:/Projects/InternGo/Logical_Reasoning.md)** — 200 Types / 40 Batches / 120 Levels
3. **[Problem_Solving.md](file:///d:/Projects/InternGo/Problem_Solving.md)** — 120 Types / 24 Batches / 72 Levels

---

## 7. Rollout Phases

### Phase 1 — Currently Live
- **Aptitude**: 30 Levels (Batches 1–10 · Topics 1–50)
- **Reasoning**: 30 Levels (Batches 1–10 · Topics 1–50)
- **Problem Solving**: 30 Levels (Batches 1–10 · Topics 1–30)
- Covers the entire Foundation Tier for all three categories

### Phase 2 — Expansion
- Aptitude: +60 Levels (Batches 11–30 · Topics 51–150)
- Reasoning: +30 Levels (Batches 11–20 · Topics 51–100)
- Problem Solving: +24 Levels (Batches 7–14 · Topics 31–70)

### Phase 3 — Full Release
- Aptitude: Remaining 180 Levels up to 270 total
- Reasoning: Remaining 60 Levels up to 120 total
- Problem Solving: Remaining 18 Levels up to 72 total
- All 462 Levels · 4,620 Questions live

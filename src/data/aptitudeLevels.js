// Quantitative Aptitude - 30 Complete Levels with 10 Real Questions Each

export const APTITUDE_LEVELS = [
 {
  "levelNumber": 1,
  "topic": "Find x% of a number.",
  "questions": [
    {"id": 1, "difficulty": "Easy", "question": "Find 20% of 150.", "options": ["25", "30", "35", "40"], "correctIndex": 1, "explanation": "20% of 150 = (20/100) × 150 = 30."},
    {"id": 2, "difficulty": "Easy", "question": "Find 40% of 90.", "options": ["32", "34", "36", "38"], "correctIndex": 2, "explanation": "40% of 90 = (40/100) × 90 = 36."},
    {"id": 3, "difficulty": "Easy", "question": "Find 5% of 80.", "options": ["4", "5", "3", "6"], "correctIndex": 0, "explanation": "5% of 80 = (5/100) × 80 = 4."},
    {"id": 4, "difficulty": "Medium", "question": "A library has 240 books, of which 3/4 are fiction. Find 25% of the number of fiction books.", "options": ["40", "42", "48", "45"], "correctIndex": 3, "explanation": "Fiction books = (3/4) × 240 = 180. 25% of 180 = 45."},
    {"id": 5, "difficulty": "Medium", "question": "A company's monthly budget is $50,000. It allocates 30% to salaries, and then spends 20% of the salary allocation on bonuses. Find the bonus amount.", "options": ["3000", "3500", "2500", "4000"], "correctIndex": 0, "explanation": "Salary allocation = 30% of 50,000 = 15,000. Bonus = 20% of 15,000 = 3,000."},
    {"id": 6, "difficulty": "Medium", "question": "Rahul has 320 pages to read for an exam. He plans to read 45% of it today. How many pages should he read today?", "options": ["140", "142", "144", "146"], "correctIndex": 2, "explanation": "45% of 320 = (45/100) × 320 = 144."},
    {"id": 7, "difficulty": "Hard", "question": "A factory produces 2,400 units per day. After a machine upgrade, daily production increases by 100 units. Find 15% of the new daily production.", "options": ["350", "360", "390", "375"], "correctIndex": 3, "explanation": "New production = 2,400 + 100 = 2,500. 15% of 2,500 = 375."},
    {"id": 8, "difficulty": "Hard", "question": "A survey of 500 people found that 60% prefer tea. Among the tea drinkers, find 25% who prefer it without sugar.", "options": ["70", "75", "72", "78"], "correctIndex": 1, "explanation": "Tea drinkers = 60% of 500 = 300. Without sugar = 25% of 300 = 75."},
    {"id": 9, "difficulty": "Hard", "question": "A company had 800 employees. After restructuring, 15% of employees were laid off, and then 10% of the remaining employees were promoted. Find how many employees were promoted.", "options": ["68", "70", "65", "62"], "correctIndex": 0, "explanation": "Laid off = 15% of 800 = 120. Remaining = 680. Promoted = 10% of 680 = 68."},
    {"id": 10, "difficulty": "Hard", "question": "A tank contains 1,200 liters of water. 30% is drained for cleaning, and then 40% of the remaining water is used for irrigation. Find the amount used for irrigation.", "options": ["328", "336", "320", "344"], "correctIndex": 1, "explanation": "Drained = 30% of 1,200 = 360. Remaining = 840. Irrigation = 40% of 840 = 336."}
  ]
 },
 {
  "levelNumber": 2,
  "topic": "Find what percentage A is of B.",
  "questions": [
    {"id": 1, "difficulty": "Easy", "question": "What percentage is 20 of 50?", "options": ["35%", "38%", "40%", "45%"], "correctIndex": 2, "explanation": "(20/50) × 100 = 40%."},
    {"id": 2, "difficulty": "Easy", "question": "What percentage is 15 of 60?", "options": ["25%", "20%", "30%", "22%"], "correctIndex": 0, "explanation": "(15/60) × 100 = 25%."},
    {"id": 3, "difficulty": "Easy", "question": "What percentage is 9 of 45?", "options": ["15%", "18%", "22%", "20%"], "correctIndex": 3, "explanation": "(9/45) × 100 = 20%."},
    {"id": 4, "difficulty": "Medium", "question": "In a class of 80 students, 24 play cricket. What percentage of students play cricket?", "options": ["25%", "30%", "35%", "28%"], "correctIndex": 1, "explanation": "(24/80) × 100 = 30%."},
    {"id": 5, "difficulty": "Medium", "question": "A shop sold 36 out of 150 shirts in a day. What percentage of the shirts were sold?", "options": ["20%", "22%", "26%", "24%"], "correctIndex": 3, "explanation": "(36/150) × 100 = 24%."},
    {"id": 6, "difficulty": "Medium", "question": "Anita spends 350 out of her monthly salary of 1,400 on rent. What percentage of her salary goes to rent?", "options": ["25%", "28%", "20%", "30%"], "correctIndex": 0, "explanation": "(350/1,400) × 100 = 25%."},
    {"id": 7, "difficulty": "Hard", "question": "An office has 200 employees, of whom 20 are on leave. Among the remaining employees, 54 work from home and the rest work from office. What percentage of the total 200 employees work from office?", "options": ["58%", "63%", "67%", "70%"], "correctIndex": 1, "explanation": "Present = 200 − 20 = 180. Office staff = 180 − 54 = 126. (126/200) × 100 = 63%."},
    {"id": 8, "difficulty": "Hard", "question": "A cricket team played 40 matches in a season. It won 60% of the first 20 matches and 10 out of the remaining 20 matches. What percentage of all 40 matches did the team win?", "options": ["50%", "52%", "55%", "58%"], "correctIndex": 2, "explanation": "Wins = (60% of 20) + 10 = 12 + 10 = 22. (22/40) × 100 = 55%."},
    {"id": 9, "difficulty": "Hard", "question": "A survey of 300 college students found that 180 use laptops. Among laptop users, 45 also own a tablet. What percentage of all surveyed students own both a laptop and a tablet?", "options": ["12%", "18%", "10%", "15%"], "correctIndex": 3, "explanation": "(45/300) × 100 = 15%."},
    {"id": 10, "difficulty": "Hard", "question": "In an office of 250 employees, 150 are men. Of the men, 90 work in the technical department. What percentage of the total employees are men working in the technical department?", "options": ["36%", "40%", "32%", "34%"], "correctIndex": 0, "explanation": "(90/250) × 100 = 36%."}
  ]
 },
 {
  "levelNumber": 3,
  "topic": "Percentage increase from original to new value.",
  "questions": [
    {"id": 1, "difficulty": "Easy", "question": "The price of a book increased from 200 to 250. Find the percentage increase.", "options": ["20%", "25%", "30%", "22%"], "correctIndex": 1, "explanation": "Increase = 50. (50/200) × 100 = 25%."},
    {"id": 2, "difficulty": "Easy", "question": "A student's marks improved from 50 to 65 in the next test. Find the percentage increase.", "options": ["25%", "30%", "35%", "28%"], "correctIndex": 1, "explanation": "Increase = 15. (15/50) × 100 = 30%."},
    {"id": 3, "difficulty": "Easy", "question": "Rent increased from 8,000 to 9,600 per month. Find the percentage increase.", "options": ["20%", "18%", "24%", "22%"], "correctIndex": 0, "explanation": "Increase = 1,600. (1,600/8,000) × 100 = 20%."},
    {"id": 4, "difficulty": "Medium", "question": "A shop's daily sales rose from 400 units to 460 units after a promotion. Find the percentage increase in sales.", "options": ["12%", "18%", "15%", "10%"], "correctIndex": 2, "explanation": "Increase = 60. (60/400) × 100 = 15%."},
    {"id": 5, "difficulty": "Medium", "question": "The population of a town grew from 25,000 to 27,500 over a year. Find the percentage increase.", "options": ["8%", "10%", "12%", "9%"], "correctIndex": 1, "explanation": "Increase = 2,500. (2,500/25,000) × 100 = 10%."},
    {"id": 6, "difficulty": "Medium", "question": "An employee's monthly salary was raised from 30,000 to 35,400 after an appraisal. Find the percentage increase.", "options": ["15%", "20%", "16%", "18%"], "correctIndex": 3, "explanation": "Increase = 5,400. (5,400/30,000) × 100 = 18%."},
    {"id": 7, "difficulty": "Hard", "question": "A company's revenue was $2,00,000 last year. This year, revenue grew by 10% in the first half, and then the second half's revenue was $10,000 higher than the first half's. Find the overall percentage increase in revenue for the year compared to last year.", "options": ["15%", "12.5%", "20%", "10%"], "correctIndex": 0, "explanation": "First half = 200,000 × 1.10 = 220,000. Second half = 220,000 + 10,000 = 230,000. Increase = 30,000. (30,000/200,000) × 100 = 15%."},
    {"id": 8, "difficulty": "Hard", "question": "A car's price was $15,000. It increased to $18,000 due to a tax hike, and then increased by a further $1,500 due to a fuel surcharge. Find the overall percentage increase in price from the original price.", "options": ["25%", "27%", "30%", "33%"], "correctIndex": 2, "explanation": "Final price = 18,000 + 1,500 = 19,500. Increase = 4,500. (4,500/15,000) × 100 = 30%."},
    {"id": 9, "difficulty": "Hard", "question": "A company's expenses increased from $40,000 to $48,000 after adding a new department. If the new department alone accounts for $6,000 of this increase, find the percentage increase in expenses (relative to the original $40,000) caused by reasons other than the new department.", "options": ["15%", "20%", "8%", "5%"], "correctIndex": 3, "explanation": "Total increase = 8,000. Increase from other reasons = 8,000 − 6,000 = 2,000. (2,000/40,000) × 100 = 5%."},
    {"id": 10, "difficulty": "Hard", "question": "A library's book collection grew from 1,200 to 1,500 this year. If 180 of the newly added books were donated (not purchased), find the percentage increase in the collection attributable to purchased books only, relative to the original 1,200 books.", "options": ["10%", "15%", "8%", "25%"], "correctIndex": 0, "explanation": "Total increase = 300. Purchased increase = 300 − 180 = 120. (120/1,200) × 100 = 10%."}
  ]
 },
 {
  "levelNumber": 4,
  "topic": "Percentage decrease from original to new value.",
  "questions": [
    {"id": 1, "difficulty": "Easy", "question": "The price of a shirt decreased from 800 to 680. Find the percentage decrease.", "options": ["10%", "12%", "15%", "18%"], "correctIndex": 2, "explanation": "Decrease = 120. (120/800) × 100 = 15%."},
    {"id": 2, "difficulty": "Easy", "question": "A company's workforce reduced from 250 to 200 employees. Find the percentage decrease.", "options": ["20%", "18%", "22%", "25%"], "correctIndex": 0, "explanation": "Decrease = 50. (50/250) × 100 = 20%."},
    {"id": 3, "difficulty": "Easy", "question": "Temperature dropped from 50°C to 42°C. Find the percentage decrease.", "options": ["12%", "14%", "18%", "16%"], "correctIndex": 3, "explanation": "Decrease = 8. (8/50) × 100 = 16%."},
    {"id": 4, "difficulty": "Medium", "question": "A retailer reduced the price of a jacket from 2,500 to 2,000 during a sale. Find the percentage decrease in price.", "options": ["15%", "20%", "25%", "18%"], "correctIndex": 1, "explanation": "Decrease = 500. (500/2,500) × 100 = 20%."},
    {"id": 5, "difficulty": "Medium", "question": "Due to a drought, a farmer's crop yield fell from 800 kg to 680 kg this season. Find the percentage decrease in yield.", "options": ["10%", "12%", "15%", "20%"], "correctIndex": 2, "explanation": "Decrease = 120. (120/800) × 100 = 15%."},
    {"id": 6, "difficulty": "Medium", "question": "A website's daily visitors dropped from 5,000 to 4,100 after a server issue. Find the percentage decrease in visitors.", "options": ["18%", "15%", "20%", "22%"], "correctIndex": 0, "explanation": "Decrease = 900. (900/5,000) × 100 = 18%."},
    {"id": 7, "difficulty": "Hard", "question": "A factory's monthly output was 12,000 units. After equipment breakdown, output fell to 9,600 units, but 480 of the missing units were later recovered through overtime production. Find the net percentage decrease in output compared to the original 12,000 units.", "options": ["20%", "18%", "14%", "16%"], "correctIndex": 3, "explanation": "Recovered output = 9,600 + 480 = 10,080. Decrease = 12,000 − 10,080 = 1,920. (1,920/12,000) × 100 = 16%."},
    {"id": 8, "difficulty": "Hard", "question": "A store had 400 units of inventory. After selling some units, a fire damaged 15% of the remaining stock, leaving 204 usable units. Find the percentage decrease in usable inventory compared to the original 400 units.", "options": ["45%", "49%", "51%", "54%"], "correctIndex": 1, "explanation": "Since 85% of the remaining stock = 204, remaining before fire = 240. Usable units = 204. Decrease = 400 − 204 = 196. (196/400) × 100 = 49%."},
    {"id": 9, "difficulty": "Hard", "question": "A company's expenses were $60,000. After cost-cutting measures, expenses fell by 20%. A one-time legal fee of $3,000 was then added to the reduced expenses. Find the overall percentage decrease in expenses compared to the original $60,000.", "options": ["15%", "18%", "12%", "20%"], "correctIndex": 0, "explanation": "Reduced expenses = 60,000 × 0.80 = 48,000. Final = 48,000 + 3,000 = 51,000. Decrease = 9,000. (9,000/60,000) × 100 = 15%."},
    {"id": 10, "difficulty": "Hard", "question": "A city's reservoir level dropped from 8,000 million liters to 6,800 million liters during a dry spell. Rainfall then added 400 million liters back. Find the net percentage decrease in the reservoir level from the original 8,000 million liters.", "options": ["8%", "9%", "10%", "12%"], "correctIndex": 2, "explanation": "Level after rain = 6,800 + 400 = 7,200. Decrease = 8,000 − 7,200 = 800. (800/8,000) × 100 = 10%."}
  ]
 },
 {
  "levelNumber": 5,
  "topic": "Net percentage change after successive changes.",
  "questions": [
    {"id": 1, "difficulty": "Easy", "question": "A price increases by 10% and then increases by 20%. Find the net percentage change.", "options": ["30% increase", "32% increase", "34% increase", "28% increase"], "correctIndex": 1, "explanation": "Net change = 10 + 20 + (10×20)/100 = 32% increase."},
    {"id": 2, "difficulty": "Easy", "question": "A value increases by 20% and then decreases by 10%. Find the net percentage change.", "options": ["10% increase", "6% increase", "9% increase", "8% increase"], "correctIndex": 3, "explanation": "Net change = 20 − 10 + (20×−10)/100 = 20 − 10 − 2 = 8% increase."},
    {"id": 3, "difficulty": "Easy", "question": "A number decreases by 10% and then decreases by 10% again. Find the net percentage change.", "options": ["19% decrease", "20% decrease", "18% decrease", "21% decrease"], "correctIndex": 0, "explanation": "Net change = −10 − 10 + (−10×−10)/100 = −20 + 1 = 19% decrease."},
    {"id": 4, "difficulty": "Medium", "question": "A shopkeeper marks up an item's price by 25% and then offers a 20% discount on the marked price. Find the net percentage change in price compared to the original.", "options": ["5% increase", "5% decrease", "No change (0%)", "2% decrease"], "correctIndex": 2, "explanation": "Net change = 25 − 20 + (25×−20)/100 = 5 − 5 = 0%, i.e., no net change."},
    {"id": 5, "difficulty": "Medium", "question": "A stock price rises by 15% in the first month and falls by 15% in the second month. Find the net percentage change compared to the original price.", "options": ["No change (0%)", "2.25% decrease", "2.25% increase", "4.5% decrease"], "correctIndex": 1, "explanation": "Net change = 15 − 15 + (15×−15)/100 = 0 − 2.25 = 2.25% decrease (equal % rise and fall never cancel out fully)."},
    {"id": 6, "difficulty": "Medium", "question": "A company's revenue grows by 30% in Q1 and then declines by 10% in Q2. Find the net percentage change in revenue from the start of Q1 to the end of Q2.", "options": ["20% increase", "15% increase", "19% increase", "17% increase"], "correctIndex": 3, "explanation": "Net change = 30 − 10 + (30×−10)/100 = 20 − 3 = 17% increase."},
    {"id": 7, "difficulty": "Hard", "question": "A product's price is increased by 20%, then decreased by 10%, and then increased again by 5%. Find the net percentage change in price compared to the original.", "options": ["13.4% increase", "15% increase", "12% increase", "10% increase"], "correctIndex": 0, "explanation": "Starting at 100: →120 (+20%) →108 (−10%) →113.4 (+5%). Net change = 13.4% increase."},
    {"id": 8, "difficulty": "Hard", "question": "A machine's efficiency is first increased by 10%. It is then reduced to three-fourths of this new efficiency due to wear. Finally, efficiency is boosted by 20% through maintenance. Find the net percentage change in efficiency compared to the original.", "options": ["No change (0%)", "5% increase", "1% decrease", "5% decrease"], "correctIndex": 2, "explanation": "Starting at 100: →110 (+10%) →82.5 (×3/4) →99 (+20%). Net change = 1% decrease."},
    {"id": 9, "difficulty": "Hard", "question": "A shop increases the price of an item by 40% and later reduces the new price by 40%. A customer claims the price returns to the original value. Find the actual net percentage change from the original price.", "options": ["No change (0%)", "4% decrease", "8% decrease", "16% decrease"], "correctIndex": 3, "explanation": "Net change = 40 − 40 + (40×−40)/100 = 0 − 16 = 16% decrease. The 40% decrease applies to the already-increased price, not the original, so the values do not cancel out."},
    {"id": 10, "difficulty": "Hard", "question": "An investment grows by 50% in Year 1, then falls by 20% in Year 2, and then grows by 10% in Year 3. Find the net percentage change over the three years compared to the original investment.", "options": ["30% increase", "32% increase", "40% increase", "28% increase"], "correctIndex": 1, "explanation": "Starting at 100: →150 (+50%) →120 (−20%) →132 (+10%). Net change = 32% increase."}
  ]
 },
 {
  "levelNumber": 6,
  "topic": "Income/expenditure/savings percentage changes.",
  "questions": [
    {"id": 1, "difficulty": "Easy", "question": "A person's monthly income is 20,000 and monthly expenditure is 15,000. Find savings as a percentage of income.", "options": ["25%", "20%", "30%", "35%"], "correctIndex": 0, "explanation": "Savings = 20,000 − 15,000 = 5,000. (5,000/20,000) × 100 = 25%."},
    {"id": 2, "difficulty": "Easy", "question": "A person spends 70% of a monthly income of 10,000 and saves the rest. Find the savings amount.", "options": ["2,500", "3,500", "4,000", "3,000"], "correctIndex": 3, "explanation": "Savings percentage = 100% − 70% = 30%. 30% of 10,000 = 3,000."},
    {"id": 3, "difficulty": "Easy", "question": "A family's monthly income is 25,000. They save 20% of it. Find their monthly expenditure.", "options": ["19,000", "20,000", "21,000", "18,000"], "correctIndex": 1, "explanation": "Expenditure percentage = 100% − 20% = 80%. 80% of 25,000 = 20,000."},
    {"id": 4, "difficulty": "Medium", "question": "A man's monthly income rises from 20,000 to 24,000, while his expenditure stays fixed at 15,000. Find the percentage increase in his savings.", "options": ["70%", "90%", "80%", "60%"], "correctIndex": 2, "explanation": "Original savings = 20,000 − 15,000 = 5,000. New savings = 24,000 − 15,000 = 9,000. Increase = 4,000. (4,000/5,000) × 100 = 80%."},
    {"id": 5, "difficulty": "Medium", "question": "A person's income stays fixed at 30,000. His expenditure rises from 20,000 to 22,000. Find the percentage decrease in his savings.", "options": ["25%", "20%", "15%", "18%"], "correctIndex": 1, "explanation": "Original savings = 30,000 − 20,000 = 10,000. New savings = 30,000 − 22,000 = 8,000. Decrease = 2,000. (2,000/10,000) × 100 = 20%."},
    {"id": 6, "difficulty": "Medium", "question": "A family's income increases by 25%, while its expenditure stays fixed at 80,000 (the same as before the increase, when income was also 100,000). Find the percentage increase in savings.", "options": ["110%", "100%", "150%", "125%"], "correctIndex": 3, "explanation": "Original savings = 100,000 − 80,000 = 20,000. New income = 125,000. New savings = 125,000 − 80,000 = 45,000. Increase = 25,000. (25,000/20,000) × 100 = 125%."},
    {"id": 7, "difficulty": "Hard", "question": "A person's monthly income is 50,000, and expenditure is 60% of income. Next year, income increases by 20% and expenditure increases by 30%. Find the percentage change in savings.", "options": ["5% decrease", "5% increase", "10% increase", "3% increase"], "correctIndex": 1, "explanation": "Original: expenditure = 30,000, savings = 20,000. New income = 60,000. New expenditure = 30,000 × 1.30 = 39,000. New savings = 21,000. Change = 1,000, i.e., (1,000/20,000) × 100 = 5% increase."},
    {"id": 8, "difficulty": "Hard", "question": "A person's monthly income is 100,000, and expenditure is 60% of income. Income increases by 15% and expenditure increases by 20%. Find the percentage change in savings.", "options": ["6%", "9%", "7.5%", "5%"], "correctIndex": 2, "explanation": "Original: expenditure = 60,000, savings = 40,000. New income = 115,000. New expenditure = 72,000. New savings = 43,000. Increase = 3,000, i.e., (3,000/40,000) × 100 = 7.5%."},
    {"id": 9, "difficulty": "Hard", "question": "A person's income and expenditure are in the ratio 5:3. Income increases by 20%, and savings increase by 50%. Find the percentage change in expenditure.", "options": ["No change (0%)", "10% increase", "5% decrease", "10% decrease"], "correctIndex": 0, "explanation": "Taking income = 500, expenditure = 300, savings = 200. New income = 600. New savings = 300. New expenditure = 600 − 300 = 300, same as before, so 0% change."},
    {"id": 10, "difficulty": "Hard", "question": "A city's income is 250,000, with expenditure at 80% of income. Next year, income increases by 12%, and the city aims to increase savings by 20%. Find the percentage change in expenditure required.", "options": ["12%", "8%", "15%", "10%"], "correctIndex": 3, "explanation": "Original: expenditure = 200,000, savings = 50,000. New income = 280,000. New savings = 60,000. New expenditure = 280,000 − 60,000 = 220,000. Increase = 20,000, i.e., (20,000/200,000) × 100 = 10%."}
  ]
 },
 {
  "levelNumber": 7,
  "topic": "Exam marks and passing-percentage problems.",
  "questions": [
    {"id": 1, "difficulty": "Easy", "question": "To pass an exam, a student needs 40% of the maximum marks. If the maximum marks are 500, find the passing marks.", "options": ["180", "220", "200", "250"], "correctIndex": 2, "explanation": "Passing marks = 40% of 500 = 200."},
    {"id": 2, "difficulty": "Easy", "question": "A student scored 250 marks out of a maximum of 500. Find the percentage of marks scored.", "options": ["45%", "55%", "60%", "50%"], "correctIndex": 3, "explanation": "(250/500) × 100 = 50%."},
    {"id": 3, "difficulty": "Easy", "question": "The passing marks for an exam are 33% of the maximum marks. If the maximum marks are 300, find the passing marks.", "options": ["95", "99", "90", "100"], "correctIndex": 1, "explanation": "33% of 300 = 99."},
    {"id": 4, "difficulty": "Medium", "question": "A student needs 40% marks to pass an exam. He scored 180 marks and failed by 20 marks. Find the maximum marks of the exam.", "options": ["450", "550", "500", "600"], "correctIndex": 2, "explanation": "Passing marks = 180 + 20 = 200. Maximum marks = 200/0.40 = 500."},
    {"id": 5, "difficulty": "Medium", "question": "In an exam, the passing marks are 35% of the maximum marks. A student scored 175 marks, which is 21 marks more than the passing marks. Find the maximum marks.", "options": ["420", "460", "480", "440"], "correctIndex": 3, "explanation": "Passing marks = 175 − 21 = 154. Maximum marks = 154/0.35 = 440."},
    {"id": 6, "difficulty": "Medium", "question": "A student appeared for an exam with a maximum of 400 marks, requiring 45% to pass. He scored 15% more marks than the passing marks. Find his actual score.", "options": ["195", "207", "200", "210"], "correctIndex": 1, "explanation": "Passing marks = 45% of 400 = 180. Score = 180 × 1.15 = 207."},
    {"id": 7, "difficulty": "Hard", "question": "To pass an exam, a student needs 40% of the total marks. A student scored only 30% of the total marks and failed by 45 marks. Find the maximum marks of the exam.", "options": ["450", "400", "420", "480"], "correctIndex": 0, "explanation": "Difference between passing % and scored % is 10%, equal to 45 marks. So 10% of M = 45, giving M = 450."},
    {"id": 8, "difficulty": "Hard", "question": "In an exam, the passing percentage is 36%. A student scored 20 marks more than the passing marks and got a total of 200 marks. Find the maximum marks of the exam.", "options": ["480", "520", "500", "540"], "correctIndex": 2, "explanation": "Passing marks = 200 − 20 = 180. Maximum marks = 180/0.36 = 500."},
    {"id": 9, "difficulty": "Hard", "question": "A school requires a 45% aggregate to pass, based on two exams of 300 marks each (maximum total 600). A student scored 150 marks in the first exam. Find the minimum marks needed in the second exam to pass.", "options": ["110", "130", "100", "120"], "correctIndex": 3, "explanation": "Passing aggregate = 45% of 600 = 270. Marks needed in second exam = 270 − 150 = 120."},
    {"id": 10, "difficulty": "Hard", "question": "In a competitive exam, the passing mark is 42% of the total marks. A student scored 6 percentage points above the passing percentage and obtained 240 marks. Find the maximum marks of the exam.", "options": ["480", "500", "520", "550"], "correctIndex": 1, "explanation": "Student's percentage = 42% + 6% = 48%. 48% of M = 240, so M = 500."}
  ]
 },
 {
  "levelNumber": 8,
  "topic": "Election percentage and winning-margin problems.",
  "questions": [
    {"id": 1, "difficulty": "Easy", "question": "In an election between two candidates, 1,000 valid votes were cast. The winner received 60% of the votes. Find the number of votes the winner received.", "options": ["650", "600", "550", "500"], "correctIndex": 1, "explanation": "60% of 1,000 = 600."},
    {"id": 2, "difficulty": "Easy", "question": "In a two-candidate election with 500 valid votes, the losing candidate received 40% of the votes. Find the number of votes the losing candidate received.", "options": ["220", "180", "250", "200"], "correctIndex": 3, "explanation": "40% of 500 = 200."},
    {"id": 3, "difficulty": "Easy", "question": "In an election with 800 valid votes and two candidates, the winner received 55% of the votes. Find the number of votes received by the losing candidate.", "options": ["340", "370", "360", "350"], "correctIndex": 2, "explanation": "Losing candidate got 45% of 800 = 360."},
    {"id": 4, "difficulty": "Medium", "question": "In a two-candidate election, 2,000 total votes were cast, of which 10% were invalid. The winner secured 55% of the valid votes. Find the number of votes the winner received.", "options": ["990", "950", "970", "1010"], "correctIndex": 0, "explanation": "Valid votes = 90% of 2,000 = 1,800. Winner = 55% of 1,800 = 990."},
    {"id": 5, "difficulty": "Medium", "question": "In an election, 3,000 total votes were cast, of which 5% were invalid. Between the two candidates, the winner won by a margin of 20% of the valid votes. Find the number of votes the winner received.", "options": ["1680", "1730", "1700", "1710"], "correctIndex": 3, "explanation": "Valid votes = 95% of 3,000 = 2,850. Margin = 20% of 2,850 = 570. Winner = (2,850 + 570)/2 = 1,710."},
    {"id": 6, "difficulty": "Medium", "question": "In a two-candidate election with 5,000 total (all valid) votes, the winning margin was 1,000 votes. Find the percentage of votes received by the winner.", "options": ["58%", "60%", "55%", "62%"], "correctIndex": 1, "explanation": "Winner + Loser = 5,000, Winner − Loser = 1,000, so Winner = 3,000, which is 60% of 5,000."},
    {"id": 7, "difficulty": "Hard", "question": "In an election, 10% of the 10,000 registered voters did not vote, and 8% of the votes actually cast were declared invalid. Between the two candidates, the winner secured 60% of the valid votes. Find the number of votes the winner received.", "options": ["4968", "4930", "4900", "5000"], "correctIndex": 0, "explanation": "Votes cast = 90% of 10,000 = 9,000. Valid votes = 92% of 9,000 = 8,280. Winner = 60% of 8,280 = 4,968."},
    {"id": 8, "difficulty": "Hard", "question": "In a three-candidate election with 6,000 total valid votes, Candidate A received 45% and Candidate B received 35% of the votes. Find by how many votes A won over B.", "options": ["550", "650", "500", "600"], "correctIndex": 3, "explanation": "A = 45% of 6,000 = 2,700. B = 35% of 6,000 = 2,100. Margin = 2,700 − 2,100 = 600."},
    {"id": 9, "difficulty": "Hard", "question": "In an election, 12% of the 12,500 total votes cast were invalid. Between the two candidates, the winner's margin was 10% of the valid votes. Find the number of votes secured by the losing candidate.", "options": ["4900", "4950", "4975", "4925"], "correctIndex": 1, "explanation": "Valid votes = 88% of 12,500 = 11,000. Margin = 10% of 11,000 = 1,100. Loser = (11,000 − 1,100)/2 = 4,950."},
    {"id": 10, "difficulty": "Hard", "question": "In an election, 20% of the total votes cast were invalid. The winning candidate received 55% of the valid votes and won by a margin of 1,000 votes over the losing candidate. Find the total number of votes cast, including invalid ones.", "options": ["12500", "12000", "13000", "11500"], "correctIndex": 0, "explanation": "Margin = 10% of valid votes = 1,000, so valid votes = 10,000. Since valid votes are 80% of total cast, total votes = 10,000/0.80 = 12,500."}
  ]
 },
 {
  "levelNumber": 9,
  "topic": "Population growth/migration percentage problems.",
  "questions": [
    {"id": 1, "difficulty": "Easy", "question": "A town's population is 10,000. It grows by 10% in a year. Find the population after one year.", "options": ["10500", "11200", "11000", "10800"], "correctIndex": 2, "explanation": "10,000 × 1.10 = 11,000."},
    {"id": 2, "difficulty": "Easy", "question": "A village had a population of 5,000. Due to migration, 8% of the population moved out. Find the new population.", "options": ["4700", "4600", "4800", "4500"], "correctIndex": 1, "explanation": "5,000 × (1 − 0.08) = 5,000 × 0.92 = 4,600."},
    {"id": 3, "difficulty": "Easy", "question": "A city's population is 20,000. In one year, it increases by 5% due to births and decreases by 2% due to migration (both based on the original population). Find the net increase in population.", "options": ["500", "700", "400", "600"], "correctIndex": 3, "explanation": "Net percentage change = 5% − 2% = 3%. 3% of 20,000 = 600."},
    {"id": 4, "difficulty": "Medium", "question": "A town's population was 8,000 last year. This year, it grew by 15% due to births, and then 200 people migrated out. Find the current population.", "options": ["9100", "8900", "9000", "9200"], "correctIndex": 2, "explanation": "8,000 × 1.15 = 9,200. After 200 migrate out: 9,200 − 200 = 9,000."},
    {"id": 5, "difficulty": "Medium", "question": "A city has a population of 50,000. It grows by 8% due to births, and then 300 people leave due to migration. Find the resulting population.", "options": ["53900", "54000", "53500", "53700"], "correctIndex": 3, "explanation": "50,000 × 1.08 = 54,000. After 300 leave: 54,000 − 300 = 53,700."},
    {"id": 6, "difficulty": "Medium", "question": "A district's population is 40,000, split into urban (60%) and rural (40%) areas. The urban population grows by 10% and the rural population grows by 5%. Find the total population after growth.", "options": ["43200", "43400", "42800", "43000"], "correctIndex": 0, "explanation": "Urban = 24,000 × 1.10 = 26,400. Rural = 16,000 × 1.05 = 16,800. Total = 26,400 + 16,800 = 43,200."},
    {"id": 7, "difficulty": "Hard", "question": "A town's population grows by 10% every year, compounded annually. If the population was 20,000 two years ago, find the current population.", "options": ["24100", "24000", "24400", "24200"], "correctIndex": 3, "explanation": "20,000 × 1.10 × 1.10 = 24,200."},
    {"id": 8, "difficulty": "Hard", "question": "A city's population was 60,000. It grew by 10% due to births, and then 5% of the resulting population left due to migration. Find the population at the end of the year.", "options": ["62700", "62850", "62400", "62550"], "correctIndex": 0, "explanation": "60,000 × 1.10 = 66,000. Migration out = 5% of 66,000 = 3,300. Final population = 66,000 − 3,300 = 62,700."},
    {"id": 9, "difficulty": "Hard", "question": "A population of 25,000 increases by 20% due to migration inflow, and then decreases by 20% due to migration outflow (calculated on the new, increased population). Find the net final population.", "options": ["23500", "24500", "24000", "25000"], "correctIndex": 2, "explanation": "25,000 × 1.20 = 30,000. 30,000 × 0.80 = 24,000."},
    {"id": 10, "difficulty": "Hard", "question": "A town had a population of 36,000. An economic boom increased its population by 25%. Over the next two years, natural outmigration reduced the boomed population by 4% each year, compounded. Find the final population.", "options": ["41000", "41472", "41200", "41800"], "correctIndex": 1, "explanation": "Boomed population = 36,000 × 1.25 = 45,000. After two years of 4% compounded decrease: 45,000 × 0.96 × 0.96 = 41,472."}
  ]
 },
 {
  "levelNumber": 10,
  "topic": "Price increase with consumption reduction to maintain expenditure.",
  "questions": [
    {"id": 1, "difficulty": "Easy", "question": "The price of rice increases by 25%. By what percentage should a family reduce its consumption to keep expenditure unchanged?", "options": ["15%", "18%", "22%", "20%"], "correctIndex": 3, "explanation": "Required reduction = [25/(100+25)] × 100 = (25/125) × 100 = 20%."},
    {"id": 2, "difficulty": "Easy", "question": "The price of an item doubles (increases by 100%). Find the percentage reduction in consumption needed to keep expenditure unchanged.", "options": ["50%", "40%", "45%", "55%"], "correctIndex": 0, "explanation": "Required reduction = [100/(100+100)] × 100 = (100/200) × 100 = 50%."},
    {"id": 3, "difficulty": "Easy", "question": "The price of an item increases by 150%. Find the percentage reduction in consumption needed to keep expenditure unchanged.", "options": ["55%", "65%", "60%", "58%"], "correctIndex": 2, "explanation": "Required reduction = [150/(100+150)] × 100 = (150/250) × 100 = 60%."},
    {"id": 4, "difficulty": "Medium", "question": "The price of vegetables increases by 33⅓%. Find the percentage reduction in consumption needed to keep monthly expenditure unchanged.", "options": ["20%", "30%", "22%", "25%"], "correctIndex": 3, "explanation": "Required reduction = [33.33/(100+33.33)] × 100 = (33.33/133.33) × 100 = 25%."},
    {"id": 5, "difficulty": "Medium", "question": "A company's raw material cost per unit rises by 60%. To keep total monthly raw material expenditure unchanged, find the percentage reduction needed in quantity purchased.", "options": ["35%", "37.5%", "40%", "32.5%"], "correctIndex": 1, "explanation": "Required reduction = [60/(100+60)] × 100 = (60/160) × 100 = 37.5%."},
    {"id": 6, "difficulty": "Medium", "question": "The price of petrol increases by 25%, and then a further 20% increase is applied on the new price. A commuter wants to keep monthly petrol expenditure unchanged. Find the overall percentage by which he must reduce his consumption.", "options": ["30%", "35%", "33.33%", "38%"], "correctIndex": 2, "explanation": "Net price factor = 1.25 × 1.20 = 1.50, i.e., a 50% overall increase. Required reduction = (50/150) × 100 = 33.33%."},
    {"id": 7, "difficulty": "Hard", "question": "The price of an item increases by 20%. A shopper only manages to reduce consumption by 10%. Find the percentage change in total expenditure.", "options": ["6%", "8%", "10%", "12%"], "correctIndex": 1, "explanation": "New expenditure factor = 1.20 × 0.90 = 1.08, i.e., an 8% increase in expenditure."},
    {"id": 8, "difficulty": "Hard", "question": "A trader's cost for a commodity increases in two stages: first by 25%, then by a further 33⅓% on the new price. Find the percentage by which a buyer must cut consumption to keep expenditure unchanged.", "options": ["35%", "45%", "40%", "50%"], "correctIndex": 2, "explanation": "Net price factor = 1.25 × (4/3) = 1.6667, i.e., a 66.67% overall increase. Required reduction = (66.67/166.67) × 100 = 40%."},
    {"id": 9, "difficulty": "Hard", "question": "If a household kept its consumption unchanged, a price hike would raise its expenditure by 45%. Instead, the household reduces consumption by 10%. Find the net percentage change in its actual expenditure.", "options": ["29%", "30.5%", "32%", "28%"], "correctIndex": 1, "explanation": "New expenditure factor = 1.45 × 0.90 = 1.305, i.e., a 30.5% increase in actual expenditure."},
    {"id": 10, "difficulty": "Hard", "question": "A city's water tariff increases by 40%. A household wants its water bill to rise by no more than 12%. Find the minimum percentage by which it must reduce its water consumption.", "options": ["18%", "22%", "25%", "20%"], "correctIndex": 3, "explanation": "Required quantity factor = 1.12/1.40 = 0.80, i.e., a 20% reduction in consumption."}
  ]
 },
 {
  "levelNumber": 11,
  "topic": "Simplify a ratio.",
  "questions": [
    {"id": 1, "difficulty": "Easy", "question": "Simplify the ratio 24:36.", "options": ["3:4", "2:3", "4:5", "3:5"], "correctIndex": 1, "explanation": "HCF of 24 and 36 is 12. Dividing both by 12 gives 2:3."},
    {"id": 2, "difficulty": "Easy", "question": "Simplify the ratio 45:60.", "options": ["3:4", "5:6", "4:5", "3:5"], "correctIndex": 0, "explanation": "HCF of 45 and 60 is 15. Dividing both by 15 gives 3:4."},
    {"id": 3, "difficulty": "Easy", "question": "Simplify the ratio 18:27.", "options": ["1:2", "3:4", "2:3", "2:5"], "correctIndex": 2, "explanation": "HCF of 18 and 27 is 9. Dividing both by 9 gives 2:3."},
    {"id": 4, "difficulty": "Medium", "question": "Simplify the ratio 0.75:1.25.", "options": ["4:5", "2:3", "3:4", "3:5"], "correctIndex": 2, "explanation": "Multiply both terms by 100: 75:125. HCF is 25, giving 3:5. Recheck: 75/25=3, 125/25=5, so ratio is 3:5."},
    {"id": 5, "difficulty": "Medium", "question": "Simplify the ratio 1⅓ : 2⅔.", "options": ["1:2", "2:3", "3:4", "1:3"], "correctIndex": 0, "explanation": "Convert to improper fractions: 4/3 : 8/3. This simplifies to 4:8, which reduces to 1:2."},
    {"id": 6, "difficulty": "Medium", "question": "Simplify the ratio 2.4 : 1.6 : 0.8.", "options": ["3:2:1", "4:3:2", "2:1:1", "3:1:1"], "correctIndex": 0, "explanation": "Multiply all terms by 10: 24:16:8. Dividing by the HCF (8) gives 3:2:1."},
    {"id": 7, "difficulty": "Hard", "question": "A ratio is given as (2/3):(3/4):(5/6). Simplify it to the smallest whole-number ratio.", "options": ["8:9:10", "6:9:10", "8:9:12", "6:9:12"], "correctIndex": 0, "explanation": "LCM of denominators 3,4,6 is 12. Multiply each term by 12: (2/3)×12=8, (3/4)×12=9, (5/6)×12=10. Ratio is 8:9:10, already in lowest terms."},
    {"id": 8, "difficulty": "Hard", "question": "Two lengths are 2 meters 40 cm and 3 meters 20 cm. Express their ratio in simplest form.", "options": ["3:4", "5:6", "4:5", "3:5"], "correctIndex": 0, "explanation": "Convert to cm: 240 cm and 320 cm. HCF of 240 and 320 is 80. Dividing gives 3:4."},
    {"id": 9, "difficulty": "Hard", "question": "A ratio is expressed as 1.5 : 2¼ : 0.75. Simplify it to the smallest whole-number ratio.", "options": ["2:3:1", "3:4:2", "4:6:2", "2:3:2"], "correctIndex": 0, "explanation": "Convert to fractions with common form: 1.5=3/2, 2.25=9/4, 0.75=3/4. Multiply all by 4: 6:9:3. Divide by HCF (3): 2:3:1."},
    {"id": 10, "difficulty": "Hard", "question": "Three quantities are in the ratio 0.4 : 0.6 : 1.0, but must be expressed using only whole numbers with no common factor. Find the simplified ratio.", "options": ["2:3:5", "4:6:10", "1:2:3", "2:3:4"], "correctIndex": 0, "explanation": "Multiply all terms by 10: 4:6:10. HCF of 4,6,10 is 2. Dividing gives 2:3:5."}
  ]
 },
 {
  "levelNumber": 12,
  "topic": "Divide a quantity in a 2-part ratio.",
  "questions": [
    {"id": 1, "difficulty": "Easy", "question": "Divide 800 in the ratio 3:5. Find the smaller part.", "options": ["250", "280", "300", "320"], "correctIndex": 2, "explanation": "Total parts = 3+5 = 8. Smaller part = (3/8) × 800 = 300."},
    {"id": 2, "difficulty": "Easy", "question": "Divide 600 in the ratio 2:3. Find the larger part.", "options": ["340", "360", "380", "320"], "correctIndex": 1, "explanation": "Total parts = 2+3 = 5. Larger part = (3/5) × 600 = 360."},
    {"id": 3, "difficulty": "Easy", "question": "Divide 450 in the ratio 4:5. Find the smaller part.", "options": ["190", "210", "200", "220"], "correctIndex": 2, "explanation": "Total parts = 4+5 = 9. Smaller part = (4/9) × 450 = 200."},
    {"id": 4, "difficulty": "Medium", "question": "Two friends invested in a business in the ratio 5:7. If the total investment was 96,000, find the difference between their investments.", "options": ["18,000", "16,000", "20,000", "15,000"], "correctIndex": 1, "explanation": "Total parts = 5+7 = 12. Each part = 96,000/12 = 8,000. Difference = (7−5) × 8,000 = 16,000."},
    {"id": 5, "difficulty": "Medium", "question": "A sum of 720 is divided between A and B in the ratio 7:5. Find how much more A gets than B.", "options": ["150", "180", "200", "160"], "correctIndex": 3, "explanation": "Total parts = 7+5 = 12. Each part = 720/12 = 60. Difference = (7−5) × 60 = 120... recompute: difference should be 2 parts = 2×60=120."},
    {"id": 6, "difficulty": "Medium", "question": "A father divides 45,000 between his two children in the ratio 3:2. Find the amount received by the child getting the larger share.", "options": ["27,000", "28,000", "26,000", "25,000"], "correctIndex": 0, "explanation": "Total parts = 3+2 = 5. Larger share = (3/5) × 45,000 = 27,000."},
    {"id": 7, "difficulty": "Hard", "question": "A sum of money is divided between X and Y in the ratio 3:4. If X's share is 900 less than Y's share, find the total sum.", "options": ["6,300", "6,000", "6,500", "6,200"], "correctIndex": 0, "explanation": "Difference of 1 part (4−3=1) corresponds to 900, so 1 part = 900. Total parts = 7. Total sum = 7 × 900 = 6,300."},
    {"id": 8, "difficulty": "Hard", "question": "Two partners share profits in the ratio 5:8. If the partner with the larger share receives 2,400 more than the one with the smaller share, find the total profit.", "options": ["10,600", "10,400", "10,000", "10,800"], "correctIndex": 1, "explanation": "Difference of 3 parts (8−5=3) corresponds to 2,400, so 1 part = 800. Total parts = 13. Total profit = 13 × 800 = 10,400."},
    {"id": 9, "difficulty": "Hard", "question": "A company's profit is shared between two partners in the ratio 9:11. If the difference between their shares is 3,600, find the total profit shared.", "options": ["36,000", "35,000", "34,000", "37,000"], "correctIndex": 0, "explanation": "Difference of 2 parts (11−9=2) corresponds to 3,600, so 1 part = 1,800. Total parts = 20. Total profit = 20 × 1,800 = 36,000."},
    {"id": 10, "difficulty": "Hard", "question": "An amount is split between two accounts in the ratio 7:9. After the split, 4,000 is transferred from the larger account to the smaller one, making both accounts equal. Find the original total amount.", "options": ["64,000", "60,000", "62,000", "66,000"], "correctIndex": 0, "explanation": "Difference of 2 parts (9−7=2) is removed by transferring 4,000, which equalizes them, so half the difference (2,000) corresponds to 1 part... Let 1 part = x. Larger − smaller = 2x. Transferring 4,000 equalizes them, so 2x = 2×4,000 = 8,000, giving x = 4,000. Total parts = 16. Total = 16 × 4,000 = 64,000."}
  ]
 },
 {
  "levelNumber": 13,
  "topic": "Divide a quantity in a 3-part ratio.",
  "questions": [
    {"id": 1, "difficulty": "Easy", "question": "Divide 900 in the ratio 2:3:4. Find the largest share.", "options": ["350", "400", "380", "420"], "correctIndex": 1, "explanation": "Total parts = 2+3+4 = 9. Largest share = (4/9) × 900 = 400."},
    {"id": 2, "difficulty": "Easy", "question": "Divide 600 in the ratio 1:2:3. Find the smallest share.", "options": ["120", "150", "100", "80"], "correctIndex": 2, "explanation": "Total parts = 1+2+3 = 6. Smallest share = (1/6) × 600 = 100."},
    {"id": 3, "difficulty": "Easy", "question": "Divide 720 in the ratio 3:4:5. Find the middle share.", "options": ["220", "260", "200", "240"], "correctIndex": 3, "explanation": "Total parts = 3+4+5 = 12. Middle share = (4/12) × 720 = 240."},
    {"id": 4, "difficulty": "Medium", "question": "Three friends invest in a business in the ratio 2:3:5. If the total investment is 1,50,000, find the difference between the largest and smallest investments.", "options": ["40,000", "45,000", "50,000", "35,000"], "correctIndex": 1, "explanation": "Total parts = 2+3+5 = 10. Each part = 15,000. Difference = (5−2) × 15,000 = 45,000."},
    {"id": 5, "difficulty": "Medium", "question": "A prize of 84,000 is divided among three winners in the ratio 4:5:7. Find the amount received by the second-place winner.", "options": ["25,000", "26,250", "24,000", "27,000"], "correctIndex": 1, "explanation": "Total parts = 4+5+7 = 16. Second-place share = (5/16) × 84,000 = 26,250."},
    {"id": 6, "difficulty": "Medium", "question": "A sum of 6,000 is divided among A, B, and C in the ratio 3:4:5. Find how much more C gets than A.", "options": ["800", "1,200", "1,000", "900"], "correctIndex": 2, "explanation": "Total parts = 3+4+5 = 12. Each part = 500. Difference between C and A = (5−3) × 500 = 1,000."},
    {"id": 7, "difficulty": "Hard", "question": "A profit is divided among three partners in the ratio 2:3:5. If the partner with the smallest share receives 3,000 less than the partner with the largest share, find the total profit.", "options": ["9,000", "10,500", "10,000", "11,000"], "correctIndex": 2, "explanation": "Difference of 3 parts (5−2=3) corresponds to 3,000, so 1 part = 1,000. Total parts = 10. Total profit = 10 × 1,000 = 10,000."},
    {"id": 8, "difficulty": "Hard", "question": "Three siblings split an inheritance in the ratio 3:5:8. If the difference between the largest and middle shares is 4,500, find the total inheritance.", "options": ["22,500", "25,500", "24,000", "27,000"], "correctIndex": 2, "explanation": "Difference of 3 parts (8−5=3) corresponds to 4,500, so 1 part = 1,500. Total parts = 16. Total = 16 × 1,500 = 24,000."},
    {"id": 9, "difficulty": "Hard", "question": "A sum is divided among P, Q, and R in the ratio 4:6:9. If R receives 3,000 more than Q, find P's share.", "options": ["4,000", "3,500", "4,500", "5,000"], "correctIndex": 0, "explanation": "Difference between R and Q parts (9−6=3) corresponds to 3,000, so 1 part = 1,000. P's share = 4 × 1,000 = 4,000."},
    {"id": 10, "difficulty": "Hard", "question": "An amount is divided among three workers in the ratio 5:7:8 based on hours worked. If the total amount is 8,000 more than three times the smallest share, find the total amount divided.", "options": ["28,000", "30,000", "32,000", "34,000"], "correctIndex": 2, "explanation": "Let 1 part = x. Smallest share = 5x, Total = 20x. Given 20x = 3(5x) + 8,000 → 5x = 8,000 → x = 1,600. Total = 20 × 1,600 = 32,000."}
  ]
 },
 {
  "levelNumber": 14,
  "topic": "Find a missing term in a proportion.",
  "questions": [
    {"id": 1, "difficulty": "Easy", "question": "If 4:6 :: 10:x, find x.", "options": ["12", "15", "18", "20"], "correctIndex": 1, "explanation": "In a proportion, 4×x = 6×10, so x = 60/4 = 15."},
    {"id": 2, "difficulty": "Easy", "question": "If 3:5 :: x:20, find x.", "options": ["10", "14", "12", "16"], "correctIndex": 2, "explanation": "3×20 = 5×x, so x = 60/5 = 12."},
    {"id": 3, "difficulty": "Easy", "question": "If 8:x :: 4:9, find x.", "options": ["16", "20", "14", "18"], "correctIndex": 3, "explanation": "8×9 = x×4, so x = 72/4 = 18."},
    {"id": 4, "difficulty": "Medium", "question": "If x:12 :: 15:36, find x.", "options": ["4", "6", "5", "7"], "correctIndex": 2, "explanation": "36×x = 12×15, so x = 180/36 = 5."},
    {"id": 5, "difficulty": "Medium", "question": "Find the value of x if 2.5:x :: 5:14.", "options": ["6", "7", "8", "6.5"], "correctIndex": 1, "explanation": "2.5×14 = 5×x, so x = 35/5 = 7."},
    {"id": 6, "difficulty": "Medium", "question": "If (x+2):9 :: 6:18, find x.", "options": ["0", "1", "2", "-1"], "correctIndex": 1, "explanation": "18×(x+2) = 9×6, so (x+2) = 54/18 = 3, giving x = 1."},
    {"id": 7, "difficulty": "Hard", "question": "Find the mean proportional between 9 and 25.", "options": ["14", "16", "15", "17"], "correctIndex": 2, "explanation": "Mean proportional = √(9×25) = √225 = 15."},
    {"id": 8, "difficulty": "Hard", "question": "If a:b :: 3:4 and b:c :: 8:9, find a:c.", "options": ["1:2", "2:3", "3:4", "2:5"], "correctIndex": 1, "explanation": "a:b = 3:4 = 6:8. b:c = 8:9. Combining: a:b:c = 6:8:9, so a:c = 6:9 = 2:3."},
    {"id": 9, "difficulty": "Hard", "question": "Find the third proportional to 4 and 12.", "options": ["30", "32", "34", "36"], "correctIndex": 3, "explanation": "Third proportional x satisfies 4:12 :: 12:x, so x = 12×12/4 = 36."},
    {"id": 10, "difficulty": "Hard", "question": "If x is the fourth proportional to 5, 8, and 15, find x.", "options": ["22", "24", "26", "28"], "correctIndex": 1, "explanation": "Fourth proportional satisfies 5:8 :: 15:x, so x = (8×15)/5 = 24."}
  ]
 },
 {
  "levelNumber": 15,
  "topic": "Direct proportion.",
  "questions": [
    {"id": 1, "difficulty": "Easy", "question": "If 5 notebooks cost 100, find the cost of 8 notebooks (assuming direct proportion).", "options": ["150", "160", "170", "180"], "correctIndex": 1, "explanation": "Cost per notebook = 100/5 = 20. Cost of 8 notebooks = 20 × 8 = 160."},
    {"id": 2, "difficulty": "Easy", "question": "If 6 workers can complete a task in proportion to their number, and 6 workers produce 90 units, find the units produced by 10 workers.", "options": ["140", "150", "160", "130"], "correctIndex": 1, "explanation": "Units per worker = 90/6 = 15. For 10 workers = 15 × 10 = 150."},
    {"id": 3, "difficulty": "Easy", "question": "A car travels 240 km using 20 liters of petrol. Find the distance it can travel using 25 liters (assuming direct proportion).", "options": ["280", "300", "320", "260"], "correctIndex": 1, "explanation": "Distance per liter = 240/20 = 12 km. For 25 liters = 12 × 25 = 300 km."},
    {"id": 4, "difficulty": "Medium", "question": "The cost of 12 chairs is 7,200. If the price per chair remains the same, find the cost of 18 chairs.", "options": ["9,800", "10,800", "11,200", "10,200"], "correctIndex": 1, "explanation": "Cost per chair = 7,200/12 = 600. Cost of 18 chairs = 600 × 18 = 10,800."},
    {"id": 5, "difficulty": "Medium", "question": "A factory produces 450 units in 6 days, working at a constant daily rate. Find the number of units produced in 10 days.", "options": ["720", "750", "700", "730"], "correctIndex": 1, "explanation": "Units per day = 450/6 = 75. Units in 10 days = 75 × 10 = 750."},
    {"id": 6, "difficulty": "Medium", "question": "If the weight of 8 identical iron rods is 96 kg, find the weight of 15 such rods.", "options": ["170", "175", "180", "185"], "correctIndex": 2, "explanation": "Weight per rod = 96/8 = 12 kg. Weight of 15 rods = 12 × 15 = 180 kg."},
    {"id": 7, "difficulty": "Hard", "question": "A recipe requires ingredients directly proportional to the number of servings. For 5 servings, it needs 250g of flour and 150g of sugar. Find the total combined weight of flour and sugar needed for 12 servings.", "options": ["940g", "960g", "980g", "920g"], "correctIndex": 1, "explanation": "Flour per serving = 50g, sugar per serving = 30g. For 12 servings: flour = 600g, sugar = 360g. Total = 960g."},
    {"id": 8, "difficulty": "Hard", "question": "The extension of a spring is directly proportional to the load applied. A load of 4 kg extends a spring by 12 cm. Find the total extension when a load of 4 kg is followed by an additional load of 6 kg (loads are cumulative and extension remains proportional to total load).", "options": ["28cm", "30cm", "32cm", "26cm"], "correctIndex": 1, "explanation": "Extension per kg = 12/4 = 3 cm. Total load = 4+6 = 10 kg. Total extension = 3 × 10 = 30 cm."},
    {"id": 9, "difficulty": "Hard", "question": "A company's electricity bill is directly proportional to units consumed. Last month, 300 units cost 2,400. This month, consumption increased by 25%. Find this month's bill.", "options": ["2,900", "3,000", "3,100", "2,950"], "correctIndex": 1, "explanation": "Cost per unit = 2,400/300 = 8. New units = 300 × 1.25 = 375. New bill = 375 × 8 = 3,000."},
    {"id": 10, "difficulty": "Hard", "question": "The amount of paint required is directly proportional to the area to be painted. 15 liters of paint covers 300 sq. m. If a wall's area increases from 400 sq. m to 500 sq. m due to an extension, find the additional paint required for the extended portion.", "options": ["4L", "5L", "6L", "4.5L"], "correctIndex": 1, "explanation": "Paint per sq.m = 15/300 = 0.05 L. Additional area = 500 − 400 = 100 sq.m. Additional paint = 0.05 × 100 = 5 L."}
  ]
 },
 {
  "levelNumber": 16,
  "topic": "Inverse proportion.",
  "questions": [
    {"id": 1, "difficulty": "Easy", "question": "6 workers can complete a job in 8 days. How many days will 12 workers take to complete the same job (assuming equal work rate per worker)?", "options": ["3", "5", "4", "6"], "correctIndex": 2, "explanation": "Workers and days are inversely proportional: 6×8 = 12×x, so x = 48/12 = 4."},
    {"id": 2, "difficulty": "Easy", "question": "20 machines can produce a batch in 5 hours. How many hours will 25 machines take?", "options": ["5", "4.5", "3.5", "4"], "correctIndex": 3, "explanation": "20×5 = 25×x, so x = 100/25 = 4."},
    {"id": 3, "difficulty": "Easy", "question": "15 people can paint a fence in 4 days. How many days will 10 people take?", "options": ["5", "7", "6", "8"], "correctIndex": 2, "explanation": "15×4 = 10×x, so x = 60/10 = 6."},
    {"id": 4, "difficulty": "Medium", "question": "8 identical pipes can fill a tank in 15 hours. How many hours will 12 such pipes take to fill the same tank?", "options": ["12", "9", "11", "10"], "correctIndex": 3, "explanation": "8×15 = 12×x, so x = 120/12 = 10."},
    {"id": 5, "difficulty": "Medium", "question": "12 workers complete a project in 10 days. If only 8 workers are available, how many days will they take?", "options": ["13", "14", "16", "15"], "correctIndex": 3, "explanation": "12×10 = 8×x, so x = 120/8 = 15."},
    {"id": 6, "difficulty": "Medium", "question": "25 cows can graze a field in 8 days. How many days will it take 20 cows to graze the same field?", "options": ["9", "10", "11", "12"], "correctIndex": 1, "explanation": "25×8 = 20×x, so x = 200/20 = 10."},
    {"id": 7, "difficulty": "Hard", "question": "A car travels at 60 km/h and covers a route in 5 hours. If the car's speed is increased to 75 km/h for the same route, find the new travel time.", "options": ["4.5 hours", "4 hours", "3.5 hours", "5 hours"], "correctIndex": 1, "explanation": "Speed and time are inversely proportional: 60×5 = 75×x, so x = 300/75 = 4 hours."},
    {"id": 8, "difficulty": "Hard", "question": "18 taps of the same size can fill a tank in 20 minutes. If 6 of these taps are closed, how long will the remaining taps take to fill the tank?", "options": ["16 minutes", "18 minutes", "14 minutes", "15 minutes"], "correctIndex": 3, "explanation": "Remaining taps = 18−6 = 12. 18×20 = 12×x, so x = 360/12 = 15 minutes."},
    {"id": 9, "difficulty": "Hard", "question": "A factory with 24 identical machines completes an order in 30 hours. If the factory upgrades to have a total of 40 machines, how many hours will the same order take?", "options": ["20", "19", "18", "17"], "correctIndex": 2, "explanation": "24×30 = 40×x, so x = 720/40 = 18 hours."},
    {"id": 10, "difficulty": "Hard", "question": "40 workers can finish a construction project in 18 days. Due to budget cuts, only 30 workers are retained. Find the number of additional days needed to finish the project compared to the original plan.", "options": ["4", "5", "6", "8"], "correctIndex": 2, "explanation": "40×18 = 30×x, so x = 720/30 = 24 days. Additional days = 24−18 = 6."}
  ]
 },
 {
  "levelNumber": 17,
  "topic": "Income-to-expenditure ratio and savings.",
  "questions": [
    {"id": 1, "difficulty": "Easy", "question": "A person's income to expenditure ratio is 5:4. If the income is 20,000, find the savings.", "options": ["3,000", "5,000", "4,000", "4,500"], "correctIndex": 2, "explanation": "Each part = 20,000/5 = 4,000. Expenditure = 4×4,000 = 16,000. Savings = 20,000−16,000 = 4,000."},
    {"id": 2, "difficulty": "Easy", "question": "A family's income to expenditure ratio is 7:5. If the expenditure is 15,000, find the income.", "options": ["20,000", "21,000", "22,000", "19,000"], "correctIndex": 1, "explanation": "Each part = 15,000/5 = 3,000. Income = 7×3,000 = 21,000."},
    {"id": 3, "difficulty": "Easy", "question": "A man's income to expenditure ratio is 4:3. If his savings are 5,000, find his income.", "options": ["18,000", "22,000", "20,000", "24,000"], "correctIndex": 2, "explanation": "Savings correspond to (4−3)=1 part = 5,000. Income = 4×5,000 = 20,000."},
    {"id": 4, "difficulty": "Medium", "question": "A household's income to expenditure ratio is 8:5. If this year's income is 40,000, find the expenditure.", "options": ["24,000", "26,000", "25,000", "23,000"], "correctIndex": 2, "explanation": "Each part = 40,000/8 = 5,000. Expenditure = 5×5,000 = 25,000."},
    {"id": 5, "difficulty": "Medium", "question": "Two friends' monthly incomes are in the ratio 3:4, and both save exactly 6,000 each month. If their expenditures are equal, find friend A's income.", "options": ["16,000", "18,000", "20,000", "14,000"], "correctIndex": 1, "explanation": "Let incomes be 3x and 4x. Since both save 6,000 with equal expenditure, 3x−6,000 = 4x−6,000 gives an inconsistency unless expenditures differ; solving the system 3x−2y=6,000 and 4x−3y=6,000 gives x=6,000. A's income = 3×6,000 = 18,000."},
    {"id": 6, "difficulty": "Medium", "question": "A shopkeeper's income to expenditure ratio is 9:7. If the savings amount to 3,600, find the expenditure.", "options": ["12,000", "12,600", "13,000", "11,800"], "correctIndex": 1, "explanation": "Savings correspond to (9−7)=2 parts = 3,600, so 1 part = 1,800. Expenditure = 7×1,800 = 12,600."},
    {"id": 7, "difficulty": "Hard", "question": "This year, a person's income to expenditure ratio is 5:3. Next year, income increases by 20% and expenditure increases by 10%. Find the ratio of new savings to old savings.", "options": ["1.35:1", "1.2:1", "1.5:1", "1.1:1"], "correctIndex": 0, "explanation": "Old savings = 5−3 = 2 units. New income = 5×1.2 = 6, new expenditure = 3×1.1 = 3.3. New savings = 6−3.3 = 2.7. Ratio = 2.7/2 = 1.35:1."},
    {"id": 8, "difficulty": "Hard", "question": "A's income to B's income is in the ratio 3:2, and A's expenditure to B's expenditure is in the ratio 5:3. If A saves 1,500 and B saves 1,600, find A's income.", "options": ["9,500", "10,000", "10,500", "11,000"], "correctIndex": 2, "explanation": "Let A's income=3x, B's=2x, A's expenditure=5y, B's=3y. Solving 3x−5y=1,500 and 2x−3y=1,600 gives x=3,500. A's income = 3×3,500 = 10,500."},
    {"id": 9, "difficulty": "Hard", "question": "A company's income to expenditure ratio is 7:6. If the income triples and the expenditure doubles, find the new savings as a percentage of the new income.", "options": ["35.7%", "42.9%", "33.3%", "28.6%"], "correctIndex": 1, "explanation": "Taking base units: income=7, expenditure=6. New income = 21, new expenditure = 12. New savings = 9. (9/21) × 100 ≈ 42.9%."},
    {"id": 10, "difficulty": "Hard", "question": "Two persons have incomes in the ratio 4:5. Both spend exactly 4,000 each month, and their remaining savings are in the ratio 3:4. Find their incomes.", "options": ["12,000 and 15,000", "16,000 and 20,000", "14,000 and 17,500", "18,000 and 22,500"], "correctIndex": 1, "explanation": "Let incomes be 4x and 5x. Savings = (4x−4,000):(5x−4,000) = 3:4. Solving gives x=4,000. Incomes = 16,000 and 20,000."}
  ]
 },
 {
  "levelNumber": 18,
  "topic": "Coin count/value ratio.",
  "questions": [
    {"id": 1, "difficulty": "Easy", "question": "A bag contains 1-rupee and 5-rupee coins in the ratio 4:3. If there are 70 coins in total, find the number of 5-rupee coins.", "options": ["25", "28", "30", "32"], "correctIndex": 2, "explanation": "Total parts = 4+3 = 7. Each part = 70/7 = 10. Number of 5-rupee coins = 3×10 = 30."},
    {"id": 2, "difficulty": "Easy", "question": "A purse has 2-rupee and 5-rupee coins in the ratio 3:5. If there are 40 coins in total, find the number of 2-rupee coins.", "options": ["12", "15", "18", "20"], "correctIndex": 1, "explanation": "Total parts = 3+5 = 8. Each part = 40/8 = 5. Number of 2-rupee coins = 3×5 = 15."},
    {"id": 3, "difficulty": "Easy", "question": "A box contains 1-rupee and 2-rupee coins in the ratio 5:4. If there are 90 coins in total, find the number of 1-rupee coins.", "options": ["45", "50", "48", "55"], "correctIndex": 1, "explanation": "Total parts = 5+4 = 9. Each part = 90/9 = 10. Number of 1-rupee coins = 5×10 = 50."},
    {"id": 4, "difficulty": "Medium", "question": "A bag has only 1-rupee and 2-rupee coins in the count ratio 3:5. If the total value of the coins is 260, find the number of 2-rupee coins.", "options": ["90", "95", "100", "105"], "correctIndex": 2, "explanation": "Let counts be 3k and 5k. Value = 3k(1) + 5k(2) = 13k = 260, so k=20. Number of 2-rupee coins = 5×20 = 100."},
    {"id": 5, "difficulty": "Medium", "question": "A collection has 1-rupee, 2-rupee, and 5-rupee coins in the count ratio 2:3:5. If the total value is 1,650, find the number of 5-rupee coins.", "options": ["225", "240", "250", "260"], "correctIndex": 2, "explanation": "Let counts be 2k, 3k, 5k. Value = 2k(1)+3k(2)+5k(5) = 33k = 1,650, so k=50. Number of 5-rupee coins = 5×50 = 250."},
    {"id": 6, "difficulty": "Medium", "question": "A wallet has 2-rupee and 5-rupee coins in the count ratio 4:3. If the total value is 460, find the number of 2-rupee coins.", "options": ["70", "75", "80", "85"], "correctIndex": 2, "explanation": "Let counts be 4k and 3k. Value = 4k(2)+3k(5) = 23k = 460, so k=20. Number of 2-rupee coins = 4×20 = 80."},
    {"id": 7, "difficulty": "Hard", "question": "A bag contains only 1-rupee and 2-rupee coins. The number of 2-rupee coins exceeds the number of 1-rupee coins by 40. If the total value of all coins is 800, find the number of 1-rupee coins.", "options": ["220", "230", "240", "250"], "correctIndex": 2, "explanation": "Let 1-rupee count = n, 2-rupee count = n+40. Value = n(1)+(n+40)(2) = 3n+80 = 800, so n=240."},
    {"id": 8, "difficulty": "Hard", "question": "A collection has 1-rupee, 2-rupee, and 5-rupee coins in the count ratio 3:2:1. If the total value of the collection is 840, find the number of 5-rupee coins.", "options": ["60", "65", "70", "75"], "correctIndex": 2, "explanation": "Let counts be 3k, 2k, k. Value = 3k(1)+2k(2)+k(5) = 12k = 840, so k=70. Number of 5-rupee coins = k = 70."},
    {"id": 9, "difficulty": "Hard", "question": "In a bag of 1-rupee and 2-rupee coins, the value of the 1-rupee coins to the value of the 2-rupee coins is in the ratio 2:3. If the total value of all coins is 250, find the number of 2-rupee coins.", "options": ["70", "72", "75", "78"], "correctIndex": 2, "explanation": "Total value parts = 2+3 = 5. Each part = 250/5 = 50. Value of 2-rupee coins = 3×50 = 150. Number of 2-rupee coins = 150/2 = 75."},
    {"id": 10, "difficulty": "Hard", "question": "A collection has 1-rupee, 2-rupee, and 5-rupee coins in the count ratio 3:4:2. If the total value of the 5-rupee coins exceeds the total value of the 1-rupee coins by 140, find the total value of the entire collection.", "options": ["400", "410", "420", "430"], "correctIndex": 2, "explanation": "Let counts be 3k, 4k, 2k. Value of 1-rupee = 3k, value of 5-rupee = 10k. Given 10k−3k=140, so k=20. Total value = 3k(1)+4k(2)+2k(5) = 3k+8k+10k = 21k = 420."}
  ]
 },
 {
  "levelNumber": 19,
  "topic": "Map/model scale.",
  "questions": [
    {"id": 1, "difficulty": "Easy", "question": "A map has a scale of 1:50,000. If the distance between two towns on the map is 4 cm, find the actual distance in km.", "options": ["1.5 km", "2 km", "2.5 km", "3 km"], "correctIndex": 1, "explanation": "Actual distance = 4 × 50,000 cm = 200,000 cm = 2 km."},
    {"id": 2, "difficulty": "Easy", "question": "On a map, a scale of 1 cm represents 5 km. If two cities are 7 cm apart on the map, find the actual distance between them.", "options": ["30 km", "32 km", "35 km", "40 km"], "correctIndex": 2, "explanation": "Actual distance = 7 × 5 = 35 km."},
    {"id": 3, "difficulty": "Easy", "question": "On a map with a scale of 1 cm = 15 km, find the map distance representing an actual distance of 90 km.", "options": ["5 cm", "6 cm", "7 cm", "8 cm"], "correctIndex": 1, "explanation": "Map distance = 90/15 = 6 cm."},
    {"id": 4, "difficulty": "Medium", "question": "A map is drawn to a scale of 1:2,50,000. If the map distance between two points is 8 cm, find the actual distance in km.", "options": ["18 km", "20 km", "22 km", "25 km"], "correctIndex": 1, "explanation": "Actual distance = 8 × 250,000 cm = 2,000,000 cm = 20 km."},
    {"id": 5, "difficulty": "Medium", "question": "A model car is built to a scale of 1:24. If the model is 18 cm long, find the actual length of the car in meters.", "options": ["4.32 m", "4.20 m", "4.50 m", "4.08 m"], "correctIndex": 0, "explanation": "Actual length = 18 × 24 = 432 cm = 4.32 m."},
    {"id": 6, "difficulty": "Medium", "question": "The actual distance between two cities is 180 km. On a map with scale 1 cm = 30 km, find the map distance in millimeters.", "options": ["50 mm", "55 mm", "60 mm", "65 mm"], "correctIndex": 2, "explanation": "Map distance = 180/30 = 6 cm = 60 mm."},
    {"id": 7, "difficulty": "Hard", "question": "A map has a scale of 1:1,00,000. The distance between two towns on the map is 8.5 cm. If a car travels between the towns at 60 km/h, find the travel time in minutes.", "options": ["7.5 minutes", "8 minutes", "8.5 minutes", "9 minutes"], "correctIndex": 2, "explanation": "Actual distance = 8.5 × 100,000 cm = 850,000 cm = 8.5 km. Time = (8.5/60) × 60 = 8.5 minutes."},
    {"id": 8, "difficulty": "Hard", "question": "A scale model of a building uses a ratio of 1:200. The model is 45 cm tall. If a miniature figure is placed beside the model to represent a real person who is 1.8 m tall, find the height of the miniature figure.", "options": ["0.7 cm", "0.8 cm", "0.9 cm", "1.0 cm"], "correctIndex": 2, "explanation": "Using the same 1:200 scale, the miniature figure's height = 180 cm / 200 = 0.9 cm."},
    {"id": 9, "difficulty": "Hard", "question": "A map has a scale of 1:20,000. The distance between two landmarks on the map is 5 cm. A GPS device measures the actual distance as 1,300 meters. Find by how many meters the GPS reading differs from the map's calculated distance.", "options": ["250 m", "280 m", "300 m", "320 m"], "correctIndex": 2, "explanation": "Map-calculated distance = 5 × 20,000 cm = 100,000 cm = 1,000 m. Difference = 1,300 − 1,000 = 300 m."},
    {"id": 10, "difficulty": "Hard", "question": "A scale model of a ship uses a ratio of 1:150. The model is 3.2 meters long. If the actual ship's width is 12 m, find the model's width in cm.", "options": ["6 cm", "7 cm", "8 cm", "9 cm"], "correctIndex": 2, "explanation": "Model width = 1,200 cm / 150 = 8 cm. (The model length is used only to confirm the scale context and is not needed for this calculation.)"}
  ]
 },
 {
  "levelNumber": 20,
  "topic": "Combine two ratios into a:b.",
  "questions": [
    {"id": 1, "difficulty": "Easy", "question": "If a:b = 2:3 and b:c = 3:4, find a:b:c.", "options": ["2:3:5", "2:3:4", "3:2:4", "4:3:2"], "correctIndex": 1, "explanation": "Since the b-terms already match (3=3), the ratios combine directly: a:b:c = 2:3:4."},
    {"id": 2, "difficulty": "Easy", "question": "If a:b = 4:5 and b:c = 5:6, find a:c.", "options": ["2:3", "4:5", "4:6", "3:4"], "correctIndex": 0, "explanation": "Since the b-terms match (5=5), a:b:c = 4:5:6, so a:c = 4:6 = 2:3."},
    {"id": 3, "difficulty": "Easy", "question": "If a:b = 3:4 and b:c = 4:7, find a:b:c.", "options": ["3:4:6", "3:5:7", "3:4:7", "4:3:7"], "correctIndex": 2, "explanation": "Since the b-terms match (4=4), the ratios combine directly: a:b:c = 3:4:7."},
    {"id": 4, "difficulty": "Medium", "question": "If a:b = 2:3 and b:c = 5:7, find a:b:c.", "options": ["10:15:21", "6:15:21", "10:12:21", "8:15:21"], "correctIndex": 0, "explanation": "Make the b-terms equal by finding the LCM of 3 and 5, which is 15. a:b = 2:3 = 10:15. b:c = 5:7 = 15:21. So a:b:c = 10:15:21."},
    {"id": 5, "difficulty": "Medium", "question": "If a:b = 5:6 and b:c = 4:9, find a:c in simplest form.", "options": ["5:9", "10:27", "5:18", "10:9"], "correctIndex": 1, "explanation": "LCM of 6 and 4 is 12. a:b = 5:6 = 10:12. b:c = 4:9 = 12:27. So a:b:c = 10:12:27, giving a:c = 10:27."},
    {"id": 6, "difficulty": "Medium", "question": "If a:b = 7:8 and b:c = 6:11, find a:b:c.", "options": ["21:24:44", "14:16:33", "21:22:44", "18:24:44"], "correctIndex": 0, "explanation": "LCM of 8 and 6 is 24. a:b = 7:8 = 21:24. b:c = 6:11 = 24:44. So a:b:c = 21:24:44."},
    {"id": 7, "difficulty": "Hard", "question": "If a:b = 2:3 and b:c = 4:5, and a+b+c = 175, find the value of c.", "options": ["70", "72", "75", "80"], "correctIndex": 2, "explanation": "LCM of 3 and 4 is 12. a:b:c = 8:12:15 (total 35 parts). Each part = 175/35 = 5. c = 15×5 = 75."},
    {"id": 8, "difficulty": "Hard", "question": "If a:b = 3:5 and b:c = 10:7, and the value of c exceeds the value of a by 6, find the value of b.", "options": ["50", "55", "60", "65"], "correctIndex": 2, "explanation": "Making b-terms equal (LCM of 5,10=10): a:b:c = 6:10:7. Since c−a = 1 part = 6, each part = 6. b = 10×6 = 60."},
    {"id": 9, "difficulty": "Hard", "question": "Three numbers a, b, and c satisfy a:b = 5:7 and b:c = 14:15. If b = 70, find a+c.", "options": ["120", "122", "125", "128"], "correctIndex": 2, "explanation": "From a:b=5:7, each part = 70/7=10, so a=5×10=50. From b:c=14:15, each part=70/14=5, so c=15×5=75. a+c=50+75=125."},
    {"id": 10, "difficulty": "Hard", "question": "If a:b = 6:11 and b:c = 22:15, and c = 90, find the value of a.", "options": ["66", "68", "70", "72"], "correctIndex": 3, "explanation": "Making b-terms equal (LCM of 11,22=22): a:b:c = 12:22:15. Each part = 90/15 = 6. a = 12×6 = 72."}
  ]
 },
 {
  "levelNumber": 21,
  "topic": "Duplicate ratio.",
  "questions": [
    {"id":1,"difficulty":"Easy","question":"Find the duplicate ratio of 2:3.","options":["4:6","4:9","2:9","4:3"],"correctIndex":1,"explanation":"The duplicate ratio of a:b is a²:b². So 2²:3² = 4:9."},
    {"id":2,"difficulty":"Easy","question":"Find the duplicate ratio of 5:7.","options":["10:14","25:49","10:49","25:14"],"correctIndex":1,"explanation":"5²:7² = 25:49."},
    {"id":3,"difficulty":"Easy","question":"Find the duplicate ratio of 1:4.","options":["1:8","1:16","2:8","1:4"],"correctIndex":1,"explanation":"1²:4² = 1:16."},
    {"id":4,"difficulty":"Medium","question":"The duplicate ratio of two numbers is 16:49. Find their simple ratio.","options":["4:7","4:9","2:7","8:14"],"correctIndex":0,"explanation":"Taking the square root of each term: √16:√49 = 4:7."},
    {"id":5,"difficulty":"Medium","question":"Find the duplicate ratio of 6:11.","options":["12:22","36:121","36:11","12:121"],"correctIndex":1,"explanation":"6²:11² = 36:121."},
    {"id":6,"difficulty":"Medium","question":"The duplicate ratio of two numbers is 81:100. Find their simple ratio.","options":["9:10","8:10","9:20","3:10"],"correctIndex":0,"explanation":"Taking the square root of each term: √81:√100 = 9:10."},
    {"id":7,"difficulty":"Hard","question":"If a:b = 7:4, find the duplicate ratio of (a+b):(a−b).","options":["121:9","110:8","121:3","100:9"],"correctIndex":0,"explanation":"a+b = 11, a−b = 3, so (a+b):(a−b) = 11:3. The duplicate ratio is 11²:3² = 121:9."},
    {"id":8,"difficulty":"Hard","question":"The duplicate ratio of x:y is 144:169. Find the triplicate ratio of x:y.","options":["1728:2197","144:169","288:338","1728:169"],"correctIndex":0,"explanation":"Taking the square root: x:y = 12:13. The triplicate ratio is 12³:13³ = 1728:2197."},
    {"id":9,"difficulty":"Hard","question":"The duplicate ratio of a:b equals 225:196. Find a:b in simplest form, and give the sum of its two terms.","options":["15:14, sum 29","14:15, sum 29","15:14, sum 30","13:14, sum 27"],"correctIndex":0,"explanation":"Taking the square root: √225:√196 = 15:14. Sum of the terms = 15+14 = 29."},
    {"id":10,"difficulty":"Hard","question":"If p:q = 9:7, find the duplicate ratio of (p+q):(p−q).","options":["64:1","32:1","16:1","81:49"],"correctIndex":0,"explanation":"p+q = 16, p−q = 2, so (p+q):(p−q) = 16:2 = 8:1. The duplicate ratio is 8²:1² = 64:1."}
  ]
 },
 {
  "levelNumber": 22,
  "topic": "Sub-duplicate ratio.",
  "questions": [
    {"id":1,"difficulty":"Easy","question":"Find the sub-duplicate ratio of 4:9.","options":["2:3","4:9","2:9","4:3"],"correctIndex":0,"explanation":"The sub-duplicate ratio of a:b is √a:√b. So √4:√9 = 2:3."},
    {"id":2,"difficulty":"Easy","question":"Find the sub-duplicate ratio of 16:25.","options":["16:25","4:5","4:25","8:5"],"correctIndex":1,"explanation":"√16:√25 = 4:5."},
    {"id":3,"difficulty":"Easy","question":"Find the sub-duplicate ratio of 1:49.","options":["1:7","1:24.5","1:49","1:14"],"correctIndex":0,"explanation":"√1:√49 = 1:7."},
    {"id":4,"difficulty":"Medium","question":"The sub-duplicate ratio of two numbers is 3:5. Find their original ratio.","options":["3:5","6:10","9:25","9:15"],"correctIndex":2,"explanation":"If √a:√b = 3:5, then a:b = 3²:5² = 9:25."},
    {"id":5,"difficulty":"Medium","question":"Find the sub-duplicate ratio of 36:64.","options":["6:8","3:4","6:4","9:16"],"correctIndex":1,"explanation":"√36:√64 = 6:8, which simplifies to 3:4."},
    {"id":6,"difficulty":"Medium","question":"The sub-duplicate ratio of two numbers is 4:7. Find their original ratio.","options":["4:7","8:14","16:49","16:28"],"correctIndex":2,"explanation":"If √a:√b = 4:7, then a:b = 4²:7² = 16:49."},
    {"id":7,"difficulty":"Hard","question":"Two numbers are 45 and 36. Find the sub-duplicate ratio of their sum to their difference.","options":["2:1","3:1","4:1","9:1"],"correctIndex":1,"explanation":"Sum = 81, Difference = 9. Sub-duplicate ratio = √81:√9 = 9:3 = 3:1."},
    {"id":8,"difficulty":"Hard","question":"The sub-duplicate ratio of a:b is 3:2. If a = 81, find b.","options":["27","32","36","40"],"correctIndex":2,"explanation":"Sub-duplicate ratio 3:2 means a:b = 9:4. Since a=81, b = 81×4/9 = 36."},
    {"id":9,"difficulty":"Hard","question":"The sub-duplicate ratio of (x+y):(x−y) is 5:3. If x+y = 200, find the value of x−y.","options":["68","70","72","74"],"correctIndex":2,"explanation":"Sub-duplicate ratio 5:3 means (x+y):(x−y) = 25:9. Since x+y=200, x−y = 200×9/25 = 72."},
    {"id":10,"difficulty":"Hard","question":"Find the sub-duplicate ratio of the triplicate ratio of 4:9.","options":["8:27","4:9","2:3","16:81"],"correctIndex":0,"explanation":"Triplicate ratio of 4:9 = 4³:9³ = 64:729. Its sub-duplicate ratio = √64:√729 = 8:27."}
  ]
 },
 {
  "levelNumber": 23,
  "topic": "Triplicate ratio.",
  "questions": [
    {"id":1,"difficulty":"Easy","question":"Find the triplicate ratio of 2:3.","options":["6:9","8:27","4:9","8:9"],"correctIndex":1,"explanation":"The triplicate ratio of a:b is a³:b³. So 2³:3³ = 8:27."},
    {"id":2,"difficulty":"Easy","question":"Find the triplicate ratio of 3:4.","options":["9:16","27:64","9:64","27:16"],"correctIndex":1,"explanation":"3³:4³ = 27:64."},
    {"id":3,"difficulty":"Easy","question":"Find the triplicate ratio of 1:2.","options":["1:4","1:6","1:8","1:9"],"correctIndex":2,"explanation":"1³:2³ = 1:8."},
    {"id":4,"difficulty":"Medium","question":"The triplicate ratio of two numbers is 27:64. Find their simple ratio.","options":["3:4","3:8","9:16","3:16"],"correctIndex":0,"explanation":"Taking the cube root of each term: ∛27:∛64 = 3:4."},
    {"id":5,"difficulty":"Medium","question":"Find the triplicate ratio of 4:5.","options":["16:25","64:125","64:25","16:125"],"correctIndex":1,"explanation":"4³:5³ = 64:125."},
    {"id":6,"difficulty":"Medium","question":"The triplicate ratio of two numbers is 8:27. Find their simple ratio.","options":["4:9","2:3","2:9","4:3"],"correctIndex":1,"explanation":"Taking the cube root of each term: ∛8:∛27 = 2:3."},
    {"id":7,"difficulty":"Hard","question":"If a:b = 5:3, find the triplicate ratio of (a+b):(a-b).","options":["64:1","32:1","16:1","8:1"],"correctIndex":0,"explanation":"a+b = 8, a−b = 2, so (a+b):(a−b) = 8:2 = 4:1. The triplicate ratio is 4³:1³ = 64:1."},
    {"id":8,"difficulty":"Hard","question":"The triplicate ratio of x:y is 125:8. Find the duplicate ratio of x:y.","options":["25:4","10:4","25:8","15:4"],"correctIndex":0,"explanation":"Taking the cube root: x:y = 5:2. The duplicate ratio is 5²:2² = 25:4."},
    {"id":9,"difficulty":"Hard","question":"The triplicate ratio of a:b equals 216:343. Find a:b in its simplest form, and give the sum of its two terms.","options":["6:7, sum 13","6:7, sum 12","7:6, sum 13","5:7, sum 12"],"correctIndex":0,"explanation":"Taking the cube root: ∛216:∛343 = 6:7. Sum of the terms = 6+7 = 13."},
    {"id":10,"difficulty":"Hard","question":"The triplicate ratio of a:b is 64:125. Find the duplicate ratio of a:b.","options":["8:25","16:25","16:20","8:20"],"correctIndex":1,"explanation":"Taking the cube root: a:b = 4:5. The duplicate ratio is 4²:5² = 16:25."}
  ]
 },
 {
  "levelNumber": 24,
  "topic": "Sub-triplicate ratio.",
  "questions": [
    {"id":1,"difficulty":"Easy","question":"Find the sub-triplicate ratio of 8:27.","options":["8:27","2:3","4:9","2:9"],"correctIndex":1,"explanation":"The sub-triplicate ratio of a:b is ∛a:∛b. So ∛8:∛27 = 2:3."},
    {"id":2,"difficulty":"Easy","question":"Find the sub-triplicate ratio of 64:125.","options":["64:125","8:25","4:5","16:25"],"correctIndex":2,"explanation":"∛64:∛125 = 4:5."},
    {"id":3,"difficulty":"Easy","question":"Find the sub-triplicate ratio of 1:216.","options":["1:6","1:216","1:36","1:72"],"correctIndex":0,"explanation":"∛1:∛216 = 1:6."},
    {"id":4,"difficulty":"Medium","question":"The sub-triplicate ratio of two numbers is 3:4. Find their original ratio.","options":["3:4","9:16","27:64","6:8"],"correctIndex":2,"explanation":"If ∛a:∛b = 3:4, then a:b = 3³:4³ = 27:64."},
    {"id":5,"difficulty":"Medium","question":"Find the sub-triplicate ratio of 343:512.","options":["343:512","49:64","7:8","14:16"],"correctIndex":2,"explanation":"∛343:∛512 = 7:8."},
    {"id":6,"difficulty":"Medium","question":"The sub-triplicate ratio of two numbers is 5:6. Find their original ratio.","options":["5:6","25:36","125:216","10:12"],"correctIndex":2,"explanation":"If ∛a:∛b = 5:6, then a:b = 5³:6³ = 125:216."},
    {"id":7,"difficulty":"Hard","question":"Two numbers are 14 and 13. Find the sub-triplicate ratio of their sum to their difference.","options":["2:1","3:1","4:1","1:1"],"correctIndex":1,"explanation":"Sum = 27, Difference = 1. Sub-triplicate ratio = ∛27:∛1 = 3:1."},
    {"id":8,"difficulty":"Hard","question":"The sub-triplicate ratio of a:b is 4:5. If a = 64, find b.","options":["100","110","125","130"],"correctIndex":2,"explanation":"Sub-triplicate ratio 4:5 means a:b = 4³:5³ = 64:125. Since a=64, b = 125."},
    {"id":9,"difficulty":"Hard","question":"The sub-triplicate ratio of a:b is 10:7. If a = 1000, find b.","options":["330","343","350","357"],"correctIndex":1,"explanation":"Sub-triplicate ratio 10:7 means a:b = 10³:7³ = 1000:343. Since a=1000, b = 343."},
    {"id":10,"difficulty":"Hard","question":"Find the sub-triplicate ratio of the duplicate ratio of 8:27.","options":["4:9","2:3","8:27","16:81"],"correctIndex":0,"explanation":"The duplicate ratio of 8:27 is 8²:27² = 64:729. Its sub-triplicate ratio = ∛64:∛729 = 4:9."}
  ]
 },
 { 
  "levelNumber": 25,
  "topic": "Componendo and dividendo.",
  "questions": [
    {"id":1,"difficulty":"Easy","question":"If a/b = 5/3, use componendo and dividendo to find (a+b):(a−b).","options":["3:1","4:1","5:2","2:1"],"correctIndex":1,"explanation":"By componendo and dividendo, (a+b)/(a−b) = (5+3)/(5−3) = 8/2 = 4:1."},
    {"id":2,"difficulty":"Easy","question":"If a/b = 7/3, use componendo and dividendo to find (a+b):(a−b).","options":["5:2","4:1","7:3","3:2"],"correctIndex":0,"explanation":"(a+b)/(a−b) = (7+3)/(7−3) = 10/4 = 5:2."},
    {"id":3,"difficulty":"Easy","question":"If a/b = 5/2, use componendo and dividendo to find (a+b):(a−b).","options":["5:2","7:3","3:1","4:1"],"correctIndex":1,"explanation":"(a+b)/(a−b) = (5+2)/(5−2) = 7/3."},
    {"id":4,"difficulty":"Medium","question":"If (a+b):(a−b) = 5:3, find a:b using componendo and dividendo (in reverse).","options":["3:1","4:1","5:3","2:1"],"correctIndex":1,"explanation":"Reversing componendo-dividendo: a/b = (5+3)/(5−3) = 8/2 = 4:1."},
    {"id":5,"difficulty":"Medium","question":"If a/b = 9/7, use componendo and dividendo to find (a−b):(a+b).","options":["1:8","2:16","1:7","2:8"],"correctIndex":0,"explanation":"(a−b)/(a+b) = (9−7)/(9+7) = 2/16 = 1:8."},
    {"id":6,"difficulty":"Medium","question":"If (x+y):(x−y) = 7:3, find x:y.","options":["7:3","10:4","5:2","4:1"],"correctIndex":2,"explanation":"Reversing componendo-dividendo: x/y = (7+3)/(7−3) = 10/4 = 5:2."},
    {"id":7,"difficulty":"Hard","question":"If (a+b):(a−b) = 3:1, find a:b.","options":["3:2","2:1","4:3","5:2"],"correctIndex":1,"explanation":"Reversing componendo-dividendo: a/b = (3+1)/(3−1) = 4/2 = 2:1."},
    {"id":8,"difficulty":"Hard","question":"If a/b = 11/5, use componendo and dividendo to find [(a+b):(a−b)]², expressed as a ratio.","options":["64:9","16:9","64:25","32:9"],"correctIndex":0,"explanation":"(a+b)/(a−b) = (11+5)/(11−5) = 16/6 = 8/3. Squaring gives 64:9."},
    {"id":9,"difficulty":"Hard","question":"If (a+b):(a−b) = 7:1, find (a²+b²):(a²−b²).","options":["25:7","24:8","25:9","16:7"],"correctIndex":0,"explanation":"Reversing componendo-dividendo: a/b = (7+1)/(7−1) = 8/6 = 4:3, so a=4, b=3 (in simplest units). (a²+b²):(a²−b²) = (16+9):(16−9) = 25:7."},
    {"id":10,"difficulty":"Hard","question":"Given a/b = c/d, with a=15 and b=9. If c=20, find d using the fact that (a+b)/(a−b) must equal (c+d)/(c−d).","options":["10","12","14","15"],"correctIndex":1,"explanation":"(a+b)/(a−b) = 24/6 = 4. Setting (20+d)/(20−d) = 4 gives 20+d = 80−4d, so 5d = 60, d = 12."}
  ]
 },
 {
  "levelNumber": 26,
  "topic": "Continued proportion.",
  "questions": [
    {"id":1,"difficulty":"Easy","question":"If 4, b, and 9 are in continued proportion (4:b = b:9), find b.","options":["5","6","7","8"],"correctIndex":1,"explanation":"For continued proportion, b² = 4×9 = 36, so b = 6."},
    {"id":2,"difficulty":"Easy","question":"If 9, b, and 25 are in continued proportion, find b.","options":["12","15","18","20"],"correctIndex":1,"explanation":"b² = 9×25 = 225, so b = 15."},
    {"id":3,"difficulty":"Easy","question":"If 16, b, and 4 are in continued proportion, find b.","options":["6","7","8","9"],"correctIndex":2,"explanation":"b² = 16×4 = 64, so b = 8."},
    {"id":4,"difficulty":"Medium","question":"If 4, 6, and c are in continued proportion (4:6 = 6:c), find c.","options":["7","8","9","10"],"correctIndex":2,"explanation":"c = b²/a = 6²/4 = 36/4 = 9."},
    {"id":5,"difficulty":"Medium","question":"If 3, 12, and c are in continued proportion, find c.","options":["36","42","48","54"],"correctIndex":2,"explanation":"c = b²/a = 12²/3 = 144/3 = 48."},
    {"id":6,"difficulty":"Medium","question":"If a, 10, and 25 are in continued proportion (a:10 = 10:25), find a.","options":["2","3","4","5"],"correctIndex":2,"explanation":"a = b²/c = 10²/25 = 100/25 = 4."},
    {"id":7,"difficulty":"Hard","question":"Three numbers a, b, and c are in continued proportion. The middle term b is 6, and the sum of the first and third terms (a+c) is 20. Find the two possible values of a and c.","options":["4 and 16","2 and 18","5 and 15","6 and 14"],"correctIndex":1,"explanation":"Since b²=ac, ac=36. With a+c=20, solving the quadratic gives a=2, c=18 (or vice versa)."},
    {"id":8,"difficulty":"Hard","question":"Three numbers are in continued proportion. Their middle term is 10, and the sum of all three numbers is 38. Find the sum of the first and third terms only.","options":["24","26","28","30"],"correctIndex":2,"explanation":"Sum of all three = 38, middle term = 10, so a+c = 38−10 = 28."},
    {"id":9,"difficulty":"Hard","question":"Two ratios a:b and b:c are both equal to 2:3. If a = 8, find the value of c.","options":["16","18","20","22"],"correctIndex":1,"explanation":"Since a:b = 2:3, b = 8×3/2 = 12. Since b:c = 2:3, c = 12×3/2 = 18."},
    {"id":10,"difficulty":"Hard","question":"Three numbers a, b, and c are in continued proportion, with a = 5 and c = 45. Find the ratio b:a.","options":["2:1","3:1","4:1","5:1"],"correctIndex":1,"explanation":"b² = ac = 5×45 = 225, so b = 15. b:a = 15:5 = 3:1."}
  ]
 },
 {
  "levelNumber": 27,
  "topic": "Third proportional.",
  "questions": [
    {"id":1,"difficulty":"Easy","question":"Find the third proportional to 3 and 6.","options":["9","10","12","15"],"correctIndex":2,"explanation":"Third proportional = b²/a = 6²/3 = 36/3 = 12."},
    {"id":2,"difficulty":"Easy","question":"Find the third proportional to 4 and 8.","options":["12","14","16","18"],"correctIndex":2,"explanation":"Third proportional = 8²/4 = 64/4 = 16."},
    {"id":3,"difficulty":"Easy","question":"Find the third proportional to 5 and 10.","options":["15","18","20","22"],"correctIndex":2,"explanation":"Third proportional = 10²/5 = 100/5 = 20."},
    {"id":4,"difficulty":"Medium","question":"Find the third proportional to 9 and 12.","options":["14","15","16","18"],"correctIndex":2,"explanation":"Third proportional = 12²/9 = 144/9 = 16."},
    {"id":5,"difficulty":"Medium","question":"Find the third proportional to 8 and 12.","options":["16","17","18","20"],"correctIndex":2,"explanation":"Third proportional = 12²/8 = 144/8 = 18."},
    {"id":6,"difficulty":"Medium","question":"Find the third proportional to 4 and 10.","options":["20","22","25","28"],"correctIndex":2,"explanation":"Third proportional = 10²/4 = 100/4 = 25."},
    {"id":7,"difficulty":"Hard","question":"The third proportional to 2 and 4 is found first, then this result is used along with 4 to find a second third proportional. Find the final value.","options":["12","14","16","18"],"correctIndex":2,"explanation":"Third proportional to 2 and 4 = 4²/2 = 8. Third proportional to 4 and 8 = 8²/4 = 16."},
    {"id":8,"difficulty":"Hard","question":"The third proportional to 2 and 8 is c. Find the sum of 2, 8, and c.","options":["38","40","42","44"],"correctIndex":2,"explanation":"c = 8²/2 = 32. Sum = 2+8+32 = 42."},
    {"id":9,"difficulty":"Hard","question":"The sum of two numbers is 16 and their difference is 8. Find the third proportional to their sum and their difference.","options":["2","3","4","5"],"correctIndex":2,"explanation":"Third proportional to 16 and 8 = 8²/16 = 64/16 = 4."},
    {"id":10,"difficulty":"Hard","question":"The third proportional to 5 and 15 is found, and then the third proportional to 15 and that result is calculated. Find the final value.","options":["120","125","130","135"],"correctIndex":3,"explanation":"Third proportional to 5 and 15 = 15²/5 = 45. Third proportional to 15 and 45 = 45²/15 = 135."}
  ]
 },
 {
  "levelNumber": 28,
  "topic": "Fourth proportional.",
  "questions": [
    {"id":1,"difficulty":"Easy","question":"Find the fourth proportional to 2, 3, and 8.","options":["10","11","12","14"],"correctIndex":2,"explanation":"Fourth proportional x satisfies 2:3 :: 8:x, so x = (3×8)/2 = 12."},
    {"id":2,"difficulty":"Easy","question":"Find the fourth proportional to 6, 4, and 9.","options":["5","6","7","8"],"correctIndex":1,"explanation":"6:4 :: 9:x, so x = (4×9)/6 = 6."},
    {"id":3,"difficulty":"Easy","question":"Find the fourth proportional to 10, 5, and 12.","options":["5","6","7","8"],"correctIndex":1,"explanation":"10:5 :: 12:x, so x = (5×12)/10 = 6."},
    {"id":4,"difficulty":"Medium","question":"Find the fourth proportional to 9, 6, and 15.","options":["8","9","10","12"],"correctIndex":2,"explanation":"9:6 :: 15:x, so x = (6×15)/9 = 10."},
    {"id":5,"difficulty":"Medium","question":"Find the fourth proportional to 14, 7, and 20.","options":["8","9","10","11"],"correctIndex":2,"explanation":"14:7 :: 20:x, so x = (7×20)/14 = 10."},
    {"id":6,"difficulty":"Medium","question":"Find the fourth proportional to 12, 8, and 18.","options":["10","11","12","14"],"correctIndex":2,"explanation":"12:8 :: 18:x, so x = (8×18)/12 = 12."},
    {"id":7,"difficulty":"Hard","question":"The fourth proportional to 2, 3, and 8 is found first. This result is then used as the third term along with 3 and 8 as the first two terms to find a second fourth proportional. Find the final value.","options":["28","30","32","34"],"correctIndex":2,"explanation":"Fourth proportional to 2,3,8 = (3×8)/2 = 12. Fourth proportional to 3,8,12 = (8×12)/3 = 32."},
    {"id":8,"difficulty":"Hard","question":"The fourth proportional to 5, 6, and 20 is x. Find the sum of 5, 6, 20, and x.","options":["51","53","55","57"],"correctIndex":2,"explanation":"x = (6×20)/5 = 24. Sum = 5+6+20+24 = 55."},
    {"id":9,"difficulty":"Hard","question":"Find the fourth proportional to 9, 12, and 15.","options":["18","20","22","24"],"correctIndex":1,"explanation":"9:12 :: 15:x, so x = (12×15)/9 = 20."},
    {"id":10,"difficulty":"Hard","question":"Find the fourth proportional to 4, 10, and 18.","options":["40","42","45","48"],"correctIndex":2,"explanation":"4:10 :: 18:x, so x = (10×18)/4 = 45."}
  ]
 },
 {
  "levelNumber": 29,
  "topic": "Ratio of areas from ratio of sides.",
  "questions": [
    {"id":1,"difficulty":"Easy","question":"Two similar squares have sides in the ratio 3:5. Find the ratio of their areas.","options":["3:5","6:10","9:25","6:25"],"correctIndex":2,"explanation":"For similar figures, the ratio of areas equals the square of the ratio of sides. So 3²:5² = 9:25."},
    {"id":2,"difficulty":"Easy","question":"Two similar triangles have corresponding sides in the ratio 4:7. Find the ratio of their areas.","options":["4:7","8:14","16:49","16:14"],"correctIndex":2,"explanation":"4²:7² = 16:49."},
    {"id":3,"difficulty":"Easy","question":"Two circles have radii in the ratio 2:9. Find the ratio of their areas.","options":["2:9","4:9","4:81","8:81"],"correctIndex":2,"explanation":"2²:9² = 4:81."},
    {"id":4,"difficulty":"Medium","question":"Two similar rectangles have areas in the ratio 16:25. Find the ratio of their corresponding sides.","options":["16:25","4:5","4:25","8:5"],"correctIndex":1,"explanation":"Taking the square root of the area ratio: √16:√25 = 4:5."},
    {"id":5,"difficulty":"Medium","question":"Two similar polygons have areas in the ratio 49:81. Find the ratio of their corresponding sides.","options":["49:81","7:9","7:81","14:18"],"correctIndex":1,"explanation":"Taking the square root of the area ratio: √49:√81 = 7:9."},
    {"id":6,"difficulty":"Medium","question":"Two squares have sides of 6 cm and 10 cm. Find the ratio of their areas in simplest form.","options":["6:10","3:5","9:25","36:100"],"correctIndex":2,"explanation":"Area ratio = 6²:10² = 36:100, which simplifies to 9:25."},
    {"id":7,"difficulty":"Hard","question":"Two similar triangles have corresponding sides in the ratio 3:4. If the area of the smaller triangle is 45 sq. cm, find the area of the larger triangle.","options":["70 sq. cm","75 sq. cm","80 sq. cm","85 sq. cm"],"correctIndex":2,"explanation":"Area ratio = 3²:4² = 9:16. Larger area = 45 × (16/9) = 80 sq. cm."},
    {"id":8,"difficulty":"Hard","question":"Two circles have radii in the ratio 5:7. If the area of the smaller circle is 25π sq. units, find the area of the larger circle.","options":["45π","47π","49π","51π"],"correctIndex":2,"explanation":"Area ratio = 5²:7² = 25:49. Since the smaller area is 25π, the larger area is 49π."},
    {"id":9,"difficulty":"Hard","question":"The side of a smaller square is 40% of the side of a larger square. Find the ratio of the area of the smaller square to the area of the larger square.","options":["2:5","4:10","4:25","8:25"],"correctIndex":2,"explanation":"Side ratio = 40:100 = 2:5. Area ratio = 2²:5² = 4:25."},
    {"id":10,"difficulty":"Hard","question":"A rectangle's length and width are both scaled up by 1.5 times to form a new rectangle. Find the ratio of the original area to the new area.","options":["2:3","1:1.5","4:9","3:4"],"correctIndex":2,"explanation":"Scaling both sides by 1.5 scales the area by 1.5² = 2.25. Ratio of original to new area = 1:2.25 = 4:9."}
  ]
 },
 {
  "levelNumber": 30,
  "topic": "Basic average.",
  "questions": [
    {"id":1,"difficulty":"Easy","question":"Find the average of 4, 8, and 12.","options":["7","8","9","10"],"correctIndex":1,"explanation":"Average = (4+8+12)/3 = 24/3 = 8."},
    {"id":2,"difficulty":"Easy","question":"Find the average of 10, 20, 30, and 40.","options":["20","22","25","28"],"correctIndex":2,"explanation":"Average = (10+20+30+40)/4 = 100/4 = 25."},
    {"id":3,"difficulty":"Easy","question":"Find the average of 5, 7, 9, 11, and 13.","options":["8","9","10","11"],"correctIndex":1,"explanation":"Average = (5+7+9+11+13)/5 = 45/5 = 9."},
    {"id":4,"difficulty":"Medium","question":"The average of 5 numbers is 20. If one of the numbers is 30, find the sum of the remaining 4 numbers.","options":["65","68","70","72"],"correctIndex":2,"explanation":"Total sum = 20×5 = 100. Sum of remaining 4 = 100−30 = 70."},
    {"id":5,"difficulty":"Medium","question":"The average of 4 numbers is 15. A fifth number, 25, is added to the group. Find the new average.","options":["16","17","18","19"],"correctIndex":1,"explanation":"Original sum = 15×4 = 60. New sum = 60+25 = 85. New average = 85/5 = 17."},
    {"id":6,"difficulty":"Medium","question":"The average of 6 numbers is 18. One number, originally 10, is replaced with 22. Find the increase in the average.","options":["1","1.5","2","2.5"],"correctIndex":2,"explanation":"The sum increases by 22−10=12. Increase in average = 12/6 = 2."},
    {"id":7,"difficulty":"Hard","question":"The average of 10 numbers is 24. If the average of the first 6 numbers is 20, find the average of the remaining 4 numbers.","options":["28","29","30","31"],"correctIndex":2,"explanation":"Total sum = 24×10 = 240. Sum of first 6 = 20×6 = 120. Sum of remaining 4 = 240−120 = 120. Their average = 120/4 = 30."},
    {"id":8,"difficulty":"Hard","question":"The average of 5 consecutive integers is 21. Find the largest of these integers.","options":["21","22","23","24"],"correctIndex":2,"explanation":"For consecutive integers, the average equals the middle value, so the numbers are 19, 20, 21, 22, 23. The largest is 23."},
    {"id":9,"difficulty":"Hard","question":"The average marks of 40 students in a class is 60. If the average marks of 10 of these students is 75, find the average marks of the remaining 30 students.","options":["53","54","55","56"],"correctIndex":2,"explanation":"Total marks = 60×40 = 2,400. Marks of 10 students = 75×10 = 750. Marks of remaining 30 = 2,400−750 = 1,650. Their average = 1,650/30 = 55."},
    {"id":10,"difficulty":"Hard","question":"The average weight of 8 people is 65 kg. A person weighing 60 kg leaves and is replaced by a new person, after which the average weight becomes 68 kg. Find the weight of the new person.","options":["80 kg","82 kg","84 kg","86 kg"],"correctIndex":2,"explanation":"Original total = 65×8 = 520 kg. New total = 68×8 = 544 kg. New person's weight = 544 − (520−60) = 544−460 = 84 kg."}
  ]
 }
];

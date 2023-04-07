export const Positive = [
    { recommendation: "Save for emergencies: Even if you have a high income and low expenses, unexpected emergencies can still happen. It's essential to have a safety net to cover unexpected expenses. Consider setting up an emergency fund with at least three to six months' worth of living expenses." },
    { recommendation: "Invest in your future: With a surplus of income, you can consider investing in your future, such as contributing to a retirement account or setting up a college fund for your children. This can help secure your financial future and provide for your long-term financial goals." },
    { recommendation: "Pay off debt: If you have any outstanding debt, such as credit card debt or student loans, consider paying them off. By paying off your debt, you can save money on interest and improve your credit score." },
    { recommendation: "Give to charity: Consider donating a portion of your surplus income to a charity or organization that aligns with your values. Giving back can provide a sense of fulfillment and help those in need." },
    { recommendation: "Treat yourself: Lastly, don't forget to treat yourself! You've worked hard to earn your income, so it's okay to indulge in something that brings you joy, whether it's a vacation or a new hobby" },
    { recommendation: "Remember, having a surplus of income doesn't mean you should be frivolous with your money. It's important to be mindful of your spending and prioritize your financial goals. With careful planning and management, you can make the most out of your financial situation and achieve financial stability and success." }
    
]

export const Negative = [
    { recommendation: "Create a budget: A budget is a crucial tool to help you manage your expenses and ensure that you're not spending more than you earn. Start by listing all your income sources and expenses, and then prioritize your expenses based on their importance. Look for areas where you can cut back on expenses, such as dining out or subscription services." },
    { recommendation: "Find ways to increase your income: Look for ways to increase your income, such as asking for a raise at work, starting a side hustle, or taking on freelance work. Even small increases in your income can make a big difference in your financial situation." },
    { recommendation: "Consolidate debt: If you have multiple debts with high interest rates, consider consolidating them into a single loan with a lower interest rate. This can help you save money on interest and make your monthly payments more manageable." },
    { recommendation: "Seek financial assistance: If you're struggling to make ends meet, consider seeking financial assistance from a non-profit organization or government agency. They may be able to provide you with financial counseling, assistance with bills, or access to low-interest loans." },
    { recommendation: "Prioritize your expenses: When your maximum outcome is higher than your maximum income, it's essential to prioritize your expenses. Focus on paying for your essential expenses first, such as housing, food, and utilities, and then work on paying down debt and saving for emergencies." },
    { recommendation: "Remember, it's essential to be proactive and take steps to improve your financial situation. With careful planning and management, you can overcome your financial challenges and achieve financial stability and success." }

]

export const GetRandomRecommendations=(recommendationsArray) => {
  // make a copy of the array to avoid modifying the original
  const shuffledArray = recommendationsArray.slice();
  
  // shuffle the array using the Fisher-Yates algorithm
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  
  // return the first `count` items from the shuffled array
  return shuffledArray.slice(0, 3);
}
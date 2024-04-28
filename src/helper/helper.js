/**
 *
 * @param {Array} expenseData
 * @returns {Array<{category:string,amount:number|string}>}
 */
export const generateExpenseChartData = (expenseData) => {
  if (!expenseData) return;
  const result = [];
  const expenses = Object.groupBy(expenseData, ({ category }) => category);
  for (const key in expenses) {
    const amount = expenses[key].reduce(
      (prev, a) => prev + parseInt(a.amount),
      0
    );
    result.push({ category: key, amount });
  }
  return result;
};

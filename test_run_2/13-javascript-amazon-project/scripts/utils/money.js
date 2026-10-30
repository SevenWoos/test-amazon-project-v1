export function formatCurrency(priceCents) {
  return (priceCents / 100).toFixed(2);
};

// Each file can only have ONE default export. When we import this now, we don't need the curly brackets.
export default formatCurrency;
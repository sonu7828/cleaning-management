export const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    }).format(amount);
};
export const formatDate = (date, options) => {
    return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
};
export const formatPercentage = (value) => {
    return `${value.toFixed(2)}%`;
};

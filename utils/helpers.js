module.exports = {
  format_date_time: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
};

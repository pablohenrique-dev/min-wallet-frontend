export const priceFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const formatToBRL = (value: string) => {
  value = value.replace(/\D/g, "");

  const numberValue = parseInt(value, 10);
  if (isNaN(numberValue)) {
    return "0,00";
  }

  let formattedValue = (numberValue / 100).toFixed(2);

  formattedValue = formattedValue.replace(".", ",");

  formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return formattedValue;
};

export const formatBRLToNumber = (value: string): number => {
  const cleanedValue = value.replace(/\./g, "");

  const numericValue = parseFloat(cleanedValue.replace(",", "."));

  return numericValue;
};

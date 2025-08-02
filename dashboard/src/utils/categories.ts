export interface SelectOption {
  value: string;
  label: string;
}
export const TRANSACTION_CATEGORIES: SelectOption[] = [
  { value: "", label: "Selecione" },
  { value: "bills", label: "Contas e Faturas" },
  { value: "services", label: "Serviços" },
  { value: "taxes", label: "Impostos" },
  { value: "education", label: "Educação" },
  { value: "entertainment", label: "Entretenimento" },
  { value: "groceries", label: "Supermercado" },
  { value: "transportation", label: "Transporte" },
  { value: "health", label: "Saúde" },
  { value: "clothing", label: "Vestuário" },
  { value: "gifts", label: "Presentes" },
  { value: "travel", label: "Viagens" },
  { value: "credit", label: "Cartão de Crédito" },
  { value: "other", label: "Outros" },
];

// Função utilitária para obter o label de uma categoria pelo value
export const getCategoryLabel = (categoryValue: string): string => {
  const category = TRANSACTION_CATEGORIES.find(
    (cat) => cat.value === categoryValue
  );
  return category?.label || categoryValue;
};

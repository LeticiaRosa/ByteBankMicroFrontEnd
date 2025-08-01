export interface Transaction {
  id?: string;
  type: string;
  amount: number;
  date?: Date;
  month?: string;
  recipient?: string;
  category?: string;
}

export interface FilterOptions {
  type?: string;
  category?: string;
  recipient?: string;
  amountMin?: number;
  amountMax?: number;
  dateFrom?: string;
  dateTo?: string;
}

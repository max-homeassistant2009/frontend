export const testData = [
  { id: 1, name: "Sean" },
  { id: 2, name: "Malte" },
  { id: 3, name: "Maximilian" },
  { id: 4, name: "Lina" },
  { id: 5, name: "Evelyn" },
];

// Lebensmittelkategorien (Beispielmapping)
const CATEGORY_MAP: Record<string, string> = {
  Äpfel: "Obst",
  Bananen: "Obst",
  Orangen: "Obst",
  Trauben: "Obst",
  Eier: "Tierprodukte",
  Butter: "Milchprodukte",
  Milch: "Milchprodukte",
  Käse: "Milchprodukte",
  Brot: "Backwaren",
  Sonstiges: "Sonstiges",
};

export interface CategorySummary {
  category: string;
  total: number;
}

export function getCategorySummary(receipts: Receipt[]): CategorySummary[] {
  const summary: Record<string, number> = {};
  receipts.forEach((receipt) => {
    receipt.groceries.forEach((item) => {
      const category = CATEGORY_MAP[item.name] || "Sonstiges";
      const itemTotal = item.amount * item.price;
      summary[category] = (summary[category] || 0) + itemTotal;
    });
  });
  return Object.entries(summary).map(([category, total]) => ({
    category,
    total,
  }));
}

// Hilfsfunktion zum Formatieren eines Datums von yyyy-mm-dd zu dd.mm.yyyy
export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  return `${day}.${month}.${year}`;
}

export interface Receipt {
  id: string;
  date: string;
  amount: number;
  groceries: Grocery[];
}

interface Grocery {
  name: string;
  amount: number;
  price: number;
}

export const testbackend: Receipt[] = [
  {
    id: "1",
    date: "2023-10-01",
    amount: 25,
    groceries: [
      {
        name: "Äpfel",
        amount: 5,
        price: 1.5,
      },
      {
        name: "Bananen",
        amount: 10,
        price: 0.99,
      },
      {
        name: "Eier",
        amount: 5,
        price: 2.99,
      },
      {
        name: "Butter",
        amount: 2,
        price: 1.49,
      },
      {
        name: "Sonstiges",
        amount: 1,
        price: 5.0,
      },
    ],
  },
  {
    id: "2",
    date: "2023-10-02",
    amount: 35,
    groceries: [
      {
        name: "Orangen",
        amount: 15,
        price: 1.2,
      },
      {
        name: "Trauben",
        amount: 20,
        price: 2.5,
      },
    ],
  },
  {
    id: "3",
    date: "2023-10-03",
    amount: 50,
    groceries: [
      {
        name: "Milch",
        amount: 10,
        price: 0.89,
      },
      {
        name: "Brot",
        amount: 5,
        price: 1.99,
      },
      {
        name: "Käse",
        amount: 35,
        price: 3.49,
      },
    ],
  },
];

/* export const testData = [
  { id: 1, name: "Sean" },
  { id: 2, name: "Malte" },
  { id: 3, name: "Maximilian" },
  { id: 4, name: "Lina" },
  { id: 5, name: "Evelyn" },
]; */

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
      const itemTotal = item.quantity * item.price;
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
  id: number;
  date: string;
  amount: number;
  restAmount: number;
  groceries: Grocery[];
}

interface Grocery {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export const testbackend: Receipt[] = [
  {
    id: 1,
    date: "2023-10-01",
    amount: 25,
    restAmount: 5,
    groceries: [
      {
        id: 1,
        name: "Äpfel",
        quantity: 5,
        price: 1.5,
      },
      {
        id: 2,
        name: "Bananen",
        quantity: 10,
        price: 0.99,
      },
      {
        id: 3,
        name: "Eier",
        quantity: 5,
        price: 2.99,
      },
      {
        id: 4,
        name: "Butter",
        quantity: 2,
        price: 1.49,
      },
    ],
  },
  {
    id: 2,
    date: "2023-10-02",
    amount: 35,
    restAmount: 0,
    groceries: [
      {
        id: 1,
        name: "Orangen",
        quantity: 15,
        price: 1.2,
      },
      {
        id: 2,
        name: "Trauben",
        quantity: 20,
        price: 2.5,
      },
    ],
  },
  {
    id: 3,
    date: "2023-10-03",
    amount: 50,
    restAmount: 0,
    groceries: [
      {
        id: 1,
        name: "Milch",
        quantity: 10,
        price: 0.89,
      },
      {
        id: 2,
        name: "Brot",
        quantity: 5,
        price: 1.99,
      },
      {
        id: 3,
        name: "Käse",
        quantity: 35,
        price: 3.49,
      },
    ],
  },
];

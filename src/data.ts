export const testData = [
  { id: 1, name: "Sean" },
  { id: 2, name: "Malte" },
  { id: 3, name: "Maximilian" },
  { id: 4, name: "Lina" },
  { id: 5, name: "Evelyn" },
];

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
    amount: 20,
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

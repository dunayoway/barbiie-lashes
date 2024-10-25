const servicePrices = [
  { name: "Lash Extension", price: 100000 },
  { name: "Lash Lift", price: 150000 },
  { name: "Lash Tinting", price: 200000 },
  { name: "Brow Sculpting", price: 250000 },
  { name: "Microblading", price: 300000 },
];

export const prices = (req, res) => {
  // Send the services name and price to the client
  res.status(200).json(servicePrices);
};

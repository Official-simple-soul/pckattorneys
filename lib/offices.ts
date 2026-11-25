// The firm's offices, shown on the Contact page and in the footer.
export type Office = { name: string; note?: string; lines: string[] };

export const OFFICES: Office[] = [
  {
    name: "Registered Office",
    lines: ["No. 1 ACAEDF Crescent, Ikot Afaha,", "Eket L.G.A, Akwa Ibom State, Nigeria"],
  },
  {
    name: "Head Office",
    lines: ["No. 14, Abubakar Koko Crescent,", "Off Maitama Sule Street, Asokoro,", "Abuja, Nigeria"],
  },
  {
    name: "Branch Office",
    note: "Under reconstruction",
    lines: ["467, Oka Akoko Street,", "Off Lagos Street, Garki 2,", "Abuja, Nigeria"],
  },
];

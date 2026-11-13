import { LEGAL_IMAGES } from "./legal-images";

// Shown on the About page. Each entry lists the source its wording was checked against;
// have the firm confirm the wording before relying on it.
export type HistoryEntry = {
  year: string;
  title: string;
  body: string;
  image?: { src: string; alt: string; width: number; height: number };
  sources: string[];
};

export const LEGAL_HISTORY: HistoryEntry[] = [
  {
    year: "1215",
    title: "Magna Carta",
    body: "Sealed at Runnymede, the charter set down the principle that even the king is bound by the law.",
    image: LEGAL_IMAGES.magnaCarta,
    sources: ["https://www.bl.uk/magna-carta"],
  },
  {
    year: "1765",
    title: "Blackstone's Commentaries",
    body: "William Blackstone publishes the first volume of his Commentaries on the Laws of England, the work through which generations of lawyers learned the common law.",
    sources: [LEGAL_IMAGES.blackstone.source],
  },
  {
    year: "1879",
    title: "A Nigerian at the Bar",
    body: "Christopher Sapara Williams is called to the English Bar. Widely recorded as the first indigenous Nigerian lawyer, he is enrolled to practise in Nigeria in 1888.",
    sources: ["https://en.wikipedia.org/wiki/Christopher_Sapara_Williams"],
  },
  {
    year: "1962",
    title: "The Nigerian Law School",
    body: "The Legal Education Act establishes the Nigerian Law School to train lawyers for the Nigerian Bar.",
    sources: ["https://www.nigerianlawschool.edu.ng/about.html"],
  },
  {
    year: "1997",
    title: "The Law School comes to Abuja",
    body: "The Nigerian Law School moves its headquarters from Lagos to Bwari, Abuja, the city this firm now calls home.",
    sources: ["https://www.nigerianlawschool.edu.ng/about.html"],
  },
];

export type CardModel = {
  id: string;
  title: string;
  description?: string;
};

export type ColumnModel = {
  id: string;
  title: string;
  cards: CardModel[];
};

export type BoardModel = {
  id: string;
  title: string;
  columns: ColumnModel[];
};

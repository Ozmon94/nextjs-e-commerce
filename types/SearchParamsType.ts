type Params = {
  id: string;
};

type SearchParams = {
  id: string;
  name: string;
  image: string;
  unit_amount: number | null;
  quantity: number | 1;
  description: string;
  features: string;
};

export type SearchParamsType = {
  params: Params;
  searchParams: SearchParams;
};

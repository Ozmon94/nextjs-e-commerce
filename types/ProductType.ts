type MetadataType = {
  features: string;
};

export type ProductType = {
  id: string;
  name: string;
  image: string;
  unit_amount: number | null;
  quantity?: number | 1;
  description: string | null;
  metadata: MetadataType;
};

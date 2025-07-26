export type PrizeType = {
  id: number;
  name: string;
  type: string;
  cost: string;
};

export type PrizeRedemptionType = {
  id: number;
  prize: PrizeType;
  isApproved: boolean;
  redeemedOn: string;
};

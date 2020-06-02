import { Bucket, DataBuckets } from './bucket.model';
export class Income {
  income: ItemIncome;
  type: DataBuckets;
  dateTime?: DataBuckets;
}

export class ItemIncome {
  value: number;
}


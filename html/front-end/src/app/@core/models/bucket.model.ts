import { Income, ItemIncome } from './income.model';
export class Bucket {
  // tslint:disable-next-line: variable-name
  doc_count: number;
  // tslint:disable-next-line: variable-name
  key_as_string?: string;
  key: number | string | object;
  income?: ItemIncome;
  type?: DataBuckets;
}

export class DataBuckets {
  // tslint:disable-next-line: variable-name
  doc_count_error_upper_bound?: number;
  // tslint:disable-next-line: variable-name
  sum_other_doc_count?: number;
  buckets: Bucket[];
}

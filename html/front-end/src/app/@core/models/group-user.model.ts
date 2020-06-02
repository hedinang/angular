import { Permisstions } from './permisstions.model';
export class GroupAccount {
  id: number;
  code: string;
  name: string;
  descriptions: string;
  timeUpdated: Date;
  permissions: Permisstions[] | number[] | null;
}

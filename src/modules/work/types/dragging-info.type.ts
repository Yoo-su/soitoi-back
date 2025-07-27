import { RandomUser } from 'src/shared/types';
import { Work } from '../entities';

export type DraggingInfo = {
  user: RandomUser;
  workID: number;
  status: Work['status'];
};

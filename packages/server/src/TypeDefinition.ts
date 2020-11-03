import Dataloader from 'dataloader';
import { IProject } from './modules/project/ProjectModel';

import { IUser } from './modules/user/UserModel';

type Key = string;

export type Dataloaders = {
  UserLoader: Dataloader<Key, IUser>;
  ProjectLoader: Dataloader<Key, IProject>;
};

export type GraphQLContext = {
  user?: IUser;
  dataloaders: Dataloaders;
};
import Dataloader from 'dataloader';
import { IProject } from './modules/project/ProjectModel';
import { IUser } from './modules/user/UserModel';
import {GraphQLResolveInfo} from 'graphql'


type Key = string;

export type Dataloaders = {
  UserLoader: Dataloader<Key, IUser>;
  ProjectLoader: Dataloader<Key, IProject>;
};

export type GraphQLContext = {
  user?: IUser;
  dataloaders: Dataloaders;
};

export type Resolve = <Tsource>(root: Tsource, args:{ [argName: string]: any }, context: GraphQLContext, info: GraphQLResolveInfo) => object
import DataLoader from 'dataloader';
import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import { Types } from 'mongoose';
import { ConnectionArguments } from 'graphql-relay';
import mongoose from 'mongoose';
declare type ObjectId = mongoose.Schema.Types.ObjectId;

import ProjectModel, { IProject } from './ProjectModel';

import { GraphQLContext } from '../../TypeDefinition';

export default class Project {
  id: string;

  _id: Types.ObjectId;

  title: string;

  description: string;

  lookingFor: string | null | undefined;

  owner: ObjectId;

  constructor(data: IProject, { user }: GraphQLContext) {
    this.id = data._id;
    this._id = data._id;
    this.title = data.title;
    this.description = data.description;
    this.lookingFor = data.lookingFor;
    this.owner = data.owner;
  }
}

export const getLoader = () => new DataLoader((ids: ReadonlyArray<string>) => mongooseLoader(ProjectModel, ids));

const viewerCanSee = () => true;

export const load = async (context: GraphQLContext, id: string | Object | ObjectId): Promise<Project | null> => {
  if (!id && typeof id !== 'string') {
    return null;
  }

  let data;
  try {
    data = await context.dataloaders.ProjectLoader.load((id as string));
  } catch (err) {
    return null;
  }
  return viewerCanSee() ? new Project(data, context) : null;
};

export const clearCache = ({ dataloaders }: GraphQLContext, id: Types.ObjectId) => dataloaders.ProjectLoader.clear(id.toString());
export const primeCache = ({ dataloaders }: GraphQLContext, id: Types.ObjectId, data: IProject) => dataloaders.ProjectLoader.prime(id.toString(), data);
export const clearAndPrimeCache = (context: GraphQLContext, id: Types.ObjectId, data: IProject) => clearCache(context, id) && primeCache(context, id, data);

type ProjectArgs = ConnectionArguments & {
  search?: string;
};

export const loadProjects = async (context: GraphQLContext, args: ProjectArgs) => {
  const where = args.search ? { title: { $regex: new RegExp(`^${args.search}`, 'ig') } } : {};
  const projects = ProjectModel.find(where).sort({ createdAt: -1 });

  return connectionFromMongoCursor({
    cursor: projects,
    context,
    args,
    loader: load,
  });
};

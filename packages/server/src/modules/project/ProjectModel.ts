import mongoose, {Document, Model, Schema} from 'mongoose';

const schema = new Schema(
  {
    title: {
      type: String,
      require: true
    },
    description: {
      type: String,
      required: true
    },
    lookingFor: {
      type: String,
      validate: {
        validator:(role: string) => ['designer', 'developer'].includes(role)
      },
      message: () => `Tag must be a designer or a developer`
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  }
)

export interface IProject extends Document{
  title: string;
  description: string;
  lookingFor: string;
  owner: Schema.Types.ObjectId
}

// this will make find, findOne typesafe
const ProjectModel: Model<IProject> = mongoose.model('Project', schema);

export default ProjectModel;
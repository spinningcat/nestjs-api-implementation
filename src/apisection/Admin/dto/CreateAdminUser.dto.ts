import { JoiSchema, JoiSchemaOptions, CREATE, UPDATE } from 'nestjs-joi';
import * as Joi from 'joi';

@JoiSchemaOptions({
  allowUnknown: false,
})

export class CreateAdminUserDto {

  @JoiSchema(Joi.string().required()) // Default schema for all actions
  @JoiSchema([CREATE], Joi.string().required()) // Schema for the 'CREATE' action
  @JoiSchema([UPDATE], Joi.string().optional()) // Schema for the 'UPDATE' action
  
  email: string;
  @JoiSchema(Joi.string().required()) // Default schema for all actions
  @JoiSchema([CREATE], Joi.string().required()) // Schema for the 'CREATE' action
  @JoiSchema([UPDATE], Joi.string().optional()) // Schema for the 'UPDATE' action
  password: string;
}
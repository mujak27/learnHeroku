import { makeSchema } from "nexus";
import { join } from 'path';
import * as types from './graphql';


export const nexusSchema = makeSchema({
  types,
  outputs: {
    schema : join(process.cwd(), '/apollo/nexus/graphql/schema.graphql'),
    typegen : join(process.cwd(), '/apollo/nexus/graphql/typedefs.ts'),
  }
})
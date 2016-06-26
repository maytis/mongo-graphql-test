import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql';

export const Log = new GraphQLObjectType({
  name: 'Log',
  description: 'Represents Log Type',
  fields: () => ({
    _id: {type: GraphQLString},
    time: {type: GraphQLString},
    message: {type: GraphQLString}
  })
});

const Logs = {
  type: new GraphQLList(Log),
  description: 'A list of Logs',
  async resolve({ db }, args) {
    return await db.collection('log').find().toArray();
  }
};

export default Logs;

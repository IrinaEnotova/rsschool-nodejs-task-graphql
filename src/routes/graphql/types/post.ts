import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { UserType } from './user.js';
import prismaClient from '../client.js';

export type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
};

export const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },
    author: {
      type: UserType,
      resolve: async ({ authorId }: Post) =>
        await prismaClient.user.findFirst({ where: { id: authorId } }),
    },
  }),
});

export const PostsType = new GraphQLList(PostType);

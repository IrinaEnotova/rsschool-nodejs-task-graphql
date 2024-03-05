import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
} from 'graphql';
import { ProfilesType } from './profile.js';
import prismaClient from '../client.js';

export type Member = {
  id: string;
  discount: number;
  postsLimitPerMonth: number;
};

export const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    basic: {
      value: 'basic',
    },
    business: {
      value: 'business',
    },
  },
});

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: { type: MemberTypeId },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    profiles: {
      type: ProfilesType,
      resolve: async ({ id }: Member) => {
        await prismaClient.profile.findMany({ where: { memberTypeId: id } });
      },
    },
  }),
});

export const MembersType = new GraphQLList(MemberType);

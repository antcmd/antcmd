import { intArg, makeSchema, objectType, stringArg, asNexusMethod } from 'nexus'
import { GraphQLDate } from 'graphql-iso-date'
import { PrismaClient } from '@prisma/client'
import { graphql } from 'graphql'
import path from 'path'

export const GQLDate = asNexusMethod(GraphQLDate, 'date')

const prisma = new PrismaClient()

const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id')
    t.string('name')
    t.list.field('posts', {
      type: 'Post',
      resolve: parent =>
        prisma.user
          .findOne({
            where: { id: Number(parent.id) },
          })
          .posts(),
    })
  },
})

const Post = objectType({
  name: 'Post',
  definition(t) {
    t.string('id')
    t.date('createdAt')
    t.date('updatedAt')
    t.string('title')
    t.string('content', {
      nullable: true,
    })
    t.field('author', {
      type: 'User',
      nullable: true,
      resolve: parent =>
        prisma.post
          .findOne({
            where: { id: Number(parent.id) },
          })
          .author(),
    })
  },
})

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.field('post', {
      type: 'Post',
      args: {
        postId: stringArg({ nullable: false }),
      },
      resolve: (_, args) => {
        return prisma.post.findOne({
          where: { id: Number(args.postId) },
        })
      },
    })

    t.list.field('feed', {
      type: 'Post',
      resolve: (_parent, _args, ctx) => {
        return prisma.post.findMany()
      },
    })

    t.list.field('filterPosts', {
      type: 'Post',
      args: {
        searchString: stringArg({ nullable: true }),
      },
      resolve: (_, { searchString }, ctx) => {
        return prisma.post.findMany({
          where: {
            OR: [
              { title: { contains: searchString } },
              { content: { contains: searchString } },
            ],
          },
        })
      },
    })
  },
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('signupUser', {
      type: 'User',
      args: {
        name: stringArg({ nullable: false })
      },
      resolve: (_, { name }, ctx) => {
        return prisma.user.create({
          data: {
            name,
          },
        })
      },
    })

    t.field('deletePost', {
      type: 'Post',
      nullable: true,
      args: {
        postId: stringArg(),
      },
      resolve: (_, { postId }, ctx) => {
        return prisma.post.delete({
          where: { id: Number(postId) },
        })
      },
    })

    t.field('createPost', {
      type: 'Post',
      args: {
        title: stringArg({ nullable: false }),
        content: stringArg(),
        authorName: stringArg(),
      },
      resolve: (_, { title, content, authorName }, ctx) => {
        return prisma.post.create({
          data: {
            title,
            content,
            author: {
              connect: { name: authorName },
            },
          },
        })
      },
    })
  },
})

export const schema = makeSchema({
  types: [Query, Mutation, Post, User, GQLDate],
  outputs: {
    typegen: path.join(process.cwd(), 'nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'schema.graphql')
  },
})

export default async (req, res) => {
  const query = req.body.query
  const variables = req.body.variables
  const response = await graphql(schema, query, {}, {}, variables)
  return res.end(JSON.stringify(response))
}

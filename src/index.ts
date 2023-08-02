import 'dotenv/config'
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { Movie as MovieModel } from './models/movie';
import Movies from './dataSources/movies';
import express from 'express'
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'kcors';
import { graphqlHTTP } from 'koa-graphql';
import Router from 'koa-router';
import logger from 'koa-logger';
import { schema } from './schema/schema';

const uri = process.env.MONGODB_URI
const main = async () => {
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
};
const app = new Koa();
const router = new Router();
main()
  .then(console.log('🎉 connected to database successfully'))
  .catch(error => console.error(error));


const graphQLSettingsPerReq = async (_req, _res, ctx) => {

  return{
    graphiql: true,
    schema,
    pretty: true
  }
}


const graphQlServer = graphqlHTTP(graphQLSettingsPerReq);
router.all('/graphql', graphQlServer);

app.use(cors({ credentials: true }));
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

 

const server = http.createServer(app.callback());
	
	server.listen(3000, () => {
		// eslint-disable-next-line
		console.log("server is running");
	});


export default app;
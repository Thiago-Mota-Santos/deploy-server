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

const uri = process.env.MONGODB_URI
const main = async () => {
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
};
const app = express()
app.use(express.json());
const httpServer = http.createServer(app);
main()
  .then(console.log('🎉 connected to database successfully'))
  .catch(error => console.error(error));

const dataSources = () => ({
  movies: new Movies(MovieModel),
});

const startApolloServer = async(app) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
  });
  await server.start()
 server.applyMiddleware({ app });
 
}

startApolloServer(app, httpServer)


app.listen(3000, () => console.log('server running'))

export default httpServer;
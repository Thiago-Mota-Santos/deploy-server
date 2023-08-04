import 'dotenv/config'
import mongoose from 'mongoose';
import http from "http";
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'kcors';
import { graphqlHTTP } from 'koa-graphql';
import Router from 'koa-router';
import { schema } from './schema/schema';

const uri = process.env.MONGODB_URI
const main = async () => {
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
};
const app = new Koa();
const router = new Router();
main()
  .then(() => console.log('🎉 connected to database successfully'))
  .catch(error => console.error(error));

const graphQLSettingsPerReq = async (_req, _res) => {

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
		console.log("server is running");
});


export default app;
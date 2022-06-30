const { default: Shopify, ApiVersion } = require('@shopify/shopify-api');
const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());

let scopes =[
    'read_products',
    'write_products',
    'read_script_tags',
    'write_script_tags'
  ];

Shopify.Context.initialize({
    API_KEY: process.env.API_KEY,
    API_SECRET_KEY: process.env.API_SECRET,
    SCOPES: scopes,
    HOST_NAME: process.env.HOST.replace(/https:\/\//, ""),
    API_VERSION: process.env.API_VERSION,
    IS_EMBEDDED_APP: true,
    SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),
  });

app.get("/", async (req, res) => {
  const client = new Shopify.Clients.Rest(process.env.HOST.replace(/https:\/\//, ""), process.env.ADMIN_API_ACCESS_TOKEN);
  const response = await client.get({ path: "products" });
  const products = response.body.products;
  const filtered_products = products.map(product => product.title )
  console.log(filtered_products);
  res.send("Hello From Shopify Task!");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

require("./env.config/index");
import { createVuePlugin } from "vite-plugin-vue2";

console.log(process.env.NODE_ENV);
export default {
  plugins: [createVuePlugin()],
};

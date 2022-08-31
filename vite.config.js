require("./env.config/index");
import { createVuePlugin } from "vite-plugin-vue2";

// const MODE = import.meta.env.MODE;
// console.log(process.env.NODE_ENV, MODE);
export default {
  plugins: [createVuePlugin()],
};

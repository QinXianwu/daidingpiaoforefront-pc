import Vue from "vue";
import * as echarts from "echarts/core";

// 按需引入
import {
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BrushComponent,
} from "echarts/components";
import { LineChart, BarChart, PieChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BrushComponent,
  LineChart,
  BarChart,
  PieChart,
  CanvasRenderer,
]);
Vue.prototype.$echarts = echarts; // 全局挂载常量

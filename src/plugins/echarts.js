import Vue from "vue";
import "echarts/lib/component/markPoint";
import "echarts/lib/component/markLine";
import * as echarts from "echarts/core";

// 按需引入
import {
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BrushComponent,
  TitleComponent,
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
  TitleComponent,
]);
Vue.prototype.$echarts = echarts; // 全局挂载常量

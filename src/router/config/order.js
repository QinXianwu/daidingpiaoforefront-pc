import MultilayerRouter from "@/views/MultilayerRouter/index";
import TicketsList from "@/views/Order/views/TicketsList/index.vue";
import AfterSales from "@/views/Order/views/AfterSales/index.vue";
import AfterSalesLogistics from "@/views/Order/views/AfterSalesLogistics/index.vue";

const siteList = [
  {
    id: "00321",
    title: "广州南站",
  },
  {
    id: "00322",
    title: "广州南站2",
  },
  {
    id: "00323",
    title: "广州南站3",
  },
];

export default siteList.map((item, index) => {
  return {
    path: item?.path || `site-${index}`,
    name: item?.name || `site-${index}`,
    component: MultilayerRouter,
    meta: {
      title: item?.title || `站点-${index}`,
    },
    children: [
      {
        path: "TicketsList",
        component: TicketsList,
        query: { id: item.id },
        name: `TicketsList-${item.id}`,
        meta: {
          title: "打票及回填",
        },
      },
      {
        path: "AfterSales",
        component: AfterSales,
        query: { id: item.id },
        name: `AfterSales-${item.id}`,
        meta: {
          title: "取车票报销凭证",
        },
      },
      {
        path: "AfterSalesLogistics",
        component: AfterSalesLogistics,
        query: { id: item.id },
        name: `AfterSalesLogistics-${item.id}`,
        meta: {
          title: "取报销凭证快递",
        },
      },
    ],
  };
});

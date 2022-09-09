import CONST from "@/constants/index";
import ChildrenView from "@/layouts/ChildrenView/index";
import TicketsList from "@/views/Order/views/TicketsList/index.vue";
import AfterSales from "@/views/Order/views/AfterSales/index.vue";
import AfterSalesLogistics from "@/views/Order/views/AfterSalesLogistics/index.vue";

const siteList = CONST.SITE_OPTIONS()
  .map((item) => {
    if (item.label !== "全部") {
      return { id: item.value, title: item.label };
    }
  })
  .filter((item) => item && item.id);

export default siteList.map((item, index) => {
  return {
    path: item?.path || `Site-${index}`,
    name: item?.name || `Site-${index}`,
    component: ChildrenView,
    redirect: "/404",
    meta: {
      title: item?.title || `站点-${index}`,
    },
    children: [
      {
        path: `TicketsList/${item.id}`,
        component: TicketsList,
        name: `TicketsList-${item.id}`,
        siteId: item.id,
        meta: {
          title: "打票及回填",
        },
      },
      {
        path: `AfterSales/${item.id}`,
        component: AfterSales,
        name: `AfterSales-${item.id}`,
        siteId: item.id,
        meta: {
          title: "取车票报销凭证",
        },
      },
      {
        path: `AfterSalesLogistics/${item.id}`,
        component: AfterSalesLogistics,
        name: `AfterSalesLogistics-${item.id}`,
        siteId: item.id,
        meta: {
          title: "取报销凭证快递",
        },
      },
    ],
  };
});

import { Tabs } from "@until-failure-app/src/components/Tabs";
import { colors } from "@until-failure-app/src/theme";
import * as Crypto from "expo-crypto";
import { Navigator, Slot } from "expo-router";

import { TabRouter } from "@react-navigation/native";

const CustomTabRouter = (options: any) => {
  const router = TabRouter(options);

  return {
    ...router,
    getRehydratedState(partialState: any, { routeNames, routeParamList }: any) {
      const state = partialState;

      if (state.stale === false) {
        return state as any;
      }

      const routes = state.routes
        .filter((route: any) => routeNames.includes(route.name))
        .map(
          (route: any) => ({
            ...route,
            key: route.key || `${route.name}-${Crypto.randomUUID()}`,
            params: routeParamList[route.name] !== undefined
              ? {
                ...routeParamList[route.name],
                ...route.params,
              }
              : route.params,
          } as any),
        );

      return {
        stale: false,
        type: "tab",
        key: Crypto.randomUUID(),
        index: typeof state.index === "number" && state.index < routes.length
          ? state.index
          : 0,
        routeNames,
        routes,
      };
    },
  };
};

export default function AppLayout() {
  return (
    <Navigator router={CustomTabRouter}>
      <Slot />
      <Tabs />
    </Navigator>
  );
}

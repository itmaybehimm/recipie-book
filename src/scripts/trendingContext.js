import React from "react";

const trendingContext = React.createContext();
const TrendingProvider = trendingContext.Provider;
const TrendingConsumer = trendingContext.Consumer;

export { TrendingProvider, TrendingConsumer };

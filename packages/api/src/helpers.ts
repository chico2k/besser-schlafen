import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import superjson from "superjson";

import { client } from "@acme/sanity";

import { appRouter } from "./root";

export const generateSSGHelper = () =>
  createProxySSGHelpers({
    router: appRouter,
    ctx: { sanity: client },
    transformer: superjson, // optional - adds superjson serialization
  });

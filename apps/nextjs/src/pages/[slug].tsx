import React from "react";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";

import { generateSSGHelper } from "@acme/api";

import { api } from "~/utils/api";
import PostDetail from "~/components/PostDetail";

const PostDetailPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { data, error } = api.post.detail.useQuery({
    slug: props.slug,
  });

  if (!data || error) return <div>404</div>;

  return (
    <div>
      <>
        <Head>
          <title>{data.title}</title>
          <meta name="description" content={data.title} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="mx-auto flex max-w-4xl flex-col items-center bg-white text-gray-600">
          <PostDetail post={data} />
        </main>
      </>
    </div>
  );
};

export default PostDetailPage;

export const getStaticProps: GetStaticProps<{ slug: string }> = async (
  context,
) => {
  const ssg = generateSSGHelper();

  const slug = context.params?.slug;
  if (typeof slug !== "string") throw new Error("no slug");

  await ssg.post.detail.prefetch({ slug });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      slug,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

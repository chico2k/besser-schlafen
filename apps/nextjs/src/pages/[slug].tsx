import React from "react";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";

import { generateSSGHelper } from "@acme/api";
import { urlFor } from "@acme/sanity";

import { api } from "~/utils/api";

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
        <main className="flex h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
          <div className="container mt-12 flex flex-col items-center justify-center gap-4 px-4 py-8">
            <Image
              src={urlFor(data.mainImage).url()}
              alt={`${data.slug} profile pic`}
              width={768}
              height={96}
              className="h-96 w-full  object-cover"
            />
            <div>{props.slug}</div>
          </div>
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

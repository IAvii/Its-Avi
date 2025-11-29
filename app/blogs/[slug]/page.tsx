

import BlogPost from "@/components/blogs/blog-post";
import { getPostBySlug } from "@/lib/hashnode-requests";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export async function generateMetadata( { params }: { params: { slug: string | string[] } } ) {
  const { slug } = await params;

  const data = await getPostBySlug(slug);

  return {
    title: data.title,
    description: data.subtitle,
  };
}

export default async function Page( { params }: { params: { slug: string | string[] } } ) {

  

  const queryClient = new QueryClient();
  const { slug } = await params;
  
  await queryClient.prefetchQuery({
    queryKey: ['post', slug],
    queryFn: () => getPostBySlug(slug),
  });


  return (
    <main className="max-w-4xl mx-auto px-8 lg:px-16">
      <section
        id="blog"
        className="min-h-screen py-32"
      >
        <HydrationBoundary state={dehydrate(queryClient)}>
        <BlogPost slug={ slug } />
        </HydrationBoundary>
      </section>
    </main>
  );
}

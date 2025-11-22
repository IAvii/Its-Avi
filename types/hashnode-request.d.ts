import type { QueryFunctionContext } from "@tanstack/react-query";

export type PublicationName = {
  publication: {
    title: string;
    displayTitle?: string;
    favicon?: string;
  };
};

export type PostsMetadata = {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  // content: {
  //   text: string;
  // };
  coverImage: {
    url: string;
  };
  readTimeInMinutes: number;
  publishedAt: string;
  author: {
    name: string;
    profilePicture?: string;
  };
};

export type PostMetadata = {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  content: {
    html: string;
  };
  coverImage: {
    url: string;
  };
  readTimeInMinutes: number;
  publishedAt: Date;
  author: {
    name: string;
    profilePicture?: string;
  };
};

type GetPostsResponse = {
  publication: {
    posts: {
      edges: {
        node: PostsMetadata;
        cursor: string;
      }[];
    };
  };
};

type GetPostsFunctionArgs = {
  first: number;
  after: string;
};

export type GetPostsArgs = QueryFunctionContext & GetPostsArgs;

export type SubscribeToNewsletterResponse = {
  data?: {
    subscribeToNewsletter: {
      status: string;
    };
  };

  errors?: { message: string }[];
};

export type GetPostBySlugResponse = {
  publication: {
    post: {
      title: string;
      subtitle?: string;
      coverImage: {
        url: string;
      };
      publishedAt: string;
      readTimeInMinutes: number;
      content: {
        html: string;
      };
      author: {
        name: string;
        profilePicture?: string;
      };
    };
  };
};
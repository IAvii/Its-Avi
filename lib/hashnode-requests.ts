import request, { gql } from "graphql-request";

import {
  GetPostsArgs,
  GetPostsResponse,
  SubscribeToNewsletterResponse,
  PublicationName,
  GetPostBySlugResponse,
} from "../types/hashnode-request";

const endpoint = process.env.NEXT_PUBLIC_HASHNODE_ENDPOINT;
const publicationId = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_ID;

export async function getBlogName() {
  const query = gql`
    query getBlogName($publicationId: ObjectId!) {
      publication(id: $publicationId) {
        title
        displayTitle
        favicon
      }
    }
  `;

  if (!endpoint || !publicationId) {
    throw new Error("Hashnode endpoint or publication ID is not defined");
  }

  const response = await request<PublicationName>(endpoint, query, {
    publicationId,
  });

  return {
    title: response.publication.title,
    displayTitle: response.publication.displayTitle,
    favicon: response.publication.favicon,
  };
}

export async function getPosts({ first = 9, pageParam = "" }: GetPostsArgs) {
  const query = gql`
    query getPosts($publicationId: ObjectId!, $first: Int!, $after: String) {
      publication(id: $publicationId) {
        posts(first: $first, after: $after) {
          edges {
            node {
              id
              title
              subtitle
              slug
              content {
                text
              }
              coverImage {
                url
              }
              readTimeInMinutes
              publishedAt
              author {
                name
                profilePicture
              }
            }
            cursor
          }
        }
      }
    }
  `;

  if (!endpoint || !publicationId) {
    throw new Error("Hashnode endpoint or publication ID is not defined");
  }

  const response = await request<GetPostsResponse>(endpoint, query, {
    publicationId,
    first,
    after: pageParam,
  });

  return response.publication.posts.edges;
}

export async function subscribeToNewsletter(email: string) {
  const mutation = gql`
    mutation subscribeToNewsletter($publicationId: ObjectId!, $email: String!) {
      subscribeToNewsletter(
        input: { email: $email, publicationId: $publicationId }
      ) {
        status
      }
    }
  `;

  if (!endpoint || !publicationId) {
    throw new Error("Hashnode endpoint or publication ID is not defined");
  }

  const response = await request<SubscribeToNewsletterResponse>(
    endpoint,
    mutation,
    {
      publicationId,
      email,
    }
  );

  return response;
}

export async function getPostBySlug(slug: string | string[]) {
  const query = gql`
    query getPostBySlug($publicationId: ObjectId!, $slug: String!) {
      publication(id: $publicationId) {
        post(slug: $slug) {
          title
          subtitle
          coverImage {
            url
          }
          publishedAt
          readTimeInMinutes
          content {
            markdown
          }
          author {
            name
            profilePicture
          }
        }
      }
    }
  `;

  if (!endpoint || !publicationId) {
    throw new Error("Hashnode endpoint or publication ID is not defined");
  }

  const response = await request<GetPostBySlugResponse>(endpoint, query, {
    publicationId,
    slug,
  });

  return response.publication.post;
}

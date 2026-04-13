import { T_PageQueryProps, T_PageRespProps, T_Snippet, T_SnippetData, T_StoreData, T_User } from '@/src/types';


export const getSnippets = async (
  pagination: T_PageQueryProps,
  errCallback: (err: any) => void
): Promise<{ data: T_SnippetData[]; pagination: T_PageRespProps } | undefined> => {
  try {
    const { page, limit, cursor, backward } = pagination;
    const url = new URL(`/api/snippets`, window.location.origin);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('limit', limit.toString());
    if (cursor) {
      url.searchParams.append('cursor', cursor);
    }
    if (backward) {
      url.searchParams.append('backward', 'true');
    }
    const response = await fetch(url, { method: 'GET' });
    if (response.ok) {
      return await response.json();
    }
    errCallback('Failed to Get snippets');
  } catch (error: any) {
    console.error(error);
    errCallback(error?.message || 'Failed to Get snippet');
  }
};

export const getSnippet = async (
  id: string,
  errCallback: (err: any) => void
): Promise<T_SnippetData | undefined> => {
  try {
    const response = await fetch(`/api/snippets/${id}`, { method: 'GET' });
    if (response.ok) {
      return await response.json();
    }
    errCallback('Failed to Get snippet');
  } catch (error: any) {
    console.error(error);
    errCallback(error?.message || 'Failed to Get snippet');
  }
};

export const createSnippet = async (
  user: T_User,
  snippet: T_StoreData,
  errCallback?: (err: string) => void
): Promise<T_SnippetData | undefined> => {
  try {
    const [userRes, snippetRes] = await Promise.all([
      fetch(`/api/users/${user.userId}`, {
        method: 'POST',
        body: JSON.stringify(user),
      }),
      fetch(`/api/snippets/${snippet.id}`, {
        method: 'POST',
        body: JSON.stringify(snippet),
      }),
    ]);
    if (userRes.ok && snippetRes.ok) {
      return await snippetRes.json();
    }
    if (errCallback) {
      errCallback('Failed to create snippets');
    }
  } catch (error: any) {
    console.error(error);
    if (errCallback) {
      errCallback(error?.message || 'Failed to create snippet');
    }
  }
};

export const saveSnippet = async (
  snippet: T_StoreData,
  errCallback?: (err: string) => void
): Promise<T_SnippetData | undefined> => {
  try {
    const response = await fetch(`/api/snippets/${snippet.id}`, {
      method: 'POST',
      body: JSON.stringify(snippet),
    });
    if (response.ok) {
      return await response.json();
    }
    if (errCallback) {
      errCallback('Failed to Update snippets');
    }
  } catch (error: any) {
    console.error(error);
    if (errCallback) {
      errCallback(error?.message || 'Failed to Update snippet');
    }
  }
};

export const deleteSnippet = async (
  snippet: T_Snippet,
  errCallback?: (err: string) => void
): Promise<T_SnippetData | undefined> => {
  try {
    const response = await fetch(`/api/snippets/${snippet.id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      if (errCallback) {
        errCallback('Failed to Delete snippet');
      }
    } else {
      return await response.json();
    }
  } catch (error: any) {
    console.error(error);
    if (errCallback) {
      errCallback(error?.message || 'Failed to Delete snippet');
    }
  }
};
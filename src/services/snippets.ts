import { T_SnippetData, T_StoreData, T_User } from '@/src/types';


export const getSnippets = async (errCallback:(err:any)=>void):Promise<T_SnippetData[]> => {
  try {
    const response = await fetch('/api/snippets', { method: 'GET' });
    if (response.ok) {
      return await response.json();
    }
    errCallback('Failed to Get snippets');

  } catch (error:any) {
    console.error(error);
    errCallback(error?.message || 'Failed to Get snippet');
  }
  return []
}

export const getSnippet = async (id:string, errCallback:(err:any)=>void):Promise<T_SnippetData | undefined> => {
  try {
    const response = await fetch(`/api/snippets/${id}`, { method: 'GET' });
    if (response.ok) {
      return await response.json();
    }
    errCallback('Failed to Get snippet');
  } catch (error:any) {
    console.error(error);
    errCallback(error?.message || 'Failed to Get snippet');
  }
}

export const createSnippet = async (user:T_User, snippet:T_StoreData, errCallback?:(err:string)=>void):Promise<T_SnippetData | undefined> => {
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
  } catch (error:any) {
    console.error(error);
    if (errCallback) {
      errCallback(error?.message || 'Failed to create snippet');
    }
  }
}

export const saveSnippet = async (snippet:T_StoreData, errCallback?: (err:string)=>void):Promise<T_SnippetData | undefined> => {
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
  } catch (error:any) {
    console.error(error);
    if(errCallback) {
      errCallback(error?.message || 'Failed to Update snippet');
    }
  }
}
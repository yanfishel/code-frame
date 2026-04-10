import { T_SnippetData } from '@/src/types';


export const getSnippets = async (errCallback:(err:any)=>void):Promise<T_SnippetData[]> => {
  try {
    const response = await fetch('/api/snippets', { method: 'GET' });
    if (response.ok) {
      return await response.json();
    }
    errCallback('Failed to fetch snippets');

  } catch (error) {
    errCallback(error)
  }
  return []
}
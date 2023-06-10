import { ParsedUrlQuery } from 'querystring';

export function handleQueryParams(query: ParsedUrlQuery) {
  const category =
    query?.category && ['0', '1', '2'].includes(query.category as string)
      ? `${query.category}`
      : '';
  const sort =
    query?.sort &&
    [
      'recently_launched',
      'recently_ending',
      'all',
      'project_backers',
      'hot_project'
    ].includes(query.sort as string)
      ? (query.sort as string)
      : 'recently_launched';
  const page = query?.page ? `${query.page}` : '1';

  const queryParams = {
    sort,
    page,
    limit: '9'
  };

  return category ? { ...queryParams, category } : queryParams;
}

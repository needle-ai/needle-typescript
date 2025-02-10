interface PaginationParams {
  offset?: number;
  limit?: number;
}

export async function collectPaginatedApi<P extends PaginationParams, R>(
  apiCall: (params: P) => Promise<R[]>,
  params: P,
) {
  const results: R[] = [];

  let offset = 0;
  const limit = 500;

  while (true) {
    const res = await apiCall({ ...params, offset, limit });
    if (res.length === 0) {
      break;
    }

    results.push(...res);
    offset += limit;
  }

  return results;
}

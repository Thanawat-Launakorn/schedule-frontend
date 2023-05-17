export interface IPagination {
  page?: number;
  limit?: number;
  orderBy?: "ASC" | "DESC";
  enabled?: boolean;
  pagination?: boolean;
}

export const initParams = {
  page: 1,
  limit: 5,
};

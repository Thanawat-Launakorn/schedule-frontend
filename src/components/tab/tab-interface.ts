export interface IItemsTabLayout {
  key: string;
  label: string;
  children: {
    search: ISearch;
    table: React.ReactElement;
  };
}

export interface ISearch {
  item: React.ReactElement;
  onFinish: (values: any) => void;
  onCancel: VoidFunction;
}

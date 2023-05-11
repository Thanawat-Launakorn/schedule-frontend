export interface IItemsTabLayout {
  key: string;
  label: string;
  children: {
    search: ISearch;
    table: React.ReactElement;
    export?: React.ReactNode;
  };
}

export interface ISearch {
  item: React.ReactElement;
  onFinish: (values: any) => void;
  onCancel: VoidFunction;
}

export interface Iexport {
  item: React.ReactElement;
  onFinish: (values: any) => void;
}

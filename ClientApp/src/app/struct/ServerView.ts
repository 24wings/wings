export class ServerView {
  dataSource: {
    key: string,
    type: string;
    loadUrl: string;
    insertUrl: string;
    updateUrl: string;
    deleteUrl: string;
  };
  items: { editorOptions: any }[]
  cols: { calculateDisplayValue: Function }[]
}  
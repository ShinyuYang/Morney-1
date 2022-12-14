type RootState = {
  recordList: RecordItem[];
  createRecordError: Error|null;
  createTagError: Error|null;
  tagList: Tag[];
  currentTag?: Tag;
}

type RecordItem ={
  tags: Tag[];
  notes: string;
  type: string;
  amount: number;//数据类型
  createdAt?: string;//类(构造函数) 数据类型object可以细分成不同的类
}
//自定义类型,整个src都可以使用,不需要引用
type Tag={
  id: string;
  name: string;
}

type TagListModel ={
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => 'success' | 'duplicated';//success 表示成功,duplicated表示name重复
  update: (id: string,name: string) => 'success'|'not found'|'duplicated';
  remove: (id: string) => boolean;
  save: () => void;
}
// interface Window{
//   // store: {
//   //   tagList: Tag[];
//   //   createTag: (name: string) => void;
//   //   findTag: (id: string) => Tag|undefined;
//   //   removeTag: (id: string) => boolean;
//   //   updateTag: (id: string,name: string) => 'success'|'not found'|'duplicated';
//   //   recordList: RecordItem[];
//   //   createRecord: (record: RecordItem) => void;
//   // };
//
// }
export type MyToastType = {
  status: number;
  title: string;
  body: string;
};

export type MyToastPropsType = MyToastType & { onClose: () => void };

type ToastPropType = {
  status: number;
  message: string;
};

export default function Toast(props: ToastPropType) {
  return (
    <div className={`position-fixed bottom-0 end-0 bg-${props.status}`}>
      <p>{props.message}</p>
    </div>
  );
}

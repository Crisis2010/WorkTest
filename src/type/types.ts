
export type LabelData = {
  text: string
  width: number
  height: number
  clicked: boolean
  key: number
}

export type LabelProps = {
  data: LabelData;
  containerMouseEnter: ()=> React.MouseEvent;
  containerMouseLeave: ()=> React.MouseEvent;
  parentWidth: number
};
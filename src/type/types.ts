
export type LabelData = {
  text: string
  width: number
  height: number
  clicked: boolean
  key: number
}

export interface LabelProps {
  data: LabelData;
  parentWidth: number
  parentHeight: number
};
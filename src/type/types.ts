
export type LabelData = {
  text: string
  width: number
  height: number
  clicked: boolean
  id: string
}

export interface LabelProps {
  data: LabelData;
  parentWidth: number
  parentHeight: number
};
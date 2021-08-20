export type LabelData = {
  id: string;
  text: string;
  left: number;
  top: number;
};

export interface LabelProps {
  data: LabelData;
  parentWidth: number;
  parentHeight: number;
}

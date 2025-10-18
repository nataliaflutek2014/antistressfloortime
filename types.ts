
export interface Option {
  text: string;
  value: number;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

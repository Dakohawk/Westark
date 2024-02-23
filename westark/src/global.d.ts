type Season = {
  id: number;
  year: string;
};

type Show = {
  id?: number;
  season?: string;
  start_date: string;
  identifier: string;
};

type Division = {
  id?: number;
  season?: string;
  description: string;
  start_age: string;
  end_age: string;
};

type ShowClass = {
  id?: number;
  season?: string;
  ride_order: string;
  description: string;
  is_timed: string;
  division?: string;
};

type Exhibitor = {
  id?: number;
  season?: string;
  name: string;
  age: string;
};

type Entry = {
  id?: string;
  show?: string;
  class?: string;
  exhibitor?: string;
  placement?: string;
  time?: string;
};

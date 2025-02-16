// todo
export type DateTime = string;

export interface Model {
  id: string;
  created_at: DateTime;
  updated_at: DateTime;
}

export interface ResourceItem extends Model {}

export interface ResourceUser extends Model {
  name: string;
  username: string;
}

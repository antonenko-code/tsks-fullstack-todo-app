export interface Task {
  id: string;
  title: string;
  completed: boolean;
  date: Date;
  collectionId: string | undefined;
}

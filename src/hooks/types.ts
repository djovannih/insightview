export interface ActionResult<T> {
  data: T | undefined;
  loading: boolean;
  error: boolean;
  trigger: () => void;
}

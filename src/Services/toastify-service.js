import { toast } from "react-toastify";
const toastList = new Set();
/**
 * maxCount: max number of toasts to be shown
 * text: to be shown within toast body
 * error: boolean value if the toast status is error
 * opts: another toast options to be passed
 */

export const notify = (maxCount, text, error, opts) => {
  if (toastList.size < maxCount) {
    const id = error
      ? toast.error(text, { onClose: () => toastList.delete(id), ...opts })
      : toast(text, { onClose: () => toastList.delete(id), ...opts });
    toastList.add(id);
  }
};

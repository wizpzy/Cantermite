export function getToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getDueDate(borrowDate, period) {
    const dueDate = new Date(borrowDate);
    dueDate.setDate(dueDate.getDate() + period);
    const year = dueDate.getFullYear();
    const month = String(dueDate.getMonth() + 1).padStart(2, "0");
    const day = String(dueDate.getDate()).padStart(2, "0");
    return `${month}/${day}/${year}`;
}

export function reformatDueDate (dateString) {
    const date = dateString.split("/");
    const year = date[2];
    const month = String(date[0]).padStart(2, "0");
    const day = String(date[1]).padStart(2, "0");
    return `${year}-${month}-${day}`;
}
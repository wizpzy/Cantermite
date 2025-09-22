export const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export const getDueDate = (borrowDate) => {
    const dueDate = new Date(borrowDate);
    dueDate.setDate(dueDate.getDate() + 14);
    return dueDate.toISOString().split("T")[0];
}
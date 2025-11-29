// api/recordService.ts
export const getRecords = async () => {
  const res = await fetch(`${process.env.API_URL}/api/auth/login`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

export const createRecord = async (data: { name: string; email: string }) => {
  const res = await fetch(`${process.env.API_URL}/api/user/insert`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Create failed");
  return res.json();
};

export const updateRecord = async (id: number, data: { name: string; email: string }) => {
  const res = await fetch(`${process.env.API_URL}/api/auth/login/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Update failed");
  return res.json();
};

export const deleteRecord = async (id: number) => {
  const res = await fetch(`${process.env.API_URL}/api/auth/login/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Delete failed");
  return true;
};

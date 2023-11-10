import { NextApiRequest, NextApiResponse } from "next";

export interface Todo {
  id: number;
  userId: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdDate: string;
  modifiedDate: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query, body } = req;

  switch (method) {
    case "GET": {
      const response = await getTodo(query.id as string);

      const data = await response.json();

      return res.status(response.status).json(data);
    }
    case "POST": {
      const response = await createTodo(body);

      const data = await response.json();

      return res.status(response.status).json(data);
    }
    case "PUT": {
      const response = await updateTodo(body, query.id as string);

      const data = await response.json();

      return res.status(response.status).json(data);
    }
    case "DELETE": {
      const response = await deleteTodo(query.id as string);

      const data = await response.json();

      return res.status(response.status).json(data);
    }
    default:
      return res.status(500).send("Unsupported http method");
  }
}

const getTodo = async (id: string) => {
  return fetch(`${process.env.API_BASE_URL}/todo/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
};

const createTodo = async (todo: string) => {
  return fetch(`${process.env.API_BASE_URL}/todo`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: todo
  });
};

const updateTodo = (body: string, id: string) => {
  return fetch(`${process.env.API_BASE_URL}/todo/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: body
  });
};

const deleteTodo = (id: string) => {
  return fetch(`${process.env.API_BASE_URL}/todo/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
};

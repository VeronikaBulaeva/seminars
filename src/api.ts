const baseUrl = "http://localhost:3000/seminars/";

/**
 Обертка для fetch. Возвращает типизированный ответ
 * @constructor
 * @param {string} endpoint - Эндпоинт для запроса.
 * @param {string} method - Метод запроса. По умолчанию GET
 * @param {string} body - Тело запроса
 */

const Fetch = async <T>(
  endpoint: string = "",
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
  body?: unknown,
): Promise<T> => {
  const response = await fetch(baseUrl + endpoint, {
    method,
    body: JSON.stringify(body),
  });
  return (await response.json()) as T;
};

export default Fetch;

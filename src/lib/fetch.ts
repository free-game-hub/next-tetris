


const baseUrl = process.env.API_URL || '';
// 添加新的封装fetch方法
export async function fetchWrapper<T>(url: string, options?: RequestInit): Promise<T> {

  try {
    const response = await fetch(`${baseUrl}${url}`, options);

    console.log(response.ok)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error
  }
}

import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const data = {
      userId: 1,
      id: 1,
      title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipitsuscipit recusandae consequuntur expedita et cumreprehenderit molestiae ut ut quas totamnostrum rerum est autem sunt rem eveniet architecto"
    }
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(data));
  });

  test('should perform request to correct provided url', async () => {
    const mockData = {
      userId: 1,
      id: 1,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto',
    };

    const relativePath = '/posts/1';

    mockedAxios.get = jest.fn().mockResolvedValue({ data: mockData });

    (axios.create as jest.Mock).mockReturnValue(mockedAxios);

    const result = await throttledGetDataFromApi(relativePath);

    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const mockData = {
      userId: 1,
      id: 1,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto',
    };

    const relativePath = '/posts/1';

    mockedAxios.get.mockResolvedValue({ data: mockData });

    const result = await throttledGetDataFromApi(relativePath);

    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(relativePath);
  });
});

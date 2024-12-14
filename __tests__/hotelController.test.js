import { hotelController } from "../src/controllers/hotelController";
import hotelService from "../src/services/hotelService";
import { jest } from '@jest/globals'


describe("hotelController", () => {
    describe("getHotelById", () => {
      afterEach(() => {
        jest.clearAllMocks(); // 清除所有 mock 函式
        jest.mock('../src/services/hotelService');
      });
  
      it("should return hotel details when hotel is found", async () => {
        // 模擬 hotelService.getHotelById 返回的結果
        const mockHotel = { id: 1, name: "Test Hotel", location: "Test City" };
        hotelService.getHotelById = jest.fn(); // 模擬函式
        hotelService.getHotelById.mockResolvedValue(mockHotel);
  
        const req = { params: { id: "1" } }; // 模擬 URL 參數
        const res = {
          json: jest.fn(),
          status: jest.fn(() => res)
        };
  
        await hotelController.getHotelById(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockHotel);
      });

    });
  });
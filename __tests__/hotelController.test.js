import { hotelController } from "../src/controllers/hotelController";
import hotelService from "../src/services/hotelService";
import { jest } from '@jest/globals';
import sequelize from '../src/config/database.js';


describe("hotelController", () => {
    describe("getHotelById", () => {
      afterEach(() => {
        jest.clearAllMocks();
        jest.mock('../src/services/hotelService');
      });
  
      it("should return hotel details when hotel is found", async () => {
        const mockHotel = { id: 1, name: "Test Hotel", location: "Test City" };
        hotelService.getHotelById = jest.fn();
        hotelService.getHotelById.mockResolvedValue(mockHotel);
  
        const req = { params: { id: "1" } };
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

  // Clean up database connections after all tests
afterAll(async () => {
  await sequelize.close();  // Close the database connection after all tests
});
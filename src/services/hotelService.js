import hotelRepository from '../repositories/hotelRepository.js';

const hotelService = {
  getFilteredHotels: async (filter) => {
    try {
      return await hotelRepository.getHotelsByFilter(filter);
    } catch (error) {
      throw new Error('Failed to fetch hotels by filter');
    }
  },

  getHotelById: async (hotelId) => {
    return await hotelRepository.getHotelById(hotelId);
  },
  
  addHotelsFromCsv: async (file) => {
    return await hotelRepository.addHotelsFromCsv(file);
  },

  addHotelsFromJson: async (hotelsData) => {
    return await hotelRepository.addHotelsFromJson(hotelsData);
  },

  updateHotel: async (hotelId, hotelData) => {
    return await hotelRepository.updateHotel(hotelId, hotelData);
  },

  deleteHotel: async (hotelId) => {
    return await hotelRepository.deleteHotel(hotelId);
  },
};

export default hotelService;
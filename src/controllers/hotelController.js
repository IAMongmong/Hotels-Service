import hotelService from '../services/hotelService.js';
import Hotel from '../models/hotel.js';

const hotelController = {
  getFilteredHotels: async (req, res) => {
    try {
      const { country, city, is_open } = req.query;

      const filter = {};

      if (country) filter.country = country;
      if (city) filter.city = city;
      if (is_open !== undefined) filter.is_open = is_open;

      const hotels = await hotelService.getFilteredHotels(filter);

      if (hotels.length === 0) {
        return res.status(404).json({ error: 'No hotels found with the specified filters' });
      }

      res.status(200).json(hotels);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch hotels with filters' });
    }
  },

  getHotelById: async (req, res) => {
    try {
      const hotelId = req.params.id;
      const hotel = await hotelService.getHotelById(hotelId);
      if (!hotel) {
        return res.status(404).json({ error: 'Hotel not found' });
      }
      res.status(200).json(hotel);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch hotel by ID' });
    }
  },

  createHotel: async (req, res) => {
    try {
      if (req.is('multipart/form-data')) {
        if (!req.file) {
          return res.status(400).json({ error: 'No file uploaded' });
        }

        const filePath = req.file.path;
        await hotelService.addHotelsFromCsv(filePath);
        return res.status(200).json({ message: 'Hotels data uploaded and saved successfully!' });
      } 
      else if (req.is('application/json')) {
        const hotelsData = req.body;
        await hotelService.addHotelsFromJson(hotelsData);
        return res.status(200).json({ message: 'Hotel(s) added successfully!' });
      }
      else {
        return res.status(400).json({ error: 'Invalid Content-Type' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message || 'Something went wrong' });
    }
  },

  updateHotel: async (req, res) => {
    try {
      const hotelId = req.params.id;
      const hotelData = req.body;

      const hotel = await Hotel.findByPk(hotelId);
      if (!hotel) {
        return res.status(404).json({ error: 'Hotel not found' });
      }

      await hotel.update(hotelData);

      res.status(200).json({ message: 'Hotel updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update hotel' });
    }
  },

  deleteHotel: async (req, res) => {
    try {
      const hotelId = req.params.id;

      const hotel = await Hotel.findByPk(hotelId);
      if (!hotel) {
        return res.status(404).json({ error: 'Hotel not found' });
      }

      await hotel.destroy();

      res.status(200).json({ message: 'Hotel deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete hotel' });
    }
  }
};

export { hotelController };

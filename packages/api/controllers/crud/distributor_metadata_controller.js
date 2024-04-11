const { DistributorMetaData } = require('../../models/business_model');
const GenericCRUDController = require('./generic_crud_controller');

const mongoose = require('mongoose');

class DistributorMetaDataController extends GenericCRUDController {
  constructor() {
    super();
  }

  // ?businessId {distributorName,distributorDeadlineDate,distributorDeliveryDate,distributorMetaData}
  async createDistributorMetaData(req, res) {
    try {
      const businessId = req.query.businessId;
      const {
        distributorName,
        distributorDeadlineDate,
        distributorDeliveryDate,
        distributorMetaData
      } = req.body;

      // Need distributorName to check if the document exists
      const exists = await this.doesExistGeneric(
        businessId,
        'distributorMetaDataList.distributorName',
        distributorName
      );

      if (exists) {
        return res
          .status(400)
          .json({ error: 'Distributor name already exists.' });
      }

      const distributorMetaDataObject = {
        distributorName: distributorName,
        distributorDeadlineDate: distributorDeadlineDate,
        distributorDeliveryDate: distributorDeliveryDate,
        distributorMetaData: distributorMetaData
      };

      const statusDetails = await super.createGeneric(
        businessId,
        'distributorMetaDataList',
        DistributorMetaData,
        distributorMetaDataObject
      );

      if (statusDetails && statusDetails.modifiedCount > 0) {
        return res.status(200).json({ statusDetails: [statusDetails] });
      } else {
        return res.status(400).json({ statusDetails: [statusDetails] });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // ?businessId
  async readAllDistributorMetaData(req, res) {
    try {
      let businessId = new mongoose.Types.ObjectId(req.query.businessId);

      const fieldValues = await super.readGeneric([
        { $match: { _id: businessId } },
        { $project: { distributorMetaDataList: 1, _id: 0 } }
      ]);

      if (!fieldValues || fieldValues.length === 0) {
        return res.status(404).json({
          error: 'No location metadata found for the given business ID'
        });
      }

      return res.status(200).json({
        outputList: fieldValues[0]?.distributorMetaDataList
      });
    } catch (error) {
      console.error('Error reading distributor metadata:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  // TODO: UpdateDistributorMetaDataName NEEDS TO UPDATE ALL EXISTING LOCATIONS in Items
  // ?businessId { findDistributorName, newDistributorName }
  async updateDistributorMetaDataName(req, res) {
    try {
      const { businessId } = req.query;
      const { findDistributorName, newDistributorName } = req.body;

      // Need distributorName to check if the document exists
      const exists = await this.doesExistGeneric(
        businessId,
        'distributorMetaDataList.distributorName',
        newDistributorName
      );

      if (exists) {
        return res
          .status(400)
          .json({ error: 'New Distributor name already exists.' });
      }

      const filterJson = {
        _id: businessId,
        'distributorMetaDataList.distributorName': findDistributorName
      };

      const updateJson = {
        $set: {
          'distributorMetaDataList.$.distributorName': newDistributorName
        }
      };

      const statusDetails = await super.updateGeneric(filterJson, updateJson);

      return res.status(200).json({ statusDetails: [statusDetails] });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // req.query.businessId { findDistributorName, newDistributorDeadlineDate }
  async updateDistributorMetaDataDeadlineDate(req, res) {
    try {
      const { businessId } = req.query;
      const { findDistributorName, newDistributorDeadlineDate } = req.body;

      const filterJson = {
        _id: businessId,
        'distributorMetaDataList.distributorName': findDistributorName
      };

      const updateJson = {
        $set: {
          'distributorMetaDataList.$.distributorDeadlineDate':
            newDistributorDeadlineDate
        }
      };

      const statusDetails = await super.updateGeneric(filterJson, updateJson);

      return res.status(200).json({ statusDetails: [statusDetails] });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // req.query.businessId { findDistributorName, newDistributorDeliveryDate }
  async updateDistributorMetaDataDeliveryDate(req, res) {
    try {
      const { businessId } = req.query;
      const { findDistributorName, newDistributorDeliveryDate } = req.body;

      const filterJson = {
        _id: businessId,
        'distributorMetaDataList.distributorName': findDistributorName
      };

      const updateJson = {
        $set: {
          'distributorMetaDataList.$.distributorDeliveryDate':
            newDistributorDeliveryDate
        }
      };

      const statusDetails = await super.updateGeneric(filterJson, updateJson);

      return res.status(200).json({ statusDetails: [statusDetails] });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // req.query.businessId { findDistributorName, newDeliveryMetaData }
  async updateDistributorMetaDataMetaData(req, res) {
    try {
      const { businessId } = req.query;
      const { findDistributorName, newDeliveryMetaData } = req.body;

      const filterJson = {
        _id: businessId,
        'distributorMetaDataList.distributorName': findDistributorName
      };

      const updateJson = {
        $set: {
          'distributorMetaDataList.$.distributorMetaData': newDeliveryMetaData
        }
      };

      const statusDetails = await super.updateGeneric(filterJson, updateJson);

      return res.status(200).json({ statusDetails: [statusDetails] });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // ?businessId {distributorName}
  async deleteDistributorMetaData(req, res) {
    try {
      const businessId = req.query.businessId;
      const { distributorName } = req.body;

      if (!businessId || !distributorName) {
        return res.status(400).json({
          message: 'Missing businessId or distributorName in the request.'
        });
      }

      const objectId = new mongoose.Types.ObjectId(businessId);

      const statusDetails = await this.deleteGeneric(
        objectId,
        'distributorMetaDataList',
        'distributorName',
        distributorName
      );

      return res.status(200).json({ statusDetails: [statusDetails] });
    } catch (error) {
      console.error('Error deleting distributor metadata:', error);
      return res.status(500).json({ error: error.message });
    }
  }
}

let distributorMetadataListController = new DistributorMetaDataController();
module.exports = {
  createDistributorMetaData: (req, res) =>
    distributorMetadataListController.createDistributorMetaData(req, res),
  readAllDistributorMetaData: (req, res) =>
    distributorMetadataListController.readAllDistributorMetaData(req, res),
  updateDistributorMetaDataName: (req, res) =>
    distributorMetadataListController.updateDistributorMetaDataName(req, res),
  updateDistributorMetaDataDeadlineDate: (req, res) =>
    distributorMetadataListController.updateDistributorMetaDataDeadlineDate(
      req,
      res
    ),
  updateDistributorMetaDataDeliveryDate: (req, res) =>
    distributorMetadataListController.updateDistributorMetaDataDeliveryDate(
      req,
      res
    ),
  updateDistributorMetaDataMetaData: (req, res) =>
    distributorMetadataListController.updateDistributorMetaDataMetaData(
      req,
      res
    ),
  deleteDistributorMetaData: (req, res) =>
    distributorMetadataListController.deleteDistributorMetaData(req, res)
};

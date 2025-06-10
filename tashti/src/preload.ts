// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { sequelize, phone, owner, utp, aron } from "./databaser";
import { TcreatePhone } from "./schemas/phone";
import { Towner } from "./schemas/owner";
import { Model, Op } from "sequelize";
import SampleData from "./SampleData";
import { UTP } from "./common/types";
// use sequelize for sql operations

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

contextBridge.exposeInMainWorld("shaiseAPI", {
  // ========== Admin ========== //

  syncDB: async () => {
    try {
      sequelize.authenticate();
      SampleData();
      return "Database synced successfully.";
    } catch (error) {
      return "Unable to connect to the database:" + error;
    }
  },

  // ========== PHONE ========== //

  getLineFromTX1: async (zakif: number, block: number, zug: number) => {
    const query = await phone.findOne({
      where: { zakif: zakif, block: block, zug: zug },
      include: [{ model: utp, include: [aron] }, owner],
    });
    if (query != null) return query.toJSON(); // detailed phone query with nituv
    return "404 phone not found";
  },

  getPhoneLines: async () => {
    const query = await phone.findAll({ raw: true, where: { isOccupied: false } });
    return query;
  },

  getPhoneLine: async (line: string) => {
    const query = await phone.findOne({
      where: { lineNumber: line },
      include: [{ model: utp, include: [aron] }, owner],
    });
    if (query != null) return query.toJSON(); // detailed phone query with nituv
    return "404 phone not found";
  },

  createPhoneLine: async (tPhone: TcreatePhone) => {
    const [entry, wasCreated] = await phone.findOrCreate({
      where: { lineNumber: tPhone.lineNumber },
      defaults: tPhone,
    });
    return wasCreated ? "201, phone created" : "403, phone already exists";
  },

  //FIXME: utps: type is an array of 1 element, not array element, check this file and see if there are more stuff like this.
  editLineNituv: async (
    lineId: number,
    utps: [{ AronID: number; utp: number }]
  ) => {
    utp.destroy({ where: { PhoneId: lineId } })

    utps.forEach(async (row) => {
      const [UTPNituv, wasCreated] = await utp.findOrCreate({
        where: {
          AronId: row.AronID,
          utp: row.utp,
        },
        defaults: {
          AronId: row.AronID,
          utp: row.utp,
          PhoneId: lineId,
        },
      }).catch(e => { return e })
      if (!wasCreated) UTPNituv.update({ PhoneId: lineId });
    });
    return "201, nituv edited";
  },

  setPhoneOccupation: async (phoneId: number, isOccupied: boolean) => {
    const affected = await phone.update(
      { isOccupied: isOccupied }, { where: { id: phoneId } }
    )

    return affected
  },

  // ========== OWNER ========== //

  getOwnerLines: async (ownerId: number) => {
    const query = await owner.findByPk(ownerId, {
      include: phone,
    });
    if (query != null) return query.toJSON();
    return "404 owner not found";
  },

  ownerSearch: async (ownerName: string) => {
    return await owner.findAll({
      attributes: ["id", "name"],
      where: {
        name: {
          [Op.startsWith]: ownerName,
        },
      },
      raw: true,
    });
  },

  assignLineToOwner: async (lineId: number, ownerId: number) => {
    phone
      .update(
        {
          OwnerId: ownerId,
          isOccupied: true,
        },
        {
          where: {
            id: lineId,
          },
        }
      )
      .then((result) => {
        return result;
      })
      .catch((result) => {
        return result;
      });
  },

  createOwner: async (tOwner: Towner) => {
    const [entry, wasCreated] = await owner.findOrCreate({
      where: { name: tOwner.name },
      defaults: tOwner,
    });
    return wasCreated ? "201, owner created" : "403, owner already exists";
  },

  // ========== ARON ========== //

  getAronsList: async () => {
    const query = await aron.findAll({ raw: true });
    return query;
  },

  getShirshurToAron: async (aronId: number) => {
    const helperfunc = async (aronId: number): Promise<any[]> => {
      const currAron = await aron.findByPk(aronId);
      const currShirshurFromId = currAron.getDataValue("shirshurFromId");
      if (currShirshurFromId !== null) {
        return (await helperfunc(currShirshurFromId)).concat(currAron.toJSON());
      }
      return [currAron.toJSON()];
    };
    return helperfunc(aronId);
  },

  aronSearch: async (aronLocation: string) => {
    const query = await aron.findAll({
      attributes: ["id", "location", "name"],
      where: {
        location: {
          [Op.startsWith]: aronLocation,
        },
      },
      raw: true,
    });
    return query;
  },

  getAronLines: async (aronId: number) => {
    const query = await aron.findByPk(aronId, {
      include: { model: utp, include: [phone] },
    });
    if (query != null) return query.toJSON();
    return "404 aron not found";
  },

  editUTP: async (utpId: number, phoneId: number) => {
    utp
      .update(
        {
          PhoneId: phoneId,
        },
        {
          where: {
            id: utpId,
          },
        }
      )
      .then((result) => {
        return result;
      })
      .catch((result) => {
        return result;
      });
  },

  addUTP: async (aronId: number, utpNum: number, phoneId: number) => {
    const [UTP, wasCreated] = await utp.findOrCreate({
      where: {
        utp: utpNum,
        PhoneId: phoneId,
        AronId: aronId,
      },
    });
    if (!wasCreated)
      return wasCreated ? "201, utp added" : "403, utp already exists";
  },

  deleteUTP: async (utpId: number) => {
    utp.destroy({ where: { id: utpId } });
  },

  // deleteUTPAbove: async (utpId: number) => {
  //   utp.findOne({ where: { id: utpId } }).then((e: UTP) => { })
  //   utp.destroy({ where: { id: utpId } });
  // },

  purgeLine: async (PhoneId: number) => {
    utp.destroy({ where: { PhoneId: PhoneId } })

  }
});

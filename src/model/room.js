import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Kos from "./kos.js";

const Room = db.define("Room", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  kos_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Kos,
      key: "id",
    },
  },
  room_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("available", "booked"),
    defaultValue: "available",
  },
});

Room.belongsTo(Kos, { foreignKey: "kos_id" });

export default Room;

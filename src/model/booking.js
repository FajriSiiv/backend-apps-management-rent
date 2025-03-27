import { DataTypes } from "sequelize";
import db from "../config/db.js";
import User from "./users.js";
import Kos from "./kos.js";

const Booking = db.define("Booking", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  kos_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Kos,
      key: "id",
    },
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
    },
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      isAfterStartDate(value) {
        if (value <= this.start_date) {
          throw new Error("End date harus setelah start date");
        }
      },
    },
  },
  status: {
    type: DataTypes.ENUM("pending", "paid", "canceled"),
    defaultValue: "pending",
  },
});

Booking.belongsTo(User, { foreignKey: "user_id" });
Booking.belongsTo(Kos, { foreignKey: "kos_id" });

export default Booking;

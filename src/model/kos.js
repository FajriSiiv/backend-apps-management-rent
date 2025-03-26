import { DataTypes } from "sequelize";
import db from "../config/db.js";
import User from "./users.js";

const Kos = db.define("Kos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  facilities: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
},
  {
    timestamps: true,
  }
);

Kos.belongsTo(User, { foreignKey: "owner_id", as: 'owner' });

export default Kos;

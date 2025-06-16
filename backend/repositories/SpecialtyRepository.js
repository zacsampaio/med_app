import Specialty from "../models/Specialty.js";


export const SpecialtyRepository = {
  create: (payload) => Specialty.create(payload),

  findAll: (filter = {}, projection = null) =>
    Specialty.find(filter, projection).sort({ name: 1 }),

  findById: (id) => Specialty.findById(id),

  update: (id, changes) =>
    Specialty.findByIdAndUpdate(id, changes, { new: true }),

  remove: (id) => Specialty.findByIdAndDelete(id),
};

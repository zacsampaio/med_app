import { SpecialtyRepository } from "../repositories/SpecialtyRepository.js";

export default {
  async list({ search }) {
    const query = search
      ? { name: new RegExp(search, "i") } // filtro para autocomplete
      : {};
    return await SpecialtyRepository.findAll(query, "name code");
  },

  async create({ name, code }) {
    // aqui você pode normalizar nome, validar código CBO, etc.
    return await SpecialtyRepository.create({ name, code });
  },

  async update(id, changes) {
    const updated = await SpecialtyRepository.update(id, changes);
    if (!updated) throw new Error("Specialty not found");
    return updated;
  },

  async remove(id) {
    const deleted = await SpecialtyRepository.remove(id);
    if (!deleted) throw new Error("Specialty not found");
  },
};

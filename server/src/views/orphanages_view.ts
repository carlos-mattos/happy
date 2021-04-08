import Orphanage from "../models/Orphanage";
import imagesView from "./images_view";

export default {
  render(orphanage: Orphanage) {
    const {
      about,
      id,
      instructions,
      latitude,
      longitude,
      name,
      open_on_weekends,
      opening_hours,
    } = orphanage;

    return {
      about,
      id,
      instructions,
      latitude,
      longitude,
      name,
      open_on_weekends,
      opening_hours,
      images: imagesView.renderMany(orphanage.images),
    };
  },

  renderMany(orphanages: Orphanage[]) {
    return orphanages.map((orphanage) => this.render(orphanage));
  },
};

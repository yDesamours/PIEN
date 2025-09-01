const host = "/api/cours";

const COURS = {};

COURS.GET_MODELS = () => ({
  method: "GET",
  url: host + "/models",
});

COURS.GET_ENVIRONMENTS = () => ({
  method: "GET",
  url: host + "/models/presets",
});

export default COURS;

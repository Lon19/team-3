export const QuestionnaireTypes = {
  "Mental Health": "Mental Health",
  "Adjustments": "Adjustments",
  "Work Self Confidence": "Work Self Confidence",
  "Organisational Culture": "Organisational Culture"
};

let typeMap = {};
for (let key in QuestionnaireTypes) {
  typeMap[key.toLowerCase()] = QuestionnaireTypes[key];
}

export const MapType = type => {
  let mappedType = typeMap[type.toLowerCase()];
  if (!mappedType) {
    mappedType = QuestionnaireTypes.Master;
  }
  return mappedType;
}
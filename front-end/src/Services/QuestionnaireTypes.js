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

export const GetParagraph = type => {
  const typeMapped = MapType(type);
  switch (typeMapped) {
    case "Mental Health":
      return "Below is a graph which tracks 3 different mental health values: depression, anxiety & stress.\n\n Click on the graph to see the answers you submitted";
  
    case "Adjustments": 
      return "";

    case "Work Self Confidence":
      return "Below is a graph which tracks 7 different categories: learning, problem solving, pressure, role expectations, teamwork, sensitivity, work politics";

    case "Organisational Culture":
      return "Below is a graph which tracks your answers from this questionnaire"
    default:
      break;
  }
}
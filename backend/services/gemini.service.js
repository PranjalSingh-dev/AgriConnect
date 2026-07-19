const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize GoogleGenerativeAI client
const apiKey = process.env.GEMINI_API_KEY;
let genAI = null;
if (apiKey && apiKey.trim().length > 0) {
  try {
    genAI = new GoogleGenerativeAI(apiKey);
  } catch (err) {
    console.error("Failed to initialize GoogleGenerativeAI client:", err);
  }
}

/**
 * Generate agricultural crop advisor advice using Gemini API
 * @param {string} crop
 * @param {string} symptoms
 * @returns {Promise<{disease: string, cause: string, treatment: string, prevention: string}>}
 */
async function generateCropAdvice(crop, symptoms) {
  if (!crop || !crop.trim()) {
    throw new Error("Crop name is required");
  }
  if (!symptoms || !symptoms.trim()) {
    throw new Error("Symptoms are required");
  }

  // If real Gemini client is initialized, call it
  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `You are a professional agricultural scientist and crop doctor.
Analyze the following crop and symptom report:
- Crop: ${crop.trim()}
- Symptoms: ${symptoms.trim()}

Diagnose the issue and suggest action items. You MUST return your response as a valid JSON object matching this schema:
{
  "disease": "Specific diagnosis / name of the possible disease or issue",
  "cause": "What caused the issue (e.g. fungal, bacterial, environmental, overwatering, pest, nutrient deficiency)",
  "treatment": "Direct actionable treatment, remedy, organic/chemical solutions",
  "prevention": "Preventive measures to take for future crop cycles or watering habits"
}
Ensure the JSON is raw, valid, and contains only the JSON object. Do not include markdown code block syntax (like \`\`\`json) in your raw response.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text().trim();

      // Clean up markdown markers if Gemini wraps the response in ```json ... ```
      if (text.startsWith("```")) {
        text = text.replace(/^```(?:json)?/, "").replace(/```$/, "").trim();
      }

      const parsed = JSON.parse(text);
      if (parsed.disease && parsed.cause && parsed.treatment && parsed.prevention) {
        return parsed;
      }
    } catch (apiError) {
      console.error("Gemini API crop advice call failed, falling back to mock diagnosis:", apiError.message);
    }
  }

  // Graceful fallback if Gemini API is offline, or key is missing, or parsing failed.
  // This matches standard cases like tomato, wheat, rice etc.
  const lowerCrop = crop.toLowerCase();
  const lowerSymptoms = symptoms.toLowerCase();

  if (lowerCrop.includes("tomato")) {
    if (lowerSymptoms.includes("yellow") || lowerSymptoms.includes("spot") || lowerSymptoms.includes("blight")) {
      return {
        disease: "Early Blight (Fungal)",
        cause: "Fungal infection (Alternaria solani) favored by warm, humid conditions",
        treatment: "Apply Copper Fungicide or Neem Oil spray. Remove affected lower leaves.",
        prevention: "Avoid overhead watering. Maintain proper spacing for airflow, rotate crops yearly."
      };
    }
    return {
      disease: "Tomato Leaf Curl or Blossom End Rot",
      cause: "Viral infection transmitted by whiteflies, or calcium deficiency due to uneven watering",
      treatment: "Apply calcium fertilizer (for blossom end rot) or spray organic insecticide for whiteflies.",
      prevention: "Maintain consistent soil moisture. Use insect mesh or silver mulching sheet."
    };
  }

  if (lowerCrop.includes("wheat")) {
    if (lowerSymptoms.includes("rust") || lowerSymptoms.includes("brown") || lowerSymptoms.includes("leaf")) {
      return {
        disease: "Leaf Rust (Fungal)",
        cause: "Puccinia triticina fungal spores spreading in humid cool conditions",
        treatment: "Apply triazole fungicide. Spray propiconazole at 0.1% concentration.",
        prevention: "Use rust-resistant wheat varieties. Sow seeds at recommended time."
      };
    }
  }

  // Default fallback advice
  return {
    disease: `Suspected Infection / Plant Stress on ${crop}`,
    cause: `Environmental stress, nutrient imbalance, or pest activity matching symptoms: "${symptoms}"`,
    treatment: "Apply organic fertilizer (NPK/Vermicompost) and monitor moisture. Spot-apply neem oil spray for insects.",
    prevention: "Improve field drainage, select certified disease-free seeds, and rotate crops."
  };
}

module.exports = {
  generateCropAdvice
};

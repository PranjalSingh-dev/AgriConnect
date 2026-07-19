# AgriConnect AI Advisor Prompts

This document details the iterative prompt design process used to integrate the AI Crop Advisor feature in AgriConnect, using the Google Gemini model.

---

## System Role / Instruction Used

All prompts were guided by the following core system instruction:
> You are a helpful, professional, and highly knowledgeable agricultural advisor for farmers. Your task is to diagnose plant disease based on the crop type and symptoms, and provide actionable remedies.

---

## Prompt Variations

### Prompt 1: General Free-form Text Advice
*   **Prompt Template**:
    ```
    Suggest treatment for crop disease:
    - Crop: {crop}
    - Symptoms: {symptoms}
    ```
*   **Example Input**:
    *   Crop: `Tomato`
    *   Symptoms: `Leaves turning yellow with brown spots`
*   **Example Output**:
    > "It looks like your tomato plants might be suffering from Early Blight, a common fungal disease. You should consider using a copper-based fungicide or an organic remedy like neem oil spray. Avoid getting the leaves wet when watering."
*   **Critique**: The response is helpful but lacks structure. It's returned as a single block of text which is difficult to parse programmatically and show in distinct frontend cards (e.g. Cause, Prevention).

---

### Prompt 2: Structured Markdown Sections
*   **Prompt Template**:
    ```
    You are a senior agricultural scientist. Analyze the following and provide a structured report with these headings: Disease, Cause, Treatment, and Prevention.
    - Crop: {crop}
    - Symptoms: {symptoms}
    ```
*   **Example Input**:
    *   Crop: `Tomato`
    *   Symptoms: `Leaves turning yellow with brown spots`
*   **Example Output**:
    > ### Disease
    > Early Blight (Fungal)
    >
    > ### Cause
    > Fungal infection (Alternaria solani) favored by warm, humid conditions.
    >
    > ### Treatment
    > Apply Copper Fungicide or Neem Oil spray. Remove affected lower leaves.
    >
    > ### Prevention
    > Avoid overhead watering. Maintain proper spacing for airflow, rotate crops yearly.
*   **Critique**: This output is far better. It divides the advice into logical fields, but requires complex text parsing in Javascript on the backend to extract each section.

---

### Prompt 3: Raw JSON Format (Worked Best)
*   **Prompt Template**:
    ```
    You are a professional agricultural scientist and crop doctor.
    Analyze the following crop and symptom report:
    - Crop: {crop}
    - Symptoms: {symptoms}

    Diagnose the issue and suggest action items. You MUST return your response as a valid JSON object matching this schema:
    {
      "disease": "Specific diagnosis / name of the possible disease or issue",
      "cause": "What caused the issue (e.g. fungal, bacterial, environmental, overwatering, pest, nutrient deficiency)",
      "treatment": "Direct actionable treatment, remedy, organic/chemical solutions",
      "prevention": "Preventive measures to take for future crop cycles or watering habits"
    }
    Ensure the JSON is raw, valid, and contains only the JSON object. Do not include markdown code block syntax.
    ```
*   **Example Input**:
    *   Crop: `Tomato`
    *   Symptoms: `Leaves turning yellow with brown spots`
*   **Example Output**:
    ```json
    {
      "disease": "Early Blight (Fungal)",
      "cause": "Fungal infection (Alternaria solani) favored by warm, humid conditions",
      "treatment": "Apply Copper Fungicide or Neem Oil spray. Remove affected lower leaves.",
      "prevention": "Avoid overhead watering. Maintain proper spacing for airflow, rotate crops yearly."
    }
    ```

---

## Why Prompt 3 Worked Best

1.  **Structured JSON Payload**: Returning a clean JSON object allows the Express backend to parse it instantly and send structured fields to the React frontend.
2.  **No Text Scraping/Parsing Needed**: The frontend can render distinct sections (Disease Name, Root Cause, Direct Treatment, and Prevention tips) in beautifully styled individual cards without writing fragile regex parsers.
3.  **Consistency**: Forces the LLM to reply with exactly the properties required, ensuring the UI is never broken by missing sections or unexpected conversational filler (like "Sure, I can help you with that...").

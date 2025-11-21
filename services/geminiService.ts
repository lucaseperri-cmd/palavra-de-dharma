import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { DharmaWord } from '../types';

/**
 * Initializes the GoogleGenAI client with the API key from environment variables.
 * @returns An instance of GoogleGenAI.
 */
const getGeminiClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

/**
 * Generates a Dharma word and its explanation using the Gemini API.
 * The model is configured to return a JSON object conforming to the DharmaWord interface.
 * @returns A promise that resolves to a DharmaWord object.
 */
export const generateDharmaWord = async (): Promise<DharmaWord> => {
  const ai = getGeminiClient();

  const prompt = `Gere uma única 'Palavra do Dharma' para reflexão diária. Esta palavra e sua explicação devem ser inspiradas em diversos textos e conceitos budistas, oferecendo uma variedade de perspectivas e ensinamentos. Forneça um título conciso (a Palavra do Dharma) e uma breve e perspicaz explicação. A resposta deve estar no formato JSON.
  
  Exemplo de estrutura JSON:
  {
    "title": "Equanimidade",
    "explanation": "Manter a calma e a serenidade diante das vicissitudes da vida, sem apego ou aversão. A equanimidade nos liberta das reações impulsivas e nos ajuda a cultivar a paz interior, independentemente das circunstâncias externas."
  }
  
  Por favor, certifique-se de que o título seja uma única palavra significativa ou uma frase curta, e que a explicação seja concisa, mas profunda, adequada para reflexão diária.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // Suitable for text generation tasks
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: 'A palavra ou frase curta do Dharma.',
            },
            explanation: {
              type: Type.STRING,
              description: 'Uma breve explicação da palavra do Dharma.',
            },
          },
          required: ['title', 'explanation'],
          propertyOrdering: ["title", "explanation"],
        },
      },
    });

    const jsonStr = response.text?.trim();

    if (!jsonStr) {
      throw new Error("Received empty or invalid JSON response from Gemini API.");
    }

    // Attempt to parse the JSON response
    let parsedData: DharmaWord;
    try {
      parsedData = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("Failed to parse JSON from Gemini API:", jsonStr, parseError);
      throw new Error("Failed to parse Dharma word from API response.");
    }

    // Validate the parsed data against the interface
    if (!parsedData.title || !parsedData.explanation) {
      throw new Error("API response does not conform to the DharmaWord structure.");
    }

    return parsedData;

  } catch (error) {
    console.error("Error generating Dharma word:", error);
    // Re-throw to be handled by the calling component
    throw error;
  }
};
/* eslint-disable import/prefer-default-export */
export const getPrompt = (trip) => `
You are a professional travel planner.

Create a personalized multi-day travel program based on the user’s trip data.

Trip details:
- Country: ${trip.country}
- City: ${trip.destination}
- Dates: from ${trip.startDate} to ${trip.endDate}
- Number of days: ${trip.days}
- Budget: ${trip.budget || ""}
- Traveler interests: ${trip.interests}

Your task:
1. Generate a full travel itinerary split by days.
2. For each day include:
   - Morning activity
   - Afternoon activity
   - Evening activity
   - Recommended places (list)
   - Short explanation why these activities match the traveler’s interests
   - Estimated cost range for the day
3. Respect the user’s interests and budget:
   - Low budget → prioritize free or low-cost activities
   - Medium budget → mix of free and paid options
   - High budget → premium experiences allowed
4. Ensure the plan feels realistic, practical and coherent.
5. **Output format must be STRICTLY valid JSON**:

STRICT JSON FORMAT (no text before or after):

{
  "tripProgram": [
    {
      "day": <number>,
      "date": "<YYYY-MM-DD>",
      "activities": [
        {
          "time": "<HH:MM>",
          "title": "<short activity title>",
          "description": "<1–2 sentences>",
          "placeName": "<exact place name>",
          "placeType": "<park|museum|restaurant|monument|viewpoint|shopping|event>",
          "googleSearchQuery": "<place name + city>",
          "estimatedCost": "<e.g. Free, 10-20 EUR>"
        }
      ]
    }
  ]
}

Rules:
1. Use only real places that exist in this city.
2. Place names must be accurate enough to be used in Google Places API.
3. Use logical time slots for activities.
4. Include 3–6 activities per day.
5. The JSON MUST be valid and follow the structure perfectly.
6. If the user has low budget — avoid expensive places.

  `;

export function extractJSON(text) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;
  let json = match[0];

  json = json.replace(/```json|```/g, "");
  json = json.replace(/,\s*}/g, "}");
  json = json.replace(/,\s*]/g, "]");

  return json;
}

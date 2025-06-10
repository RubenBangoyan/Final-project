export function formatResumePrompt(values: any): string {
  console.log(values, 'values')
  return `
You are a resume generator.

Take the following user information and generate a resume in **valid JSON format** only. 
Do not include any extra text or Markdown. Structure it with these fields, skills and languages is important parth.

- contactInfo: { email, phone, city, name, lastName }
- profile
- experience: array of { company, position, startDate, endDate, description }
- education
- skills: array
- languages: array

dont forgot find and add language and skills

Here is the user input:
${JSON.stringify(values, null, 2)}
  `;
}

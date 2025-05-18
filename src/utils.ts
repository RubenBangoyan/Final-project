export function formatResumePrompt(data: any): string {
  const { firstName, lastName, birthdate, email, phone, city, experience = [] } = data;

  let prompt = `Create a professional resume based on the following information:\n\n`;
  prompt += `Name: ${firstName} ${lastName}\n`;
  if (birthdate) prompt += `Date of Birth: ${birthdate.format("YYYY-MM-DD")}\n`;
  if (email) prompt += `Email: ${email}\n`;
  if (phone) prompt += `Phone: ${phone}\n`;
  if (city) prompt += `City: ${city}\n`;

  prompt += `\nWork Experience:\n`;
  experience.forEach((exp: any, index: number) => {
    const period = exp.period ? `${exp.period[0].format("YYYY-MM")} - ${exp.period[1].format("YYYY-MM")}` : "N/A";
    prompt += `\n${index + 1}. ${exp.position} at ${exp.company} (${period})\n`;
    prompt += `${exp.description || ""}\n`;
  });

  return prompt;
}

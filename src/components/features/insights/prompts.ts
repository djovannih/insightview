export const generateArticlePrompt = `Generate an engaging and informative newspaper article based on the provided interview transcript. The article should capture the essence of the conversation while presenting it in a journalistic style.

Ensure that the article remains faithful to the language used in the interview. The tone should reflect the moods and emotions conveyed by the interviewee and interviewer—whether it's formal, casual, enthusiastic, or serious.

# Steps

1. **Understand the Context**: Carefully read the interview transcript to understand the key points, emotional context, and overall message.
2. **Extract Key Highlights**: Identify the most important information, quotes, and any narrative that stands out to help maintain reader interest.
3. **Structure the Article Body**:
   - **Body**:
     - Present the information in a logical flow, maintaining a balance between the interview content and journalistic storytelling.
     - Use quotes sparingly for authenticity and to illustrate the subject's perspective.
4. **Tone Matching**: Keep the tone consistent with that in the original transcript, allowing readers to grasp the mood, personality, and dynamism of the interviewee.

# Output Format

Write the output as HTML, using \`<p>\`, \`<h2>\`, \`<h3>\`, \`<h4>\`, \`<b>\`, \`<i>\`, \`<blockquote>\`, \`<code>\`, \`<ol>\`, \`<ul>\`, and any other HTML-supported tags as necessary to create a well-structured and engaging article body. Aim for a length of approximately 300-600 words. 

Only include the body text of the article—do not include a headline or introductory paragraph.

# Notes

- Focus on maintaining accuracy, using direct quotes effectively.
- Do not alter the meaning; be true to the content shared by the interviewee.
- Adjust sentences for flair as suited to a newspaper format, ensuring engaging readability.
- Maintain a clear transition between different topics or stages discussed.`;

export const extractHighlightsPrompt = `Extract catchy highlights from the provided interview transcript as quotes.

# Steps

1. **Read the Transcript**: Review the entire interview transcript to understand the content, context, and flow.
2. **Identify Key Highlights**: Identify the most engaging or impactful phrases that can be quoted. Focus on segments that clearly communicate valuable insights, strong emotional moments, or unique thoughts.

# Output Format

The output should be in a JSON format containing an array of quote strings.
Do not provide a preamble. Only include the JSON content and nothing else.

Example:
[
  "Innovation is nothing more than thinking of a new way to solve a problem.",
  "Collaboration is the key to turning good ideas into great successes."
]   

# Notes

- Aim to capture quotes that are powerful, insightful, or memorable.
- Ensure the quotes are concise yet complete enough to provide meaningful insight.
- Quotes should range from 5 to 15 seconds in length to capture focused highlights.`;

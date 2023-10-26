import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.prompt.deleteMany();

  await prisma.prompt.create({
    data: {
      title: "Title for video",
      template: `Your role is to generate three titles for a YouTube video.

Below you will receive a transcript of this video, use this transcript to generate the titles.
Below you will also receive a list of titles, use this list as a reference for the titles to be generated.

Titles should be a maximum of 60 characters long.
Titles should be catchy and attractive to maximize clicks.

Return ONLY the three titles in list format as in the example below:
'''
- Title 1
- Title 2
- Title 3
'''

Transcript:
'''
{transcription}
'''`.trim(),
      type: "video",
    },
  });

  await prisma.prompt.create({
    data: {
      title: "Description for video",
      template:
        `Your role is to generate a succinct description for a YouTube video.
  
Below you will receive a transcript of this video, use this transcript to generate the description.

The description should be a maximum of 80 words in first person, containing the main points of the video.

Use attention-grabbing words that catch the reader's attention.

Also, at the end of the description include a list of 3 to 10 lowercase hashtags containing keywords from the video.

The return should be in the following format:
'''
Description.

#hashtag1 #hashtag2 #hashtag3 ...
'''

Transcript:
'''
{transcription}
'''`.trim(),
      type: "video",
    },
  });

  await prisma.prompt.create({
    data: {
      title: "Summary for video",
      template:
        `Your role is to generate a succinct summary for a YouTube video.

Below you will receive a transcript of this video, use this transcript to generate the summary.

The summary should be a maximum of 200 words in first person, containing the main points of the video.

Use attention-grabbing words that catch the reader's attention.

The return should be in the following format:

'''
Summary.
'''

Transcript:
'''
{transcription}
'''`.trim(),
      type: "video",
    },
  });

  await prisma.prompt.create({
    data: {
      title: "Summary for Website",
      template: `Your task is to create a concise summary for a website.

        Below, you will find content from the website, which you will use to generate the summary.
        
        The summary should be no longer than 200 words, written in the first person, and should highlight the key points of the website.
        
        Employ engaging language that captures the reader's interest.
        
        The format for your response should be as follows:
        
        '''
        Summary.
        '''
        
        Content:
        '''
        {content}
        '''`.trim(),
      type: "website",
    },
  });

  await prisma.prompt.create({
    data: {
      title: "FAQ for Website",
      template:
        `Your task is to create a concise FAQ (Frequently Asked Questions) for a website.

      Below, you'll find content from the website. Utilize this material to craft the FAQ.
      
      It should consist of a maximum of 200 words in the first person, including only information from the website.
      
      Employ attention-grabbing language that captivates the reader's attention and refrain from inventing details.
      
      The format for your response should be as follows:

      
      '''
      Q(N): [question]
      A(N): [answer]
      '''
      
      Content
      '''
      {content}
      '''`.trim(),
      type: "website",
    },
  });

  await prisma.prompt.create({
    data: {
      title: "Summary for Article",
      template: `Your role is to generate a succinct summary for an article.

Below you will receive a transcript of this article, use this transcript to generate the summary.

The summary should be a maximum of 200 words, containing the main points of the article.

Use attention-grabbing words that catch the reader's attention.

The return should be in the following format:

'''
Summary.
'''

Transcript:
'''
{transcription}
'''`.trim(),
      type: "article",
    },
  });

  await prisma.prompt.create({
    data: {
      title: "Summary for Audio",
      template: `Your role is to generate a succinct summary for an audio.

Below you will receive a transcript of this audio, use this transcript to generate the summary.

The summary should be a maximum of 200 words, containing the main points of the audio.

Use attention-grabbing words that catch the reader's attention.

The return should be in the following format:

'''
Summary.
'''

Transcript:
'''
{transcription}
'''`.trim(),
      type: "audio",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

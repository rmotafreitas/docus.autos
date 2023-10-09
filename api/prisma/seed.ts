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
    },
  });

  await prisma.prompt.create({
    data: {
      title: "Summary for video",
      template:
        `Your role is to generate a succinct summary for a YouTube video.

Below you will receive a transcript of this video, use this transcript to generate the summary.

The summary ption should be a maximum of 200 words in first person, containing the main points of the video.

Use attention-grabbing words that catch the reader's attention.

The return should be in the following format:

'''
Summary.
'''

Transcript:
'''
{transcription}
'''`.trim(),
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

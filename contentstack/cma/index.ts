import * as contentstack from "@contentstack/management";

const contentstackClient = contentstack.client();

const stack = contentstackClient.stack({
  api_key: process.env.CONTENTSTACK_API_KEY || "",
  management_token: process.env.CONTENTSTACK_MANAGEMENT_TOKEN || "",
});

export const createEntry = async (contentType: string, entryData: any) => {
  try {
    const entry = await stack
      .contentType(contentType)
      .entry()
      .create({ entry: entryData });
    return entry;
  } catch (error) {
    console.error("Error creating entry:", error);
    throw error;
  }
};

export const updateEntry = async (
  contentType: string,
  entryUid: string,
  entryData: any
) => {
  try {
    const entry = await stack.contentType(contentType).entry(entryUid).fetch();

    Object.assign(entry, entryData);
    const updatedEntry = await entry.update();
    return updatedEntry;
  } catch (error) {
    console.error("Error updating entry:", error);
    throw error;
  }
};

export default stack;

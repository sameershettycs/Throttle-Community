import contentstack, { Region } from "@contentstack/delivery-sdk";

const stack = contentstack.stack({
  apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY || "",
  deliveryToken: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN || "",
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || "",
  region: Region.EU,
});

// Get all entries with references populated by default
export const getAllEntries = async (contentType: string) => {
  const result = await stack
    .contentType(contentType)
    .entry()
    .addParams({ include_all: "true", include_all_depth: "2" })
    .find();
  return result;
};

// Get single entry with references populated by default
export const getSingleEntry = async (contentType: string, uid: string) => {
  const result = await stack
    .contentType(contentType)
    .entry(uid)
    .addParams({ include_all: "true", include_all_depth: "2" })
    .fetch();
  return result;
};

export default stack;

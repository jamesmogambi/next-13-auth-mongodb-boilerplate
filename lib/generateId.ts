import { v4 as uuidv4 } from "uuid";

function generateUniqueString(number: number, start: String) {
  // Generate a version 4 UUID
  const uuid = uuidv4();

  // Extract the first 6 characters from the UUID
  const shortUUID = uuid.slice(0, number);

  // Format the final string starting with "PT" followed by the 6-digit number
  const uniqueString = `${start}${shortUUID}`;

  return uniqueString.toUpperCase();
}

export default generateUniqueString;

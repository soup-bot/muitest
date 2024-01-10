import { json } from "@remix-run/node";

export const action = async ({ request }) => {
  console.log("addContact action called");

  if (request.method !== "POST") {
    throw json({ message: "Invalid request method" }, { status: 400 });
  }

  const formData = await request.formData();
  console.log(formData);

  // Your logic for adding a contact...

  // Return a response or `null`
  return json({ success: true }); // Adjust the response according to your needs
};

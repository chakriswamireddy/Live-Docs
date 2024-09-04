import { Liveblocks } from "@liveblocks/node";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation"; // For handling redirects
import { getRandomColor } from "@/lib/utils";
// import { liveblocks } from "@/lib/liveblocks";

const liveblocks = new Liveblocks({
  secret: "sk_dev_zdXzX_6v1GbMxr0t747qVikYhXLKN4tlqzFukVI_bR6oLANHv9pQa1fhhjVhzlkz",
});

export async function POST(request: Request) {
  // Get the current user from your database using Clerk
  const clerkUser = await currentUser();

  // Redirect to the sign-in page if the user is not authenticated
  if (!clerkUser) {
    redirect('/sign-in');
    return;
  }

  // Destructure user data from the Clerk user object
  const { id, firstName, lastName, emailAddresses, imageUrl } = clerkUser;

  // Prepare user metadata for Liveblocks
  const user = {
    id,

    info: {
      id,
      name: `${firstName} ${lastName}`, // Fallback to empty strings if undefined
      email: emailAddresses[0].emailAddress,
      avatar: imageUrl,
      color: getRandomColor(), // Assuming you still want to assign a random color
    },
  };

  // Identify the user and return the result
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.info.email,
      // Assuming groupIds are coming from somewhere in your user data,
      // include it if relevant. Otherwise, you can omit this key.
      groupIds: [], // Provide an empty array if groupIds are undefined
    },
    { userInfo: user.info },
  );

  return new Response(body, { status });
}

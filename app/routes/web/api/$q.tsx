import { json } from "@remix-run/node";

export async function loader({ params }: { params: any }) {
  return fetch(`https://katla.vercel.app/api/define/${params.q}`, {
    headers: {
      Authorization: "token CGZ12sbk3NP2",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.length) {
        return json({
          definition: `${data
            .map((v: any, i: any) => `<b>${i + 1}.</b> ${v}`)
            .join(", ")}`,
        });
      }
      return json({ definition: "" });
    });
}

import { json } from "remix/server";

export async function loader({ params }: { params: any }) {
  return fetch(`https://kateglo.com/api.php?format=json&phrase=${params.q}`)
    .then((res) => res.json())
    .then((data) => {
      if (data && data.kateglo && data.kateglo.definition) {
        if (data.kateglo.definition.length) {
          return json({
            definition: `${data.kateglo.definition
              .map((v: any, i: any) => `<b>${i + 1}.</b> ${v.def_text}`)
              .join(", ")}`
          })
        }
      }
      return json({ definition: '' });
    })
}

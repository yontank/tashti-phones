import React, { useEffect, useState } from "react";
import { Taron } from "src/schemas/aron";

export default function AronShirshur() {
  const [arons, setArons] = useState<Taron[]>([]);
  useEffect(() => {
    window.shaiseAPI.getAronsList().then((data: any) => {
      console.log(data);
      setArons(data);
    });
  }, []);

//   arons.forEach((aron) => {
//     if (aron.shirshurFromId){

//     }
//   });

//   function mapArons(arons: Taron[]) {
//     return arons.map((aron) => {
//       console.log(aron.Arons);
//       if (aron.Arons && aron.Arons.length > 0) mapArons(aron.Arons);
//       return (
//         <li key={aron.id}>
//           <p>
//             {aron.location} | {aron.name}
//           </p>
//         </li>
//       );
//     });
//   }

  return (
    <>
      <div>
        {arons.map((aron) => (
          <li key={aron.id}>
            <p>
              {aron.location} | {aron.name}
            </p>
          </li>
        ))}
      </div>
    </>
  );
}

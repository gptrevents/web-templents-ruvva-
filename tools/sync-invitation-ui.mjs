import { copyFile } from "node:fs/promises";
export const themes = [
  "temple-dawn",
  "floral-elegant",
  "storybook-garden",
  "ocean-serene",
  "varnika",
  "sannidhi",
  "kalyana-vaibhavam",
];
for (const id of themes)
  for (const ext of ["js", "css"])
    await copyFile(
      "shared/invitation-ui." + ext,
      "themes/" + id + "/invitation-ui." + ext,
    );
console.log(
  "Shared UI synchronized to " + themes.length + " standalone themes.",
);

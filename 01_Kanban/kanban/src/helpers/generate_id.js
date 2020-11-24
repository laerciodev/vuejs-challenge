export default function() {
  let id = "";
  const possible = "1234567890";

  for (let i = 0; i < 12; i++)
    id += possible.charAt(Math.floor(Math.random() * possible.length));

  return id;
}

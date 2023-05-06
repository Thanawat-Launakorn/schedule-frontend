export default function GetPosition(id?: number) {
  switch (id) {
    case 1:
      return "frontend developer";
      break;

    case 2:
      return "backend developer";
      break;

    case 3:
      return "tester";
      break;

    case 4:
      return "project manager";
      break;

    case 5:
      return "business analysis";
      break;

    case 6:
      return "admin";
      break;
  }
}

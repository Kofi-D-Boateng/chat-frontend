import { setupServer, SetupServerApi } from "msw/lib/node";
import { handlers } from "./handlers";

export const server: SetupServerApi = setupServer(...handlers);

import { randomBytes } from "crypto";
import { DefaultBodyType, MockedRequest, rest, RestHandler } from "msw";
import { CREATEROOM, FINDROOM } from "../../component/UI/Constatns";

export const handlers: RestHandler<MockedRequest<DefaultBodyType>>[] = [
  rest.get(FINDROOM, (req, res, ctx) => {
    console.log("HIT");
    return res(
      ctx.status(200),
      ctx.json({ roomName: randomBytes(12).toString("hex") })
    );
  }),
  rest.post(CREATEROOM, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        roomName: "Some Name",
        roomID: randomBytes(12).toString("hex"),
        username: "",
      })
    );
  }),
];

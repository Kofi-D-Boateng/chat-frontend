import { randomBytes } from "crypto";
import { DefaultBodyType, MockedRequest, rest, RestHandler } from "msw";
import { CREATEROOM, FINDROOM } from "../../component/UI/Constatns";

const keyTest = "testing%room";

export const handlers: RestHandler<MockedRequest<DefaultBodyType>>[] = [
  rest.get(FINDROOM, async (req, res, ctx) => {
    const param = req.url.searchParams.get("key");
    console.log(param);
    if (!param) {
      return res(ctx.status(400));
    } else if (param !== keyTest) {
      return res(ctx.status(400));
    } else {
      return res(
        ctx.status(200),
        ctx.json({ roomName: randomBytes(12).toString("hex") })
      );
    }
  }),
  rest.post(CREATEROOM, async (req, res, ctx) => {
    const { name, creator, capacity } = await req.json();
    if (
      name === undefined ||
      creator === undefined ||
      isNaN(parseInt(capacity))
    ) {
      return res(ctx.status(400));
    }
    return res(
      ctx.status(200),
      ctx.json({
        roomName: name,
        roomID: randomBytes(12).toString("hex"),
        username: creator,
      })
    );
  }),
];

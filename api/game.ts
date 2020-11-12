import type { ServerRequest } from "https://deno.land/std@0.77.0/http/server.ts"
import Pusher from "https://denopkg.com/gnlow/pusher-http-deno@main/mod.ts"

const {
    APP_ID: appId,
    KEY: key,
    SECRET: secret,
    CLUSTER: cluster,
} = Deno.env.toObject()

const pusher = new Pusher({
    appId,
    key,
    secret,
    cluster,
    useTLS: true
})

export default async (req: ServerRequest) => {
    const data = req.body
    await pusher.trigger("my-channel", "my-event", {
        message: "hello world"
    })
    req.respond({body: "OK"})
}
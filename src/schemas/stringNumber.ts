import { z } from "nestjs-zod/z";

export const stringInt = z.string()
    .transform(Number)
    .pipe(
        z.number()
            .int()
    )